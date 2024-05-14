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
import { CurriculomResponseProps } from '../Registers.types';
import { useEffect, useState } from 'react';
import CustomModal from '../../shared/components/CustomModal';
import useApi from '../../shared/useApi';
import { CLASSES_ROUTE, CURRICULUM_ROUTE } from '../../shared/RoutesURL';
import { HttpMethods } from '../../shared/Shared.consts';

const Class = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [curriculumId, setCurriculumId] = useState<string>('');

  const {
    isLoading: classLoading,
    isSuccess,
    refetch,
    remove,
  } = useApi(CLASSES_ROUTE, HttpMethods.POST, false, {
    curriculumId: curriculumId,
  });

  const { data: curriculumData, isLoading: curriculumLoading } = useApi<
    CurriculomResponseProps[]
  >(CURRICULUM_ROUTE, HttpMethods.GET);
  console.log('curriculumId: ', curriculumId);

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
          <div onSubmit={() => console.log('qdawd')} style={{ width: '25rem' }}>
            <FormControl
              fullWidth
              sx={{ marginBottom: '1rem' }}
              disabled={curriculumLoading}
            >
              <InputLabel id="curriculum-label">Matriz Curricular</InputLabel>
              <Select
                labelId="curriculum-label"
                id="curriculum-select"
                onChange={({ target }) => setCurriculumId(target.value)}
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

            <FormControl
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                width: '100%',
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  disabled={!curriculumId}
                  style={{
                    height: '2rem',
                    borderRadius: '1rem',
                    gap: '.5rem',
                  }}
                  type="button"
                  onClick={onSubmit}
                >
                  {classLoading && (
                    <CircularProgress size={'1rem'} color="secondary" />
                  )}
                  <Typography variant="caption">Salvar</Typography>
                </Button>
              </Box>
            </FormControl>
          </div>
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

export default Class;
