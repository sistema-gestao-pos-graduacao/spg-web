import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { AccordionContent } from '../Shared.style';

const AccordionComponent: React.FC<{
  label: string;
  listItens: React.ReactElement;
}> = ({ label, listItens }) => {
  return (
    <AccordionContent>
      <Accordion sx={{ p: 0, m: 0, boxShadow: 'none', minHeight: 'unset' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ p: 0, m: 0, boxShadow: 'none', minHeight: 'unset' }}
        >
          <Typography fontWeight={700}>{label}</Typography>
        </AccordionSummary>
        {listItens}
      </Accordion>
    </AccordionContent>
  );
};

export default AccordionComponent;
