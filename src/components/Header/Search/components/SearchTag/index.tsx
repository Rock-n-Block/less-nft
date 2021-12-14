import { VFC } from 'react';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  image: string;
  title: string;
  price: string | number;
  asset: string;
  isAuction: boolean;
  inStock: number;
  className?: string;
  isSelling: boolean;
};

const SearchTag: VFC<Props> = ({
  image,
  title,
  price,
  asset,
  isAuction,
  inStock,
  className,
  isSelling,
}) => (
  <div className={cx(styles.searchTag, className)}>
    <div className={styles.searchTagFlexContainer}>
      <img className={styles.searchTagImg} src={image} alt="art" />
      <div>
        <Text size="m" weight="medium">
          {title}
        </Text>
        <Text size="m" color="darkenGray">
        {/* eslint-disable */}
          {isSelling
            ? (isAuction
              ? `On auction for ${price} ${asset}`
              : `On sale for ${price} ${asset}`)
            : 'Not sale'}
        </Text>
      </div>
    </div>
    <div className={styles.searchTagInfo}>
      <Text
        size="m"
        weight="medium"
        className={cx(styles.typeText, { [styles.auction]: isAuction })}
      >
        {/* eslint-disable */}
        {isSelling ? (isAuction ? 'Auction' : 'Sale') : 'Not sale'}
      </Text>
      {!isAuction && <Text size="s">{`in stock: ${inStock}`}</Text>}
    </div>
  </div>
);

export default SearchTag;
