import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import CustomStep from './Step';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormDiscipline } from '../Registers.types';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TimePicker } from '@mui/x-date-pickers';
import CustomModal from '../../shared/components/CustomModal';

const Registers = () => {
  const { t } = useTranslation();

  const [rows, setRows] = useState([{}]);
  const [open, setOpen] = useState(false);
  const steps = ['Selecionar Matriz', 'Adicionar Disciplinas'];

  const defaultTeste = 'Smart Cities'

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<FormDiscipline>({
    defaultValues: {
      curriculum: 'Smart Cities',
      disciplines: [{
        discipline: '',
        teacher: '',
        hours: null
      }]
    },
  });

  const onSubmit: SubmitHandler<FormDiscipline> = (data) => {
    try {
      console.log(data);
      reset();
      setOpen(true)
    } catch (error) {
      console.error('Disciplinas Error:', error);
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
          {t('registers.SUBTITLEDISCIPLINAS')}
        </Typography>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CustomStep
        steps={steps}
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {rows.map((_, index) => (
              <div key={index}>
                <FormControl fullWidth sx={{ marginTop: '1rem', display: 'inline-block' }}> 
                  <TextField
                    id={`discipline-input-${index}`}
                    label="Nome da Disciplina"
                    {...register(`disciplines.${index}.discipline`, { required: 'Disciplinas é obrigatório' })}
                    error={!!errors.disciplines?.[index]?.discipline?.message}
                    sx={{ marginRight: '1rem', width: '20rem' }}
                  />

                  <FormControl>
                    <InputLabel id={`teacher-label-${index}`}>Professor</InputLabel>
                    <Select
                      labelId={`teacher-label-${index}`}
                      id={`teacher-select-${index}`}
                      {...register(`disciplines.${index}.teacher`, { required: 'Professor é obrigatório' })}
                      label="Professor"
                      error={!!errors.disciplines?.[index]?.teacher?.message}
                      sx={{ marginRight: '1rem', width: '15rem' }}
                      defaultValue='Renata'
                    >
                      <MenuItem value={'Renata'}>Renata</MenuItem>
                      <MenuItem value={'Luiz'}>Luiz</MenuItem>
                    </Select>
                  </FormControl>

                  <Controller
                    control={control}
                    name={`disciplines.${index}.hours`}
                    render={({ field: { onChange,  ref } }) => (
                      <TimePicker
                        label="Horas Aula"
                        inputRef={ref}
                        onChange={(hours) => {
                            onChange( hours?.hour() );
                        }}
                        format='HH'
                        sx={{ marginBottom: '1rem', width: '9rem' }}
                        ampm={false}
                      />
                    )}
                  />

                  {index === rows.length - 1 ? (
                    <IconButton type="button" sx={{ p: '10px' }} onClick={handleAddRow} aria-label="search">
                      <AddCircleIcon />
                    </IconButton>
                    ) : (
                    <IconButton type="button" sx={{ p: '10px' }} onClick={() => handleDeleteRow(index)} aria-label="search">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </FormControl>
              </div>
            ))}
          </form>
        }
      />
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

export default Registers;
