import { useFetchNft, useNewFilters } from 'hooks';
import { useCallback, useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';
import cn from 'classnames';

import styles from './CollectionsFilter.module.scss';

import { checkMark } from 'assets/img';

interface IProps {
  activeCollections: Array<string>;
  setActiveCollections: React.Dispatch<React.SetStateAction<string[]>>;
}

const CollectionsFilter: VFC<IProps> = ({ activeCollections, setActiveCollections }) => {
  const [isOpened, setIsOpened] = useState(true);

  const filters = useNewFilters();
  const [,, nftCards] = useFetchNft({
    page: filters.page,
    type: 'collections',
    text: '',
  });

  const handleToogleCollection = useCallback(
    (tagName: string) => {
      if (activeCollections.includes(tagName)) {
        setActiveCollections((prev) => prev.filter((el) => el !== tagName));
      } else {
        setActiveCollections((prev) => [...prev, tagName]);
      }
    },
    [activeCollections, setActiveCollections],
  );


  return (
    <GroupWrapper
      isOpened={isOpened}
      setIsOpened={() => setIsOpened(!isOpened)}
      title="Collections"
    >
      <div className={styles.content}>
        {nftCards
          .filter((col: any) => !col.is_default)
          .map((collection: any) => {
            const isCollectionActive = activeCollections.includes(collection.id);
            return (
              <button
                onClick={() => handleToogleCollection(collection.id)}
                className={cn(styles.collection, { [styles.active]: isCollectionActive })}
                key={collection.name}
                type="button"
              >
                <div className={styles.collection_ava}>
                  <img src={isCollectionActive ? checkMark : collection.avatar} alt="" />
                </div>
                <div className={styles.collection_name}>{collection.name}</div>
              </button>
            );
          })}
      </div>
    </GroupWrapper>
  );
};

export default CollectionsFilter;
