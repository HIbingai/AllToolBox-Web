import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

export default function Changelog({ entries = [] }) {
  if (!entries.length) return <Typography>暂无更新记录</Typography>;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {entries.map((e, idx) => (
        <Card key={idx} elevation={1}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <Typography variant="subtitle1">{e.version} <Typography component="span" color="text.secondary">• {e.platform}/{e.arch}</Typography></Typography>
                <Typography variant="body2" color="text.secondary">{e.date}</Typography>
              </div>
            </div>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">{e.notes}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}