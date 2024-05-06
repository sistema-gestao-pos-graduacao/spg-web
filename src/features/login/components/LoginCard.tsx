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
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { HttpMethods, Themes } from '../../shared/Shared.consts';
import { Link, useNavigate } from 'react-router-dom';
import { FormValues, LoginCardProps } from '../Login.types';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { CONTEXT_ROUTE, LOGIN_ROUTE } from '../../shared/RoutesURL';
import useApi from '../../shared/useApi';
import { ContextProps, ContextResponseProps } from '../../shared/Shared.types';
import { GlobalContext } from '../../shared/Context';

const LoginCard = ({ setLogged }: LoginCardProps) => {
  const navigate = useNavigate();
  const { setUserLogged } = useContext<ContextProps>(GlobalContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: 'mestre',
      password: 'Pucmin@s1234',
    },
  });

  const { isLoading, isSuccess, refetch } = useApi(
    LOGIN_ROUTE,
    HttpMethods.POST,
    false,
    {
      username: watch('username'),
      password: btoa(watch('password')),
    },
  );

  const {
    data,
    isLoading: contextLoading,
    isSuccess: contextSuccess,
    refetch: contextRefetch,
  } = useApi<ContextResponseProps>(CONTEXT_ROUTE, HttpMethods.GET, false);

  useEffect(() => {
    if (isSuccess && data && contextSuccess) {
      setUserLogged(data);
      setLogged(true);
      navigate('/');
    }
  }, [contextSuccess]);

  useEffect(() => {
    if (isSuccess) contextRefetch();
  }, [isSuccess]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.username && data.password) {
      refetch();
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
          </FormControl>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password?.message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
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
            <span>{}</span>
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
            {(isLoading || contextLoading) && (
              <CircularProgress size={'1rem'} color="secondary" />
            )}
            <Typography variant="caption">{t('login.LOGINBUTTON')}</Typography>
          </Button>
          <Button
            variant="contained"
            style={{ height: '2rem', width: '50%', borderRadius: 20 }}
            disabled={isLoading}
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
