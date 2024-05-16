export const fetchFileTree = async projectId => {
  try {
    const response = await fetch(`https://k40d5114c4212a.user-app.krampoline.com/api/${projectId}`);
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
