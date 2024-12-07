import { motion } from 'framer-motion';
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NoteIcon from '@mui/icons-material/Note';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useQuoteContext } from '../context/QuoteContext';

const ActionButtons = ({ onToggleNotes }) => {
  const { addRow, deleteRow, addColumn, deleteColumn, exportToPdf } = useQuoteContext();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      className="mb-6"
    >
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addRow}
          className="w-full sm:w-auto"
        >
          Ajouter Ligne
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RemoveIcon />}
          onClick={deleteRow}
          className="w-full sm:w-auto"
        >
          Supprimer Ligne
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addColumn}
          className="w-full sm:w-auto"
        >
          Ajouter Colonne
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RemoveIcon />}
          onClick={deleteColumn}
          className="w-full sm:w-auto"
        >
          Supprimer Colonne
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="outlined"
          startIcon={<NoteIcon />}
          onClick={onToggleNotes}
          className="w-full sm:w-auto"
        >
          Notes
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdfIcon />}
          onClick={exportToPdf}
          className="w-full sm:w-auto"
        >
          Exporter PDF
        </Button>
      </motion.div>
    </Stack>
  );
};

export default ActionButtons;