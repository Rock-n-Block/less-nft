import { VFC } from 'react';

import { Text } from 'components';

import s from './FilterLabel.module.scss';

import { cross } from 'assets/img';

interface IProps {
  title: string;
  onClick: () => void;
}

const FilterLabel: VFC<IProps> = ({ title }) => {
  return (
    <button className={s.label} onClick={() => {}} type="button">
      <Text color="white" tag="span">
        {title}
      </Text>
      <div className={s.cross}>
        <img src={cross} alt="cross" />
      </div>
    </button>
  );
};

export default FilterLabel;
