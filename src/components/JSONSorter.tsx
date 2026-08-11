import { useState } from 'react';
import { TextField, Typography, Button, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { sortJSON } from '../utils/jsonUtils';

export default function JSONSorter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSort = () => { try { setError(''); setOutput(sortJSON(input)); } catch(e) { setError((e as Error).message); } };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>JSON Key Sorter</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">Sort all object keys alphabetically. Useful for canonicalizing JSON before comparison.</Typography>
      <div className="flex gap-2 mb-3">
        <Button variant="contained" onClick={handleSort} disabled={!input}>Sort Keys</Button>
        {output && <Tooltip title="Copy"><IconButton size="small" onClick={()=>navigator.clipboard.writeText(output)}><ContentCopyIcon fontSize="small"/></IconButton></Tooltip>}
        <Button variant="text" onClick={()=>{setInput('');setOutput('');}}>Clear</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Input" multiline minRows={16} maxRows={28} value={input} onChange={e=>setInput(e.target.value)} fullWidth className="font-mono" slotProps={{htmlInput:{className:'font-mono text-sm'}}} />
        <TextField label="Sorted" multiline minRows={16} maxRows={28} value={output} fullWidth className="font-mono" slotProps={{htmlInput:{className:'font-mono text-sm',readOnly:true}}} error={!!error} helperText={error} />
      </div>
    </div>
  );
}
