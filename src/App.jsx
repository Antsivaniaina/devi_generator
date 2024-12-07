import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { theme } from './theme';
import Navbar from './components/Navbar';
import QuoteTable from './components/QuoteTable';
import ActionButtons from './components/ActionButtons';
import Notes from './components/Notes';
import { QuoteProvider } from './context/QuoteContext';

function App() {
  const [showNotes, setShowNotes] = useState(true);

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