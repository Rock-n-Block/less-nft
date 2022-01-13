import { FC } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import Banner from './Banner';
import CreateAndSell from './CreateAndSellNft';
import NotableDrops from './NotableDrops';
import TopCollections from './TopCollections';
import Trending from './Trending';
import ResourceForGettingStarted from './ResourceForGettingStarted';
import BrowseByCategory from './BrowseByCategory';

import styles from './Home.module.scss';
import { GradientBlock, LiveAuction } from 'components';

const Home: FC = observer(() => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="LessNft | NFT Marketplace" />
        <meta property="og:site_name" content="LessNft" />
        <meta property="og:url" content="https://nft.less.xyz/" />
        <meta
          property="og:description"
          content="A peer-to-peer marketplace for NFTs, rare digital items and crypto collectibles. Buy, sell, auction, and discover CryptoKitties, Decentraland, Gods Unchained cards, blockchain game items, and more."
        />
      </Helmet>
      <div className={styles.container}>
        <Banner />
        <NotableDrops />
        <TopCollections />
        <Trending />
        <GradientBlock color="orange" align="right" />
        <LiveAuction />
        <ResourceForGettingStarted />
        <BrowseByCategory />
        <GradientBlock color="purple" align="left" />
        <CreateAndSell />
      </div>
    </>
  );
});

export default Home;
