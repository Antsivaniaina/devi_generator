import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useQuoteContext } from '../context/QuoteContext';

const ImageCell = ({ rowIndex }) => {
  const { updateImage } = useQuoteContext();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
        updateImage(rowIndex, e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex justify-center"
    >
      {preview ? (
        <motion.img
          src={preview}
          alt="Preview"
          className="w-[150px] h-[120px] object-cover rounded-lg cursor-pointer"
          onClick={() => setPreview(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      ) : (
        <IconButton
          component="label"
          className="w-[150px] h-[120px] border-2 border-dashed border-gray-300 hover:border-primary-500"
        >
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
          <AddPhotoAlternateIcon className="text-gray-400" />
        </IconButton>
      )}
    </motion.div>
  );
};

export default ImageCell;