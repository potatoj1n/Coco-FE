import React, { useEffect } from 'react';
import useProjectStore, { ProjectStore, Folder, File, Project } from '../../../state/IDE/ProjectState';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

interface FileNode {
  name: string;
  id: string;
  parentId: string | null;
  onClick?: (id: string) => void;
  children?: FileNode[];
}

export default function FileTree() {
  const { projects, selectedFileContent, fetchFileContent }: ProjectStore = useProjectStore();

  useEffect(() => {
    // 여기서 초기 데이터를 가져오는 것은 선택사항입니다.
    // 필요하다면 해당 데이터를 가져오는 로직을 추가할 수 있습니다.
  }, []);

  const renderNodes = (nodes: FileNode[]) => {
    return nodes.map(node => (
      <Node key={node.id} name={node.name} id={node.id} parentId={node.parentId} onClick={node.onClick} />
    ));
  };

  return (
    <main>
      {projects.map(project => renderNodes(convertProjectToNodes(project)))}
      <div>{selectedFileContent}</div>
    </main>
  );
}
function convertProjectToNodes(project: Project): FileNode[] {
  // 루트 폴더를 찾습니다.
  const rootFolders = project.folders.filter(folder => folder.parentId === null);

  // 각 루트 폴더에서부터 파일 트리를 구성합니다.
  return rootFolders.map(rootFolder => ({
    name: rootFolder.name,
    id: rootFolder.id,
    parentId: rootFolder.parentId,
    onClick: (id: string) => handleNodeClick(id, project.files), // 노드 클릭 이벤트 처리
    children: convertFolderToNodes(project.folders, project.files, rootFolder.id),
  }));
}

function convertFolderToNodes(folders: Folder[], files: File[], parentId: string): FileNode[] {
  const childrenFolders = folders.filter(folder => folder.parentId === parentId);
  const childrenFiles = files.filter(file => file.parentId === parentId);

  const folderNodes = childrenFolders.map(folder => ({
    name: folder.name,
    id: folder.id,
    parentId: folder.parentId,
    onClick: (id: string) => handleNodeClick(id, files), // 노드 클릭 이벤트 처리
    children: convertFolderToNodes(folders, files, folder.id),
  }));

  const fileNodes = childrenFiles.map(file => ({
    name: file.name,
    id: file.id,
    parentId: file.parentId,
    onClick: (id: string) => handleNodeClick(id, files), // 노드 클릭 이벤트 처리
  }));

  return [...folderNodes, ...fileNodes];
}

function Node({ name, id, parentId, onClick }: FileNode) {
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <article className={parentId ? 'file' : 'folder'} onClick={handleClick}>
      {parentId ? <TextSnippetOutlinedIcon /> : <FolderOutlinedIcon />} {name}
    </article>
  );
}

function handleNodeClick(id: string, files: File[]) {
  // 클릭된 노드의 ID를 기반으로 파일의 내용을 가져오거나 에디터에 표시하는 로직을 추가할 수 있습니다.
  const clickedFile = files.find(file => file.id === id);
  if (clickedFile) {
    // 클릭된 파일의 내용을 가져오는 로직을 추가합니다.
  }
}
