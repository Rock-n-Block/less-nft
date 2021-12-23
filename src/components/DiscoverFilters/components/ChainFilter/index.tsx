import { useCallback, useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';
import { Text } from 'components';

import styles from './ChainFilter.module.scss';
import { chains } from 'config';

import { checkMark } from 'assets/img';

interface IProps {
  activeChains: Array<string>;
  setActiveChains: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChainFilter: VFC<IProps> = ({ activeChains, setActiveChains }) => {
  const [isOpened, setisOpened] = useState(true);

  const handleToogleChain = useCallback(
    (chainName: string) => {
      if (activeChains.includes(chainName)) {
        setActiveChains((prev) => prev.filter((el) => el !== chainName));
      } else {
        setActiveChains((prev) => [...prev, chainName]);
      }
    },
    [activeChains, setActiveChains],
  );

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
              key={chain.name}
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
