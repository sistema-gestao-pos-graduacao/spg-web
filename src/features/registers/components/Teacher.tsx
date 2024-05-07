import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Controller, useForm } from 'react-hook-form';
import { FormTeacher } from '../Registers.types';
import { Box } from '@mui/system';
import CpfMaskedInput from '../../shared/components/CPFMaskedTextField';
import { useEffect, useState } from 'react';
import CustomModal from '../../shared/components/CustomModal';
import { PERSONS_ROUTE } from '../../shared/RoutesURL';
import { HttpMethods } from '../../shared/Shared.consts';
import useApi from '../../shared/useApi';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Registers = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormTeacher>();

  const {
    isLoading: personLoading,
    isSuccess,
    refetch,
    remove,
  } = useApi(PERSONS_ROUTE, HttpMethods.POST, false, {
    ...watch(),
    birthDate: format(
      parse('10/02/1999', 'dd/MM/yyyy', new Date()),
      'yyyy-MM-dd',
      { locale: ptBR },
    ),
    personType: 0,
  });

  const onSubmit = () => {
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      reset();
      remove()
    }
  }, [isSuccess]);

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color="primary">
          {t('registers.TITLETEACHER')}
        </Typography>
      </MainScreen.Title>
      <MainScreen.Content
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          display: 'block',
        }}
      >
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <PersonAddIcon sx={{ color: '#074458', fontSize: '8rem' }} />
          <Typography fontWeight={700} color="primary" variant="h5">
            {t('registers.SUBTITLETEACHER')}
          </Typography>
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ marginTop: '1rem' }}>
              <TextField
                label="Nome *"
                type="text"
                {...register('name', { required: 'Nome is required' })}
                sx={{ marginBottom: '1rem', width: '20rem' }}
                helperText={errors.name?.message}
                error={!!errors.name?.message}
              />

              <TextField
                label="Email *"
                type="text"
                {...register('email', { required: 'Email is required' })}
                sx={{ marginBottom: '1rem', width: '20rem' }}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
              />

              <CpfMaskedInput
                control={control}
                name="cpf"
                label="CPF"
                fullWidth
                style={{ marginBottom: '1rem' }}
              />

              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange, ref } }) => (
                  <DatePicker
                    label="Data de Nascimento"
                    inputRef={ref}
                    format="DD/MM/YYYY"
                    onChange={(date) => {
                      onChange(date?.format('DD/MM/YYYY'));
                    }}
                    sx={{ marginBottom: '1rem' }}
                  />
                )}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  disabled={!isValid}
                  style={{
                    height: '2rem',
                    width: '50%',
                    borderRadius: '1rem',
                    gap: '.5rem',
                  }}
                  type="submit"
                >
                  {personLoading && (
                    <CircularProgress size={'1rem'} color="secondary" />
                  )}
                  <Typography variant="caption">Salvar</Typography>
                </Button>
              </Box>
            </FormControl>
          </form>
        </Grid>

        <CustomModal
          open={open}
          title={t('registers.SUCCESSTITLETEACHER')}
          message={t('registers.SUCCESSMESSAGETEACHER')}
          onClose={() => setOpen(false)}
          redirect="cadastros"
        />
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Registers;
