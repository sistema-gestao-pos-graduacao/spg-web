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
import { Themes } from '../../shared/Shared.consts';
import { Link, useNavigate } from 'react-router-dom';
import { FormValues, LoginCardProps } from '../Login.types';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

const LoginCard = ({ setLogged }: LoginCardProps) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.login || data.password) {
      setLogged(true);
      navigate('/');
    }
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          width: 450,
          height: 550,
          borderRadius: '20px',
          paddingX: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: `${Themes.light_gray}`,
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
              label="Login"
              type="text"
              {...register('login', { required: 'Login is required' })}
              style={{ paddingBottom: 10 }}
              helperText={errors.login?.message}
              error={!!errors.login?.message}
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
            style={{ height: '2rem', width: '50%', borderRadius: 20 }}
            type="submit"
          >
            <Typography variant="caption">{t('login.LOGINBUTTON')}</Typography>
          </Button>
          <Button
            variant="contained"
            style={{ height: '2rem', width: '50%', borderRadius: 20 }}
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
