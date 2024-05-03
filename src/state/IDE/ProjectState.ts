import create from 'zustand';

interface Project {
  id: string;
  name: string;
  language: string;
  folders: Folder[];
}

interface Folder {
  id: string;
  name: string;
  files: File[];
}

interface File {
  id: string;
  name: string;
  content: string;
}
interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, newData: Partial<Project>) => void;
}
const useProjectStore = create<ProjectStore>(set => ({
  projects: [],
  addProject: project => set(state => ({ projects: [...state.projects, project] })),
  removeProject: projectId => set(state => ({ projects: state.projects.filter(p => p.id !== projectId) })),
  updateProject: (projectId, newData) =>
    set(state => ({
      projects: state.projects.map(p => (p.id === projectId ? { ...p, ...newData } : p)),
    })),
}));

interface FolderStore {
  folders: Folder[];
  addFolder: (folder: Folder) => void;
  removeFolder: (folderId: string) => void;
  updateFolder: (folderId: string, newData: Partial<Folder>) => void;
}
const useFolderStore = create<FolderStore>(set => ({
  folders: [],
  addFolder: folder => set(state => ({ folders: [...state.folders, folder] })),
  removeFolder: folderId => set(state => ({ folders: state.folders.filter(f => f.id !== folderId) })),
  updateFolder: (folderId, newData) =>
    set(state => ({
      folders: state.folders.map(f => (f.id === folderId ? { ...f, ...newData } : f)),
    })),
}));

interface FileStore {
  files: File[];
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  updateFile: (fileId: string, newData: Partial<File>) => void;
}

const useFileStore = create<FileStore>(set => ({
  files: [],
  addFile: file => set(state => ({ files: [...state.files, file] })),
  removeFile: fileId => set(state => ({ files: state.files.filter(f => f.id !== fileId) })),
  updateFile: (fileId, newData) =>
    set(state => ({
      files: state.files.map(f => (f.id === fileId ? { ...f, ...newData } : f)),
    })),
}));

export default useProjectStore;
export { useFolderStore, useFileStore };
export type { ProjectStore, FolderStore, FileStore };
