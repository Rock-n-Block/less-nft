import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import styles from './PriceFilter.module.scss';

const PriceFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Price">
      <div className={styles.content}>Price content haha</div>
    </GroupWrapper>
  );
};

export default PriceFilter;
