import { VFC } from 'react';

import { H6 } from 'components';
import StatusFilter from './components/StatusFilter/index';
import PriceFilter from './components/PriceFilter/index';
import CollectionsFilter from './components/CollectionsFilter/index';
import ChainFilter from './components/ChainFilter/index';
import CategoriesFilter from './components/CategoriesFilter/index';
import OnSaleInFilter from './components/OnSaleInFilter/index';

import styles from './DiscoverFilters.module.scss';

import { ArrowLeft } from 'assets/img';

const DiscoverFilters: VFC = () => {
  return (
    <section className={styles.filters}>
      <div className={styles.header}>
        <H6 className={styles.title}>Filter</H6>
        <button type="button" className={styles.hide_button}>
          <ArrowLeft />
        </button>
      </div>
      <div className={styles.content}>
        <StatusFilter />
        <PriceFilter />
        <CollectionsFilter />
        <ChainFilter />
        <CategoriesFilter />
        <OnSaleInFilter />
      </div>
    </section>
  );
};

export default DiscoverFilters;
