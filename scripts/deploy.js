/**
 * 自动化部署：本地打包 .output/public，上传压缩包后在服务器解压
 *
 * 使用方式：
 *   1. 在 .env 中配置 SFTP_HOST / SFTP_USER / SFTP_PASS / SFTP_REMOTE_PATH
 *   2. 执行 pnpm deploy（先 nuxt generate，再上传）
 */
require('dotenv').config({ quiet: true })

const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const cliProgress = require('cli-progress')
const SftpClient = require('ssh2-sftp-client')

const { SFTP_HOST, SFTP_USER, SFTP_PASS, SFTP_PORT, SFTP_REMOTE_PATH } = process.env

if (!SFTP_HOST || !SFTP_USER || !SFTP_PASS || !SFTP_REMOTE_PATH) {
    console.error('缺少 SFTP 配置，请检查 .env 中的 SFTP_HOST / SFTP_USER / SFTP_PASS / SFTP_REMOTE_PATH')
    process.exit(1)
}

const LOCAL_DIR = path.join(__dirname, '../.output/public')
const ARCHIVE_NAME = 'deploy.tar.gz'

// 在 SSH 连接上执行远程命令
function execRemote(client, command) {
    return new Promise((resolve, reject) => {
        client.exec(command, (err, stream) => {
            if (err) return reject(err)
            let stderr = ''
            stream.on('data', () => {}) // 必须消费 stdout，否则流的 close 事件不会触发
            stream.stderr.on('data', (data) => (stderr += data))
            stream.on('close', (code) => {
                code === 0 ? resolve() : reject(new Error(`远程命令执行失败（退出码 ${code}）：${stderr}`))
            })
        })
    })
}

const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(1)

// 进度条会隐藏光标，脚本异常退出时确保光标恢复
process.on('exit', () => process.stdout.write('\x1B[?25h'))

async function main() {
    if (!fs.existsSync(LOCAL_DIR)) {
        console.error('未找到 .output/public 目录，请先执行 nuxt generate')
        process.exit(1)
    }

    const startTime = Date.now()
    const archive = path.join(os.tmpdir(), ARCHIVE_NAME)

    // 1. 本地打包
    let spinner = ora('正在打包 .output/public ...').start()
    execSync(`tar -czf "${archive}" -C "${LOCAL_DIR}" .`)
    const totalBytes = fs.statSync(archive).size
    spinner.succeed(`打包完成，压缩包 ${chalk.cyan(toMB(totalBytes) + ' MB')}`)

    // 2. 连接服务器
    spinner = ora('正在连接服务器 ...').start()
    const sftp = new SftpClient()
    await sftp.connect({
        host: SFTP_HOST,
        username: SFTP_USER,
        password: SFTP_PASS,
        port: Number(SFTP_PORT) || 22,
    })
    await sftp.mkdir(SFTP_REMOTE_PATH, true)
    spinner.succeed(`已连接 ${chalk.cyan(SFTP_HOST)}`)

    // 3. 上传压缩包（实时进度条）
    const bar = new cliProgress.SingleBar(
        {
            format: `上传中  ${chalk.cyan('{bar}')} {percentage}% | {transferredMB}/{totalMB} MB | {speed} MB/s`,
            barsize: 30,
            hideCursor: true,
        },
        cliProgress.Presets.shades_classic
    )
    bar.start(totalBytes, 0, { transferredMB: '0.0', totalMB: toMB(totalBytes), speed: '-' })

    const remoteArchive = path.posix.join(SFTP_REMOTE_PATH, ARCHIVE_NAME)
    await sftp.fastPut(archive, remoteArchive, {
        step(transferred, _chunk, _total) {
            const elapsed = (Date.now() - startTime) / 1000
            bar.update(transferred, {
                transferredMB: toMB(transferred),
                speed: elapsed > 0 ? (transferred / 1024 / 1024 / elapsed).toFixed(1) : '-',
            })
        },
    })
    bar.stop()

    // 4. 服务器上解压并删除压缩包
    spinner = ora('正在服务器上解压 ...').start()
    await execRemote(sftp.client, `cd "${SFTP_REMOTE_PATH}" && tar -xzf ${ARCHIVE_NAME} && rm -f ${ARCHIVE_NAME}`)
    spinner.succeed('服务器解压完成')

    await sftp.end()
    fs.unlinkSync(archive)

    const cost = ((Date.now() - startTime) / 1000).toFixed(1)
    console.log(chalk.green(`🎉 部署完成，共耗时 ${cost}s`))
}

main().catch((err) => {
    console.error(chalk.red('部署失败：'), err.message)
    process.exit(1)
})
