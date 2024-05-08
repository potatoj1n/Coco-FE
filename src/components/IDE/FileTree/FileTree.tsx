import { FC, useState, useEffect } from 'react';
import Entry, { TFiles, files } from './Entry';
// import { fetchFileTree } from '../IDE/FiletreeApi';

const FileTree: FC = () => {
  //   const [fileTree, setFileTree] = useState<TFiles | null>(null);
  //   const [projectId, setProjectId] = useState<string | null>(null); // 프로젝트 ID 상태 추가

  //   useEffect(() => {
  //     const getProjectId = async (): Promise<string> => {
  //       try {
  //         const id = await getProjectId(); // 프로젝트 ID 가져오기
  //         setProjectId(id); // 프로젝트 ID 상태 업데이트
  //         return id; // 프로젝트 ID 반환
  //       } catch (error) {
  //         console.error('Error fetching project ID:', error);
  //         throw error;
  //       }
  //     };

  //     getProjectId();
  //   }, []);

  //   useEffect(() => {
  //     const getFileTree = async () => {
  //       try {
  //         const data = await fetchFileTree(projectId); // 파일 트리 데이터를 가져오는 API 호출
  //         setFileTree(data); // 파일 트리 상태 업데이트
  //       } catch (error) {
  //         console.error('Error fetching file tree:', error);
  //       }
  //     };

  //     getFileTree();
  //   }, []);

  //   return (
  //     <div>
  //       <h1>File Tree</h1>
  //       {fileTree ? <Entry entry={fileTree} depth={0} /> : <p>Loading...</p>}
  //     </div>
  //   );
  // };

  // eslint-disable-next-line react/jsx-key
  return <div style={{ padding: '10px' }}>{files.children?.map(entry => <Entry entry={entry} depth={1} />)}</div>;
};
export default FileTree;
