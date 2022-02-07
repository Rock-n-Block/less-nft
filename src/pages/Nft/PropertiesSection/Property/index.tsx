import { VFC } from 'react';

import { Text } from 'components';

import s from './Property.module.scss';
import { sliceString } from 'utils';

interface IProps {
  title: string;
  value: string;
  chance: number | string;
}

const Property: VFC<IProps> = ({ title, value, chance }) => {
  return (
    <div className={s.property}>
      <Text size="s" align="center" color="primary" weight="bold" className={s.title}>
        {sliceString(title, 10, 0)}
      </Text>

      <Text size="m" align="center" weight="bold" className={s.value}>
        {sliceString(value, 10, 0)}
      </Text>
      <Text size="xs" color="lightGray" align="center" className={s.chance}>
        {chance}% have this trait
      </Text>
    </div>
  );
};

export default Property;
