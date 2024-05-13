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
      { start: '17:10', end: '18:50' },
      { start: '19:00', end: '20:40' },
      { start: '20:50', end: '22:30' }
    ];
  
    classTimes.forEach(classTime => {
      const row: any[] = [];
      row.push(`${classTime.start} - ${classTime.end}`);
  
      daysOfWeek.forEach(day => {
        const scheduleItem = scheduleData?.find(item => {
          const startDateTime = new Date(item.startDateTime);
          const endDateTime = new Date(item.endDateTime);
          const startHour = startDateTime.getHours();
          const startMinutes = startDateTime.getMinutes();
          const endHour = endDateTime.getHours();
          const endMinutes = endDateTime.getMinutes();
  
          return (
            day === daysOfWeek[startDateTime.getDay() - 1] &&
            classTime.start === `${startHour.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}` &&
            classTime.end === `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}` &&
            item.teacherName === teacher
          );
        });
  
        row.push(scheduleItem ? scheduleItem.subjectName : '');
      });
  
      rows.push(row);
    });
  
    return { teacher, rows };
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    const totalColumns = 8;
    
    const tables = generateTables();
    tables.forEach((table, index) => {
      if (index !== 0) {
        doc.addPage();
      }
      doc.text(`Professor(a): ${table.teacher}`, 10, 10);
      
      const cellWidth = doc.internal.pageSize.getWidth() / totalColumns;
      const columnStyles: any = {};
      for (let i = 0; i < totalColumns; i++) {
        columnStyles[i.toString()] = { cellWidth: cellWidth };
      }
      
      autoTable(doc, {
        head: [['Horário', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']],
        body: table.rows,
        startY: 20,
        theme: 'grid',
        styles: { cellPadding: 2, fontSize: 10, cellWidth: 'wrap' },
        columnStyles: columnStyles
      });
    });
  
    doc.save('Horários.pdf');
  };

  return (
    <div>
      <Button variant="contained" onClick={generatePDF} disabled={scheduleData?.length === 0}>
        Exportar para PDF
      </Button>
    </div>
  );
};

export default ExportToPDF;
