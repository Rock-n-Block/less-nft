import { observer } from 'mobx-react-lite';
import { useState, VFC, useCallback } from 'react';
import { useMst } from 'store';

import GroupWrapper from '../GroupWrapper';

import styles from './CategoriesFilter.module.scss';

import { checkMark } from 'assets/img';

const CategoriesFilter: VFC = observer(() => {
  const [isOpened, setisOpened] = useState(true);
  const { nftTags } = useMst();

  const [activeTags, setActiveTags] = useState<Array<string>>([]);

  const handleToogleTag = useCallback(
    (tagName: string) => {
      if (activeTags.includes(tagName)) {
        setActiveTags((prev) => prev.filter((el) => el !== tagName));
        // setChainsToUpperComponent()
      } else {
        setActiveTags((prev) => [...prev, tagName]);
      }
    },
    [activeTags],
  );

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Categories">
      <div className={styles.content}>
        {nftTags.tags.map((tag) => {
          const isTagActive = activeTags.includes(tag.title);
          return (
            <button type="button" onClick={() => handleToogleTag(tag.title)} className={styles.tag}>
              <div className={styles.icon}>
                <img src={isTagActive ? checkMark : tag.icon} alt="tag" />
              </div>
              <div className={styles.title}>{tag.title}</div>
            </button>
          );
        })}
      </div>
    </GroupWrapper>
  );
});

export default CategoriesFilter;
