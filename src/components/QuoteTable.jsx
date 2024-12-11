import { motion } from 'framer-motion';
import { useQuoteContext } from '../context/QuoteContext';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditableCell from './EditableCell';
import ImageCell from './ImageCell';

const QuoteTable = () => {
  const { headers, rows, updateCell } = useQuoteContext();

  return (
    <TableContainer component={Paper} className="mt-6 ">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} align="center" className="font-semibold" style={{
                border: '1px solid #767676',
                padding: '8px',
                backgroundColor: 'white',
                fontWeight: 'bold',
              }}>
                <EditableCell
                  value={header}
                  onChange={(value) => updateCell('headers', index, value)}
                />
              </TableCell>
            ))}
            <TableCell align="center" style={{ border: '1px solid #767676' }}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <motion.tr
              key={rowIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {row.cells.map((cell, cellIndex) => (
                <TableCell key={cellIndex} align="center" style={{
                  border: '1px solid #767676',
                  padding: '8px',
                  backgroundColor: 'white'
                }}>
                  <EditableCell
                    value={cell}
                    onChange={(value) => updateCell('rows', rowIndex, value, cellIndex)}
                  />
                </TableCell>
              ))}
              <TableCell style={{
                border: '1px solid #767676',
                padding: '8px',
                backgroundColor: 'white'
              }}>
                <ImageCell rowIndex={rowIndex} />
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
};

export default QuoteTable;