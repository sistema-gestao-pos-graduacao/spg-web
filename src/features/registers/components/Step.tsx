import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { StepProps } from '../Registers.types';
import { StepFields } from '../Registers.style';
import { CircularProgress, Typography } from '@mui/material';

const CustomStep = ({
  steps,
  step1,
  step2,
  onSubmit,
  isValid,
  isLoading,
}: StepProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '70%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <StepFields>{activeStep === 0 ? step1 : step2}</StepFields>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Voltar
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === steps.length - 1 ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              disabled={!isValid[activeStep]}
              style={{
                height: '2rem',
                borderRadius: '1rem',
                gap: '.5rem',
              }}
              onClick={onSubmit}
            >
              {isLoading && (
                <CircularProgress size={'1rem'} color="secondary" />
              )}
              <Typography variant="caption">Salvar</Typography>
            </Button>
          </Box>
        ) : (
          <Button
            disabled={!isValid[activeStep]}
            onClick={() =>
              setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }
          >
            Próximo
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CustomStep;
