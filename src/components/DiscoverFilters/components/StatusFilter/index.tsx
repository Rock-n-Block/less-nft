import { useCallback, useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';
import { Button } from 'components';

import styles from './StatusFilter.module.scss';

const buttonsId = {
  buyNowButtonId: 1,
  onAuctionButtonId: 2,
  newButtonId: 3,
  hasOffersButtonId: 4,
};

interface IProps {
  setIsOnSale: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOnAuction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTimedOnAuction: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatusFilter: VFC<IProps> = ({ setIsOnSale, setIsOnAuction, setIsTimedOnAuction }) => {
  const [isOpened, setisOpened] = useState(true);
  const [activeButtons, setActiveButtons] = useState<Array<number>>([]);

  const handleFilter = useCallback(
    (filterName: string, buttonId: number) => {
      if (activeButtons.includes(buttonId)) {
        setActiveButtons((prev) => prev.filter((el) => el !== buttonId));
      } else {
        setActiveButtons((prev) => [...prev, buttonId]);
      }

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
    [activeButtons, setIsOnSale, setIsOnAuction, setIsTimedOnAuction],
  );

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Status">
      <div className={styles.content}>
        <Button
          onClick={() => handleFilter('Buy now', buttonsId.buyNowButtonId)}
          color={activeButtons.includes(buttonsId.buyNowButtonId) ? 'purple' : 'outline'}
        >
          Buy now
        </Button>
        <Button
          onClick={() => handleFilter('On Auction', buttonsId.onAuctionButtonId)}
          color={activeButtons.includes(buttonsId.onAuctionButtonId) ? 'purple' : 'outline'}
        >
          On Auction
        </Button>
        <Button
          onClick={() => handleFilter('New', buttonsId.newButtonId)}
          color={activeButtons.includes(buttonsId.newButtonId) ? 'purple' : 'outline'}
        >
          New
        </Button>
        <Button
          onClick={() => handleFilter('Has Offers', buttonsId.hasOffersButtonId)}
          color={activeButtons.includes(buttonsId.hasOffersButtonId) ? 'purple' : 'outline'}
        >
          Has Offers
        </Button>
      </div>
    </GroupWrapper>
  );
};

export default StatusFilter;
