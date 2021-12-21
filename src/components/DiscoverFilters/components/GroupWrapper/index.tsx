import { H6 } from 'components';
import { FC } from 'react';

import cn from 'classnames';

import s from './GroupWrapper.module.scss';

import { arrowLeft } from 'assets/img';

interface IProps {
  title: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupWrapper: FC<IProps> = ({ children, title, isOpened, setIsOpened }) => {
  return (
    <button
      type="button"
      onClick={() => setIsOpened(!isOpened)}
      className={cn(s.group, { [s.active]: isOpened })}
    >
      <div className={s.header}>
        <H6 weight="medium" className={s.title}>
          {title}
        </H6>
        <div className={cn(s.arrow, { [s.active]: isOpened })}>
          <img src={arrowLeft} alt="arrowLeft" />
        </div>
      </div>
      {isOpened && <div className={s.content}>{children}</div>}
    </button>
  );
};

export default GroupWrapper;
