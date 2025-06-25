import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { theme } from './theme';
import Navbar from './components/Navbar';
import QuoteTable from './components/QuoteTable';
import ActionButtons from './components/ActionButtons';
import Notes from './components/Notes';
import { QuoteProvider, useQuoteContext } from './context/QuoteContext';

function App() {
  const [showNotes, setShowNotes] = useState(true);

  // Ajout : synchronisation localStorage pour toutes les données du contexte
  const quoteContext = useQuoteContext?.();
  useEffect(() => {
    if (!quoteContext) return;
    // Charger depuis localStorage au montage
    const saved = localStorage.getItem('quote-app-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          if (parsed.notes !== undefined) quoteContext.updateNotes(parsed.notes);
          if (parsed.headers && Array.isArray(parsed.headers)) quoteContext.setHeaders?.(parsed.headers);
          if (parsed.rows && Array.isArray(parsed.rows)) quoteContext.setRows?.(parsed.rows);
          if (parsed.clientName !== undefined) quoteContext.setClientName?.(parsed.clientName);
          if (parsed.clientPhone !== undefined) quoteContext.setClientPhone?.(parsed.clientPhone);
          if (parsed.showNifStat !== undefined) quoteContext.setShowNifStat?.(parsed.showNifStat);
        }
      } catch { }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!quoteContext) return;
    // Sauvegarder à chaque changement, y compris les colonnes ajoutées/supprimées et leur contenu
    const data = {
      notes: quoteContext.notes,
      headers: quoteContext.headers, // Sauvegarde les colonnes (ajoutées/supprimées)
      rows: quoteContext.rows,       // Sauvegarde le contenu de chaque ligne/colonne
      clientName: quoteContext.clientName,
      clientPhone: quoteContext.clientPhone,
      showNifStat: quoteContext.showNifStat,
    };
    localStorage.setItem('quote-app-data', JSON.stringify(data));
  }, [
    quoteContext?.notes,
    quoteContext?.headers, // Ajouté pour suivre les colonnes
    quoteContext?.rows,
    quoteContext?.clientName,
    quoteContext?.clientPhone,
    quoteContext?.showNifStat,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuoteProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl pdfmety">
              <ActionButtons onToggleNotes={() => setShowNotes(!showNotes)} className="buttons" />
              <QuoteTable />
              <AnimatePresence>
                {showNotes && <Notes />}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </QuoteProvider>
    </ThemeProvider>
  );
}

export default App;