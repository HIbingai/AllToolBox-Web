import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function PlatformSelector({ platforms = [], value = {}, onChange = () => {} }) {
  const { platform = '', arch = '', version = '', archs = [], versions = [] } = value || {};

  const handlePlatformChange = (e) => onChange({ platform: e.target.value });
  const handleArchChange = (e) => onChange({ arch: e.target.value });
  const handleVersionChange = (e) => onChange({ version: e.target.value });

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="platform-label">平台</InputLabel>
        <Select labelId="platform-label" value={platform} label="平台" onChange={handlePlatformChange}>
          {platforms.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="arch-label">架构</InputLabel>
        <Select labelId="arch-label" value={arch} label="架构" onChange={handleArchChange}>
          {(archs || []).map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="version-label">版本</InputLabel>
        <Select labelId="version-label" value={version} label="版本" onChange={handleVersionChange}>
          {(versions || []).map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
