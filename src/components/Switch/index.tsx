import cn from 'classnames';

import styles from './Switch.module.scss';

interface ISwitchProps {
  className?: string;
  value: boolean;
  setValue: (foo: boolean) => void;
  name?: string;
}

const Switch: React.FC<ISwitchProps> = ({ className, value, setValue, name }) => {
  return (
    <label htmlFor={name || 'toogle'} className={cn(styles.switch, className)}>
      <input
        id={name || 'toogle'}
        className={styles.input}
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
      <span className={styles.inner}>
        <span className={styles.box} />
      </span>
    </label>
  );
};

export default Switch;
