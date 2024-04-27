import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import CustomStep from './Step';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormDiscipline } from '../Registers.types';

const Registers = () => {
  const { t } = useTranslation();

  const steps = ['Selecionar Matriz', 'Adicionar Disciplinas'];

  const defaultTeste = 'Smart Cities'

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormDiscipline>({
    defaultValues: {
      curriculum: 'Smart Cities',
      discipline: '',
      teacher: '',
      hours: 0
    },
  });

  const onSubmit: SubmitHandler<FormDiscipline> = (data) => {
    if (data.curriculum && data.hours) {
      try {
        console.log(data)
      } catch (error) {
        console.error('Disciplinas Error:', error);
      }
    }
  };

  return (
    <MainScreen.Container>
    <MainScreen.Title>
      <Typography fontWeight={700} color="primary">
        {t('registers.TITLEDISCIPLINAS')}
      </Typography>
    </MainScreen.Title>
    <MainScreen.Content style={{ justifyContent: 'center', alignContent: 'center', display: 'block' }}>
      <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <SchoolIcon sx={{color: '#074458', fontSize: '8rem' }}/>
        <Typography fontWeight={700} color="primary" variant='h5'>
          {t('registers.SUBTITLEMATRIZ')}
        </Typography>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CustomStep
        steps={steps} 
        errors={errors}
        step1={
          <form style={{ minWidth: '25rem' }}>
            <FormControl fullWidth sx={{ marginTop: '1rem' }}> 
              <InputLabel id="curriculum-label">Matriz Curricular</InputLabel>
              <Select
                labelId="curriculum-label"
                id="curriculum-select"
                {...register('curriculum', { required: 'Matriz Curricular é obrigatória' })}
                label="Matriz Curricular"
                error={!!errors.curriculum?.message}
                defaultValue={defaultTeste}
              >
                <MenuItem value={'Automação Residencial'}>Automação Residencial</MenuItem>
                <MenuItem value={'Smart Cities'}>Smart Cities</MenuItem>
              </Select>
            </FormControl>
          </form>
        }
        step2={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ marginTop: '1rem', display: 'inline-block' }}> 
              <TextField
                id="discipline-input"
                label="Nome da Disciplina"
                {...register('discipline', { required: 'Disciplinas é obrigatório' })}
                error={!!errors.discipline?.message}
                sx={{ marginRight: '1rem', width: '20rem' }}
              />

              <FormControl>
                <InputLabel id="teacher-label">Professor</InputLabel>
                <Select
                  labelId="teacher-label"
                  id="teacher-select"
                  {...register('teacher', { required: 'Professor é obrigatório' })}
                  label="Especialização"
                  error={!!errors.teacher?.message}
                  sx={{ marginRight: '1rem', width: '15rem' }}
                >
                  <MenuItem value={'Renata'}>Renata</MenuItem>
                  <MenuItem value={'Luiz'}>Luiz</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="hours-input"
                label="Horas"
                type="number"
                {...register('hours', { required: 'Campo Horas é obrigatório' })}
                error={!!errors.hours?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: '5rem' }}
              />
            </FormControl>
          </form>
        </>
        }
      />
      </Grid>
    </MainScreen.Content>
  </MainScreen.Container>
  );
};

export default Registers;
