import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  FormControl,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useMutation } from 'react-query';
import { Themes } from '../../shared/Shared.consts';
import { Link, useNavigate } from 'react-router-dom';
import { FormValues, LoginCardProps } from '../Login.types';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

const LoginCard = ({ setLogged }: LoginCardProps) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate: loginMutation, isLoading: isLoadingLogin } = useMutation(() =>
    fetch('https://app-i575ajhit22gu.azurewebsites.net/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: watch('username'),
        password: btoa(watch('password')),
      }),
    }).then((res) => {
      setLogged(res.ok);
      navigate('/');
    }),
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.username && data.password) {
      try {
        loginMutation();
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          width: '27rem',
          height: '35rem',
          paddingX: '1rem',
          borderRadius: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: `${Themes.light_gray}`,
          marginRight: '2.5rem',
        }}
      >
        <CardContent
          sx={{ paddingY: '50px', marginX: 'auto', color: `${Themes.primary}` }}
        >
          <Typography variant="h4" component="div">
            {t('login.TITLE')}
          </Typography>
          <Typography variant="body2">{t('login.SUBTITLE')}</Typography>
        </CardContent>
        <CardContent>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              label="Username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              style={{ paddingBottom: 10 }}
              helperText={errors.username?.message}
              error={!!errors.username?.message}
            />
            <TextField
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              autoComplete="current-password"
              style={{ paddingBottom: 10 }}
              helperText={errors.password?.message}
              error={!!errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <Typography
                  variant="caption"
                  sx={{ color: `${Themes.primary}` }}
                >
                  {t('login.TERMS')}
                </Typography>
              }
            />
          </FormControl>
        </CardContent>
        <CardActions
          sx={{
            paddingX: '15px',
            paddingY: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            style={{
              height: '2rem',
              width: '50%',
              borderRadius: '1rem',
              gap: '.5rem',
            }}
            type="submit"
          >
            {isLoadingLogin && (
              <CircularProgress size={'1rem'} color="secondary" />
            )}
            <Typography variant="caption">{t('login.LOGINBUTTON')}</Typography>
          </Button>
          <Button
            variant="contained"
            style={{ height: '2rem', width: '50%', borderRadius: 20 }}
            disabled={isLoadingLogin}
            onClick={() => setLogged(true)}
          >
            <Link to={'/'}>
              <Typography variant="caption">
                {t('login.FORGOTBUTTON')}
              </Typography>
            </Link>
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default LoginCard;
