import { Typography } from '@mui/material';
import RegisterCard from './RegisterCard';

import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';

const Registers = () => {
  const { t } = useTranslation();
  return (
    <MainScreen.Container>
    <MainScreen.Title>
      <Typography fontWeight={700} color="primary">
        {t('registers.TITLE')}
      </Typography>
    </MainScreen.Title>
    <MainScreen.Content style={{ alignContent: 'center', justifyContent: 'center' }}>
      <RegisterCard 
        icon={ArticleIcon} 
        title={t('registers.CARDTITLE1')} 
        description={t('registers.CARDDESCRIPTION1')}
        url='matriz'
        />
      <RegisterCard
        icon={SchoolIcon}
        title={t('registers.CARDTITLE2')}
        description={t('registers.CARDDESCRIPTION2')}
        url='disciplinas'
        />
      <RegisterCard 
        icon={PersonAddIcon}
        title={t('registers.CARDTITLE3')}
        description={t('registers.CARDDESCRIPTION3')}
        url='professor'
        />
    </MainScreen.Content>
  </MainScreen.Container>
  );
};

export default Registers;
