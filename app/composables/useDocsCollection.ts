export type DocsCollection = 'docs_zh_cn' | 'docs_zh_mo' | 'docs_en'

export function useDocsCollection() {
  const { locale } = useI18n()

  return computed<DocsCollection>(() => {
    if (locale.value === 'zh-MO') return 'docs_zh_mo'
    if (locale.value === 'en') return 'docs_en'
    return 'docs_zh_cn'
  })
}
