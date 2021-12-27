import { useState, VFC, useCallback } from 'react';

import GroupWrapper from '../GroupWrapper';
import { Checkbox } from 'components';

import styles from './OnSaleInFilter.module.scss';

const OnSaleInFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);
  const [activeCurrencies, setActiveCurrencies] = useState<Array<string>>([]);

  const handleChangeActiveCurrencies = useCallback(
    (currency: string) => {
      if (activeCurrencies.includes(currency)) {
        setActiveCurrencies((prev) => prev.filter((el) => el !== currency));
      } else {
        setActiveCurrencies((prev) => [...prev, currency]);
      }
    },
    [activeCurrencies],
  );

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="On sale in">
      <div className={styles.content}>
        <Checkbox
          onChange={() => handleChangeActiveCurrencies('ETH')}
          content="ETH"
          value={activeCurrencies.includes('ETH')}
          className={styles.checkbox}
        />
        <Checkbox
          onChange={() => handleChangeActiveCurrencies('WETH')}
          content="WETH"
          value={activeCurrencies.includes('WETH')}
          className={styles.checkbox}
        />
        <Checkbox
          onChange={() => handleChangeActiveCurrencies('BNB')}
          content="BNB"
          value={activeCurrencies.includes('BNB')}
          className={styles.checkbox}
        />
      </div>
    </GroupWrapper>
  );
};

export default OnSaleInFilter;
