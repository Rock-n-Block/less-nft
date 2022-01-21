import { useMemo, useState, VFC } from 'react';

import { CollapsingSection, TradingHistory } from 'components';

import { IconTradingHistory } from 'assets/img';
import { ICurrency, IHistoryItem } from 'typings';

interface IProps {
  history: IHistoryItem[];
  currency: ICurrency;
}

const TradingHistorySection: VFC<IProps> = ({ history, currency }) => {
  const [isOpened, setIsOpened] = useState(true);

  const TradingTableHeader = useMemo(() => {
    return [
      { Header: 'Event', accessor: 'method' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Buyer', accessor: 'name' },
    ];
  }, []);

  return (
    <CollapsingSection
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      icon={IconTradingHistory}
      title="Trading History"
    >
      <TradingHistory columns={TradingTableHeader} tableData={history} currency={currency} />
    </CollapsingSection>
  );
};

export default TradingHistorySection;