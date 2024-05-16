export const fetchFileTree = async projectId => {
  try {
    const response = await fetch(`http://http://13.125.162.255:8080/api/${projectId}`);
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
