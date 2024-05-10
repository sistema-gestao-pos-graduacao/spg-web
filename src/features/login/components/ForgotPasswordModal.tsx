import {
  Button,
  TextField,
  Typography,
  FormControl,
  Modal,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { StateAction } from '../../shared/Shared.types';
import { ModalPassword } from '../Login.style';
import useApi from '../../shared/useApi';
import { FORGOT_PASSWORD_ROUTE } from '../../shared/RoutesURL';
import { HttpMethods } from '../../shared/Shared.consts';

const ForgotPasswordModal = ({
  passwordModal,
  setPasswordModal,
}: {
  passwordModal: boolean;
  setPasswordModal: StateAction<boolean>;
}) => {
  const { t } = useTranslation();
  const [requestPassword, setRequestPassword] = useState<string>('');

  const { refetch, isLoading, isSuccess, remove } = useApi(
    FORGOT_PASSWORD_ROUTE,
    HttpMethods.POST,
    false,
    {
      email: requestPassword,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      setPasswordModal(false);
      setRequestPassword('');
      remove();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={passwordModal}
      onClose={() => {
        setPasswordModal(false);
        setRequestPassword('');
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalPassword>
        <Typography color="primary" fontWeight={700} fontSize="1.5rem">
          {t('login.FORGOT_PASSWORD')}
        </Typography>
        <div>
          <Typography color="primary" fontSize="1rem">
            {t('login.FORGOT_PASSWORD_DETAILS')}
          </Typography>
          <FormControl fullWidth sx={{ marginTop: '.5rem' }}>
            <TextField
              label="Email"
              onChange={(e) => setRequestPassword(e.target.value)}
              value={requestPassword}
            />
          </FormControl>
        </div>
        <Button
          variant="contained"
          style={{
            height: '2rem',
            width: '40%',
            borderRadius: 20,
            gap: '.5rem',
          }}
          disabled={!requestPassword}
          onClick={() => refetch()}
        >
          {isLoading && <CircularProgress size={'1rem'} color="secondary" />}
          <Typography variant="caption">
            {t('login.FORGOT_PASSWORD')}
          </Typography>
        </Button>
      </ModalPassword>
    </Modal>
  );
};

export default ForgotPasswordModal;
