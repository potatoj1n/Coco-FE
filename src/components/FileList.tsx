import { IconButton, TextField } from '@mui/material';
import { styled } from 'styled-components';
import { ReactComponent as FileAddLightIcon } from '../assets/file-addlight.svg';
import { ReactComponent as FileAddDarkIcon } from '../assets/file-adddark.svg';
import { ReactComponent as FolderAddLightIcon } from '../assets/folder-addlight.svg';
import { ReactComponent as FolderAddDarkIcon } from '../assets/folder-adddark.svg';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useTheTheme } from './Theme';
import useProjectStore, { useFileStore, useFolderStore } from '../state/IDE/ProjectState';
import { useState } from 'react';

const Title = styled.div`
  border-bottom: 0.3px solid #a3a3a3;
  padding: 7px 10px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  font-size: 18px;
`;
const ProjectWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
`;
const FolderWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
`;

export default function FileList() {
  const { themeColor } = useTheTheme();
  const projects = useProjectStore(state => state.projects);
  const { folders, addFolder, removeFolder, updateFolder } = useFolderStore();
  const { files, addFile, removeFile, updateFile } = useFileStore();
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim() === '') {
      alert('폴더명을 입력하세요.');
      return;
    }
    const newFolder = {
      id: Math.random().toString(),
      name: newFolderName,
      files: [],
    };

    addFolder(newFolder);
    setNewFolderName('');
    setIsAdding(true);
  };

  const handleCreateFile = () => {
    if (newFileName.trim() === '') {
      alert('파일명을 입력하세요.');
      return;
    }
    const newFile = {
      id: Math.random().toString(),
      name: newFileName,
      content: '',
    };

    addFile(newFile);
    setNewFileName('');
  };
  return (
    <ProjectWrapper>
      <Title>
        {projects.map(project => (
          <span key={project.id}>{project.name}</span>
        ))}
        <span>
          <IconButton size="small" onClick={handleCreateFolder}>
            {themeColor === 'light' ? <FolderAddLightIcon /> : <FolderAddDarkIcon />}
          </IconButton>
          <IconButton size="small" onClick={handleCreateFile}>
            {themeColor === 'light' ? <FileAddLightIcon /> : <FileAddDarkIcon />}
          </IconButton>
        </span>
      </Title>

      {isAdding && (
        <FolderWrapper>
          <TextField
            size="small"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
            placeholder="폴더명 입력"
          />
          {/* 폴더 목록 표시 */}
          <ul>
            {folders.map(folder => (
              <li key={folder.id}>
                <FolderOutlinedIcon />
                {folder.name}
              </li>
            ))}
            {/* 파일 목록 표시 */}
            {files.map(file => (
              <li key={file.id}>
                <InsertDriveFileOutlinedIcon />
                {file.name}
              </li>
            ))}
          </ul>
        </FolderWrapper>
      )}
    </ProjectWrapper>
  );
}
