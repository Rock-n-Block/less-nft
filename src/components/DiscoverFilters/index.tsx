import { VFC } from 'react';
import cn from 'classnames';

import { H6 } from 'components';
import StatusFilter from './components/StatusFilter/index';
import PriceFilter from './components/PriceFilter/index';
import CollectionsFilter from './components/CollectionsFilter/index';
import ChainFilter from './components/ChainFilter/index';
import CategoriesFilter from './components/CategoriesFilter/index';
import OnSaleInFilter from './components/OnSaleInFilter/index';

import styles from './DiscoverFilters.module.scss';

import { ArrowLeft } from 'assets/img';

interface IProps {
  isFilterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOnSale: React.Dispatch<React.SetStateAction<boolean>>;
  isOnSale: boolean;
  setIsOnAuction: React.Dispatch<React.SetStateAction<boolean>>;
  isOnAuction: boolean;
  setIsTimedOnAuction: React.Dispatch<React.SetStateAction<boolean>>;
  isOnTimedAuction: boolean;
  activeTags: Array<string>;
  setActiveTags: React.Dispatch<React.SetStateAction<string[]>>;
  activeChains: Array<string>;
  setActiveChains: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiscoverFilters: VFC<IProps> = ({
  isFilterOpen,
  setFilterOpen,
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
            />
            <PriceFilter />
            <CollectionsFilter />
            <ChainFilter activeChains={activeChains} setActiveChains={setActiveChains} />
            <CategoriesFilter activeTags={activeTags} setActiveTags={setActiveTags} />
            <OnSaleInFilter />
          </div>
        </>
      ) : (
        <div className={styles.hide}>
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
