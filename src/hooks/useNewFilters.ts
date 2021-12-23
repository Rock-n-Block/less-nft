import { useState } from 'react';

const useNewFilters = () => {
  const [isOnSale, setIsOnSale] = useState(false);
  const [isOnAuction, setIsOnAuction] = useState(false);
  const [isOnTimedAuction, setIsTimedOnAuction] = useState(false);
  const [activeTags, setActiveTags] = useState<Array<string>>([]);
  const [activeChains, setActiveChains] = useState<Array<string>>([]);

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
  };
};

export default useNewFilters;
