import { useCallback, useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';
import { Button } from 'components';

import styles from './StatusFilter.module.scss';

interface IProps {
  setIsOnSale: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOnAuction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTimedOnAuction: React.Dispatch<React.SetStateAction<boolean>>;
  isOnSale: boolean;
  isOnAuction: boolean;
  isOnTimedAuction: boolean;
}

const StatusFilter: VFC<IProps> = ({
  setIsOnSale,
  setIsOnAuction,
  setIsTimedOnAuction,
  isOnSale,
  isOnAuction,
  isOnTimedAuction,
}) => {
  const [isOpened, setisOpened] = useState(true);

  const handleFilter = useCallback(
    (filterName: string) => {
      switch (filterName) {
        case 'Buy now':
          setIsOnSale((prev) => !prev);
          break;

        case 'On Auction':
          setIsOnAuction((prev) => !prev);
          break;

        case 'Has Offers':
          setIsTimedOnAuction((prev) => !prev);
          break;

        default:
          break;
      }
    },
    [setIsOnSale, setIsOnAuction, setIsTimedOnAuction],
  );

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Status">
      <div className={styles.content}>
        <Button
          padding="0"
          onClick={() => handleFilter('Buy now')}
          color={isOnSale ? 'purple' : 'outline'}
        >
          Buy now
        </Button>
        <Button
          padding="0"
          onClick={() => handleFilter('On Auction')}
          color={isOnAuction ? 'purple' : 'outline'}
        >
          On Auction
        </Button>
        {/* TODO: add tag filter */}
        <Button
          padding="0"
          onClick={() => handleFilter('New')}
          color={false ? 'purple' : 'outline'}
        >
          New
        </Button>
        <Button
          padding="0"
          onClick={() => handleFilter('Has Offers')}
          color={isOnTimedAuction ? 'purple' : 'outline'}
        >
          Has Offers
        </Button>
      </div>
    </GroupWrapper>
  );
};

export default StatusFilter;
