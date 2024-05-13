import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import useApi from '../../shared/useApi';
import { SCHEDULE_ROUTE } from '../../shared/RoutesURL';
import { ScheduleResponseProps } from '../../shared/Shared.types';
import { HttpMethods } from '../../shared/Shared.consts';

const ExportToPDF: React.FC = () => {

  const {
    data: scheduleData,
    refetch: scheduleRefetch,
  } = useApi<ScheduleResponseProps[]>(
    SCHEDULE_ROUTE,
    HttpMethods.GET,
  );

  useEffect(() => {
    scheduleRefetch();
  }, []);

  const generateTables = () => {
    const teachers = Array.from(new Set(scheduleData?.map(item => item.teacherName)));
    const tables: any[] = [];
  
    teachers.forEach((teacher) => {
      const table = generateTable(teacher);
      tables.push(table);
    });
  
    return tables;
  };
  
  const generateTable = (teacher: string) => {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const rows: any[] = [];
    
    const classTimes = [
      { start: '07:00', end: '08:40' },
      { start: '08:50', end: '10:30' },
      { start: '10:40', end: '12:20' },
      { start: '17:10', end: '18:50' },
      { start: '19:00', end: '20:40' },
      { start: '20:50', end: '22:30' }
    ];
  
    const MINUTES_INTERVAL = 100;
  
    const startDateTime = new Date();
    startDateTime.setHours(0, 0, 0, 0);
  
    const endDateTime = new Date();
    endDateTime.setHours(23, 59, 59, 999);
  
    const durationInMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
    const numIntervals = Math.ceil(durationInMinutes / MINUTES_INTERVAL);
    
    for (let i = 0; i < numIntervals; i++) {
      const currentStartDateTime = new Date(startDateTime.getTime() + i * MINUTES_INTERVAL * 60 * 1000);
      const currentEndDateTime = new Date(currentStartDateTime.getTime() + MINUTES_INTERVAL * 60 * 1000);
    
      const classTimeIndex = Math.floor(i / (MINUTES_INTERVAL / 60));
      const classTime = classTimes[classTimeIndex];
      if (!classTime) continue;
      
      const row: any[] = [];
      row.push(`${classTime.start} - ${classTime.end}`);
    
      daysOfWeek.forEach((_day, index) => {
        const scheduleItem = scheduleData?.find((item) => {
          const startDateTime = new Date(item.startDateTime);
          const endDateTime = new Date(item.endDateTime);
    
          return (
            startDateTime <= currentStartDateTime &&
            endDateTime >= currentEndDateTime &&
            currentStartDateTime.getDay() + 1 === index &&
            item.teacherName === teacher
          );
        });
    
        row.push(scheduleItem ? scheduleItem.subjectName : '');
      });
    
      rows.push(row);
    }
    
    return { teacher, rows };
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
  
    const tables = generateTables();
    tables.forEach((table, index) => {
      if (index !== 0) {
        doc.addPage();
      }
      doc.text(`Professor: ${table.teacher}`, 10, 10);
      autoTable(doc, {
        head: [['Horário', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']],
        body: table.rows,
        startY: 20,
      });
    });
  
    doc.save('Horários.pdf');
  };  

  return (
    <div>
      <Button variant="contained" onClick={generatePDF}>
        Exportar para PDF
      </Button>
    </div>
  );
};

export default ExportToPDF;
