import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Text, TextInput } from 'components';
import { observer } from 'mobx-react-lite';
import styles from './Details.module.scss';
import { useMst } from 'store';
import { iconCrossBlack } from 'assets/img';

const Details: React.FC = observer(() => {
  const {
    modals: { details },
  } = useMst();
  const [detailsItems, setDetailsItems] = useState([{ name: '', value1: '', value2: '' }]);
  const isFirstType = details.type === 'Properties';

  const handleChangeDetail = useCallback(
    (type: string, index: number, value: string) => {
      const newDetails = detailsItems;
      newDetails[index] = { ...newDetails[index], [type]: value };
      setDetailsItems([...newDetails]);
    },
    [detailsItems],
  );

  const handleAddDetail = useCallback(() => {
    setDetailsItems([...detailsItems, { name: '', value1: '', value2: '' }]);
  }, [detailsItems]);

  const handleDeleteDetail = useCallback(
    (indexValue: number) => {
      setDetailsItems([...detailsItems.filter((_, index: number) => index !== indexValue)]);
    },
    [detailsItems],
  );

  useEffect(() => {
    console.log(detailsItems);
  }, [detailsItems]);

  return (
    <div className={styles.swap}>
      <div className={styles.header}>
        <Text className={styles.label} size="m" weight="medium">
          {details.text}
        </Text>
      </div>
      <div className={styles.body}>
        {detailsItems.length > 1 ? (
          <>
            <div className={styles.left}>
              <div className={cn(styles.top, styles.topLeft)}>
                <Text weight="bold">{isFirstType ? 'Type' : 'Name'}</Text>
              </div>
              <div className={styles.bottom}>
                {detailsItems.map((detail: any, index: number) => (
                  <TextInput
                    className={styles.input}
                    type="text"
                    name={`name ${index}`}
                    label=""
                    placeholder="Character"
                    value={detail.name}
                    onChange={(e: any) => {
                      handleChangeDetail('name', index, e.target.value);
                    }}
                    prefix={
                      <div
                        tabIndex={0}
                        role="button"
                        onKeyDown={() => {}}
                        onClick={() => {
                          handleDeleteDetail(index);
                        }}
                      >
                        <img src={iconCrossBlack} alt="cross" />
                      </div>
                    }
                    prefixClassName={styles.prefix}
                  />
                ))}

                <Button color="outline" className={styles.addMore} onClick={handleAddDetail}>
                  Add More
                </Button>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <Text weight="bold">{isFirstType ? 'Name' : 'Value'}</Text>
              </div>
              <div className={cn(styles.bottom, { [styles.bottomDouble]: !isFirstType })}>
                {detailsItems.map((detail: any, index: number) => (
                  <div className={styles.bottomItem}>
                    <TextInput
                      className={styles.input}
                      type={isFirstType ? 'text' : 'number'}
                      name={`value1 ${index}`}
                      label=""
                      placeholder={isFirstType ? 'Character' : '3'}
                      value={detail.value1}
                      onChange={(e: any) => {
                        handleChangeDetail('value1', index, e.target.value);
                      }}
                      positiveOnly
                      integer
                    />
                    {isFirstType ? (
                      <></>
                    ) : (
                      <>
                        <Text className={styles.of}>of</Text>
                        <TextInput
                          className={styles.input}
                          type="number"
                          name={`value2 ${index}`}
                          label=""
                          placeholder="5"
                          value={detail.value2}
                          onChange={(e: any) => {
                            handleChangeDetail('value2', index, e.target.value);
                          }}
                          positiveOnly
                          integer
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.left}>
              <div className={cn(styles.top, styles.topLeft)}>
                <Text weight="bold">Type</Text>
              </div>
              <div className={styles.bottom}>
                <TextInput
                  className={styles.input}
                  type="text"
                  name="name"
                  label=""
                  placeholder="Character"
                  value={detailsItems[0].name}
                  onChange={(e: any) => {
                    handleChangeDetail('name', 0, e.target.value);
                  }}
                  prefix={<img src={iconCrossBlack} alt="cross" />}
                  prefixClassName={styles.prefix}
                />

                <Button color="outline" className={styles.addMore} onClick={handleAddDetail}>
                  Add More
                </Button>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <Text weight="bold">Name</Text>
              </div>
              <div className={cn(styles.bottom, { [styles.bottomFirst]: !isFirstType })}>
                <TextInput
                  className={styles.input}
                  type={isFirstType ? 'text' : 'number'}
                  name="value1"
                  label=""
                  placeholder={isFirstType ? 'Character' : '3'}
                  value={detailsItems[0].value1}
                  onChange={(e: any) => {
                    handleChangeDetail('value1', 0, e.target.value);
                  }}
                />
                {isFirstType ? (
                  <></>
                ) : (
                  <>
                    <Text className={styles.of}>of</Text>
                    <TextInput
                      className={styles.input}
                      type="number"
                      name="value2"
                      label=""
                      placeholder="5"
                      value={detailsItems[0].value2}
                      onChange={(e: any) => {
                        handleChangeDetail('value2', 0, e.target.value);
                      }}
                      positiveOnly
                      integer
                    />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.btns}>
        <Button
          className={styles.button}
          // onClick={handleAddDetail}
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
