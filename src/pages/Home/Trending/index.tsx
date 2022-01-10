/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { H2, Text } from 'components';
import mockImg from './mockImg.png';
import mockImgAvatar from './mockImgAvatar.png';
import TrandingItem from './TrendingItem';

import styles from './styles.module.scss';
import { useWindowSize } from 'hooks';
import TitleDropdown from './TitleDropdown';
import { observer } from 'mobx-react-lite';
import { iconAllNFTs } from 'assets/img';
import { useMst } from 'store';
import { storeApi } from 'services';

type Props = {
  className?: string;
};
const Trending: FC<Props> = observer(({ className }) => {
  const { nftTags } = useMst();
  const [title, setTitle] = useState<any>({ title: 'All NFTs', icon: iconAllNFTs });
  const [drops, setDrops] = useState<any[]>([]);
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

  const fetchCollections = useCallback((tag: string) => {
    storeApi.getSearchResults({
      type: 'collections',
      tags: tag.toLowerCase() === 'all nfts' ? '' : tag,
      order_by: 'price',
    });
  }, []);

  useEffect(() => {
    fetchCollections(title.title);
  }, [fetchCollections, title.title]);

  const fetchNotableDrops = useCallback(() => {
    //TODO: add fetchNotableDrops request
    setDrops([
      {
        avatar: mockImg,
        creator: { avatar: mockImgAvatar, name: 'Alethea_AI' },
        name: 'iNFT Personality Pod Sale',
        description: 'Bring your NFT to life using a iNFT Personality Pod by Alethea AI.',
      },
      {
        avatar: mockImg,
        creator: { avatar: mockImgAvatar, name: 'Alethea_AI' },
        name: 'iNFT Personality Pod Sale',
        description: 'Bring your NFT to life using a iNFT Personality Pod by Alethea AI.',
      },
      {
        avatar: mockImg,
        creator: { avatar: mockImgAvatar, name: 'Alethea_AI' },
        name: 'iNFT Personality Pod Sale',
        description: 'Bring your NFT to life using a iNFT Personality Pod by Alethea AI.',
      },
    ]);
  }, []);

  useEffect(() => {
    fetchNotableDrops();
  }, [fetchNotableDrops]);
  return (
    <div className={cx(styles.notableDrops, className)}>
      <H2 className={styles.title} align="center">
        Trending in{' '}
        {nftTags.tags.length && (
          <TitleDropdown value={title} setValue={setTitle} options={nftTags.tags} />
        )}
      </H2>
      {drops.length ? (
        // <Carousel slidesToShow={numberOfSlide}>
        <div className={styles.drops}>
          {drops.map((drop) => {
            return (
              <div className={styles.drop}>
                <TrandingItem
                  avatar={drop.avatar}
                  creatorAvatar={drop.creator.avatar}
                  creatorName={drop.creator.name}
                  name={drop.name}
                  description={drop.description}
                />
              </div>
            );
          })}
        </div>
      ) : (
        // </Carousel>
        <Text size="xl" className={styles.noItems}>
          There are no notable drops
        </Text>
      )}
    </div>
  );
});

export default Trending;
