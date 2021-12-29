import { IProperties } from 'hooks';
import { useCallback, useEffect, useState, VFC } from 'react';

import GroupWrapper from '../GroupWrapper';
import Property from './Property';

export interface IPropertiesToBackend {
  [key: string]: Array<string>;
}
interface IProps {
  activePerks: string;
  setActivePerks: React.Dispatch<React.SetStateAction<string>>;
  properties: IProperties;
}

const PropertiesFilter: VFC<IProps> = ({ setActivePerks, properties }) => {
  const [propertiesToBacknend, setPropertiesToBackend] = useState({} as IPropertiesToBackend);

  const [activeProperties, setActiveProperties] = useState<Array<string>>([]);

  const handleToogleProperty = useCallback(
    (name: string) => {
      if (activeProperties.includes(name)) {
        setActiveProperties((prev) => prev.filter((prop) => prop !== name));
      } else {
        setActiveProperties((prev) => [...prev, name]);
      }
    },
    [activeProperties],
  );

  useEffect(() => {
    setActivePerks(JSON.stringify(propertiesToBacknend));
  }, [propertiesToBacknend, setActivePerks]);

  return (
    <>
      {Object.keys(properties).map((propertyName) => (
        <GroupWrapper
          key={propertyName}
          isOpened={activeProperties.includes(propertyName)}
          setIsOpened={() => handleToogleProperty(propertyName)}
          title={propertyName}
        >
          <Property
            propertiesToBacknend={propertiesToBacknend}
            setPropertiesToBackend={setPropertiesToBackend}
            propertyName={propertyName}
            properties={properties[propertyName]}
          />
        </GroupWrapper>
      ))}
    </>
  );
};

export default PropertiesFilter;
