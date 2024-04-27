import { stringOrDate } from 'react-big-calendar';
import { StateAction, VisionModeType } from '../shared/Shared.types';

export interface EventProps {
  start: stringOrDate;
  end: stringOrDate;
  color: string;
  id?: number;
  title?: string;
  teacher?: string;
  workload?: number;
}

export interface ManualEventsProps {
  title: string;
  items: Partial<EventProps>[];
}
export interface ScheduleTableProps {
  events: EventProps[];
  setEvents: StateAction<EventProps[]>;
  manualEvents: ManualEventsProps[];
  setManualEvents: StateAction<ManualEventsProps[]>;
  externalEvents: Partial<EventProps> | null;
  setExternalEvents: StateAction<Partial<EventProps> | null>;
  visionMode: VisionModeType;
}
