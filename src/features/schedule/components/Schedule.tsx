import React, { useContext } from 'react';

import { ContextProps } from '../../shared/Shared.types';
import { GlobalContext } from '../../shared/Context';
import { Roles } from '../../shared/Shared.consts';
import ScheduleTeacher from './ScheduleTeacher';
import ScheduleCoordenator from './ScheduleCoordenator';

const Schedule: React.FC = () => {
  const { visionMode } = useContext<ContextProps>(GlobalContext);

  if (visionMode === Roles.TEACHER) return <ScheduleTeacher />;
  return <ScheduleCoordenator />;
};

export default Schedule;
