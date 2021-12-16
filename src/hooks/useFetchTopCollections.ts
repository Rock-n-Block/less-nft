import { useEffect, useState, useCallback } from 'react';
import { activityApi } from 'services';

export const useFetchTopCollections = (period: any, network = localStorage.lessnft_nft_chainName, tags = '') => {
  const [collections, setCollections] = useState<any[]>([]);
  const fetchTopCollections = useCallback(() => {
    //TODO: add fetchTopCollections request
    activityApi
      .getTopCollections({ type: 'seller', sortPeriod: period.value, network, tags })
      .then(({ data }: any) => setCollections(data));
  }, [period.value, network, tags]);

  useEffect(() => {
    fetchTopCollections();
  }, [fetchTopCollections]);

  return {
    collections,
  };
};
