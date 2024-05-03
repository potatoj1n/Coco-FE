import { IconButton } from '@mui/material';
import { styled } from 'styled-components';
import { ReactComponent as FileAddLightIcon } from '../assets/file-addlight.svg';
import { ReactComponent as FileAddDarkIcon } from '../assets/file-adddark.svg';
import { ReactComponent as FolderAddLightIcon } from '../assets/folder-addlight.svg';
import { ReactComponent as FolderAddDarkIcon } from '../assets/folder-adddark.svg';
import { useTheTheme } from './Theme';

const Title = styled.div`
  border-bottom: 0.3px solid #a3a3a3;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function FileList() {
  const { themeColor } = useTheTheme();
  return (
    <Title>
      project1
      <IconButton size="small">{themeColor === 'light' ? <FileAddLightIcon /> : <FileAddDarkIcon />}</IconButton>
      <IconButton size="small">{themeColor === 'light' ? <FolderAddLightIcon /> : <FolderAddDarkIcon />}</IconButton>
    </Title>
  );
}
