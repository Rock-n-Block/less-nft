import { VFC } from 'react';
import cn from 'classnames';

import { H6, Text } from 'components';
import StatusFilter from './components/StatusFilter/index';
import PriceFilter from './components/PriceFilter/index';
import CollectionsFilter from './components/CollectionsFilter/index';
import ChainFilter from './components/ChainFilter/index';
import CategoriesFilter from './components/CategoriesFilter/index';
import OnSaleInFilter from './components/OnSaleInFilter/index';
import { useNewFilters } from 'hooks';

import styles from './DiscoverFilters.module.scss';

import { ArrowLeft } from 'assets/img';

interface IProps {
  isFilterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: ReturnType<typeof useNewFilters>;
}

const DiscoverFilters: VFC<IProps> = ({
  setFilterOpen,
  isFilterOpen,
  filters: {
    setIsOnSale,
    isOnSale,
    setIsOnAuction,
    isOnAuction,
    setIsTimedOnAuction,
    isOnTimedAuction,
    activeTags,
    setActiveTags,
    activeChains,
    setActiveChains,
    setMinPrice,
    setMaxPrice,
    minPrice,
    maxPrice,
    activeCurrencies,
    setActiveCurrencies,
  },
}) => {
  return (
    <section className={cn(styles.filters, { [styles.active]: isFilterOpen })}>
      {isFilterOpen ? (
        <>
          <div className={styles.header}>
            <H6 className={styles.title}>Filter</H6>
            <button
              onClick={() => setFilterOpen(!isFilterOpen)}
              type="button"
              className={cn(styles.hide_button, { [styles.active]: isFilterOpen })}
            >
              <ArrowLeft />
            </button>
          </div>
          <div className={styles.content}>
            <StatusFilter
              setIsOnSale={setIsOnSale}
              isOnSale={isOnSale}
              setIsTimedOnAuction={setIsTimedOnAuction}
              setIsOnAuction={setIsOnAuction}
              isOnAuction={isOnAuction}
              isOnTimedAuction={isOnTimedAuction}
              setActiveTags={setActiveTags}
              activeTags={activeTags}
            />
            <PriceFilter
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
            <CollectionsFilter />
            <ChainFilter activeChains={activeChains} setActiveChains={setActiveChains} />
            <CategoriesFilter activeTags={activeTags} setActiveTags={setActiveTags} />
            <OnSaleInFilter
              activeCurrencies={activeCurrencies}
              setActiveCurrencies={setActiveCurrencies}
            />
          </div>
        </>
      ) : (
        <div className={styles.hide}>
          <Text className={styles.hide_title} size="m" tag="span">
            Filters
          </Text>
          <button
            onClick={() => setFilterOpen(!isFilterOpen)}
            type="button"
            className={cn(styles.hide_button, { [styles.active]: isFilterOpen })}
          >
            <ArrowLeft />
          </button>
        </div>
      )}
    </section>
  );
};

export default DiscoverFilters;
