import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import styles from './CollectionsFilter.module.scss';

const CollectionsFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Collections">
      <div className={styles.content}>Collections content haha</div>
    </GroupWrapper>
  );
};

export default CollectionsFilter;
