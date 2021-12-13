/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { H2, Text } from 'components';
import { activityApi } from 'services';
import { OptionType } from 'typings';

import CollectionCard from './CollectionCard';
import TitleDropdown from './TitleDropdown';

import styles from './styles.module.scss';
import BigNumber from 'bignumber.js';

type Props = {
  className?: string;
};
const dropDownOptions: OptionType[] = [
  {
    label: '1 day',
    value: 'day',
  },
  {
    label: '7 days',
    value: 'week',
  },
  {
    label: 'month',
    value: 'month',
  },
];
const TopCollections: FC<Props> = ({ className }) => {
  const [collections, setCollections] = useState<any[]>([]);
  const [period, setPeriod] = useState<OptionType>(dropDownOptions[0]);
  const fetchTopCollections = useCallback(() => {
    //TODO: add fetchTopCollections request
    activityApi
      .getTopCollections({ type: 'seller', sortPeriod: period.value })
      .then(({ data }: any) => setCollections(data));
  }, [period.value]);

  useEffect(() => {
    fetchTopCollections();
  }, [fetchTopCollections]);
  return (
    <div className={cx(styles.topCollections, className)}>
      <H2 className={styles.title} align="center">
        Top collections over
        <TitleDropdown value={period} setValue={setPeriod} options={dropDownOptions} />
      </H2>
      {collections.length ? (
        <div className={`${styles.collections} ${collections.length !== 0 && styles.open}`}>
          <ol
            className={styles.collectionsWrapper}
            style={{
              gridTemplateRows: `repeat(${collections.length > 5 ? 5 : collections.length}, 1fr)`,
            }}
          >
            {collections.map((collection, index) => (
              <CollectionCard
                key={index}
                avatar={collection.collection.avatar}
                isVerified={collection.is_verified}
                id={collection.collection.id}
                index={index + 1}
                name={collection.collection.name}
                price={new BigNumber(collection.price).isEqualTo(0) ? '< $0.01' : collection.price}
                profitIncrease={collection.difference || '0'}
              />
            ))}
          </ol>
        </div>
      ) : (
        <Text size='xl' className={styles.noItems}>
          There are no collections for this period of time, but you can choose a longer period
        </Text>
      )}
      {/*<Button className={styles.goRankingBtn}>Go to Rankings</Button>*/}
    </div>
  );
};

export default TopCollections;
