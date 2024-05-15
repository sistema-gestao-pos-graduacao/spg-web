export const CalendarTranlates = {
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Dia Todo',
  week: 'Semana',
  work_week: 'Eventos',
  day: 'Dia',
  month: 'Mês',
  previous: 'Anterior',
  next: 'Próximo',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
  today: 'Hoje',
  agenda: 'Aulas',
  noEventsInRange: 'Não há eventos no período.',
};

export const NightHour = 19;

export const StarDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
  NightHour,
);
export const EndDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
  23,
);
