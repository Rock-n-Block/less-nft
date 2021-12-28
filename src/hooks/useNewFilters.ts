import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const sortByFilters = [
  { value: 'created_at', label: 'Created' },
  { value: '-price', label: 'Price' },
  { value: 'likes', label: 'Likes' },
  { value: 'views', label: 'Views' },
  { value: 'sale', label: 'Sale' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'auction_end', label: 'Auction End' },
  { value: 'last_sale', label: 'Last Sale' },
];

const useNewFilters = () => {
  const location = useLocation();

  // filter and text search from url
  const tag = location.search.includes('?filter=') && location.search.replace('?filter=', '');
  const text = location.search.includes('?text=') && location.search.replace('?text=', '');

  const [isOnSale, setIsOnSale] = useState(false);
  const [isOnAuction, setIsOnAuction] = useState(false);
  const [isOnTimedAuction, setIsTimedOnAuction] = useState(false);
  const [activeTags, setActiveTags] = useState<Array<string>>([tag || ''].filter((el) => el));
  const [activeChains, setActiveChains] = useState<Array<string>>([]);
  const [activeCurrencies, setActiveCurrencies] = useState<Array<string>>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [textSearch, setTextSearch] = useState(text || '');
  const [sortBy, setSortBy] = useState(sortByFilters[0]);

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
    setActiveCurrencies([]);
    setPage(1);
    setMinPrice('');
    setMaxPrice('');
    setTextSearch('');
  }, []);

  useEffect(() => {
    const tagFromSearch =
      location.search.includes('?filter=') && location.search.replace('?filter=', '');
    const textFromSearch =
      location.search.includes('?text=') && location.search.replace('?text=', '');
    if (tagFromSearch) {
      setActiveTags(() => [tagFromSearch]);
    }
    if (textFromSearch) {
      setTextSearch(textFromSearch);
    }
  }, [location]);

  useEffect(() => {
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [
    isOnSale,
    isOnAuction,
    isOnTimedAuction,
    activeTags,
    activeChains,
    minPrice,
    maxPrice,
    activeCurrencies,
    sortBy,
  ]);

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
    activeCurrencies,
    setActiveCurrencies,
    textSearch,
    setTextSearch,
    sortBy,
    setSortBy,
    sortByFilters,
  };
};

export default useNewFilters;
