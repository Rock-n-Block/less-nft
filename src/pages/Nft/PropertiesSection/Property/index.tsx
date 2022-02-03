import { VFC } from 'react';

import { EllipsisText, Text } from 'components';

import s from './Property.module.scss';

interface IProps {
  title: string;
  value: string;
  chance: number | string;
}

const Property: VFC<IProps> = ({ title, value, chance }) => {
  return (
    <div className={s.property}>
      <EllipsisText>
        <Text size="s" align="center" color="primary" weight="bold" className={s.title}>
          {title}
        </Text>
      </EllipsisText>
      <Text size="m" align="center" weight="bold" className={s.value}>
        {value}
      </Text>
      <Text size="xs" color="lightGray" align="center" className={s.chance}>
        {chance}% have this trait
      </Text>
    </div>
  );
};

export default Property;
