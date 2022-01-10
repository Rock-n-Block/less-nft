import { TextInput } from 'components';
import { IRankings } from 'hooks';
import { useCallback, useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';

import s from './RankingsFilter.module.scss';

interface IProps {
  rankings: IRankings;
}

const RankingsFilter: VFC<IProps> = ({ rankings }) => {
  const [isOpened, setIsOpened] = useState(true);
  const [rankingsToBackend, setRankingsToBackend] = useState<IRankings>({});

  // {Weight: {min: 1, max: 10}, Health: {min: 3, max: 5}}

  const handleChangeRankings = useCallback(
    (rankingTitle: string, type: 'min' | 'max', value: string) => {
      const currentRanking = rankingsToBackend[rankingTitle];
      const otherType = type === 'min' ? 'max' : 'min';

      const isValueInRange =
        +value >= +rankings[rankingTitle].min && +value <= +rankings[rankingTitle].max;

      if (value && !isValueInRange) {
        return;
      }

      const newRankings = {
        ...rankingsToBackend,
        [rankingTitle]: {
          [type]: value,
          [otherType]: currentRanking
            ? currentRanking[otherType]
            : rankings[rankingTitle][otherType],
        },
      };

      //   eslint-disable
      //   @ts-ignore
      setRankingsToBackend(newRankings);
      console.log(newRankings);
    },
    [rankingsToBackend, rankings],
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
            <TextInput
              type="number"
              placeholder={rankings[ranking].min}
              value={rankingsToBackend[ranking]?.min || ''}
              onChange={(e) => handleChangeRankings(ranking, 'min', e.target.value)}
            />
            to
            <TextInput
              type="number"
              placeholder={rankings[ranking].max}
              onChange={(e) => handleChangeRankings(ranking, 'max', e.target.value)}
              value={rankingsToBackend[ranking]?.max || ''}
            />
          </div>
        </GroupWrapper>
      ))}
    </>
  );
};

export default RankingsFilter;
