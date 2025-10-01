import { Controller, Control, Path, RegisterOptions } from "react-hook-form";
import React, { useState } from 'react';

import type { GetawayFormData } from '../types/getaway';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// interface FormData {
//   galleryPhotos: File[] | File | null;
// }

// interface GalleryPhotoInputProps {
//   name: string;
//   control: Control<FormData>;
//   rules?: RegisterOptions<FormData>;
//   multiple?: boolean;
//   helperText?: string;
// }

interface GalleryPhotoInputProps {
  name: Path<GetawayFormData>;
  control: Control<GetawayFormData>;
  rules?: RegisterOptions<GetawayFormData>;
  multiple?: boolean;
  helperText?: string;
}

const validateFile = (file: File) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validExtensions = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  const nameRegex = /^[@a-zA-Z0-9\s-_.]+$/;

  if (file.size > maxSize) {
    return "File size must be less than 5MB";
  }
  if (!validExtensions.includes(file.type)) {
    return "Invalid file type. Only JPG, PNG, and GIF are allowed";
  }
  if (!nameRegex.test(file.name)) {
    return "File name can only contain letters, numbers, spaces, @, - and _";
  }
  return null;
};

export const GalleryPhotoInput: React.FC<GalleryPhotoInputProps> = ({
  name,
  control,
  rules,
  multiple = false,
  helperText = "Maximum size 5 MB, recommended resolution: 1280x720px"
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      // defaultValue={multiple ? [] : null}
      defaultValue={[]}
      render={({ field, fieldState }) => {
        const files = multiple
          ? (field.value as File[] || [])
          : field.value
          ? [field.value as File]
          : [];

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFiles = Array.from(e.target.files || []);
          let hasError = false;
          for (const file of selectedFiles) {
            const error = validateFile(file);
            if (error) {
              setValidationError(error);
              hasError = true;
              break;
            }
          }
          if (!hasError) {
            setValidationError(null);
            field.onChange(multiple ? selectedFiles : selectedFiles[0] || null);
          }
        };

        return (
          <Box sx={{ width: '100%' }}>
            <TextField label="Photo Gallery"
              fullWidth margin="dense" sx={{ mb: 1 }}
              value={files.length > 0 ? files.map(f => f.name).join(', ') : ''}
              InputProps={{ readOnly: true }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <Button
                component="label"
                variant="contained"
                disableElevation
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: '#00E392',
                  color: '#1A2660',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  textTransform: 'none',
                  ':hover': { bgcolor: '#3C1C91', color: 'white' }
                }}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  multiple={multiple}
                  onChange={handleFileChange}
                />
              </Button>

              {files.length > 0 && (
                <Button startIcon={<DeleteIcon />}
                  variant="outlined" size="small" color="error"
                  sx={{ borderRadius: '20px', textTransform: 'none' }}
                  onClick={() => {
                    field.onChange(multiple ? [] : null);
                    setValidationError(null);
                  }}
                > Reset </Button>
              )}
            </Box>

            <Typography
              variant="caption"
              color={validationError || fieldState.error ? 'error' : 'text.secondary'}
            >
              {validationError || fieldState.error?.message || helperText}
            </Typography>

            {/* galleryList */}
            {multiple && files.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {files.map((file, index) => (
                  <Typography key={index} variant="caption" display="block">
                    {index + 1}. {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
};