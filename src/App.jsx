import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box, Grid, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import getTheme from './theme';
import PlatformSelector from './components/PlatformSelector';
import DownloadCard from './components/DownloadCard';
import Changelog from './components/Changelog';

function detectClient() {
  const p = navigator.userAgent || navigator.platform || 'unknown';
  let platform = 'windows';
  let arch = 'x86';
  if (/Win/i.test(p)) platform = 'windows';
  else if (/Mac/i.test(p)) platform = 'macos';
  else if (/Linux/i.test(p)) platform = 'linux';
  else platform = 'other';

  if (/arm/i.test(p) || /aarch64/i.test(p)) arch = 'arm64';
  else if (/64/.test(p)) arch = 'x64';
  else arch = 'x86';

  return { platform, arch };
}

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = getTheme(prefersDarkMode);

  const [releases, setReleases] = useState({});
  const [options, setOptions] = useState({
    platform: null,
    arch: null,
    version: null,
    archs: [],
    versions: []
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [changelogEntries, setChangelogEntries] = useState([]);

  useEffect(() => {
    fetch('/releases.json', { cache: 'no-cache' })
      .then(r => r.json())
      .then(data => {
        setReleases(data);

        const platforms = Object.keys(data);
        const detected = detectClient();

        // if detected platform exists use it, else first available
        const platform = platforms.includes(detected.platform) ? detected.platform : platforms[0];
        const archs = Object.keys(data[platform] || {});
        const arch = archs.includes(detected.arch) ? detected.arch : archs[0];
        const versions = Object.keys((data[platform] && data[platform][arch]) || {}).sort((a,b)=> (a>b?-1:1));
        const version = versions[0] || null;

        setOptions({
          platform,
          arch,
          version,
          archs,
          versions
        });

        // build changelog list
        const list = [];
        for (const p of Object.keys(data)) {
          for (const a of Object.keys(data[p])) {
            for (const v of Object.keys(data[p][a])) {
              const r = data[p][a][v];
              list.push({
                platform: p,
                arch: a,
                version: v,
                notes: r.notes_short || '',
                date: r.date || ''
              });
            }
          }
        }
        list.sort((x,y)=> (x.date && y.date) ? (new Date(y.date)-new Date(x.date)) : 0);
        setChangelogEntries(list);
      })
      .catch(err => {
        console.error('无法加载 releases.json', err);
      });
  }, []);

  useEffect(() => {
    // whenever platform or arch changes update archs & versions
    if (!options.platform) return;
    const archs = Object.keys(releases[options.platform] || {});
    const arch = archs.includes(options.arch) ? options.arch : archs[0];
    const versions = Object.keys((releases[options.platform] && releases[options.platform][arch]) || {}).sort((a,b)=> (a>b?-1:1));
    const version = versions.includes(options.version) ? options.version : versions[0] || null;
    setOptions(prev => ({ ...prev, archs, versions, arch, version }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.platform, releases]);

  const currentItem = (releases[options.platform] && releases[options.platform][options.arch] && releases[options.platform][options.arch][options.version]) || null;

  const platforms = Object.keys(releases);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px) saturate(120%)', WebkitBackdropFilter: 'blur(8px) saturate(120%)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0, mr: 1 }}>工具箱</Typography>
          </Box>

          <Box component="nav" sx={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            {['产品','下载','文档','支持','关于'].map((t) => (
              <Button key={t} color="inherit" sx={{ color: 'inherit', textTransform: 'none', fontWeight: 500 }} href={`#${t}`}>{t}</Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit"><SearchIcon /></IconButton>
            <Button variant="contained" color="primary" href="#download">下载</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h5">轻量、可靠的系统工具箱</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Android 原生设计风格界面（Material You / Material 3 灵感），默认检测并选中 Windows x86，支持多平台/多架构/版本。
              </Typography>

              <Box sx={{ mt: 3 }}>
                <PlatformSelector
                  platforms={platforms}
                  value={{
                    platform: options.platform || '',
                    arch: options.arch || '',
                    version: options.version || '',
                    archs: options.archs || [],
                    versions: options.options?.versions || options.versions || []
                  }}
                  onChange={(v) => setOptions(prev => ({ ...prev, ...v }))}
                />
              </Box>

              <Box sx={{ mt: 3 }} id="download">
                <DownloadCard item={currentItem} onOpenNotes={() => { setModalContent(currentItem?.notes_long || currentItem?.notes_short || '无说明'); setModalOpen(true); }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography variant="subtitle1">更新日志</Typography>
              <Box sx={{ mt: 2 }}>
                <Changelog entries={changelogEntries} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">© 工具箱 团队</Typography>
      </Box>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>版本说明</DialogTitle>
        <DialogContent dividers>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{modalContent}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>关闭</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}