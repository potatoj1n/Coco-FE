import axios from 'axios';

const API_BASE_URL = 'http://13.125.162.255:8080/api';

export const saveCode = async (sourceCode, fileId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/savecode`, {
      sourceCode: sourceCode,
      fileId: fileId,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to save code:', error);
    throw error;
  }
};

export const createProject = async projectData => {
  try {
    const response = await axios.post(`${API_BASE_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    alert('Failed to create project');
    throw error;
  }
};

export const createFolder = async (projectId, folderName, parentId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/folders`, {
      name: folderName,
      parentId: parentId,
    });
    console.log('새로운 폴더가 생성되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('폴더 생성 중 오류 발생:', error);
    throw error;
  }
};

export const createFile = async (projectId, folderId, fileName, fileContent) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/files`, {
      name: fileName,
      content: fileContent,
      parentId: folderId,
    });
    console.log('새로운 파일이 생성되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('파일 생성 중 오류 발생:', error);
    throw error;
  }
};
