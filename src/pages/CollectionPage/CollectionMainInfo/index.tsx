import React, { useCallback, useState } from 'react';
import { H2, Copyable, Text, Uploader } from 'components';

import { sliceString } from 'utils';
import { iconEdit, profile_avatar_example, profile_page_bg_example } from 'assets/img';
import { zeroAddress } from 'appConstants';

import s from './CollectionMainInfo.module.scss';
import { TNullable } from 'typings';
import { useMst } from 'store';
import { storeApi } from 'services';
import { toast } from 'react-toastify';

interface ICollectionMainInfo {
  cover?: string;
  avatar?: string;
  name?: string;
  address?: string;
  description: TNullable<string>;
  creator: string | number;
  id: string | number;
}

const CollectionMainInfo: React.FC<ICollectionMainInfo> = ({
  cover,
  avatar,
  name,
  address,
  description,
  creator,
  id,
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
    <section
      className={s.user}
      style={{
        backgroundImage: `url(${collectionCover || cover || profile_page_bg_example})`,
      }}
    >
      <div className={s.inner}>
        <div className={s.user_avatar}>
          <img src={avatar || profile_avatar_example} alt="profile_avatar_example" />
        </div>
        <H2 color="white" className={s.user_name}>
          {name}
        </H2>
        <div className={s.user_info}>
          {address && (
            <Copyable
              valueToCopy={address || zeroAddress}
              classNameIcon={s.user_info__icon}
              withIcon
              title="Address"
            >
              <Text color="white" size="m">
                {sliceString(address || zeroAddress)}
              </Text>
            </Copyable>
          )}
        </div>
        <div className={s.user_buttons}>
          {user.address && isSelf && (
            <>
              <Uploader
                isImgOnly
                isButton
                handleUpload={handleFileUpload}
                isLoading={isFileLoading}
              >
                <div className={s.user_button}>
                  <img src={iconEdit} alt="" />
                  <Text tag="span" color="white" weight="medium">
                    Edit Banner
                  </Text>
                </div>
              </Uploader>
            </>
          )}
        </div>
        <div className={s.user_info}>
          <div className={s.user_info__value}>{description}</div>
        </div>
      </div>
    </section>
  );
};

export default CollectionMainInfo;
