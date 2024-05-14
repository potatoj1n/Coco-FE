import axios from 'axios';
import { create } from 'zustand';

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
  content: string;
  parentId: string;
}
interface ProjectData {
  projectId: string;
  projectName: string;
}

interface ProjectStore {
  projects: Project[];
  selectedProjectId: string | null;
  selectedFileId: string | null;
  selectedFileName: string | null;
  selectedFileContent: string | null;
  addProject: (project: Project) => void;
  loadProjects: () => Promise<void>;
  selectProject: (projectId: string) => void;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, newData: Partial<Project>) => void;
  addFolder: (projectId: string, folder: Folder) => void;
  removeFolder: (projectId: string, folderId: string) => void;
  updateFolder: (projectId: string, folderId: string, newData: Partial<Folder>) => void;
  addFile: (projectId: string, folderId: string, file: File) => void;
  removeFile: (projectId: string, folderId: string, fileId: string) => void;
  updateFile: (projectId: string, folderId: string, fileId: string, newData: Partial<File>) => void;
  selectFile: (fileId: string, fileName: string) => void;
  fetchFileContent: (fileId: string) => void;
}

const useProjectStore = create<ProjectStore>(set => ({
  projects: [],
  selectedProjectId: null,
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
  updateFolder: (projectId, folderId, newData) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f => (f.id === folderId ? { ...f, ...newData } : f)),
            }
          : p,
      ),
    })),
  loadProjects: async () => {
    try {
      const response = await axios.get<ProjectData[]>('http://13.125.162.255:8080/api/projects');
      const projects = response.data.map(
        (project: ProjectData): Project => ({
          id: project.projectId,
          name: project.projectName,
          language: '', // 언어 정보가 없으면 빈 문자열로 초기화
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
      const response = await axios.get(`http://13.125.162.255:8080/api/projects/${projectId}`);
      const { folders, files } = response.data;

      // 폴더와 파일 정보를 스토어에 추가
      const projectFolders: Folder[] = folders.map((folder: any) => ({
        folderId: folder.folderId,
        folderName: folder.folderName,
        parentId: folder.parentId,
      }));
      const projectFiles: File[] = files.map((file: any) => ({
        fileId: file.fileId,
        fileName: file.fileName,
        parentId: file.parentId,
      }));

      // 프로젝트의 폴더와 파일 목록을 업데이트
      set(state => ({
        selectedProjectId: projectId,
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
  updateFile: (projectId, folderId, fileId, newData) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f =>
                f.id === folderId
                  ? { ...f, files: f.files.map(fi => (fi.id === fileId ? { ...fi, ...newData } : fi)) }
                  : f,
              ),
            }
          : p,
      ),
    })),
  selectFile: (fileId, fileName) =>
    set({
      selectedFileId: fileId,
      selectedFileName: fileName,
      selectedFileContent: null,
    }),
  fetchFileContent: async fileId => {
    try {
      const response = await axios.get(`/api/files/${fileId}`);
      const fileContent = response.data.content;
      set({ selectedFileContent: fileContent });
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  },
}));

export default useProjectStore;
export type { ProjectStore, Project, Folder, File };
