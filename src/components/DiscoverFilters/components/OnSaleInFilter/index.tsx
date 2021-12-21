import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import styles from './OnSaleInFilter.module.scss';

const OnSaleInFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="On sale in">
      <div className={styles.content}>OnSaleInFilter content haha</div>
    </GroupWrapper>
  );
};

export default OnSaleInFilter;
