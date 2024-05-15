import React from 'react';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ScheduleResponseProps } from '../../shared/Shared.types';

type ExportToPDFProps = {
  scheduleData: ScheduleResponseProps[];
};

const ExportToPDF: React.FC<ExportToPDFProps> = ({ scheduleData }) => {
  const generateTables = () => {
    const teachers = Array.from(
      new Set(scheduleData?.map((item) => item.teacherName)),
    );
    const tables: any[] = [];

    teachers.forEach((teacher) => {
      const table = generateTable(teacher);
      tables.push(table);
    });

    return tables;
  };

  const generateTable = (teacher: string) => {
    const daysOfWeek = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    const rows: any[] = [];

    const classTimes = [
      { start: '17:10', end: '18:50' },
      { start: '19:00', end: '20:40' },
      { start: '20:50', end: '22:30' },
    ];

    classTimes.forEach((classTime) => {
      const row: any[] = [];
      row.push(`${classTime.start} - ${classTime.end}`);

      daysOfWeek.forEach((day) => {
        const scheduleItem = scheduleData?.find((item) => {
          const startDateTime = new Date(item.startDateTime);
          const endDateTime = new Date(item.endDateTime);
          const startHour = startDateTime.getHours();
          const startMinutes = startDateTime.getMinutes();
          const endHour = endDateTime.getHours();
          const endMinutes = endDateTime.getMinutes();

          return (
            day === daysOfWeek[startDateTime.getDay() - 1] &&
            classTime.start ===
              `${startHour.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}` &&
            classTime.end ===
              `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}` &&
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

      const firstColumnWidth = doc.getTextWidth('Horário');
      const cellWidth =
        (doc.internal.pageSize.getWidth() - firstColumnWidth) /
        (totalColumns - 1);
      const columnStyles: any = {};

      columnStyles['0'] = { cellWidth: 'auto' };

      for (let i = 1; i < totalColumns; i++) {
        columnStyles[i.toString()] = { cellWidth: cellWidth };
      }

      autoTable(doc, {
        head: [
          [
            'Horário',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
          ],
        ],
        body: table.rows,
        startY: 20,
        theme: 'grid',
        styles: { cellPadding: 2, fontSize: 9, cellWidth: 'wrap' },
        columnStyles: columnStyles,
      });
    });

    doc.save('Horários.pdf');
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={generatePDF}
        disabled={scheduleData?.length === 0}
        style={{ borderRadius: '1.5rem' }}
      >
        Exportar PDF
      </Button>
    </div>
  );
};

export default ExportToPDF;
