import { motion } from 'framer-motion';
import { Paper, TextField, Typography } from '@mui/material';
import { useQuoteContext } from '../context/QuoteContext';

const Notes = () => {
  const { notes, updateNotes } = useQuoteContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Paper className="mt-6 p-4 notes">
        <TextField
          multiline
          rows={1}
          fullWidth
          value={notes}
          onChange={(e) => updateNotes(e.target.value)}
          placeholder="Ajoutez vos notes ici..."
          variant="outlined"
        />
      </Paper>
    </motion.div>
  );
};

export default Notes;