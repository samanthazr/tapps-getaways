import { SubmissionResult } from '../contexts/FormDataContext';
// import { GetawayFormData } from '../types/getaway';
import { Box, Typography, Chip } from '@mui/material';

interface DataViewProps {
  result: SubmissionResult;
}

const statusInfo = {
  SUCCESS: { label: 'Sent to backend succesfully', color: 'success' as const },
  API_ERROR: { label: 'API Error', color: 'error' as const },
  NETWORK_ERROR: { label: 'Error de Red', color: 'error' as const },
  LOCAL_SAVE: { label: 'Saved on Localstorage (Backend unavailable)', color: 'warning' as const },
};

export default function DataView({ result }: DataViewProps) {
  const { payload, status, statusCode } = result;
  const info = statusInfo[status];
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Result
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h6">state:</Typography>
        <Chip label={info.label} color={info.color} />
      </Box>
      {statusCode && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h6">Status code:</Typography>
          <Chip label={statusCode} variant="outlined" />
        </Box>
      )}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Payload:
      </Typography>
      <Box
        component="pre"
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          bgcolor: 'grey.200',
          color: 'black',
          p: 2,
          borderRadius: 1
        }}
      >
        {JSON.stringify(payload, null, 2)}
      </Box>
    </Box>
  );
}