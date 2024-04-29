import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LanguageOptions } from '../const/LanguageOption';

interface Props {
  onSelectChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelectChange }) => {
  const [language, setLanguage] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    onSelectChange(selectedLanguage);
  };

  return (
    <div>
      <Select value={language} onChange={handleChange} placeholder={`Filter By Category`} label="Language">
        {LanguageOptions.map(option => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSelector;
