import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import PtBr from './PtBr';

i18n.use(initReactI18next).init({
  resources: {
    ptBr: PtBr,
  },
  fallbackLng: 'ptBr',
});

export default i18n;
