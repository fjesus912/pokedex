const paginateData = (items, currentPage) => {
  //? Cantidad de items por página
  const ITEMS_PER_PAGE = 20

  //? Items de la página actual
  const sliceEnd = currentPage * ITEMS_PER_PAGE
  const sliceStart = sliceEnd - ITEMS_PER_PAGE
  const itemsInCurrentPage = items.slice(sliceStart, sliceEnd)

  //? Primera página
  const firstPage = 1

  //? Última página o la cantidad de páginas
  const lastPage = Math.ceil(items.length / ITEMS_PER_PAGE)

  //? Bloque actual
  const PAGES_PER_BLOCK = 5
  const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

  //? Páginas que se van a mostrar en el bloque actual
  const pagesInCurrentBlock = []
  const maxPage = actualBlock * PAGES_PER_BLOCK
  const minPage = (maxPage - PAGES_PER_BLOCK) + 1
  for (let i = minPage; i <= maxPage; i++) {
    if (i <= lastPage) {
      pagesInCurrentBlock.push(i)
    }
  }
  return {
    itemsInCurrentPage,
    pagesInCurrentBlock,
    lastPage,
    firstPage
  }
}

export {
  paginateData,
}