import axios from 'axios';

const API_BASE_URL = 'http://43.201.76.117:8080/api';
const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

export const saveCode = async (projectId, folderId, fileId, sourceCode) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}/content`,
      {
        code: sourceCode,
      },
      { headers: { Authorization: `Basic ${Token}` } },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to save code:', error);
    throw error;
  }
};
export const fetchRunCode = async (projectId, folderId, fileId, language, sourceCode) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/projects/${projectId}/folders/${folderId}/files/${fileId}`,
      {
        language: language,
        input: sourceCode,
      },
      {
        headers: {
          Authorization: `Basic ${Token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Success');
    return response.data;
  } catch (error) {
    console.error('Failed to run code:', error);
    throw error;
  }
};
export const createProject = async projectData => {
  try {
    const response = await axios.post(`${API_BASE_URL}/projects`, {
      header: { Authorization: `Basic ${Token}` },
      projectData,
    });
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
      header: { Authorization: `Basic ${Token}` },
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
    const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files`, {
      header: { Authorization: `Basic ${Token}` },
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
export const deleteFolder = async (projectId, folderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}`, {
      header: { Authorization: `Basic ${Token}` },
    });
    console.log('폴더가 삭제되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('폴더 삭제 중 오류 발생:', error);
    throw error;
  }
};

export const deleteFile = async (projectId, folderId, fileId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}`, {
      header: { Authorization: `Basic ${Token}` },
    });
    console.log('파일이 삭제되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('파일 삭제 중 오류 발생:', error);
    throw error;
  }
};

export const updateFolderName = async (projectId, folderId, newName) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}/name`, {
      header: { Authorization: `Basic ${Token}` },
      newName: newName,
    });
    console.log('폴더명 수정 완료', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update folder name:', error);
  }
};

export const updateFileName = async (projectId, folderId, fileId, newName) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}/name`,
      { header: { Authorization: `Basic ${Token}` }, newName: newName },
    );
    console.log('파일명 수정 완료', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update file name:', error);
  }
};
