import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TNullable } from 'typings';

const sortByFilters = [
  { value: '-created_at', label: 'Recently Created' },
  { value: 'created_at', label: 'Oldest' },
  { value: '-price', label: 'Highest Price' },
  { value: 'price', label: 'Lowest Price' },
  { value: '-likes', label: 'Most Likes' },
  { value: 'likes', label: 'Less Likes' },
  { value: '-views', label: 'Most Views' },
  { value: 'views', label: 'Less Views' },
  { value: '-sale', label: 'Recently Sold' },
  { value: 'sale', label: 'Oldest Sale' },
  { value: '-transfer', label: 'Recently Transfered' },
  { value: 'transfer', label: 'Oldest Transfer' },
  { value: '-auction_end', label: 'Recently Auction Ended' },
  { value: 'auction_end', label: 'Last Auction End' },
  { value: '-last_sale', label: 'Recently Last Sale' },
  { value: 'last_sale', label: 'Oldest Last Sale' },
];

interface IProps {
  elementToScroll?: React.MutableRefObject<TNullable<HTMLDivElement>>;
}

const useNewFilters = (config?: IProps) => {
  const location = useLocation();

  // filter and text search from url
  // TODO: new URLSearchParams() - переписать на эту реализацию?
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
  const [activeRankings, setActiveRankigs] = useState('{}');

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
    setActiveRankigs('{}');
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
    const { elementToScroll } = config || {};
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
    config,
    activeRankings,
    activePerks,
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
    activeRankings,
    setActiveRankigs,
  };
};

export default useNewFilters;
