import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LanguageOptions } from '../const/LanguageOption';
import { styled } from 'styled-components';
import useLanguageStore from '../store/IdeStore';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useTheTheme } from './Theme';

interface Props {
  onSelectChange: (language: string) => void;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 0.5px solid;
  width: 500px;
  height: 400px;
  padding: 30px;
  background-color: ${props => props.theme.backgroundColor};
`;
const CustomButton = styled.div`
  border: 1px solid #28b381;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
`;

const LanguageSelector: React.FC<Props> = ({ onSelectChange }) => {
  const { themeColor } = useTheTheme();
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    onSelectChange(selectedLanguage);
  };
  return (
    <Container>
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
          <CustomButton className="bg-green-500">생성 하기</CustomButton>
        </Link>
        <CustomButton className="text-green-500">취소 하기</CustomButton>
      </span>
    </Container>
  );
};

export default LanguageSelector;
