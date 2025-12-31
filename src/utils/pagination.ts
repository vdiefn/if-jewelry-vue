export const fetchPageWithFallback = async<T> (
  data:T[],
  currentPage:number,
  fallbackFn:(page:number) => Promise<void>
) => {
  const pageHasData = data.length > 0
  if(!pageHasData && currentPage > 1) {
    return await fallbackFn(currentPage - 1)
  }
}