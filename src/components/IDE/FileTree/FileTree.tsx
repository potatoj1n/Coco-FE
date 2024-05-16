import React, { useEffect, useState } from 'react';
import useProjectStore, { ProjectStore, Folder, File, Project } from '../../../state/IDE/ProjectState';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Menu, MenuItem } from '@mui/material';
import { FileTreeWrapper, FileWrapper } from '../IdeStyle';

interface FileNode {
  name: string;
  id: string;
  parentId: string | null;
  type: string;
  onClick?: (id: string) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  children?: FileNode[];
}

interface Props {
  isCreatingFolder: boolean;
  toggleFolderCreation: () => void;
  newFolderName: string;
  setNewFolderName: React.Dispatch<React.SetStateAction<string>>;
  newFileName: string;
  setNewFileName: React.Dispatch<React.SetStateAction<string>>;
  handleCreateFolder: () => void;
  handleCreateFile: () => void;
}

const FileTree: React.FC<Props> = ({
  toggleFolderCreation,
  handleCreateFile,
  isCreatingFolder,
  newFolderName,
  setNewFolderName,
  newFileName,
  setNewFileName,
  handleCreateFolder,
}) => {
  const {
    projects,
    selectedProjectId,
    selectedFileContent,
    // fetchFileContent
  } = useProjectStore(state => ({
    projects: state.projects,
    selectedProjectId: state.selectedProjectId,
    selectedFileContent: state.selectedFileContent,
    // fetchFileContent: state.fetchFileContent,
  }));
  const [contextMenuPosition, setContextMenuPosition] = useState<{ mouseX: number; mouseY: number } | null>(null);

  const selectedProject = projects.find(project => project.id === selectedProjectId);

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    setContextMenuPosition({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition(null);
  };

  const handleCreateFolderMenuClick = () => {
    toggleFolderCreation();
  };

  return (
    <main>
      {selectedProject && renderNodes(convertProjectToNodes(selectedProject, handleContextMenu))}
      <div>{selectedFileContent}</div>

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
        <MenuItem onClick={handleCreateFolderMenuClick}>폴더 생성</MenuItem>
        <MenuItem onClick={handleCreateFile}>파일 생성</MenuItem>
        <MenuItem onClick={handleCloseContextMenu}>삭제하기</MenuItem>
        <MenuItem onClick={handleCloseContextMenu}>수정하기</MenuItem>
      </Menu>
    </main>
  );
};

//프로젝트를 노드로 만드는 함수
function convertProjectToNodes(
  project: Project,
  handleContextMenu: (event: React.MouseEvent<HTMLElement>, id: string) => void,
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
    onContextMenu: (event: React.MouseEvent<HTMLElement>) => handleContextMenu(event, rootFolder.id),
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
    if (onContextMenu) onContextMenu(event, id);
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
          {children && <div>{renderNodes(children)}</div>}{' '}
        </article>
      </FileWrapper>
    </FileTreeWrapper>
  );
}

// 재귀적으로 노드를 렌더링하는 함수
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
  // 클릭된 노드의 ID를 기반으로 파일의 내용을 가져오거나 에디터에 표시하는 로직을 추가할 수 있습니다.
  const clickedFile = files.find(file => file.id === id);
  if (clickedFile) {
    // 클릭된 파일의 내용을 가져오는 로직을 추가합니다.
  }
}

export default FileTree;
