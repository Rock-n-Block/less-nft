import { useState, VFC } from 'react';

import { CollapsingSection } from 'components';

import { IconStats } from 'assets/img';

const StatsSection: VFC = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <CollapsingSection isOpened={isOpened} setIsOpened={setIsOpened} icon={IconStats} title="Stats">
      stats
    </CollapsingSection>
  );
};

export default StatsSection;
