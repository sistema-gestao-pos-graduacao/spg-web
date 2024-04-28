import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 300,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 4,
};

type CustomModalProps = {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    redirect?: string | null;
};

export default function CustomModal({ open, title, message, onClose, redirect = null }: CustomModalProps) {

    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        if (redirect) {
            navigate(`/${redirect}`)
        }
    };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography id="modal-title" variant="h5" color={'#074458'} align='center' sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            <Typography id="modal-message" variant="subtitle1" color={'#074458'} sx={{ mt: 5 }}>
                {message}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant="contained"
                style={{
                    height: '2rem',
                    width: '50%',
                    borderRadius: '1rem',
                    gap: '.5rem',
                }}
                onClick={handleClose}
                >
                <Typography variant="caption">Fechar</Typography>
            </Button>
        </Box>
      </Box>
    </Modal>
  );
}
