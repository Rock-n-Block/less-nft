import { TextInput } from 'components';
import { IRankings } from 'hooks';
import { useCallback, useMemo, useState, VFC } from 'react';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

import GroupWrapper from '../GroupWrapper';

import s from './RankingsFilter.module.scss';

interface IProps {
  rankings: IRankings;
  activeRankings: string;
  setActiveRankigs: React.Dispatch<React.SetStateAction<string>>;
}

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const RankingsFilter: VFC<IProps> = ({ rankings, setActiveRankigs, activeRankings }) => {
  const [isOpened, setIsOpened] = useState(true);
  const activeRanks = useMemo(() => JSON.parse(activeRankings), [activeRankings]);

  const handleChangeRankings = useCallback(
    (rankingTitle: string, value: Array<string>) => {
      const isValueInRange =
        value[0] <= value[1] &&
        value[0] >= rankings[rankingTitle].min &&
        value[1] <= rankings[rankingTitle].max;

      if (value[0] && value[1] && !isValueInRange) {
        return;
      }

      const newRankings: IRankings = {
        ...activeRanks,
        [rankingTitle as string]: {
          min: value[0],
          max: value[1],
        },
      };
      // const notEmptyRankings = Object.fromEntries(
      //   Object.entries(newRankings).map((ranking) => {
      //     if (!ranking[1].min && !ranking[1].max) {
      //       return [];
      //     }
      //     if (!ranking[1].min) {
      //       return [ranking[0], { min: rankings[ranking[0]].min, max: ranking[1].max }];
      //     }
      //     if (!ranking[1].max) {
      //       return [ranking[0], { min: ranking[1].min, max: rankings[ranking[0]].max }];
      //     }
      //     return ranking;
      //   }),
      // );

      setActiveRankigs(JSON.stringify(newRankings));
    },
    [activeRanks, setActiveRankigs, rankings],
  );

  return (
    <>
      {Object.keys(rankings).map((ranking) => (
        <GroupWrapper
          key={ranking}
          isOpened={isOpened}
          setIsOpened={() => setIsOpened(!isOpened)}
          title={ranking}
        >
          <div className={s.content}>
            <Range
              className={s.range}
              min={+rankings[ranking].min}
              onAfterChange={(data) => handleChangeRankings(ranking, data.map(String))}
              step={0.1}
              max={+rankings[ranking].max}
              disabled={+rankings[ranking].max === +rankings[ranking].min}
              tipFormatter={(data) => <span className="tooltip">{data}</span>}
              defaultValue={[
                +activeRanks[ranking]?.min || +rankings[ranking].min,
                +activeRanks[ranking]?.max || +rankings[ranking].max,
              ]}
            />
            <div className={s.inner}>
              <TextInput
                type="number"
                placeholder={rankings[ranking].min}
                value={activeRanks[ranking]?.min || ''}
                onChange={(e) =>
                  handleChangeRankings(ranking, [e.target.value, rankings[ranking].max])
                }
              />
              to
              <TextInput
                type="number"
                placeholder={rankings[ranking].max}
                onChange={(e) =>
                  handleChangeRankings(ranking, [rankings[ranking].min, e.target.value])
                }
                value={activeRanks[ranking]?.max || ''}
              />
            </div>
          </div>
        </GroupWrapper>
      ))}
    </>
  );
};

export default RankingsFilter;
