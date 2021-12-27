import { useFetchNft, useNewFilters } from 'hooks';
import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';
import { TextInput } from 'components';

import styles from './CollectionsFilter.module.scss';

const CollectionsFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  const filters = useNewFilters();
  const [allPages, totalItems, nftCards] = useFetchNft({
    page: filters.page,
    type: 'collections',
    text: '',
  });

  console.log({ nftCards, allPages, totalItems });

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Collections">
      <div className={styles.content}>
        <TextInput type="text" placeholder="Filter" />
        {nftCards
          .filter((col: any) => !col.is_default)
          .map((collection: any) => (
            <div className={styles.collection}>
              <div className={styles.collection_ava}>
                <img src={collection.avatar} alt="" />
              </div>
              <div className={styles.collection_name}>{collection.name}</div>
            </div>
          ))}
      </div>
    </GroupWrapper>
  );
};

export default CollectionsFilter;
