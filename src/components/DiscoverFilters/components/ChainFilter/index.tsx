import { useCallback, useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';
import { Text } from 'components';

import styles from './ChainFilter.module.scss';
import { chains } from 'config';

import { checkMark } from 'assets/img';

const ChainFilter: VFC = () => {
  const [isOpened, setisOpened] = useState(true);
  const [activeChains, setActiveChains] = useState<Array<string>>([]);

  const handleToogleChain = useCallback(
    (chainName: string) => {
      if (activeChains.includes(chainName)) {
        setActiveChains((prev) => prev.filter((el) => el !== chainName));
        // setChainsToUpperComponent()
      } else {
        setActiveChains((prev) => [...prev, chainName]);
      }
    },
    [activeChains],
  );

  console.log(chains.Polygon);

  return (
    <GroupWrapper isOpened={isOpened} setIsOpened={setisOpened} title="Chain">
      <div className={styles.content}>
        {Object.values(chains).map((chain) => {
          const isChainActive = activeChains.includes(chain.name);
          return (
            <button
              type="button"
              onClick={() => handleToogleChain(chain.name)}
              className={styles.chain}
            >
              <div className={styles.icon}>
                <img src={isChainActive ? checkMark : chain.img} alt={`${chain.name} logo`} />
              </div>
              <Text tag="span" className={styles.name}>
                {chain.name}
              </Text>
            </button>
          );
        })}
      </div>
    </GroupWrapper>
  );
};

export default ChainFilter;
