import { FC } from 'react';
import cx from 'classnames';
import { H2, Text } from 'components';
import mockImg from './mockImg.png';

import styles from './styles.module.scss';
import { useMst } from 'store';
import { observer } from 'mobx-react-lite';

type Props = {
  className?: string;
};

const BrowseByCategory: FC<Props> = observer(({ className }) => {
  const { nftTags } = useMst();
  return (
    <div className={cx(styles.browseByCategory, className)}>
      <div className={styles.title}>
        <H2 align="center">Browse by category</H2>
      </div>
      <div className={styles.box}>
        {nftTags.tags.length ? (
          nftTags.tags.map((tag: any) => (
            <div className={styles.tag}>
              <img alt="category" className={styles.image} src={mockImg} />
              <Text className={styles.text}>{tag.title}</Text>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
});

export default BrowseByCategory;
