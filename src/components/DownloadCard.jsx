import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';

export default function DownloadCard({ item, onOpenNotes }) {
  if (!item) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6">未选择版本</Typography>
          <Typography variant="body2" color="text.secondary">请选择平台 / 架构 / 版本以查看下载信息。</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{item.notes_short}</Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <div>
            <Typography variant="caption" color="text.secondary">文件名</Typography>
            <Typography variant="body2">{item.filename}</Typography>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary">大小</Typography>
            <Typography variant="body2">{item.size}</Typography>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary">SHA256</Typography>
            <Typography variant="body2" sx={{ maxWidth: 320, wordBreak: 'break-all' }}>{item.sha256}</Typography>
          </div>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={() => window.open(item.url, '_blank', 'noopener')}>
          下载
        </Button>
        <Button variant="outlined" startIcon={<InfoIcon />} onClick={onOpenNotes}>
          版本说明
        </Button>
        <Button onClick={() => navigator.clipboard?.writeText(item.sha256)} sx={{ ml: 'auto' }}>
          复制 SHA
        </Button>
      </CardActions>
    </Card>
  );
}