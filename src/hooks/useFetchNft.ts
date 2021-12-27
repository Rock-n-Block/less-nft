import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { storeApi } from 'services';
import { INft } from 'typings';

const NUMBER_NFTS_PER_PAGE = 8;

interface IProps {
  page?: number;
  type?: string;
  order_by?: string;
  tags?: string;
  max_price?: string;
  min_price?: string;
  currency?: string;
  is_verified?: string;
  creator?: string;
  owner?: string;
  text?: string;
  isCanFetch?: boolean;
  isOnlyForOwnerOrCreator?: boolean;
  on_sale?: boolean;
  on_auc_sale?: boolean;
  on_timed_auc_sale?: boolean;
  network?: string;
}

export const useFetchNft = (
  props: IProps,
  isDebounce = false,
  isIntervalUpdate = false,
): [number, number, INft[], boolean, (textValue: string) => void] => {
  const {
    page,
    type,
    order_by,
    tags,
    max_price,
    min_price,
    currency,
    is_verified,
    creator,
    owner,
    on_sale,
    text,
    isCanFetch = true,
    isOnlyForOwnerOrCreator,
    on_auc_sale,
    on_timed_auc_sale,
    network,
  } = props;
  const [isLoading, setLoading] = useState(false);
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nftCards, setNftCards] = useState<INft[]>([]);

  const fetchSearch = useCallback(
    (textInput = text) => {
      if (!isCanFetch || (isOnlyForOwnerOrCreator && !owner && !creator)) {
        return;
      }
      // TODO: fix bug with refresh [when change filters need to refresh === true]
      const refresh = page === 1;
      setLoading(true);

      const boolIsVerified = is_verified === 'All' ? undefined : is_verified === 'verified';
      const formattedCurrency = currency === 'All' ? undefined : currency;
      const formattedTags = tags?.toLocaleLowerCase() === 'all nfts' ? undefined : tags;
      storeApi
        .getSearchResults({
          type,
          order_by,
          tags: formattedTags,
          max_price,
          min_price,
          currency: formattedCurrency,
          page,
          is_verified: boolIsVerified,
          creator,
          owner,
          text: textInput,
          on_sale: on_sale || '',
          on_auc_sale: on_auc_sale || '',
          on_timed_auc_sale: on_timed_auc_sale || '',
          network,
        })
        .then(({ data: { items, total_tokens } }: any) => {
          setTotalItems(() => total_tokens);
          if (refresh) {
            setNftCards(items);
          } else {
            setNftCards((prev: INft[]) => [...prev, ...items]);
          }
          if (!items && refresh) {
            setNftCards([]);
          }
          setAllPages(Math.ceil(total_tokens / NUMBER_NFTS_PER_PAGE));
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [
      creator,
      currency,
      isCanFetch,
      isOnlyForOwnerOrCreator,
      is_verified,
      max_price,
      on_sale,
      on_auc_sale,
      on_timed_auc_sale,
      order_by,
      owner,
      page,
      type,
      min_price,
      tags,
      text,
      network,
    ],
  );

  const debouncedFetch = useRef(
    debounce((value) => {
      if (value !== '') {
        return fetchSearch(value);
      }
      setTotalItems(0);
      setNftCards([]);
      return () => {};
    }, 1000),
  ).current;

  useEffect(() => {
    let interval: any = null;
    if (!isDebounce) {
      fetchSearch();
      if (isIntervalUpdate && !interval) {
        interval = setInterval(fetchSearch, 60000);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    page,
    order_by,
    tags,
    type,
    max_price,
    currency,
    is_verified,
    min_price,
    creator,
    on_sale,
    text,
    isDebounce,
    fetchSearch,
    isIntervalUpdate,
    on_auc_sale,
    on_timed_auc_sale,
  ]);

  return [allPages, totalItems, nftCards, isLoading, debouncedFetch];
};
