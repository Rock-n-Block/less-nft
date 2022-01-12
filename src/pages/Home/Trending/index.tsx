/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { H2, Text } from 'components';
import TrandingItem from './TrendingItem';

import styles from './styles.module.scss';
import { useWindowSize } from 'hooks';
import TitleDropdown from './TitleDropdown';
import { observer } from 'mobx-react-lite';
import { iconAllNFTs } from 'assets/img';
import { useMst } from 'store';
import { storeApi } from 'services';
import { routes } from 'appConstants';

type Props = {
  className?: string;
};
const Trending: FC<Props> = observer(({ className }) => {
  const { nftTags } = useMst();
  const [title, setTitle] = useState<any>({ title: 'All NFTs', icon: iconAllNFTs });
  const [collections, setCollections] = useState<any[]>([]);
  const [numberOfSlide, setNumberOfSlide] = useState(3);
  const { width } = useWindowSize();
  const slidesToShow = (widthValue: number) => {
    if (widthValue < 650) {
      return 1;
    }
    if (widthValue < 1050) {
      return 2;
    }
    return 3;
  };

  useEffect(() => {
    setNumberOfSlide(slidesToShow(width));
  }, [width]);

  useEffect(() => {
    console.log('numberOfSlide', numberOfSlide);
  }, [numberOfSlide]);

  const fetcTrendingCollections = useCallback(() => {
    storeApi
      .getTrendingCollections(title.title === 'All NFTs' ? '' : title.title)
      .then(({ data }: any) => setCollections(data))
      .catch((err: any) => console.log('error', err));
  }, [title.title]);

  useEffect(() => {
    fetcTrendingCollections();
  }, [fetcTrendingCollections]);
  return (
    <div className={cx(styles.notableDrops, className)}>
      <H2 className={styles.title} align="center">
        Trending in{' '}
        {nftTags.tags.length && (
          <TitleDropdown value={title} setValue={setTitle} options={nftTags.tags} />
        )}
      </H2>
      {collections.length ? (
        <div className={styles.drops}>
          {/* <Carousel slidesToShow={numberOfSlide}> */}
          {collections.map((collection) => {
            return (
              <Link to={routes.collection.link(collection.id)} className={styles.drop}>
                <TrandingItem
                  avatar={collection.avatar}
                  creatorAvatar={collection.creator.avatar}
                  creatorName={collection.creator.name}
                  name={collection.name}
                  description={collection.description}
                />
              </Link>
            );
          })}
          {/* </Carousel> */}
        </div>
      ) : (
        <Text size="xl" className={styles.noItems}>
          There are no notable drops
        </Text>
      )}
    </div>
  );
});

export default Trending;
