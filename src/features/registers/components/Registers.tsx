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
    <MainScreen.Content style={{ justifyContent: 'center' }}>
      <RegisterCard 
        icon={ArticleIcon} 
        title={t('registers.CARDTITLEMATRIZ')} 
        description={t('registers.CARDDESCRIPTIONMATRIZ')}
        url='matriz'
      />
      <RegisterCard
        icon={SchoolIcon}
        title={t('registers.CARDTITLEDISCIPLINES')}
        description={t('registers.CARDDESCRIPTIONDISCIPLINES')}
        url='disciplinas'
      />
      <RegisterCard 
        icon={PersonAddIcon}
        title={t('registers.CARDTITLETEACHER')}
        description={t('registers.CARDDESCRIPTIONTEACHER')}
        url='professor'
      />
      <RegisterCard 
        icon={PersonAddIcon}  
        title={t('registers.CARDTITLECLASS')}
        description={t('registers.CARDDESCRIPTIONCLASS')}
        url='turma'
      />
    </MainScreen.Content>
  </MainScreen.Container>
  );
};

export default Registers;
