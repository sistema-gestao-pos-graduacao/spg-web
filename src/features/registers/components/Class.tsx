import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import { useForm } from 'react-hook-form';
import { CurriculomResponseProps, FormClass } from '../Registers.types';
import { useEffect, useState } from 'react';
import CustomModal from '../../shared/components/CustomModal';
import useApi from '../../shared/useApi';
import {
  COURSES_ROUTE,
  CURRICULUM_ROUTE,
  SUBJECTS_ROUTE,
} from '../../shared/RoutesURL';
import { HttpMethods } from '../../shared/Shared.consts';
import { CoursesResponseProps } from '../../shared/Shared.types';

const Registers = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [curriculumId, setCurriculumId] = useState<number>();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormClass>();

  const watchSpecialization = watch('courseId');

  const {
    isLoading: classLoading,
    isSuccess,
    refetch,
    remove,
  } = useApi(SUBJECTS_ROUTE + '/SaveAll', HttpMethods.POST, false, watch());

  const { data: courseData, isLoading: courseLoading } = useApi<
    CoursesResponseProps[]
  >(COURSES_ROUTE, HttpMethods.GET);

  const { data: curriculumData, isLoading: curriculumLoading } = useApi<
    CurriculomResponseProps[]
  >(CURRICULUM_ROUTE, HttpMethods.GET);

  const onSubmit = () => {
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      reset();
      remove();
    }
  }, [isSuccess]);

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color="primary">
          {t('registers.TITLECLASS')}
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
            {t('registers.SUBTITLECLASS')}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '25rem' }}>
            <FormControl>
              <FormControl
                fullWidth
                sx={{ marginTop: '1rem' }}
                disabled={courseLoading}
              >
                <InputLabel id={`specialization-label`}>
                  Especialização
                </InputLabel>

                <Select
                  labelId={`specialization-label`}
                  id={`specialization-select`}
                  {...register(`courseId`, {
                    required: 'Especialização é obrigatório',
                  })}
                  label="Especialização"
                  error={!!errors.courseId?.message}
                  sx={{ marginBottom: '1rem', width: '20rem' }}
                  defaultValue=""
                  MenuProps={{ PaperProps: { sx: { maxHeight: '10rem' } } }}
                >
                  {courseData?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                sx={{ marginBottom: '1rem' }}
                disabled={curriculumLoading || !watchSpecialization}
              >
                <InputLabel id="curriculum-label">Matriz Curricular</InputLabel>
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
                  {classLoading && (
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
          title={t('registers.SUCCESSTITLECLASS')}
          message={t('registers.SUCCESSMESSAGECLASS')}
          onClose={() => setOpen(false)}
          redirect="cadastros"
        />
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Registers;
