/* eslint-disable prefer-const */
import axios from 'axios';
import { create } from 'zustand';
const API_BASE_URL = 'http://43.201.76.117:8080/api';
const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

interface Project {
  id: string;
  name: string;
  language: string;
  folders: Folder[];
  files: File[];
}

interface Folder {
  id: string;
  name: string;
  files: File[];
  type: string;
  parentId: string;
}

interface File {
  id: string;
  name: string;
  type: string;
  code: string;
  parentId: string;
}
interface ProjectData {
  projectId: string;
  projectName: string;
  language: string;
}
interface FolderData {
  folderId: string;
  folderName: string;
  parentId: string | null;
}

interface FileData {
  fileId: string;
  fileName: string;
  parentId: string | null;
  type: string;
  code: string;
}

interface ProjectStore {
  projects: Project[];
  selectedProjectId: string | null;
  selectedFolderId: string | null;
  selectedFileId: string | null;
  selectedFileName: string | null;
  selectedFileContent: string | null;
  addProject: (project: Project) => void;
  loadProjects: () => Promise<void>;
  selectProject: (projectId: string) => Promise<void>;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, newData: Partial<Project>) => void;
  addFolder: (projectId: string, folder: Folder) => void;
  removeFolder: (projectId: string, folderId: string) => void;
  updateFolder: (projectId: string, folderId: string, newData: Partial<Folder>) => void;
  addFile: (projectId: string, folderId: string, file: File) => void;
  removeFile: (projectId: string, folderId: string, fileId: string) => void;
  updateFile: (projectId: string, folderId: string, fileId: string, newData: Partial<File>) => void;
  selectFile: (fileId: string | null, fileName: string | null, fileContent: string | null) => void;
  deselectFile: () => void;
  fetchFileContent: (projectId: string, folderId: string, fileId: string) => void;
  setFileContent: (content: string) => void;
}

const useProjectStore = create<ProjectStore>(set => ({
  projects: [],
  selectedProjectId: null,
  selectedFolderId: null,
  selectedFileId: null,
  selectedFileName: null,
  selectedFileContent: null,
  addProject: project =>
    set(state => {
      const newState = { projects: [...state.projects, project] };
      console.log('Updated projects list:', newState.projects);
      return newState;
    }),

  removeProject: projectId => set(state => ({ projects: state.projects.filter(p => p.id !== projectId) })),
  updateProject: (projectId, newData) =>
    set(state => ({
      projects: state.projects.map(p => (p.id === projectId ? { ...p, ...newData } : p)),
    })),
  addFolder: (projectId, folder) =>
    set(state => ({
      projects: state.projects.map(p => (p.id === projectId ? { ...p, folders: [...p.folders, folder] } : p)),
    })),
  removeFolder: (projectId, folderId) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId ? { ...p, folders: p.folders.filter(f => f.id !== folderId) } : p,
      ),
    })),

  updateFolder: (projectId, folderId, newName) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f => (f.id === folderId ? { ...f, ...newName } : f)),
            }
          : p,
      ),
    })),
  loadProjects: async () => {
    let memberId = 1;
    try {
      const response = await axios.get<ProjectData[]>(`${API_BASE_URL}/projects?memberId=${memberId}`, {
        headers: { Authorization: `Basic ${Token}` },
      });
      const projects = response.data.map(
        (project: ProjectData): Project => ({
          id: project.projectId,
          name: project.projectName,
          language: project.language, // 언어 정보가 없으면 빈 문자열로 초기화
          folders: [], // 초기 폴더는 비어있음
          files: [], // 초기 파일도 비어있음
        }),
      );
      set({ projects });
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  },
  selectProject: async (projectId: string) => {
    try {
      // 프로젝트 정보 요청
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`, {
        headers: { Authorization: `Basic ${Token}` },
      });
      const { folders, files } = response.data;

      // 폴더와 파일 정보를 스토어에 추가
      const projectFolders: Folder[] = folders.map((folder: FolderData) => ({
        id: folder.folderId,
        name: folder.folderName,
        files: [],
        parentId: folder.parentId || null,
      }));
      const projectFiles: File[] = files.map((file: FileData) => ({
        id: file.fileId,
        name: file.fileName,
        type: file.type,
        code: file.code,
        parentId: file.parentId || null,
      }));

      // 프로젝트의 폴더와 파일 목록을 업데이트
      set(state => ({
        selectedProjectId: projectId,
        selectedFolderId: projectFolders.length > 0 ? projectFolders[0].id : null,
        projects: state.projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              folders: projectFolders,
              files: projectFiles,
            };
          }
          return project;
        }),
      }));
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  },

  addFile: (projectId, folderId, file) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f => (f.id === folderId ? { ...f, files: [...f.files, file] } : f)),
            }
          : p,
      ),
    })),
  removeFile: (projectId, folderId, fileId) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f =>
                f.id === folderId ? { ...f, files: f.files.filter(fi => fi.id !== fileId) } : f,
              ),
            }
          : p,
      ),
    })),
  updateFile: (projectId, folderId, fileId, newName) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f =>
                f.id === folderId
                  ? { ...f, files: f.files.map(fi => (fi.id === fileId ? { ...fi, ...newName } : fi)) }
                  : f,
              ),
            }
          : p,
      ),
    })),
  selectFile: (fileId, fileName, fileContent) =>
    set({
      selectedFileId: fileId,
      selectedFileName: fileName,
      selectedFileContent: fileContent,
    }),
  deselectFile: () =>
    set({
      selectedFileId: null,
      selectedFileName: null,
      selectedFileContent: null,
    }),
  fetchFileContent: async (projectId: string, folderId: string, fileId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}`, {
        headers: { Authorization: `Basic ${Token}` },
      });
      console.log('Response data:', response.data);
      const fileCode = response.data;
      set(state => {
        const file = state.projects.find(project => project.id === projectId)?.files.find(file => file.id === fileId);

        if (file) {
          return {
            selectedFileId: fileId,
            selectedFileName: file.name,
            selectedFileContent: fileCode,
          };
        }

        return {};
      });
      console.log(fileCode);
    } catch (error) {
      console.error('Error fetching file content:', error);
      set({ selectedFileContent: 'Failed to fetch content' });
    }
  },
  setFileContent: (content: string) => set({ selectedFileContent: content }),
}));

export default useProjectStore;
export type { ProjectStore, Project, Folder, File };
