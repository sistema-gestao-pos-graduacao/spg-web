import { StateAction } from '../shared/Shared.types';

export type LoginCardProps = {
    setLogged: StateAction<boolean>
}

export type FormValues = {
    login: string
    password: string
  }