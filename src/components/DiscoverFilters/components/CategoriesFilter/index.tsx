import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import styles from './CategoriesFilter.module.scss';

const CategoriesFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Categories">
      <div className={styles.content}>Price content haha</div>
    </GroupWrapper>
  );
};

export default CategoriesFilter;
