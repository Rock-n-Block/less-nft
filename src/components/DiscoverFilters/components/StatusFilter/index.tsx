import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import styles from './StatusFilter.module.scss';

const StatusFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Status">
      <div className={styles.content}>Some content haha</div>
    </GroupWrapper>
  );
};

export default StatusFilter;
