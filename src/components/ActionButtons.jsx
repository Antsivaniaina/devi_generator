import { motion } from 'framer-motion';
import { Button, Stack, Switch, FormControlLabel, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NoteIcon from '@mui/icons-material/Note';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useState } from 'react';
import { useQuoteContext } from '../context/QuoteContext';

const ActionButtons = ({ onToggleNotes }) => {
  const { addRow, deleteRow, addColumn, deleteColumn, exportToPdf } = useQuoteContext();
  const [showPdfHeader, setShowPdfHeader] = useState(true);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const handleSwitchChange = (event) => {
    setShowPdfHeader(event.target.checked);
  };

  const handleExportPdf = () => {
    exportToPdf(showPdfHeader, clientName, clientPhone);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        gap: 2,
        flexWrap: 'wrap',
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mb: { xs: 2, md: 0 },
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={showPdfHeader}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="Afficher l'entête PDF"
          sx={{ ml: 1 }}
        />
        {showPdfHeader && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <TextField
              size="small"
              label="Nom du client"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              sx={{ minWidth: 180 }}
              variant="outlined"
              className="no-print"
              InputProps={{
                inputProps: { 'data-hide-in-pdf': true }
              }}
            />
            <TextField
              size="small"
              label="Téléphone"
              value={clientPhone}
              onChange={e => setClientPhone(e.target.value)}
              sx={{ minWidth: 150 }}
              variant="outlined"
              className="no-print"
              InputProps={{
                inputProps: { 'data-hide-in-pdf': true }
              }}
            />
          </Box>
        )}
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ flexWrap: 'wrap', flexGrow: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
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
            onClick={handleExportPdf}
            className="w-full sm:w-auto"
          >
            Exporter PDF
          </Button>
        </motion.div>
      </Stack>
    </Box>
  );
};

export default ActionButtons;