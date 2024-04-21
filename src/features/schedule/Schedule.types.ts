import { stringOrDate } from 'react-big-calendar';

export interface EventProps {
  start: stringOrDate;
  end: stringOrDate;
  title: string;
  color: string;
  teacher: string;
  objectId: string;
}
