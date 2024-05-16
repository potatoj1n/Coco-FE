import React, { useState } from 'react';
import useProjectStore, { Folder, File, Project } from '../../../state/IDE/ProjectState';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Menu, MenuItem, TextField } from '@mui/material';
import { FileTreeWrapper, FileWrapper } from '../IdeStyle';
import { deleteFile, deleteFolder, updateFolderName, updateFileName } from '../ProjectApi';

interface FileNode {
  name: string;
  id: string;
  parentId: string | null;
  type: string;
  onClick?: (id: string) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>, id: string, type: string) => void;
  children?: FileNode[];
}

interface Props {
  isCreatingFolder: boolean;
  setIsCreatingFolder: React.Dispatch<React.SetStateAction<boolean>>;
  isCreatingFile: boolean;
  setIsCreatingFile: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateFolder: (folderName: string, parentId: string | null) => void;
  handleCreateFile: (fileName: string, folderId: string) => void;
  newFolderName: string;
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>;
  newFileName: string;
  setNewFileName: React.Dispatch<React.SetStateAction<string>>;
  currentParentId: string | null;
  setCurrentParentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileTree: React.FC<Props> = ({
  isCreatingFolder,
  setIsCreatingFolder,
  isCreatingFile,
  setIsCreatingFile,
  handleCreateFolder,
  handleCreateFile,
  newFolderName,
  setNewFolderName,
  newFileName,
  setNewFileName,
  currentParentId,
  setCurrentParentId,
}) => {
  const { projects, selectedProjectId, selectProject, selectedFileContent, removeFolder, removeFile } = useProjectStore(
    state => ({
      projects: state.projects,
      selectedProjectId: state.selectedProjectId,
      selectProject: state.selectProject,
      selectedFileContent: state.selectedFileContent,
      removeFolder: state.removeFolder,
      removeFile: state.removeFile,
    }),
  );
  const [contextMenuPosition, setContextMenuPosition] = useState<{ mouseX: number; mouseY: number } | null>(null);

  const selectedProject = projects.find(project => project.id === selectedProjectId);
  //메뉴
  const handleContextMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    setContextMenuPosition({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
    setCurrentParentId(id);
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition(null);
  };
  const refreshProject = async () => {
    if (selectedProjectId) {
      await selectProject(selectedProjectId);
    }
  };
  //생성하기
  const handleCreateNewFolder = async () => {
    await handleCreateFolder(newFolderName, currentParentId);
    setNewFolderName('');
    await refreshProject();
  };

  const handleCreateNewFile = async () => {
    if (currentParentId) {
      handleCreateFile(newFileName, currentParentId);
      setNewFileName('');
    }
    await refreshProject();
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (isCreatingFolder) {
        handleCreateNewFolder();
      } else if (isCreatingFile) {
        handleCreateNewFile();
      }
    }
  };
  //삭제하기
  const handleDeleteFolder = async (folderId: string) => {
    if (!selectedProjectId) return;
    try {
      await deleteFolder(selectedProjectId, folderId);
      removeFolder(selectedProjectId, folderId);
      await refreshProject();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleDeleteFile = async (folderId: string, fileId: string) => {
    if (!selectedProjectId) return;
    try {
      await deleteFile(selectedProjectId, folderId, fileId);
      removeFile(selectedProjectId, folderId, fileId);
      await refreshProject();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const renderNodes = (nodes: FileNode[]) => {
    return nodes.map(node => (
      <Node
        key={node.id}
        name={node.name}
        id={node.id}
        parentId={node.parentId}
        type={node.type}
        onClick={node.onClick}
        onContextMenu={node.onContextMenu}
        // eslint-disable-next-line react/no-children-prop
        children={node.children}
      />
    ));
  };

  return (
    <main>
      {selectedProject && renderNodes(convertProjectToNodes(selectedProject, handleContextMenu))}
      <div>{selectedFileContent}</div>
      {isCreatingFolder && (
        <div>
          <TextField
            size="small"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
            placeholder="폴더명 입력"
            onKeyPress={handleKeyPress}
          />
        </div>
      )}
      {isCreatingFile && (
        <div>
          <TextField
            size="small"
            value={newFileName}
            onChange={e => setNewFileName(e.target.value)}
            placeholder="파일명 입력"
            onKeyPress={handleKeyPress}
          />
        </div>
      )}

      <Menu
        open={contextMenuPosition !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenuPosition !== null
            ? { top: contextMenuPosition.mouseY, left: contextMenuPosition.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => setIsCreatingFolder(true)}>폴더 생성</MenuItem>
        <MenuItem onClick={() => setIsCreatingFile(true)}>파일 생성</MenuItem>
        <MenuItem onClick={() => handleDeleteFolder(currentParentId!)}>폴더 삭제</MenuItem>
        <MenuItem onClick={() => handleDeleteFile(currentParentId!, currentParentId!)}>파일 삭제</MenuItem>
        <MenuItem onClick={handleCloseContextMenu}>수정하기</MenuItem>
      </Menu>
    </main>
  );
};

//프로젝트를 노드로 만드는 함수
function convertProjectToNodes(
  project: Project,
  handleContextMenu: (event: React.MouseEvent<HTMLElement>, id: string, type: string) => void,
): FileNode[] {
  // 루트 폴더
  const rootFolders = project.folders.filter(folder => folder.parentId === null);

  // 각 루트 폴더에서부터 파일 트리를 구성
  return rootFolders.map(rootFolder => ({
    name: rootFolder.name,
    id: rootFolder.id,
    parentId: rootFolder.parentId,
    type: 'folder',
    onClick: (id: string) => handleNodeClick(id, project.files), // 노드 클릭 이벤트 처리
    onContextMenu: (event: React.MouseEvent<HTMLElement>) => handleContextMenu(event, rootFolder.id, 'folder'),
    children: convertFolderToNodes(project.folders, project.files, rootFolder.id),
  }));
}

//폴더를 노드로 바꾸는 함수
function convertFolderToNodes(folders: Folder[], files: File[], parentId: string): FileNode[] {
  const childrenFolders = folders.filter(folder => folder.parentId === parentId);
  const childrenFiles = files.filter(file => file.parentId === parentId);

  const folderNodes = childrenFolders.map(folder => ({
    name: folder.name,
    id: folder.id,
    parentId: folder.parentId,
    type: 'folder',
    onClick: (id: string) => handleNodeClick(id, files), // 노드 클릭 이벤트 처리
    children: convertFolderToNodes(folders, files, folder.id),
  }));

  const fileNodes = childrenFiles.map(file => ({
    name: file.name,
    id: file.id,
    parentId: file.parentId,
    type: 'file',
    onClick: (id: string) => handleNodeClick(id, files), // 노드 클릭 이벤트 처리
  }));

  return [...folderNodes, ...fileNodes];
}

//노드 렌더링
function Node({ name, id, type, onClick, onContextMenu, children }: FileNode) {
  const handleClick = () => {
    if (onClick) onClick(id);
  };
  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (onContextMenu) onContextMenu(event, id, type);
  };
  return (
    <FileTreeWrapper>
      <FileWrapper>
        <article
          className={type === 'file' ? 'file' : 'folder'}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          {type === 'file' ? (
            <InsertDriveFileOutlinedIcon fontSize="medium" />
          ) : (
            <FolderOpenOutlinedIcon fontSize="medium" />
          )}{' '}
          {name}
          {children && <div>{renderNodes(children)}</div>}
        </article>
      </FileWrapper>
    </FileTreeWrapper>
  );
}

function renderNodes(nodes: FileNode[]) {
  return nodes.map(node => (
    <Node
      key={node.id}
      name={node.name}
      id={node.id}
      parentId={node.parentId}
      type={node.type}
      onClick={node.onClick}
      onContextMenu={node.onContextMenu}
      // eslint-disable-next-line react/no-children-prop
      children={node.children}
    />
  ));
}

function handleNodeClick(id: string, files: File[]) {
  const clickedFile = files.find(file => file.id === id);
  if (clickedFile) {
    // 클릭된 파일의 내용을 가져오는 로직을 추가합니다.
  }
}

export default FileTree;
