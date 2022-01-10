import { Text } from 'components';
import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
  avatar: string;
  creatorAvatar: string;
  creatorName: string;
  name: string;
  description: string;
}

const TrendingItem: FC<IProps> = ({ avatar, creatorAvatar, creatorName, name, description }) => {
  return (
    <div className={styles.trading}>
      <img src={avatar} className={styles.avatar} alt="avatar" />
      <div className={styles.creatorWrapper}>
        <img src={creatorAvatar} className={styles.creatorAvatar} alt="creator" />
      </div>
      <div className={styles.info}>
        <Text className={styles.name} size="xl">
          {name}
        </Text>
        <Text className={styles.creatorName} size="xl">
          By{' '}
          <Text size="xl" color="primary">
            {creatorName}
          </Text>
        </Text>
        <Text className={styles.description}>{description}</Text>
      </div>
    </div>
  );
};
export default TrendingItem;
