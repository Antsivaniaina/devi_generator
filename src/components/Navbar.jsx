import { AppBar, Toolbar, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Navbar = () => (
  <AppBar position="static" className="bg-gradient-to-r from-indigo-600 to-blue-500">
    <Toolbar>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" className="font-bold">
          DINAH Met_Alu Devis
        </Typography>
      </motion.div>
    </Toolbar>
  </AppBar>
);

export default Navbar;