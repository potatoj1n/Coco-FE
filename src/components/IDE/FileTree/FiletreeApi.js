export const fetchFileTree = async projectId => {
  try {
    const response = await fetch(`/api/file-tree/${projectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch file tree');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching file tree:', error);
    throw error;
  }
};
