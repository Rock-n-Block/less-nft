import React, { useCallback, useState } from 'react';
import { H2, Text, Uploader } from 'components';
import { Link } from 'react-router-dom';

import { iconEdit, profile_avatar_example, profile_page_bg_example } from 'assets/img';

import s from './CollectionMainInfo.module.scss';
import { TNullable } from 'typings';
import { useMst } from 'store';
import { storeApi } from 'services';
import { toast } from 'react-toastify';
import { routes } from 'appConstants';

interface ICollectionMainInfo {
  cover?: string;
  avatar?: string;
  name?: string;
  description: TNullable<string>;
  creator: string | number;
  creatorName: string;
  id: string | number;
  owners: string | number;
  tokens_count: string | number;
  volume_traded: string | number | null;
  floor_price: string | number | null;
}

const CollectionMainInfo: React.FC<ICollectionMainInfo> = ({
  cover,
  avatar,
  name,
  description,
  creator,
  id,
  creatorName,
  owners,
  tokens_count,
  volume_traded,
  floor_price,
}) => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [collectionCover, setCollectionCover] = useState('');
  const { user } = useMst();
  const isSelf = user.id === creator;

  const handleFileUpload = useCallback(
    (file: File) => {
      setIsFileLoading(true);
      const fileData = new FormData();
      fileData.append('cover', file);
      fileData.append('id', id.toString());
      storeApi
        .setCollectionCover(fileData)
        .then(({ data }) => {
          toast.success('Cover uploaded');
          setCollectionCover(data);
        })
        .catch((err) => {
          toast.error('Error on unfollow');
          console.error(err, 'set cover');
        })
        .finally(() => {
          setIsFileLoading(false);
        });
    },
    [id],
  );
  return (
    <section>
      <div
        className={s.user}
        style={{
          backgroundImage: `url(${collectionCover || cover || profile_page_bg_example})`,
        }}
      />
      <div className={s.inner}>
        <div className={s.user_avatar}>
          <img src={avatar || profile_avatar_example} alt="profile_avatar_example" />
        </div>
        <H2 color="black" className={s.user_name}>
          {name}
        </H2>
        <Text tag="p" className={s.user_info}>
          <Text tag="span">
            Created by{' '}
            <Link className={s.link} to={routes.profile.link(creator)}>
              {creatorName}
            </Link>
          </Text>
        </Text>
        <div className={s.user_buttons}>
          {user.address && isSelf && (
            <>
              <Uploader
                isImgOnly
                isButton
                handleUpload={handleFileUpload}
                isLoading={isFileLoading}
                className={s.user_button}
              >
                <div className={s.user_button}>
                  <img src={iconEdit} alt="" />
                  <Text tag="span" color="black" weight="medium" className={s.user_edit}>
                    Edit Banner
                  </Text>
                </div>
              </Uploader>
            </>
          )}
        </div>
        <div className={s.user_info}>
          <div className={s.collection_statistic}>
            <div className={s.stat}>
              <Text
                className={s.stat_value}
                align="center"
                color="black"
                weight="bold"
                tag="p"
                size="xxl"
              >
                {tokens_count}
              </Text>
              <Text align="center" className={s.stat_title} color="lightGray" tag="p" size="s">
                items
              </Text>
            </div>
            <div className={s.stat}>
              <Text
                className={s.stat_value}
                align="center"
                color="black"
                weight="bold"
                tag="p"
                size="xxl"
              >
                {owners}
              </Text>
              <Text align="center" className={s.stat_title} color="lightGray" tag="p" size="s">
                owners
              </Text>
            </div>{' '}
            <div className={s.stat}>
              <Text
                className={s.stat_value}
                align="center"
                color="black"
                weight="bold"
                tag="p"
                size="xxl"
              >
                {floor_price || 0}
              </Text>
              <Text align="center" className={s.stat_title} color="lightGray" tag="p" size="s">
                floor price
              </Text>
            </div>{' '}
            <div className={s.stat}>
              <Text
                className={s.stat_value}
                align="center"
                color="black"
                weight="bold"
                tag="p"
                size="xxl"
              >
                {volume_traded || 0}
              </Text>
              <Text align="center" className={s.stat_title} color="lightGray" tag="p" size="s">
                volume traded
              </Text>
            </div>
          </div>
          {/* TODO: crop description if it's more that 500 symbols */}
          {/* TODO: add button that will show full description */}
          <div className={s.user_info__value}>{description}</div>
        </div>
      </div>
    </section>
  );
};

export default CollectionMainInfo;
