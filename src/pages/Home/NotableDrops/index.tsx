/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { H2, Text } from 'components';
import mockImg from './mockImg.png';
import NotableDrop from './NotableDrop';

import styles from './styles.module.scss';
import { useWindowSize } from 'hooks';

type Props = {
  className?: string;
};
const NotableDrops: FC<Props> = ({ className }) => {
  const [drops, setDrops] = useState<any[]>([]);
  const [numberOfSlide, setNumberOfSlide] = useState(3);
  const { width } = useWindowSize();
  const slidesToShow = (widthValue: number) => {
    if (widthValue < 650) {
      return 1;
    }
    if (widthValue < 1050) {
      return 2;
    }
    return 3;
  };

  useEffect(() => {
    setNumberOfSlide(slidesToShow(width));
  }, [width]);

  useEffect(() => {
    console.log('numberOfSlide', numberOfSlide);
  }, [numberOfSlide]);

  const fetchNotableDrops = useCallback(() => {
    //TODO: add fetchNotableDrops request
    setDrops([
      {
        avatar: mockImg,
        name: 'Rhymezlikedimez',
        description: '"Meet Me On Cloud Nine”, an art series',
        link: '',
        color: '#EE8373',
      },
      {
        avatar: mockImg,
        name: 'Rhymezlikedimez',
        description: '"Meet Me On Cloud Nine”, an art series',
        link: '',
        color: '#E77B93',
      },
      {
        avatar: mockImg,
        name: 'Rhymezlikedimez',
        description: '"Meet Me On Cloud Nine”, an art series',
        link: '',
        color: '#5A686E',
      },
      // {
      //   avatar: mockImg,
      //   name: 'Rhymezlikedimez',
      //   description: '"Meet Me On Cloud Nine”, an art series',
      //   link: '',
      //   color: '#EE8373',
      // },
      // {
      //   avatar: mockImg,
      //   name: 'Rhymezlikedimez',
      //   description: '"Meet Me On Cloud Nine”, an art series',
      //   link: '',
      //   color: '#E77B93',
      // },
      // {
      //   avatar: mockImg,
      //   name: 'Rhymezlikedimez',
      //   description: '"Meet Me On Cloud Nine”, an art series',
      //   link: '',
      //   color: '#5A686E',
      // },
    ]);
  }, []);

  useEffect(() => {
    fetchNotableDrops();
  }, [fetchNotableDrops]);
  return (
    <div className={cx(styles.notableDrops, className)}>
      <H2 className={styles.title} align="center">
        Notable Drops
      </H2>
      {drops.length ? (
        // <Carousel slidesToShow={numberOfSlide}>
        <div className={styles.drops}>
          {drops.map((drop) => {
            return (
              <div className={styles.drop}>
                <NotableDrop
                  avatar={drop.avatar}
                  name={drop.name}
                  description={drop.description}
                  link={drop.link}
                  color={drop.color}
                />
              </div>
            );
          })}
        </div>
      ) : (
        // </Carousel>
        <Text size="xl" className={styles.noItems}>
          There are no notable drops
        </Text>
      )}
    </div>
  );
};

export default NotableDrops;
