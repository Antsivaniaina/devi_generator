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
      <Paper className="mt-6 p-4 notes" id="notes">
        <div id="notes-input">
          <TextField
            multiline
            rows={4}
            fullWidth
            value={notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder="Ajoutez vos notes ici..."
            variant="outlined"
          />
        </div>
        {/* Aperçu en lecture seule avec retour à la ligne visible */}
        <div
          style={{
            marginTop: '16px',
            whiteSpace: 'pre-line',
            color: '#555',
            fontSize: '1rem'
          }}
          id="notes-preview"
        >
          {notes}
        </div>
      </Paper>
    </motion.div>
  );
};

export default Notes;