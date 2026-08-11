import { useState, useMemo } from 'react';
import { TextField, Typography, Chip, Alert } from '@mui/material';
import { validateJSON } from '../utils/jsonUtils';

export default function JSONValidator() {
  const [input, setInput] = useState('');
  const result = useMemo(() => input.trim() ? validateJSON(input) : null, [input]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>JSON Validator</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">Validate JSON in real-time. Errors are shown with line numbers.</Typography>
      <TextField label="JSON" multiline minRows={16} maxRows={28} value={input} onChange={e=>setInput(e.target.value)} fullWidth className="font-mono" slotProps={{htmlInput:{className:'font-mono text-sm'}}} placeholder='{"key": "value"}' />
      <div className="mt-3">
        {result?.valid && <Chip label="Valid JSON ✓" color="success" />}
        {result && !result.valid && <Alert severity="error">Line ~{result.line}: {result.error}</Alert>}
        {!result && <Typography variant="caption" color="text.secondary">Enter JSON above to validate.</Typography>}
      </div>
    </div>
  );
}
