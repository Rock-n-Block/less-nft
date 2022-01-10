import { useCallback, useEffect, useState } from 'react';
import { storeApi } from 'services';
import { INft } from 'typings';

const useFetchRelated = (id: string | number) => {
  const [isLoading, setLoading] = useState(false);
  const [nftCards, setNftCards] = useState<INft[]>([]);

  const fetchSearch = useCallback(() => {
    setLoading(true);

    storeApi
      .getRelated(id)
      .then(({ data }: any) => {
        setNftCards(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return [nftCards, isLoading];
};

export default useFetchRelated;
