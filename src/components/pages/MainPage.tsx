import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DrawerHeader, SideBar } from './SideBar';
import { TopBar } from '../organisms/TopBar';
import { Main } from '../organisms/Main';
import { LoadDialog } from '../organisms/LoadDialog';
import { ExportDialog } from '../organisms/ExportDialog';

export function MainPage() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openLoader, setOpenLoader] = useState(false);
  const [openExporter, setOpenExporter] = useState(false);

  return (
    <Box>
      <TopBar
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        onOpenLoader={() => setOpenLoader(true)}
        onOpenExporter={() => setOpenExporter(true)}
      />

      <div style={{ overflowX: 'hidden' }}>
        <DrawerHeader />
        {/* empty header */}

        <Main open={openDrawer} />
      </div>

      <SideBar open={openDrawer} setOpen={setOpenDrawer} />

      <LoadDialog
        openDialog={openLoader}
        onClose={() => setOpenLoader(false)}
      />

      <ExportDialog
        openDialog={openExporter}
        onClose={() => setOpenExporter(false)}
      />
    </Box>
  );
}
