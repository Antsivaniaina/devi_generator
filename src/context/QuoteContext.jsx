import { createContext, useContext, useState } from 'react';
import html2pdf from 'html2pdf.js';

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [headers, setHeaders] = useState([
    'Description', 'Nombre', 'Mesure', 'Prix Métallique', 'Prix total Métallique',
    'Prix Aluminium', 'Prix total Aluminium'
  ]);

  const [rows, setRows] = useState([
    { cells: ['Fenêtre salle', '1', '2m x 3m', '100.000 Ar', '100.000 Ar', '150.000 Ar', '150.000 Ar'], image: null }
  ]);

  const [notes, setNotes] = useState('');

  const addRow = () => {
    setRows([...rows, { cells: Array(headers.length).fill(''), image: null }]);
  };

  const deleteRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const addColumn = () => {
    setHeaders([...headers, `Colonne ${headers.length + 1}`]);
    setRows(rows.map(row => ({
      ...row,
      cells: [...row.cells, '']
    })));
  };

  const deleteColumn = () => {
    if (headers.length > 2) {
      setHeaders(headers.slice(0, -1));
      setRows(rows.map(row => ({
        ...row,
        cells: row.cells.slice(0, -1)
      })));
    }
  };

  const updateCell = (type, rowIndex, value, cellIndex) => {
    if (type === 'headers') {
      const newHeaders = [...headers];
      newHeaders[rowIndex] = value;
      setHeaders(newHeaders);
    } else {
      const newRows = [...rows];
      newRows[rowIndex].cells[cellIndex] = value;
      setRows(newRows);
    }
  };

  const updateImage = (rowIndex, imageData) => {
    const newRows = [...rows];
    newRows[rowIndex].image = imageData;
    setRows(newRows);
  };

  const updateNotes = (value) => {
    setNotes(value);
  };

  const exportToPdf = async () => {

    const elem = document.querySelector(".pdfmety");
    const element = elem.cloneNode(true);
    // Apply PDF-specific styling
    element.style.padding = '5px';
    element.style.backgroundColor = 'white';

    // Remove buttons and file inputs from PDF
    element.querySelectorAll('input[type="file"], button').forEach((el) => el.remove());

    // Style the table for PDF
    const table = element.querySelector('table');
    if (table) {
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginBottom = '10px';

      // Style table cells
      table.querySelectorAll('td, th').forEach(cell => {
        cell.style.border = '1px solid #dee2e6';
        cell.style.padding = '12px';
      });

      // Style headers
      table.querySelectorAll('th').forEach(th => {
        th.style.backgroundColor = '#f8f9fa';
        th.style.fontWeight = 'bold';
      });
    }

    // Style notes section
    const notes = element.querySelector('#notes');
    if (notes) {
      notes.style.marginTop = '5px';
      notes.style.padding = '5px';
      notes.style.border = '1px solid #dee2e6';
      notes.style.borderRadius = '4px';
    }
    const generateFileName = () => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      // Tableau des abréviations des mois
      const monthNames = ["JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEP", "OCT", "NOV", "DEC"];
      const month = monthNames[now.getMonth()]; // Obtient le nom du mois correspondant

      return `devie_${day}_${month}_${year}_${hours}H_${minutes}M_${seconds}.pdf`;
    };
    const opt = {
      margin: 5,
      filename: generateFileName(),
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    await html2pdf().set(opt).from(element).save();

  };

  return (
    <QuoteContext.Provider value={{
      headers,
      rows,
      notes,
      addRow,
      deleteRow,
      addColumn,
      deleteColumn,
      updateCell,
      updateImage,
      updateNotes,
      exportToPdf
    }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteContext = () => useContext(QuoteContext);