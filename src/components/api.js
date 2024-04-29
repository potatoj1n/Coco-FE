import { LanguageOptions } from '../const/LanguageOption';

const API_BASE_URL = 'https://emkc.org/api/v2/piston';

export const executeCode = async (language, sourceCode) => {
  const response = await fetch(`${API_BASE_URL}/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: language,
      version: LanguageOptions[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    }),
  });
  return response.data;
};
