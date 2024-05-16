export const fetchFileTree = async projectId => {
  try {
    const response = await fetch(`https://keb96172d8b65a.user-app.krampoline.com/api/${projectId}`);
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
