import { motion } from 'framer-motion';
import { Button, Stack, Switch, FormControlLabel, TextField, Box, Checkbox } from '@mui/material';
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
  const [showNifStat, setShowNifStat] = useState(false);

  const handleSwitchChange = (event) => {
    setShowPdfHeader(event.target.checked);
    if (!event.target.checked) setShowNifStat(false);
  };

  const handleExportPdf = () => {
    exportToPdf(showPdfHeader, clientName, clientPhone, showNifStat);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'flex-start' },
        gap: { xs: 2, md: 4 },
        flexWrap: 'wrap',
        mb: 3,
        p: { xs: 1, sm: 2, md: 3 },
        backgroundColor: '#f8f9fa',
        borderRadius: 3,
        boxShadow: 2,
        border: '1px solid #e0e0e0',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flex: 1,
          minWidth: { xs: '100%', sm: 260 },
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={showPdfHeader}
              onChange={handleSwitchChange}
              color="primary"
              sx={{ mr: 1 }}
            />
          }
          label="Afficher l'entête PDF"
          sx={{ ml: 1, mr: 2, fontWeight: 500 }}
        />
        {showPdfHeader && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              p: { xs: 1, sm: 2 },
              boxShadow: 0,
              border: '1px solid #e0e0e0',
              width: '100%',
            }}
          >
            <TextField
              size="small"
              label="Nom du client"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              sx={{
                minWidth: { xs: '100%', sm: 160 },
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                flex: 1,
                mb: { xs: 1, sm: 0 },
              }}
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
              sx={{
                minWidth: { xs: '100%', sm: 140 },
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                flex: 1,
                mb: { xs: 1, sm: 0 },
              }}
              variant="outlined"
              className="no-print"
              InputProps={{
                inputProps: { 'data-hide-in-pdf': true }
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showNifStat}
                  onChange={e => setShowNifStat(e.target.checked)}
                  color="primary"
                  sx={{
                    p: 0.5,
                    '&.Mui-checked': { color: '#1976d2' }
                  }}
                  className="no-print"
                  inputProps={{ 'data-hide-in-pdf': true }}
                />
              }
              label="Afficher NIF & Stat"
              sx={{
                ml: { xs: 0, sm: 1 },
                fontWeight: 500,
                whiteSpace: 'nowrap',
                minWidth: { xs: '100%', sm: 'auto' },
              }}
            />
          </Box>
        )}
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          flexWrap: 'wrap',
          flexGrow: 1,
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'center',
          mt: { xs: 2, md: 0 },
          minWidth: 320,
          gap: 2,
          width: { xs: '100%', md: 'auto' },
        }}
      >
        <motion.div whileHover={{ scale: 1.04 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addRow}
            sx={{
              minWidth: 150,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 1,
            }}
            className="w-full sm:w-auto"
          >
            Ajouter Ligne
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RemoveIcon />}
            onClick={deleteRow}
            sx={{
              minWidth: 150,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 1,
            }}
            className="w-full sm:w-auto"
          >
            Supprimer Ligne
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addColumn}
            sx={{
              minWidth: 170,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 1,
            }}
            className="w-full sm:w-auto"
          >
            Ajouter Colonne
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RemoveIcon />}
            onClick={deleteColumn}
            sx={{
              minWidth: 170,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 1,
            }}
            className="w-full sm:w-auto"
          >
            Supprimer Colonne
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }}>
          <Button
            variant="outlined"
            startIcon={<NoteIcon />}
            onClick={onToggleNotes}
            sx={{
              minWidth: 120,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 1,
            }}
            className="w-full sm:w-auto"
          >
            Notes
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleExportPdf}
            sx={{
              minWidth: 150,
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 1,
            }}
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