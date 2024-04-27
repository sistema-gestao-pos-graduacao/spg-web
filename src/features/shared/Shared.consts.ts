export const Themes = {
  primary: '#074458',
  medium_primary: '#074458AB',
  light_primary: 'rgba(7, 68, 88, 0.26)',
  white: '#FFFFFF',
  gray: '#C2BEBE',
  light_gray: '#E4E4E4',
  error: '#AD0000',
};

export const DefaultError = {
  isError: false,
  errorMessage: '',
};

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Roles {
  ADMIN = 'Admin',
  TEACHER = 'Teacher',
  COORDINATOR = 'Coordinator',
}
