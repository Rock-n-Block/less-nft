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
    <div className={cn(s.group, { [s.active]: isOpened })}>
      <button
        type="button"
        onClick={() => setIsOpened(!isOpened)}
        className={cn(s.header, { [s.active]: isOpened })}
      >
        <H6 weight="medium" className={s.title}>
          {title}
        </H6>
        <div className={cn(s.arrow, { [s.active]: isOpened })}>
          <img src={arrowLeft} alt="arrowLeft" />
        </div>
      </button>
      {isOpened && <div className={s.content}>{children}</div>}
    </div>
  );
};

export default GroupWrapper;
