import { Typography, Grid, InputLabel, Select, MenuItem, TextField, FormControl } from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import ArticleIcon from '@mui/icons-material/Article';
import CustomStep from './Step';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormCurriculum } from '../Registers.types';

const Curriculum = () => {
  const { t } = useTranslation();
  const steps = ['Infos Básicas', 'Adicionar Disciplinas'];

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormCurriculum>({
    defaultValues: {
      specialization: 'Smart Cities',
      curriculum: '',
    },
  });

  const onSubmit: SubmitHandler<FormCurriculum> = (data) => {
    if (data.specialization && data.curriculum) {
      try {
        console.log(data)
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '25rem' }}>
          <FormControl fullWidth sx={{ marginTop: '1rem' }}> 
            <InputLabel id="curriculum-label">Especialização</InputLabel>
            <Select
              labelId="curriculum-label"
              id="curriculum-select"
              {...register('curriculum', { required: 'Especialização é obrigatória' })}
              label="Especialização"
              error={!!errors.specialization?.message}
              sx={{ marginBottom: '1rem' }}
            >
              <MenuItem value={'Automação Residencial'}>Automação Residencial</MenuItem>
              <MenuItem value={'Smart Cities'}>Smart Cities</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Grid>
    </MainScreen.Content>
  </MainScreen.Container>
  );
};

export default Curriculum;
