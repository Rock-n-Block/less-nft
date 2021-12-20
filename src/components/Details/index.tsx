import React from 'react';
import { Button, Text } from 'components';
import { observer } from 'mobx-react-lite';
import styles from './Details.module.scss';
import { useMst } from 'store';
import { iconCrossBlack } from 'assets/img';

const Details: React.FC = observer(() => {
  const {
    modals: { details },
  } = useMst();

  return (
    <div className={styles.swap}>
      <div className={styles.header}>
        <Text className={styles.label} size="m" weight="medium">
          {details.text}
        </Text>
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <Text>Type</Text>
          <Text>Name</Text>
        </div>
        <div className={styles.bottom}>
          <div className={styles.detail}>
            <div className={styles.left}>
              <img alt="cross" className={styles.cross} src={iconCrossBlack} />
              <input className={styles.input} />
            </div>
            <div className={styles.right}>
              <input className={styles.input} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <Button
          className={styles.button}
          // onClick={handleSubmitConvert}
          // loading={isLoading}
          // disabled={+payInput > +currentBalance || +payInput <= 0 || isLoading}
          // color="blue"
        >
          Save
        </Button>
      </div>
    </div>
  );
});

export default Details;
