import { Button, Text } from 'components';
import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
  avatar: string;
  name: string;
  description: string;
  link: string;
  color: string;
}

const NotableDrop: FC<IProps> = ({ avatar, name, description, link, color }) => {
  return (
    <div className={styles.notableDrop} style={{ backgroundColor: color }}>
      <img src={avatar} className={styles.avatar} alt="" />
      <div className={styles.info}>
        <Text className={styles.name} size="xl" color="white">
          {name}
        </Text>
        <Text className={styles.description} color="white">
          {description}
        </Text>
        <Button href={link} className={styles.button} color="outline">
          Live
        </Button>
      </div>
    </div>
  );
};
export default NotableDrop;
