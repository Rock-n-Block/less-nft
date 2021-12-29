import { useCallback, VFC } from 'react';
import { Checkbox } from 'components';

import s from './Property.module.scss';

import { IProperty, IPropertiesToBackend } from '../index';

// propertyName: "Eyes"
// properties: { blue: 1, white: 10 },

interface IProps {
  properties: IProperty;
  propertyName: string;
  propertiesToBacknend: IPropertiesToBackend;
  setPropertiesToBackend: React.Dispatch<React.SetStateAction<IPropertiesToBackend>>;
}

const Property: VFC<IProps> = ({
  properties,
  propertyName,
  propertiesToBacknend,
  setPropertiesToBackend,
}) => {
  const handleTooglePropety = useCallback(
    (prop: string, mainPropertyTitle: string) => {
      // delete propety
      const currentPropsToBackend = propertiesToBacknend[mainPropertyTitle] || [];

      if (currentPropsToBackend.includes(prop)) {
        const newPropsToBackend = {
          ...propertiesToBacknend,
          [mainPropertyTitle]: currentPropsToBackend.filter((el) => el !== prop),
        };
        setPropertiesToBackend(newPropsToBackend);
        //   add propety
      } else {
        const newPropsToBackend = {
          ...propertiesToBacknend,
          [mainPropertyTitle]: [...currentPropsToBackend, prop],
        };
        setPropertiesToBackend(newPropsToBackend);
      }
    },
    [propertiesToBacknend, setPropertiesToBackend],
  );
  return (
    <div className={s.content}>
      {Object.keys(properties).map((prop) => {
        const isCheckBoxActive = propertiesToBacknend[propertyName]?.includes(prop);
        return (
          <div key={`${prop}-${propertyName}`} className={s.item}>
            <Checkbox
              value={isCheckBoxActive}
              content={prop}
              id={`${prop}-${propertyName}`}
              onChange={() => handleTooglePropety(prop, propertyName)}
            />
            <div className={s.count}>{properties[prop]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Property;
