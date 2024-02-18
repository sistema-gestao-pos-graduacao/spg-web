import { Button, Card, CardActions, CardContent, TextField, Typography, FormControl, Checkbox, FormControlLabel  } from '@mui/material';
import { Themes } from '../../shared/Shared.consts';
import { Link } from 'react-router-dom';
import { LoginCardProps } from '../Login.types';
import { useTranslation } from 'react-i18next';


const LoginCard = ({ setLogged }: LoginCardProps ) => {

  const { t } = useTranslation();

  return (
    <Card sx={{
        width: 450,
        height: 550,
        borderRadius: '20px',
        paddingX: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: `${Themes.light_gray}`
        }}>
      <CardContent sx={{ paddingY: '50px', marginX: 'auto', color: `${Themes.primary}` }}>
        <Typography variant="h4" component="div">
          {t('login.TITLE')}
        </Typography>
        <Typography variant="body2">
          {t('login.SUBTITLE')}
        </Typography>
      </CardContent>
      <CardContent>
        <FormControl sx={{ width: '100%' }}>
            <TextField 
                id="login" 
                label="Login" 
                variant="outlined" 
                fullWidth
                style={{ paddingBottom: 15 }}
            />
            <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth
                autoComplete="current-password"
                style={{ paddingBottom: 10 }}
            />
            <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label={
                  <Typography variant="caption" sx={{ color: `${Themes.primary}` }}>
                    {t('login.TERMS')}
                  </Typography>}
            />
        </FormControl>
      </CardContent>
      <CardActions sx={{ paddingX: '15px', paddingY: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <Button
            variant="contained"
            style={{ height: '2rem', width: '50%', borderRadius: 20 }}
            onClick={() => setLogged(true)}
        >
            <Link to={'/'}>
                <Typography variant="caption">
                  {t('login.LOGINBUTTON')}
                </Typography>
            </Link>
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
  )
}

export default LoginCard