import { LanguageOptions } from '../const/LanguageOption';

const API_BASE_URL = 'https://emkc.org/api/v2/piston';

export const executeCode = async (language, sourceCode) => {
  try {
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
    if (!response.ok) {
      throw new Error('Failed to execute code');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
