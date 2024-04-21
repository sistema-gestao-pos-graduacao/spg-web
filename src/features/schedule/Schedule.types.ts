import { stringOrDate } from 'react-big-calendar';

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
