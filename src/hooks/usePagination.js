import { useState, useEffect } from 'react';

function usePagination(items, pageSize) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [items]);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const from = currentPage * pageSize;
  const showedItems = items.slice(from, from + pageSize);

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return {
    items: showedItems,
    onNextPage,
    onPrevPage,
    nextDisabled: currentPage >= totalPages - 1,
    prevDisabled: currentPage === 0,
  };
}

export default usePagination;
