export function useTableParamsHook(CallbackFn: any) {
  const tableData = ref<any[]>([])
  const loading = ref<boolean>(false)
  const total = ref<number>(0)
  const pageInfo = ref({
    page: 1,
    size: 10
  })
  const changePageInfo = (info: any) => {
    pageInfo.value = info
    CallbackFn && CallbackFn()
  }
  return { tableData, loading, pageInfo, changePageInfo, total }
}
