import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LanguageOptions } from '../../const/LanguageOption';
import useLanguageStore from '../../state/IDE/IdeStore';
import { TextField } from '@mui/material';
import { useTheTheme } from '../Theme';
import useProjectStore from '../../state/IDE/ProjectState';
import { CreateCustomButton } from './IdeStyle';
import { createProject } from './CodeApi';
import { useNavigate } from 'react-router-dom';
import { CreateContainer, Overlay, modalRoot } from '../ModalOverlay';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
  onSelectChange: (language: string) => void;
  onClose: () => void;
}
const FontColor = styled.h1`
  color: ${({ theme }) => (theme.themeColor === 'dark' ? '#FFFFFF' : '#000000')};
`;
const LanguageSelector: React.FC<Props> = ({ onSelectChange, onClose }) => {
  const { themeColor } = useTheTheme();
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [newProjectName, setNewProjectName] = useState('');
  const { addProject } = useProjectStore();
  const navigate = useNavigate();

  const [closing, setClosing] = useState(false);
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };
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
      temporaryId: Math.random().toString(),
      name: newProjectName,
      language: language,
      folders: [],
      files: [],
    };
    try {
      const createdProject = await createProject(newProject);
      //임시 프로젝트 id에서 백엔드에서 생성한 프로젝트 id로
      createdProject.id = createdProject.realProjectId;
      delete createdProject.realProjectId;

      addProject(createdProject);
      setNewProjectName('');
      onClose();
      navigate(`/ide/${createdProject.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return ReactDOM.createPortal(
    <Overlay closing={closing}>
      <CreateContainer onClick={e => e.stopPropagation()} closing={closing}>
        <FontColor className="text-2xl font-pretendard font-normal ">새 프로젝트 생성하기</FontColor>
        <FontColor className="text-lg font-pretendard font-normal">새 프로젝트 명</FontColor>
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
          <CreateCustomButton className="bg-green-500 font-pretendard font-normal" onClick={handleCreateProject}>
            생성 하기
          </CreateCustomButton>

          <CreateCustomButton className="text-green-500 font-pretendard font-normal" onClick={handleClose}>
            취소 하기
          </CreateCustomButton>
        </span>
      </CreateContainer>
    </Overlay>,
    modalRoot,
  );
};

export default LanguageSelector;
