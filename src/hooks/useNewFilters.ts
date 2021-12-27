import { useCallback, useEffect, useState } from 'react';

const useNewFilters = () => {
  const [isOnSale, setIsOnSale] = useState(false);
  const [isOnAuction, setIsOnAuction] = useState(false);
  const [isOnTimedAuction, setIsTimedOnAuction] = useState(false);
  const [activeTags, setActiveTags] = useState<Array<string>>([]);
  const [activeChains, setActiveChains] = useState<Array<string>>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [page, setPage] = useState(1);
  const handlePage = useCallback((value: number) => {
    setPage(value);
  }, []);

  const setDefaultFilters = useCallback(() => {
    setIsOnSale(false);
    setIsOnAuction(false);
    setIsTimedOnAuction(false);
    setActiveTags([]);
    setActiveChains([]);
    setPage(1);
    setMinPrice('');
    setMaxPrice('');
  }, []);

  useEffect(() => {
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isOnSale, isOnAuction, isOnTimedAuction, activeTags, activeChains, minPrice, maxPrice]);

  return {
    isOnSale,
    setIsOnSale,
    isOnAuction,
    setIsOnAuction,
    isOnTimedAuction,
    setIsTimedOnAuction,
    activeTags,
    setActiveTags,
    activeChains,
    setActiveChains,
    page,
    handlePage,
    setDefaultFilters,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  };
};

export default useNewFilters;
