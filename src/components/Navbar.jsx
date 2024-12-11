import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Navbar = () => (
  <AppBar position="static" elevation={0} className="bg-gradient-to-r from-indigo-600 to-blue-500">
    <Toolbar className="flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <Typography variant="h6" className="font-bold text-white">
          DINAH Met_Alu Devis
        </Typography>
      </motion.div>
      <Box className="flex items-center">
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
