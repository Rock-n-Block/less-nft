import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import styles from './ChainFilter.module.scss';

const ChainFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Chain">
      <div className={styles.content}>Chain content haha</div>
    </GroupWrapper>
  );
};

export default ChainFilter;
