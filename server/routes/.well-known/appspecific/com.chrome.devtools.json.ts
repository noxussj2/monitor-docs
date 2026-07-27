// Chrome DevTools 打开时会自动探测该路径，返回空对象避免落入 [...slug] 的 404
export default defineEventHandler(() => ({}))
