import { Typography } from '@mui/material';
import RegisterCard from './RegisterCard';

import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import { RegisterContent } from '../Registers.style';

const Registers = () => {
  const { t } = useTranslation();
  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color="primary">
          {t('registers.TITLE')}
        </Typography>
      </MainScreen.Title>
      <MainScreen.Content
        style={{ justifyContent: 'center', alignContent: 'center' }}
      >
        <RegisterContent>
          <RegisterCard
            icon={ArticleIcon}
            title={t('registers.CARDTITLEMATRIZ')}
            description={t('registers.CARDDESCRIPTIONMATRIZ')}
            url="matriz"
          />
          <RegisterCard
            icon={GroupAddIcon}
            title={t('registers.CARDTITLECLASS')}
            description={t('registers.CARDDESCRIPTIONCLASS')}
            url="turma"
          />
          <RegisterCard
            icon={PersonAddIcon}
            title={t('registers.CARDTITLETEACHER')}
            description={t('registers.CARDDESCRIPTIONTEACHER')}
            url="professor"
          />
          <RegisterCard
            icon={SchoolIcon}
            title={t('registers.CARDTITLEDISCIPLINES')}
            description={t('registers.CARDDESCRIPTIONDISCIPLINES')}
            url="disciplinas"
          />
        </RegisterContent>
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Registers;
