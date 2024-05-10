import { IconButton, TextField } from '@mui/material';
import { ReactComponent as FileAddLightIcon } from '../../../assets/file-addlight.svg';
import { ReactComponent as FileAddDarkIcon } from '../../../assets/file-adddark.svg';
import { ReactComponent as FolderAddLightIcon } from '../../../assets/folder-addlight.svg';
import { ReactComponent as FolderAddDarkIcon } from '../../../assets/folder-adddark.svg';
import { useTheTheme } from '../../Theme';
import useProjectStore from '../../../state/IDE/ProjectState';
import { useState } from 'react';
import { FolderWrapper, ProjectWrapper, Title } from '../IdeStyle';
import FileTree from './FileTree';

export default function FileList() {
  const { themeColor } = useTheTheme();
  const projects = useProjectStore(state => state.projects);
  const selectedProjectId = useProjectStore(state => state.selectedProjectId);
  const { addFolder, addFile } = useProjectStore();
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim() === '') {
      alert('폴더명을 입력하세요.');
      return;
    }
    if (!selectedProjectId) {
      alert('프로젝트를 선택하세요.');
      return;
    }
    const newFolder = {
      id: Math.random().toString(),
      name: newFolderName,
      files: [],
      parentId: '',
    };

    addFolder(selectedProjectId, newFolder);
    setNewFolderName('');
    setIsAdding(true);
  };

  const handleCreateFile = () => {
    if (newFileName.trim() === '') {
      alert('파일명을 입력하세요.');
      return;
    }
    if (!selectedProjectId) {
      alert('프로젝트를 선택하세요.');
      return;
    }
    const newFile = {
      id: Math.random().toString(),
      name: newFileName,
      content: '',
      parentId: '',
    };

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    if (selectedProject && selectedProject.folders.length > 0) {
      const folderId = selectedProject.folders[0].id;
      addFile(selectedProjectId, folderId, newFile);
    }

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

      <FolderWrapper>
        <TextField
          size="small"
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
          placeholder="폴더명 입력"
        />
        <FileTree />
      </FolderWrapper>
    </ProjectWrapper>
  );
}
