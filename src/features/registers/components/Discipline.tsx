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
import { CurriculomResponseProps, FormDiscipline } from '../Registers.types';
import { useCallback, useEffect, useState } from 'react';
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

  const [open, setOpen] = useState(false);
  const [curriculumId, setCurriculumId] = useState<number | null>(null);
  const steps = ['Selecionar Matriz', 'Adicionar Disciplinas'];
  const [formInputs, setFormInputs] = useState<FormDiscipline>([
    {
      name: '',
      teacherId: undefined,
      hours: undefined,
    },
  ]);

  const handleAddRow = () => {
    setFormInputs((prev) => [
      ...prev,
      {
        name: '',
        teacherId: undefined,
        hours: undefined,
      },
    ]);
  };

  const handleDeleteRow = (fieldindex: number) => {
    setFormInputs(formInputs.filter((_, index) => fieldindex !== index));
  };

  const editFieldHandler = useCallback(
    (option: number | string, index: number, key: string) => {
      const obj = [...formInputs];
      const field = obj[index];
      const x = { ...field, [key]: option };
      obj[index] = x;
      setFormInputs(obj);
    },
    [formInputs],
  );

  const {
    isLoading: subjectLoading,
    isSuccess,
    refetch,
    remove,
  } = useApi(
    SUBJECTS_ROUTE + '/SaveAll',
    HttpMethods.POST,
    false,
    formInputs.map((item) => ({
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
      remove();
    }
  }, [isSuccess]);

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color="primary">
          {t('registers.TITLEDISCIPLINES')}
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
          <SchoolIcon color="primary" sx={{ fontSize: '8rem' }} />
          <Typography fontWeight={700} color="primary" variant="h5">
            {t('registers.SUBTITLEDISCIPLINES')}
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
            onSubmit={onSubmit}
            isValid={[
              !!curriculumId,
              formInputs.every(
                ({ hours, name, teacherId }) => name && teacherId && hours,
              ),
            ]}
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
                    value={curriculumId}
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
              <form>
                {formInputs.map((_, index) => (
                  <div key={index}>
                    <FormControl
                      fullWidth
                      sx={{ marginTop: '1rem', display: 'inline-block' }}
                    >
                      <TextField
                        key={'name' + index}
                        label="Nome da Disciplina"
                        onChange={(e) =>
                          editFieldHandler(e.target.value, index, 'name')
                        }
                        sx={{ marginRight: '1rem', width: '20rem' }}
                        defaultValue=""
                        value={formInputs[index].name}
                      />

                      <FormControl disabled={personLoading}>
                        <InputLabel id={`teacher-label-${index}`}>
                          Professor
                        </InputLabel>
                        <Select
                          key={'teacher' + index}
                          labelId={`teacher-label-${index}`}
                          value={formInputs[index].teacherId ?? ''}
                          type="number"
                          label="Professor"
                          onChange={(e) =>
                            editFieldHandler(
                              Number(e.target.value),
                              index,
                              'teacherId',
                            )
                          }
                          sx={{ marginRight: '1rem', width: '15rem' }}
                          defaultValue={0}
                        >
                          {personData?.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        key={'hours' + index}
                        label="Número de Aulas"
                        value={formInputs[index].hours ?? ''}
                        type="number"
                        onChange={(e) =>
                          editFieldHandler(e.target.value, index, 'hours')
                        }
                        sx={{ marginRight: '1rem', width: '11rem' }}
                        defaultValue=""
                        InputProps={{ inputProps: { min: 1 } }}
                      />

                      {formInputs.length > 1 && (
                        <IconButton
                          type="button"
                          sx={{ p: '10px' }}
                          onClick={() => handleDeleteRow(index)}
                          aria-label="search"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      {index === formInputs.length - 1 && (
                        <IconButton
                          type="button"
                          sx={{ p: '10px' }}
                          onClick={handleAddRow}
                          aria-label="search"
                        >
                          <AddCircleIcon />
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
          title={t('registers.SUCCESSTITLEDISCIPLINES')}
          message={t('registers.SUCCESSMESSAGEDISCIPLINES')}
          onClose={() => setOpen(false)}
          redirect="cadastros"
        />
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Registers;
