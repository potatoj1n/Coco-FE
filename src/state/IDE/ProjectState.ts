import axios from 'axios';
import { create } from 'zustand';

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

interface SelectedFileStore {
  selectedFileId: string | null;
  selectedFileName: string | null;
  selectedFileContent: string | null;
  selectFile: (fileId: string) => void;
  fetchFileContent: (fileId: string) => void;
}

const useSelectedFileStore = create<SelectedFileStore>(set => ({
  selectedFileId: null,
  selectedFileName: null,
  selectedFileContent: null,
  selectFile: fileId => set({ selectedFileId: fileId }),
  fetchFileContent: async fileId => {
    try {
      const response = await axios.get(`/api/files/${fileId}`);
      const fileContent = response.data.content;
      set(state => ({
        selectedFileId: state.selectedFileId, // 선택된 파일 ID는 변경되지 않으므로 유지
        selectedFileName: state.selectedFileName,
        fetchFileContent: state.fetchFileContent,
        selectedFileContent: fileContent,
      }));
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  },
}));

export default useProjectStore;
export { useFolderStore, useFileStore, useSelectedFileStore };
export type { ProjectStore, FolderStore, FileStore, SelectedFileStore };
