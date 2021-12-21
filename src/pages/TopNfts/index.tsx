import { useState, VFC, FC, useMemo } from 'react';

import { H2, Text } from 'components';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useMst } from 'store';
import { chains } from 'config';
import { observer } from 'mobx-react-lite';
import { allLogo, iconAllNFTs, iconArrowDown, iconEthSmall } from 'assets/img';
import OutsideClickHandler from 'react-outside-click-handler';
import nextId from 'react-id-generator';
import { useFetchTopCollections } from 'hooks';
import { numberFormatter } from 'utils';

const timeOptions = [
  { symbol: 'Last 24 Hours', value: 'day', label: '24h' },
  { symbol: 'Last 7 Days', value: 'week', label: '7d' },
  { symbol: 'Last 30 Days', value: 'month', label: '30d' },
];

const TopNfts: VFC = observer(() => {
  const { nftTags } = useMst();
  const chainsOptions = [
    { symbol: 'All chains', image: allLogo },
    ...Object.values(chains).map((chain: any) => {
      return {
        symbol: chain.name === 'Binance-Smart-Chain' ? 'Binance' : chain.name,
        image: chain.img,
      };
    }),
  ];
  const [time, setTime] = useState(timeOptions[0]);
  const [tag, setTag] = useState({ symbol: 'All NFTs', image: iconAllNFTs });
  const [chain, setChain] = useState(chainsOptions[0]);
  const [visibleChain, setVisibleChain] = useState(false);
  const [visibleTag, setVisibleTag] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);

  const { collections } = useFetchTopCollections(
    time.value,
    chain.symbol === 'All chains' ? '' : chain.symbol,
    tag.symbol === 'All NFTs' ? '' : tag.symbol,
  );

  const nfts = useMemo(
    () => [
      ...collections.map((collection: any, index: number) => {
        return { ...collection, number: index + 1 };
      }),
    ],
    [collections],
  );

  const handleTags = (value: any) => {
    setTag(value);
    setVisibleTag(false);
  };
  const handleChains = (value: any) => {
    setChain(value);
    setVisibleChain(false);
  };
  const handleTime = (value: any) => {
    setTime(value);
    setVisibleTime(false);
  };

  const CustomDropdown: FC<any> = ({ options, visible, value, setVisible, handleClick }) => {
    return (
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div className={cn(styles.dropdown, { [styles.active]: visible })} id="chains">
          <div
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
            className={styles.head}
            onClick={() => setVisible(!visible)}
          >
            {value.image ? (
              <img alt="" className={cn(styles.image, styles.imageOption)} src={value.image} />
            ) : (
              <></>
            )}
            <div className={cn(styles.selection, { [styles.margin]: value.image })}>
              {value.symbol}
            </div>
            <img alt="open dropdown" src={iconArrowDown} className={styles.arrow} />
          </div>
          <div className={styles.body}>
            {options.map((x: any) => (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cn(styles.option, {
                  [styles.selectioned]: x.symbol === value.symbol,
                })}
                onClick={() => handleClick(x)}
                key={nextId()}
              >
                {x.image ? <img alt="" className={styles.image} src={x.image} /> : <></>}
                <span className={styles.text}>{x.symbol}</span>
              </div>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
    );
  };

  return (
    <section className={styles.page}>
      <div className={styles.top}>
        <H2 align="center" className={styles.title}>
          Top NFTs
        </H2>
        <Text className={styles.subtitle} color="lightGray">
          The top NFTs on OpenSea, ranked by volume, floor price and other statistics.
        </Text>
      </div>
      <div className={styles.content}>
        <div className={styles.dropdowns}>
          <CustomDropdown
            options={timeOptions}
            value={time}
            setVisible={setVisibleTime}
            visible={visibleTime}
            handleClick={handleTime}
          />
          {nftTags.tags.length ? (
            <CustomDropdown
              options={nftTags.tags.map((nftTag: any) => {
                return { symbol: nftTag.title, image: nftTag.icon };
              })}
              visible={visibleTag}
              value={tag}
              setVisible={setVisibleTag}
              handleClick={handleTags}
            />
          ) : (
            <></>
          )}
          <CustomDropdown
            options={chainsOptions}
            visible={visibleChain}
            value={chain}
            setVisible={setVisibleChain}
            handleClick={handleChains}
          />
        </div>

        <div className={styles.collections}>
          <div className={styles.collectionsHead}>
            <div> </div>
            <div>
              <Text weight="bold">Collection</Text>
            </div>
            <div>
              <Text weight="bold">Volume</Text>
            </div>
            <div>
              <Text weight="bold">{time.label}%</Text>
            </div>
            <div>
              <Text weight="bold">Floor Price</Text>
            </div>
            <div>
              <Text weight="bold">Owners</Text>
            </div>
            <div>
              <Text weight="bold">Items</Text>
            </div>
          </div>
          <div className={styles.collectionsBody}>
            {nfts.length ? (
              nfts.map((nft: any) => (
                <div className={styles.collection}>
                  <div className={styles.collectionNumber}>
                    <Text>{nft.number}</Text>
                  </div>
                  <div className={styles.collectionStart}>
                    <img
                      alt="avatar"
                      className={styles.collectionAvatar}
                      src={nft.collection.avatar}
                    />
                    <Text>{nft.collection.name}</Text>
                  </div>
                  <div className={styles.collectionStart}>
                    <img alt="eth" src={iconEthSmall} />
                    <Text>{nft.price}</Text>
                  </div>
                  <div className={styles.collectionStart}>
                    <Text
                      className={cn(styles.collectonDiff, {
                        [styles.green]: nft.difference && nft.difference[0] === '+',
                        [styles.red]: nft.difference && nft.difference[0] === '-',
                      })}
                    >
                      {nft.difference ? `${nft.difference}` : '0'}%
                    </Text>
                  </div>
                  <div className={styles.collectionStart}>
                    <img alt="eth" src={iconEthSmall} />
                    <Text>{nft.floor_price || 0}</Text>
                  </div>
                  <div className={styles.collectionStart}>
                    <Text>{numberFormatter(nft.total_owners, 10)}</Text>
                  </div>
                  <div className={styles.collectionStart}>
                    <Text>{numberFormatter(nft.total_items, 10)}</Text>
                  </div>
                </div>
              ))
            ) : (
              <Text>No items</Text>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default TopNfts;
