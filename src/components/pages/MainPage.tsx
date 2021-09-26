import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DrawerHeader, SideBar } from '../organisms/SideBar';
import { TopBar } from '../organisms/TopBar';
import { Main } from '../organisms/Main';
import { LoadDialog } from '../organisms/LoadDialog';

// const useStyles = makeStyles((theme: Theme) => ({
//   main: {
//     backgroundColor: green[50],
//   },
//   toolbar: theme.mixins.toolbar,
//   body: {
//     display: 'flex',
//   },
//   side: {
//     backgroundColor: green[100],
//     width: '100vw',
//     height: 'calc(100vh - 65px)',
//   },
// }));

export function MainPage() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openLoader, setOpenLoader] = useState(false);

  return (
    <Box>
      <TopBar
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        onOpenLoader={() => setOpenLoader(true)}
      />

      <div>
        <DrawerHeader />
        {/* empty header */}

        <Main open={openDrawer} />
      </div>

      <SideBar open={openDrawer} setOpen={setOpenDrawer} />

      <LoadDialog
        openDialog={openLoader}
        onClose={() => setOpenLoader(false)}
      />
    </Box>
  );
}
