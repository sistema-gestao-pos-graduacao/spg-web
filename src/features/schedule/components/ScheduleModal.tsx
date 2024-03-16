import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { EventProps } from '../Schedule.types';
import { StateAction } from '../../shared/Shared.types';
import { Modal as S } from '../Schedule.style';
import { Themes } from '../../shared/Shared.consts';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ScheduleModal: React.FC<{
  setOpen: StateAction<boolean>;
  open: boolean;
  currentEvent: EventProps;
}> = ({ setOpen, open, currentEvent }) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:focus': {
          border: 'unset',
        },
      }}
    >
      <Box
        sx={{
          width: '30rem',
          height: 'auto',
          bgcolor: '#FFFFFF',
          borderRadius: '1rem',
          boxShadow: 24,
          overflow: 'hidden',
        }}
      >
        <S.Header $backgrounColor={currentEvent?.color ?? Themes.primary}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {currentEvent?.title}
          </Typography>
        </S.Header>
        <S.Content>
          <span>
            <S.field>
              <Typography fontWeight={700}>{t('schedule.TEACHER')}</Typography>
              <Typography>{currentEvent?.teacher}</Typography>
            </S.field>
            <S.field>
              <Typography fontWeight={700}>{t('schedule.TIME')}</Typography>
              <Typography sx={{ textTransform: 'capitalize' }}>
                {`${format(currentEvent?.start || new Date(), 'EEEE', { locale: ptBR })}
                 (${format(currentEvent?.start || new Date(), 'HH:mm')}
                 - ${format(currentEvent?.end || new Date(), 'HH:mm')})
                 `}
              </Typography>
            </S.field>
          </span>
          <Button
            style={{ borderRadius: '1.5rem', width: 'auto' }}
            size="small"
            variant="contained"
          >
            {t('schedule.CLASS_DETAILS')}
          </Button>
        </S.Content>
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
