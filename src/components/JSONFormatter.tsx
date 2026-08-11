import { useState } from 'react';
import { TextField, Paper, Typography, Button, Chip, IconButton, Tooltip, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CompressIcon from '@mui/icons-material/Compress';
import { formatJSON, minifyJSON, countStats } from '../utils/jsonUtils';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => { try { setError(''); setOutput(formatJSON(input, indent)); } catch(e) { setError((e as Error).message); } };
  const handleMinify = () => { try { setError(''); setOutput(minifyJSON(input)); } catch(e) { setError((e as Error).message); } };
  const stats = output ? countStats(output) : null;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>JSON Formatter</Typography>
      <div className="flex items-center gap-2 mb-3">
        <ToggleButtonGroup value={indent} exclusive onChange={(_,v) => v && setIndent(v)} size="small">
          {[2,4,8].map(n => <ToggleButton key={n} value={n} className="text-xs">{n} spaces</ToggleButton>)}
        </ToggleButtonGroup>
        <Button variant="contained" size="small" onClick={handleFormat} disabled={!input}>Format</Button>
        <Button variant="outlined" size="small" startIcon={<CompressIcon />} onClick={handleMinify} disabled={!input}>Minify</Button>
        {output && <Tooltip title={copied?'Copied!':'Copy'}><IconButton size="small" onClick={()=>{navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),2000)}}><ContentCopyIcon fontSize="small"/></IconButton></Tooltip>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Input" multiline minRows={16} maxRows={28} value={input} onChange={e=>setInput(e.target.value)} fullWidth className="font-mono" slotProps={{htmlInput:{className:'font-mono text-sm'}}} />
        <TextField label="Output" multiline minRows={16} maxRows={28} value={output} fullWidth className="font-mono" slotProps={{htmlInput:{className:'font-mono text-sm',readOnly:true}}} error={!!error} helperText={error} />
      </div>
      {stats && <Paper variant="outlined" className="p-2 mt-2 flex gap-3"><Chip label={`${stats.keys} keys`} size="small" variant="outlined"/><Chip label={`${stats.arrays} arrays`} size="small" variant="outlined"/><Chip label={`depth ${stats.depth}`} size="small" variant="outlined"/><Chip label={stats.size} size="small" variant="outlined"/></Paper>}
    </div>
  );
}
