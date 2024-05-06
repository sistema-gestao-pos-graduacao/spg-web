import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import CustomStep from './Step';
import { useForm } from 'react-hook-form';
import { CurriculomResponseProps, FormDiscipline } from '../Registers.types';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomModal from '../../shared/components/CustomModal';
import useApi from '../../shared/useApi';
import {
  CURRICULUM_ROUTE,
  PERSONS_ROUTE,
  SUBJECTS_ROUTE,
} from '../../shared/RoutesURL';
import { HttpMethods } from '../../shared/Shared.consts';
import { PersonResponseProps } from '../../shared/Shared.types';

const Registers = () => {
  const { t } = useTranslation();

  const [rows, setRows] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [curriculumId, setCurriculumId] = useState<number>();
  const steps = ['Selecionar Matriz', 'Adicionar Disciplinas'];

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormDiscipline>();

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const {
    isLoading: subjectLoading,
    isSuccess,
    refetch,
  } = useApi(
    SUBJECTS_ROUTE + '/SaveAll',
    HttpMethods.POST,
    false,
    Object.values(watch()).map((item) => ({
      ...item,
      curriculumId,
      hours: Number(item.hours),
    })),
  );

  const { data: curriculumData, isLoading: curriculumLoading } = useApi<
    CurriculomResponseProps[]
  >(CURRICULUM_ROUTE, HttpMethods.GET);

  const { data: personData, isLoading: personLoading } = useApi<
    PersonResponseProps[]
  >(`${PERSONS_ROUTE}?personType=Teacher`, HttpMethods.GET);

  const onSubmit = () => {
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      reset();
    }
  }, [isSuccess]);

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color="primary">
          {t('registers.TITLEDISCIPLINAS')}
        </Typography>
      </MainScreen.Title>
      <MainScreen.Content
        style={{
          justifyContent: 'center',
          alignContent: 'center',
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
          <SchoolIcon sx={{ color: '#074458', fontSize: '8rem' }} />
          <Typography fontWeight={700} color="primary" variant="h5">
            {t('registers.SUBTITLEDISCIPLINAS')}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomStep
            steps={steps}
            isLoading={subjectLoading}
            onSubmit={handleSubmit(onSubmit)}
            isValid={[!!curriculumId, isValid]}
            step1={
              <form style={{ minWidth: '25rem' }}>
                <FormControl
                  fullWidth
                  sx={{ marginTop: '1rem' }}
                  disabled={curriculumLoading}
                >
                  <InputLabel id="curriculum-label">
                    Matriz Curricular
                  </InputLabel>
                  <Select
                    labelId="curriculum-label"
                    id="curriculum-select"
                    onChange={({ target }) =>
                      setCurriculumId(Number(target.value))
                    }
                    label="Matriz Curricular"
                    defaultValue={''}
                    MenuProps={{ PaperProps: { sx: { maxHeight: '10rem' } } }}
                  >
                    {curriculumData?.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            }
            step2={
              <form onSubmit={handleSubmit(onSubmit)}>
                {rows.map((_, index) => (
                  <div key={index}>
                    <FormControl
                      fullWidth
                      sx={{ marginTop: '1rem', display: 'inline-block' }}
                    >
                      <TextField
                        label="Nome da Disciplina"
                        {...register(`${index}.name`, {
                          required: 'Disciplinas é obrigatório',
                        })}
                        error={!!errors[index]?.name?.message}
                        sx={{ marginRight: '1rem', width: '20rem' }}
                        defaultValue=""
                      />

                      <FormControl disabled={personLoading}>
                        <InputLabel id={`teacher-label-${index}`}>
                          Professor
                        </InputLabel>
                        <Select
                          labelId={`teacher-label-${index}`}
                          {...register(`${index}.teacherId`, {
                            required: 'Professor é obrigatório',
                          })}
                          label="Professor"
                          error={!!errors[index]?.teacherId?.message}
                          sx={{ marginRight: '1rem', width: '15rem' }}
                          defaultValue=""
                        >
                          {personData?.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        label="Horas de Aula"
                        {...register(`${index}.hours`, {
                          required: 'Horas é obrigatório',
                        })}
                        error={!!errors[index]?.hours?.message}
                        sx={{ marginRight: '1rem', width: '10rem' }}
                        defaultValue=""
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                      />

                      {index === rows.length - 1 && (
                        <>
                          {rows.length > 1 && (
                            <IconButton
                              type="button"
                              sx={{ p: '10px' }}
                              onClick={() => handleDeleteRow(index)}
                              aria-label="search"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                          <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            onClick={handleAddRow}
                            aria-label="search"
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </>
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
          redirect="cadastros"
        />
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Registers;
