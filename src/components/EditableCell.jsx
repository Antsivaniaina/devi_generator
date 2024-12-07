import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField } from '@mui/material';

const EditableCell = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(tempValue);
  };

  return isEditing ? (
    <TextField
      autoFocus
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      variant="standard"
      fullWidth
    />
  ) : (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsEditing(true)}
      className="cursor-pointer p-2 rounded hover:bg-gray-200"
    >
      {value}
    </motion.div>
  );
};

export default EditableCell;