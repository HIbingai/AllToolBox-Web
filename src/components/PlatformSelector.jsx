import React from 'react';

export default function PlatformSelector({ platforms = [], value = {}, onChange = () => {} }) {
  const archs = value.archs || [];
  const versions = value.versions || [];
  return (
    <div>
      <label>Platform:
        <select value={value.platform || ''} onChange={e => onChange({ platform: e.target.value })}>
          {platforms.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </label>
      <label>Arch:
        <select value={value.arch || ''} onChange={e => onChange({ arch: e.target.value })}>
          {archs.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </label>
      <label>Version:
        <select value={value.version || ''} onChange={e => onChange({ version: e.target.value })}>
          {versions.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </label>
    </div>
  );
}
