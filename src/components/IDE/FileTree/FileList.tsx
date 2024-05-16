import { IconButton, TextField } from '@mui/material';
import { ReactComponent as FileAddLightIcon } from '../../../assets/file-addlight.svg';
import { ReactComponent as FileAddDarkIcon } from '../../../assets/file-adddark.svg';
import { ReactComponent as FolderAddLightIcon } from '../../../assets/folder-addlight.svg';
import { ReactComponent as FolderAddDarkIcon } from '../../../assets/folder-adddark.svg';
import { useTheTheme } from '../../Theme';
import useProjectStore from '../../../state/IDE/ProjectState';
import { useState } from 'react';
import { FolderWrapper, ProjectWrapper, Title } from '../IdeStyle';
import { createFolder, createFile } from '../ProjectApi';
import FileTree from './FileTree';

export default function FileList() {
  const { themeColor } = useTheTheme();
  const projects = useProjectStore(state => state.projects);
  const selectedProjectId = useProjectStore(state => state.selectedProjectId);
  const { addFolder, addFile } = useProjectStore();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');

  const toggleFolderCreation = () => {
    setIsCreatingFolder(prevState => !prevState);
  };

  const handleCreateFolder = async () => {
    if (newFolderName.trim() === '') {
      alert('폴더명을 입력하세요.');
      return;
    }
    if (!selectedProjectId) {
      alert('프로젝트를 선택하세요.');
      return;
    }
    try {
      const createdFolder = await createFolder(selectedProjectId, newFolderName);
      addFolder(selectedProjectId, createdFolder);
      setNewFolderName('');
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Failed to create folder');
    }
  };

  const handleCreateFile = async () => {
    if (newFileName.trim() === '') {
      alert('파일명을 입력하세요.');
      return;
    }
    if (!selectedProjectId) {
      alert('프로젝트를 선택하세요.');
      return;
    }

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    if (selectedProject && selectedProject.folders.length > 0) {
      const folderId = selectedProject.folders[0].id;
      try {
        const newFile = {
          id: Math.random().toString(),
          name: newFileName,
          content: '',
          type: 'file',
          parentId: folderId,
        };

        await createFile(selectedProjectId, folderId, newFileName);
        addFile(selectedProjectId, folderId, newFile);
        setNewFileName('');
      } catch (error) {
        console.error('Error creating file:', error);
        alert('Failed to create file');
      }
    }
  };
  const selectedProject = projects.find(project => project.id === selectedProjectId);

  return (
    <ProjectWrapper>
      <Title>
        {selectedProject && <span className="mr-3">{selectedProject.name}</span>}
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
          disabled={!isCreatingFolder}
        />
        <TextField
          size="small"
          value={newFileName}
          onChange={e => setNewFileName(e.target.value)}
          placeholder="파일명 입력"
        />
        <FileTree
          isCreatingFolder={isCreatingFolder}
          toggleFolderCreation={toggleFolderCreation}
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          handleCreateFolder={handleCreateFolder}
          handleCreateFile={handleCreateFile}
        />
      </FolderWrapper>
    </ProjectWrapper>
  );
}
