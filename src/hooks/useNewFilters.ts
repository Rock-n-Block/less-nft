import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TNullable } from 'typings';

const sortByFilters = [
  { value: '-created_at', label: 'Created' },
  { value: '-price', label: 'Price' },
  { value: '-likes', label: 'Likes' },
  { value: '-views', label: 'Views' },
  { value: '-sale', label: 'Sale' },
  { value: '-transfer', label: 'Transfer' },
  { value: '-auction_end', label: 'Auction End' },
  { value: '-last_sale', label: 'Last Sale' },
];

interface IProps {
  elementToScroll?: React.MutableRefObject<TNullable<HTMLDivElement>>;
}

const useNewFilters = (data?: IProps) => {
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
  const [activeCollections, setActiveCollections] = useState<Array<string>>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [textSearch, setTextSearch] = useState(text || '');
  const [sortBy, setSortBy] = useState(sortByFilters[0]);
  const [activePerks, setActivePerks] = useState('{}');

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
    setActiveCollections([]);
    setPage(1);
    setMinPrice('');
    setMaxPrice('');
    setTextSearch('');
    setActivePerks('{}');
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
    const { elementToScroll } = data || {};
    setPage(1);
    if (elementToScroll) {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const elementRect = elementToScroll.current?.getBoundingClientRect() || null;
      const scrollTo = (elementRect ? elementRect.top : 0) + scrolled;
      
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    activeCollections,
    data,
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
    activeCollections,
    setActiveCollections,
    activePerks,
    setActivePerks,
  };
};

export default useNewFilters;
