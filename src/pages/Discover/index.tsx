import { RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import {
  ArtCard,
  Text,
  LiveAuction,
  Loader,
  Modal,
  DiscoverFilters,
  ArtCardSkeleton,
} from 'components';
import { AdvancedFilter } from 'containers';
import { useFetchNft, useFilters, useInfiniteScroll, useNewFilters, useWindowSize } from 'hooks';
import { observer } from 'mobx-react-lite';
import { userApi } from 'services';
import { useMst } from 'store';
import { TNullable } from 'typings';
import { toFixed } from 'utils';

import styles from './styles.module.scss';

import { FourSquares, NineSquares } from 'assets/img';
import Labels from './components/Labels';

const mobileBreakPoint = 780;

const Discover = observer(() => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const { user } = useMst();
  const [isSmallCards, setIsSmallCards] = useState(false);

  const { search } = useLocation();
  const filterTag =
    search.includes('tags') || search.includes('filter') ? search.replace(/^(.*?filter)=/, '') : '';
  const textSearch = useMemo(() => {
    return search.includes('text') ? search.replace(/^(.*?text)=/, '') : '';
  }, [search]);

  const {
    maxPrice,
    maxPriceFilter,
    handleMaxPriceFilter,
    currencyFilter,
    handleCurrencyFilter,
    verifiedFilter,
    handleVerifiedFilter,
    orderByFilter,
    filterSelectCurrencyOptions,
    // tagsFilter,
    textFilter,
    isLoading,
    defaultValues,
    resetFilter,
  } = useFilters(filterTag, textSearch);

  // new filters hook, old useFilter will be deleted as new hook will be done
  const filters = useNewFilters();

  const [allPages, totalItems, nftCards, isNftsLoading] = useFetchNft({
    page: filters.page,
    type: 'items',
    order_by: orderByFilter.value,
    // tags: tagsFilter === 'All NFTs' ? '' : tagsFilter,
    // TODO: add tags from URL
    tags: filters.activeTags.join(','),
    max_price: filters.maxPrice,
    min_price: filters.minPrice,
    currency: currencyFilter.value,
    is_verified: verifiedFilter.value,
    isCanFetch: !isLoading,
    text: textFilter.value,
    on_sale: filters.isOnSale,
    on_auc_sale: filters.isOnAuction,
    on_timed_auc_sale: filters.isOnTimedAuction,
    network: filters.activeChains.join(','),
  });

  const { width } = useWindowSize();

  const likeAction = useCallback(
    (id): Promise<any> => {
      if (!user.address) {
        return Promise.reject(new Error('Please login'));
      }
      return userApi.like({ id });
    },
    [user.address],
  );
  const filtersRef = useRef<TNullable<HTMLDivElement>>(null);
  const anchorRef = useInfiniteScroll(
    filters.page,
    allPages,
    filters.handlePage,
    isLoading || isNftsLoading,
  );

  // useScrollDown(filtersRef, '0px', '64px');
  return (
    <div className={styles.discover}>
      {/* TODO: delete this, because will be new filters */}
      {width <= mobileBreakPoint && (
        <Modal visible={isFilterOpen} onClose={() => setFilterOpen(false)} title="Advanced Filters">
          <AdvancedFilter
            className={cx(styles.mobileAdvancedFilter)}
            filterSelectCurrencyOptions={filterSelectCurrencyOptions}
            maxPrice={maxPrice}
            maxPriceFilter={maxPriceFilter}
            handleMaxPriceFilter={handleMaxPriceFilter}
            currencyFilter={currencyFilter}
            handleCurrencyFilter={handleCurrencyFilter}
            verifiedFilter={verifiedFilter}
            handleVerifiedFilter={handleVerifiedFilter}
            defaultValues={defaultValues}
            resetFilter={resetFilter}
            textFilter={textFilter}
          />
        </Modal>
      )}
      <div className={cx(styles.filterAndCards, { [styles.open]: isFilterOpen })}>
        <div className={styles.stickyWrapper}>
          <div ref={filtersRef} className={styles.sticky}>
            <DiscoverFilters
              isFilterOpen={isFilterOpen}
              setFilterOpen={setFilterOpen}
              filters={filters}
            />
          </div>
        </div>
        <div
          className={cx(styles.filterResultsContainer, {
            [styles.withFilter]: isFilterOpen,
          })}
        >
          <>
            <div className={styles.header}>
              <Text tag="span">{totalItems} results</Text>
              <div className={styles.toogle_cards}>
                <button
                  type="button"
                  onClick={() => setIsSmallCards(false)}
                  className={cx(styles.toogle_item, { [styles.active]: !isSmallCards })}
                >
                  <FourSquares />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSmallCards(true)}
                  className={cx(styles.toogle_item, { [styles.active]: isSmallCards })}
                >
                  <NineSquares />
                </button>
              </div>
            </div>
            <Labels filters={filters} />
            <div className={styles.filterResults}>
              <div className={cx(styles.cards, { [styles.small]: isSmallCards })}>
                {isNftsLoading && nftCards.length === 0 ? (
                  <>
                    <ArtCardSkeleton />
                    <ArtCardSkeleton />
                    <ArtCardSkeleton />
                  </>
                ) : (
                  nftCards.map((artCard: any) => {
                    if (isNftsLoading) return <ArtCardSkeleton />;
                    const {
                      media,
                      name,
                      price,
                      currency,
                      available,
                      creator,
                      like_count,
                      tags,
                      id,
                      highest_bid,
                      minimal_bid,
                      bids,
                      is_liked,
                    } = artCard;
                    return (
                      <ArtCard
                        artId={id}
                        key={`${id}-${like_count}-${highest_bid}-${name}-${price}-${currency}-${creator}`}
                        imageMain={media}
                        name={name}
                        price={
                          price || (highest_bid && toFixed(highest_bid.amount, 3)) || minimal_bid
                        }
                        asset={currency?.symbol.toUpperCase()}
                        inStockNumber={available}
                        author={creator.name}
                        authorAvatar={creator.avatar}
                        authorId={creator.id}
                        likesNumber={like_count}
                        tags={tags}
                        bids={bids}
                        isLiked={is_liked}
                        likeAction={likeAction}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </>
          {isNftsLoading && (
            <div className={styles.loaderBox}>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div ref={anchorRef as RefObject<HTMLDivElement>} />
      <LiveAuction className={styles.liveAuction} />
    </div>
  );
});

export default Discover;
