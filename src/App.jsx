import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box, Grid, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
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
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0, mr: 1 }}>AllToolBox工具箱</Typography>
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

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2 }}>AllToolBox工具箱</Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" size="large" href="#download">立即下载</Button>
              <Button variant="outlined" color="inherit" size="large" href="#docs">阅读文档</Button>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Paper elevation={0} sx={{ p: 2, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">面向 Android</Typography>
                <Typography variant="body2" color="text.secondary">专为 Android 产品设计与性能优化</Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 2, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">支持 Root</Typography>
                <Typography variant="body2" color="text.secondary">为已 Root 设备提供安全的管理与安装流程</Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 2, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">多架构支持</Typography>
                <Typography variant="body2" color="text.secondary">支持 ARM 与 x86，兼容主流厂商设备</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{ width: 420, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ width: '100%', height: 260, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">屏幕预览</Typography>
            </Paper>
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ mt: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>针对 Android 优化</Typography>
              <Typography variant="body2" color="text.secondary">为 Android 产品做过性能与包体大小优化。</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Root 安全流程</Typography>
              <Typography variant="body2" color="text.secondary">提供针对已 Root 设备的安全安装与回滚机制。</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <DevicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>设备兼容</Typography>
              <Typography variant="body2" color="text.secondary">支持主流厂商 ROM 与多种 CPU 架构。</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }} id="download">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h5">下载</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>选择平台、架构与版本后下载。</Typography>

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

                <Box sx={{ mt: 3 }}>
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
        </Box>
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">© AllToolBox 团队</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          AllToolBox 开源地址: <a href="https://github.com/AllToolBox-SC/AllToolBox" target="_blank" rel="noopener noreferrer">https://github.com/AllToolBox-SC/AllToolBox</a>
        </Typography>
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