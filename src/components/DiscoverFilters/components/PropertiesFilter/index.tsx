import { useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import styles from './PropertiesFilter.module.scss';

// properties:
// 333ssss: {10: 1}
// cxvxcvxcv: {1: 1}
// dssdf: {sees: 1}
// fsdfsdfs: {3: 1}
// mmmmmmv: {1: 1}
// name: {isdsfsdcc: 1}
// sdfsdf: {3: 1}
// vndjsvnjds: {1: 1}
// weewew: {ccsc: 1}

const properties = {
  '333sssss': { 10: 1 },
  'cxvxcvxcv': { 1: 1 },
  'dssdf': { sees: 1, surname: 2 },
  'fsdfsdfs': { 3: 1 },
  'mmmmmmv': { 1: 1 },
  'name': { isdsfsdcc: 1 },
  'sdfsdf': { 3: 1 },
  'vndjsvnjds': { 1: 1 },
  'weewew': { ccsc: 1 },
};

console.log(properties);

const PropertiesFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Price">
      <div className={styles.content}>Properties filter</div>
    </GroupWrapper>
  );
};

export default PropertiesFilter;
