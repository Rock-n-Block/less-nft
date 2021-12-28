import { useMemo, VFC } from 'react';

import FilterLabel from '../FilterLabel';
import { useNewFilters } from 'hooks';

import s from './Labels.module.scss';

import { iconChange } from 'assets/img';

interface IProps {
  filters: ReturnType<typeof useNewFilters>;
}

const Labels: VFC<IProps> = ({
  filters: {
    isOnSale,
    setIsOnSale,
    isOnAuction,
    setIsOnAuction,
    isOnTimedAuction,
    setIsTimedOnAuction,
    activeTags,
    setActiveTags,
    activeChains,
    setActiveChains,
    setDefaultFilters,
    minPrice,
    maxPrice,
    setMaxPrice,
    setMinPrice,
    activeCurrencies,
    setActiveCurrencies,
    setTextSearch,
    textSearch,
  },
}) => {
  const minMaxLabel = useMemo(() => {
    if (minPrice && maxPrice) return `${(+minPrice).toFixed(2)} - ${(+maxPrice).toFixed(2)}`;
    if (!minPrice && maxPrice) return `< ${(+maxPrice).toFixed(2)}`;
    if (minPrice && !maxPrice) return `> ${(+minPrice).toFixed(2)}`;
    return '';
  }, [minPrice, maxPrice]);

  return (
    <div className={s.labels}>
      {isOnSale && <FilterLabel title="Buy now" onClick={() => setIsOnSale(false)} />}
      {isOnAuction && <FilterLabel title="On Auction" onClick={() => setIsOnAuction(false)} />}
      {isOnTimedAuction && (
        <FilterLabel title="Has Offers" onClick={() => setIsTimedOnAuction(false)} />
      )}
      {activeTags.map((tag) => (
        <FilterLabel
          key={tag}
          title={tag}
          onClick={() => setActiveTags((prev) => prev.filter((el) => el !== tag))}
        />
      ))}
      {activeChains.map((chain) => (
        <FilterLabel
          key={chain}
          title={chain}
          onClick={() => setActiveChains((prev) => prev.filter((el) => el !== chain))}
        />
      ))}
      {activeCurrencies.map((currency) => (
        <FilterLabel
          key={currency}
          title={currency.toUpperCase()}
          onClick={() => setActiveCurrencies((prev) => prev.filter((el) => el !== currency))}
        />
      ))}
      {(minPrice || maxPrice) && (
        <FilterLabel
          icon={iconChange}
          title={minMaxLabel}
          onClick={() => {
            setMaxPrice('');
            setMinPrice('');
          }}
        />
      )}
      {textSearch && (
        <FilterLabel title={`Text: ${textSearch}`} onClick={() => setTextSearch('')} />
      )}
      <button type="button" className={s.button} onClick={setDefaultFilters}>
        Clear All
      </button>
    </div>
  );
};

export default Labels;
