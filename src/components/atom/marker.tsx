import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export type Marker = '○' | '△' | '×';

export const markers: Marker[] = ['○', '△', '×'];

export function marker2Icon(marker: Marker) {
  switch (marker) {
    case '○':
      return <CircleOutlinedIcon />;
    case '△':
      return <ChangeHistoryIcon />;
    case '×':
      return <ClearIcon />;
    default:
      return <HelpOutlineIcon />;
  }
}
