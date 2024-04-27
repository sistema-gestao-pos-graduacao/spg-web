import { Typography } from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';

const Registers = () => {
  const { t } = useTranslation();
  return (
    <MainScreen.Container>
    <MainScreen.Title>
      <Typography fontWeight={700} color="primary">
        {t('registers.TITLEPROFESSOR')}
      </Typography>
    </MainScreen.Title>
    <MainScreen.Content style={{ alignContent: 'center', justifyContent: 'center' }}>
      
    </MainScreen.Content>
  </MainScreen.Container>
  );
};

export default Registers;
