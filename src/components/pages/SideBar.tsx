/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { green } from '@mui/material/colors';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import { SidebarContent } from '../organisms/SidebarContent';

const classes = {
  closeBtn: css({
    color: 'white',
  }),
  title: css({
    color: 'white',
  }),
};

export const DrawerHeader = styled('div')(({ theme }) => ({
  backgroundColor: green[700],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function SideBar(props: Props) {
  function handleClose() {
    props.setOpen(false);
  }

  return (
    <Drawer
      sx={{ flexShrink: 0 }}
      variant="persistent"
      anchor="right"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={handleClose} css={classes.closeBtn}>
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="h6" component="h2" css={classes.title}>
          自動調整
        </Typography>
      </DrawerHeader>
      <Paper
        sx={{
          width: '20vw',
          height: 'calc(100vh - 65px)',
          backgroundColor: green[100],
          borderRadius: 0,
          overflowY: 'hidden',
        }}
      >
        <SidebarContent />
      </Paper>
    </Drawer>
  );
}
