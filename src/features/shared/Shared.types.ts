import { Dispatch, SetStateAction } from 'react';

export type StateAction<T> = Dispatch<SetStateAction<T>>;

export type ModeTypes = 'teacher' | 'coordinator';
