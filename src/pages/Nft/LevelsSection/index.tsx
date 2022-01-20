import { useState, VFC } from 'react';

import { CollapsingSection } from 'components';

import { IconLevels } from 'assets/img';

const LevelsSection: VFC = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <CollapsingSection
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      icon={IconLevels}
      title="Levels"
    >
      levels
    </CollapsingSection>
  );
};

export default LevelsSection;
