import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LanguageOptions } from '../../const/LanguageOption';
import useLanguageStore from '../../state/IDE/IdeStore';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useTheTheme } from '../Theme';
import useProjectStore from '../../state/IDE/ProjectState';
import { CreateContainer, CreateCustomButton } from './IdeStyle';
import { createProject } from './CodeApi';

interface Props {
  onSelectChange: (language: string) => void;
  onClose: () => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelectChange, onClose }) => {
  const { themeColor } = useTheTheme();
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [newProjectName, setNewProjectName] = useState('');
  const { addProject } = useProjectStore();

  //언어 선택 이벤트
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    onSelectChange(selectedLanguage);
  };
  //생성하기 버튼 이벤트
  const handleCreateProject = async () => {
    if (newProjectName.trim() === '') {
      alert('프로젝트명을 입력하세요.');
      return;
    }

    const newProject = {
      id: Math.random().toString(),
      name: newProjectName,
      language: language,
      folders: [],
    };
    try {
      await createProject(newProject);
      addProject(newProject);
      setNewProjectName('');
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <CreateContainer>
      <h1 className="text-2xl">새 프로젝트 생성하기 </h1>
      <h2 className="text-lg">새 프로젝트 명</h2>
      <TextField
        placeholder="새 프로젝트 명"
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#28b381',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#28b381',
            },
            backgroundColor: themeColor === 'light' ? '#ffffff' : '#243B56',
            color: themeColor === 'light' ? 'black' : '#76ECC2',
          },
        }}
        onChange={e => setNewProjectName(e.target.value)}
      ></TextField>
      <h2 className="text-lg">언어 선택</h2>
      <Select
        value={language}
        onChange={handleChange}
        placeholder={`Filter By Category`}
        size="small"
        sx={{
          '& .MuiSelect-select': {
            backgroundColor: themeColor === 'light' ? '#ffffff' : '#ffffff',
            color: themeColor === 'light' ? 'black' : 'black',
          },
          '& .MuiOutlinedInput-root': {
            borderColor: '#28b381',
          },
          maxWidth: 'max-content',
        }}
      >
        {LanguageOptions.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <span className="flex justify-end gap-3">
        <Link to="/ide">
          <CreateCustomButton className="bg-green-500" onClick={handleCreateProject}>
            생성 하기
          </CreateCustomButton>
        </Link>
        <CreateCustomButton className="text-green-500" onClick={onClose}>
          취소 하기
        </CreateCustomButton>
      </span>
    </CreateContainer>
  );
};

export default LanguageSelector;
