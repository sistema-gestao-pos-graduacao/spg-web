import { stringOrDate } from 'react-big-calendar';
import { StateAction } from '../shared/Shared.types';

export interface EventProps {
  start?: stringOrDate;
  end?: stringOrDate;
  startDateTime?: stringOrDate;
  endDateTime?: stringOrDate;
  color: string;
  id?: string;
  name?: string;
  teacherName?: string;
  teacherId?: number;
  workload?: number;
}

export interface ManualEventsProps extends Omit<EventProps, 'id'> {
  title: string;
  classNumber: number;
  id: number;
}
export interface ScheduleTableProps {
  events: EventProps[];
  setEvents: StateAction<EventProps[]>;
}
export interface ScheduleTableCoordenatorProps extends ScheduleTableProps {
  manualEvents: ManualEventsProps[];
  setManualEvents: StateAction<ManualEventsProps[]>;
  externalEvents: Partial<ManualEventsProps> | null;
  setExternalEvents: StateAction<Partial<ManualEventsProps> | null>;
}
