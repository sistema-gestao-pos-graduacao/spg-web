import { Typography, Grid, InputLabel, Select, MenuItem, TextField, FormControl, Button, CircularProgress } from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import ArticleIcon from '@mui/icons-material/Article';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormCurriculum } from '../Registers.types';
import { Box } from '@mui/system';
import CustomModal from '../../shared/components/CustomModal';
import { useState } from 'react';

const Curriculum = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isLoading },
  } = useForm<FormCurriculum>({
    defaultValues: {
      specialization: 'Smart Cities',
      curriculum: ''
    },
  });

  const onSubmit: SubmitHandler<FormCurriculum> = (data) => {
    if (isValid) {
      try {
        console.log(data);
        reset();
        setOpen(true)
      } catch (error) {
        console.error('Matriz error:', error);
      }
    }
  };

  return (
    <MainScreen.Container>
    <MainScreen.Title>
      <Typography fontWeight={700} color="primary">
        {t('registers.TITLEMATRIZ')}
      </Typography>
    </MainScreen.Title>
    <MainScreen.Content style={{ justifyContent: 'center', alignContent: 'center', display: 'block' }}>
      <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <ArticleIcon sx={{color: '#074458', fontSize: '8rem' }}/>
        <Typography fontWeight={700} color="primary" variant='h5'>
          {t('registers.SUBTITLEMATRIZ')}
        </Typography>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ marginTop: '1rem' }}>

          <FormControl>
            <InputLabel id={`specialization-label`}>Especialização</InputLabel>
            <Select
              labelId={`specialization-label`}
              id={`specialization-select`}
              {...register(`specialization`, { required: 'Especialização é obrigatório' })}
              label="Especialização"
              error={!!errors.specialization?.message}
              sx={{ marginBottom: '1rem', width: '20rem' }}
              defaultValue='Smart Cities'
            >
              <MenuItem value={'Smart Cities'}>Smart Cities</MenuItem>
              <MenuItem value={'Smart Factory'}>Smart Factory</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Nome da Matriz"
            type="text"
            {...register('curriculum', { required: 'Nome da Matriz is required' })}
            sx={{ marginBottom: '1rem', width: '20rem' }}
            helperText={errors.curriculum?.message}
            error={!!errors.curriculum?.message}
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
              {isLoading && <CircularProgress size={'1rem'} color="secondary" />}
              <Typography variant="caption">Salvar</Typography>
            </Button>
          </Box>

          </FormControl>
        </form>
      </Grid>

      <CustomModal 
        open={open}
        title={t('registers.SUCCESSTITLE')}
        message={t('registers.SUCCESSMESSAGE')}
        onClose={() => setOpen(false)}
        redirect='cadastros'
      />
    </MainScreen.Content>
  </MainScreen.Container>
  );
};

export default Curriculum;
