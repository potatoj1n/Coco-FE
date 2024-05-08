import React, { useState } from 'react';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
export type TFiles = {
  name: string;
  children?: TFiles[];
};
export const files: TFiles = {
  name: 'root',
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: '.bin',
        },
        {
          name: '.cache',
        },
      ],
    },
    {
      name: 'public',
      children: [
        {
          name: 'index.html',
        },
        {
          name: 'robots.tsx',
        },
      ],
    },
    {
      name: 'src',
      children: [
        {
          name: 'components',
        },
      ],
    },
  ],
};

type EntryProps = {
  entry: TFiles;
  depth: number;
};

const Entry: React.FC<EntryProps> = ({ entry, depth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <>
      <div style={{ paddingLeft: `${depth * 15}px` }} className="text-base">
        <button onClick={toggleExpansion}>
          {entry.children && (
            <span>
              <FolderOutlinedIcon />
            </span>
          )}
          <span>{entry.name}</span>
        </button>
      </div>
      {isExpanded && entry.children && (
        <div>
          {entry.children.map(child => (
            <Entry key={child.name} entry={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
};

export default Entry;
