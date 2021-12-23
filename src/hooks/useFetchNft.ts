import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { storeApi } from 'services';
import { INft } from 'typings';

const NUMBER_NFTS_PER_PAGE = 8;

interface IProps {
  page?: number;
  sort?: string;
  order_by?: string;
  tags?: string;
  max_price?: number;
  currency?: string;
  is_verified?: string;
  on_sale?: boolean;
  creator?: string;
  owner?: string;
  text?: string;
  isCanFetch?: boolean;
  isOnlyForOwnerOrCreator?: boolean;
  has_bids?: boolean;
  bids_by?: string;
}

export const useFetchNft = (
  props: IProps,
  isDebounce = false,
  isIntervalUpdate = false,
): [number, number, INft[], boolean, (textValue: string) => void] => {
  const {
    page,
    sort,
    order_by,
    tags,
    max_price,
    currency,
    is_verified,
    creator,
    owner,
    on_sale,
    text,
    has_bids = false,
    bids_by,
    isCanFetch = true,
    isOnlyForOwnerOrCreator,
  } = props;
  const [isLoading, setLoading] = useState(false);
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nftCards, setNftCards] = useState<INft[]>([]);

  const fetchSearch = useCallback(
    (textInput = text) => {
      if (!isCanFetch || (isOnlyForOwnerOrCreator && !owner && !creator && !bids_by)) {
        return;
      }

      const refresh = page === 1;
      setLoading(true);

      const boolIsVerified = is_verified === 'All' ? undefined : is_verified === 'verified';
      const formattedCurrency = currency === 'All' ? undefined : currency;
      const formattedTags = tags?.toLocaleLowerCase() === 'all nfts' ? undefined : tags;
      storeApi
        .getSearchResults({
          sort,
          order_by,
          tags: formattedTags,
          max_price,
          currency: formattedCurrency,
          page,
          is_verified: boolIsVerified,
          creator,
          on_sale,
          owner,
          text: textInput,
          has_bids,
          bids_by,
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
        .catch((error: any) => console.error('error', error))
        .finally(() => {
          setLoading(false);
        });
    },
    [
      text,
      isCanFetch,
      isOnlyForOwnerOrCreator,
      owner,
      creator,
      bids_by,
      page,
      is_verified,
      currency,
      tags,
      sort,
      order_by,
      max_price,
      on_sale,
      has_bids,
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
    sort,
    order_by,
    tags,
    max_price,
    currency,
    is_verified,
    creator,
    on_sale,
    text,
    has_bids,
    bids_by,
    isDebounce,
    fetchSearch,
    isIntervalUpdate,
  ]);

  return [allPages, totalItems, nftCards, isLoading, debouncedFetch];
};
