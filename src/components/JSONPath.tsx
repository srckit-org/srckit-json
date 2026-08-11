import { useState } from 'react';
import { TextField, Paper, Typography, Button, Chip } from '@mui/material';
import { jsonPath } from '../utils/jsonUtils';

export default function JSONPath() {
  const [json, setJson] = useState('');
  const [path, setPath] = useState('');
  const [result, setResult] = useState<unknown>(undefined);
  const [error, setError] = useState('');

  const handleEval = () => {
    try { setError(''); setResult(jsonPath(json, path)); }
    catch(e) { setError((e as Error).message); setResult(undefined); }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>JSON Path Evaluator</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">Evaluate dot-notation paths against JSON data. Use <code>key.subkey</code> or <code>arr[0].prop</code>.</Typography>
      <div className="flex gap-2 mb-3">
        <TextField label="Path" value={path} onChange={e=>setPath(e.target.value)} size="small" className="font-mono flex-1" placeholder="data.items[0].name" />
        <Button variant="contained" onClick={handleEval} disabled={!json||!path}>Evaluate</Button>
      </div>
      <TextField label="JSON" multiline minRows={10} maxRows={20} value={json} onChange={e=>setJson(e.target.value)} fullWidth className="font-mono mb-3" slotProps={{htmlInput:{className:'font-mono text-sm'}}} />
      {error && <Chip label={error} color="error" className="mb-2" />}
      {result !== undefined && (
        <Paper variant="outlined" className="p-4">
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }} gutterBottom>Result</Typography>
          <pre className="m-0 text-sm font-mono bg-gray-100 p-3 rounded">{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</pre>
        </Paper>
      )}
    </div>
  );
}
