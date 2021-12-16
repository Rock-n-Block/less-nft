import { useState, VFC, FC } from 'react';

import { H2, Text } from 'components';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useMst } from 'store';
import { chains } from 'config';
import { observer } from 'mobx-react-lite';
import { allLogo, iconAllNFTs, iconArrowDown } from 'assets/img';
import OutsideClickHandler from 'react-outside-click-handler';
import nextId from 'react-id-generator';
import { useFetchTopCollections } from 'hooks';

const timeOptions = [
  { symbol: 'Last 24 Hours', value: 'day' },
  { symbol: 'Last 7 Days', value: 'week' },
  { symbol: 'Last 30 Days', value: 'month' },
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

        <div className={styles.collections}>{collections.length ? 'yes' : 'no'}</div>
      </div>
    </section>
  );
});

export default TopNfts;
