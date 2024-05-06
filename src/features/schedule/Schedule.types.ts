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

export interface ManualEventsProps {
  title: string;
  id: number;
  items: Partial<EventProps>[];
}
export interface ScheduleTableProps {
  events: EventProps[];
  setEvents: StateAction<EventProps[]>;
  manualEvents: ManualEventsProps[];
  setManualEvents: StateAction<ManualEventsProps[]>;
  externalEvents: Partial<EventProps> | null;
  setExternalEvents: StateAction<Partial<EventProps> | null>;
}
