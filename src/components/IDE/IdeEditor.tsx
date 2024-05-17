import Editor, { EditorProps, loader, useMonaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import tomorrowTheme from 'monaco-themes/themes/Tomorrow.json';
import tomorrowDarkTheme from 'monaco-themes/themes/Night Owl.json';
import { useEffect, useRef } from 'react';
import useLanguageStore from '../../state/IDE/IdeStore';
import { useTheTheme } from '../Theme';
import useProjectStore from '../../state/IDE/ProjectState';
import { EditorButton } from './IdeStyle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

loader.config({
  paths: {
    vs: '/monaco-editor/min/vs',
  },
});

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  autoIndent: 'full',
  automaticLayout: true,
  contextmenu: true,
  fontSize: 14,
  lineHeight: 20,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: true,
  },
  readOnly: false,
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
};
interface SelectedFileState {
  selectedFileId: string | null;
  selectedFileContent: string | null;
  selectedFileName: string | null;
  deselectFile: () => void;
  setFileContent: (content: string) => void;
}
export const IdeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);

  const { selectedFileId, selectedFileContent, selectedFileName, deselectFile, setFileContent } =
    useProjectStore<SelectedFileState>(state => ({
      selectedFileId: state.selectedFileId,
      selectedFileContent: state.selectedFileContent,
      selectedFileName: state.selectedFileName,
      deselectFile: state.deselectFile,
      setFileContent: state.setFileContent,
    }));

  //테마
  const { themeColor } = useTheTheme();
  const monaco = useMonaco();
  // 테마 설정
  useEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme('tomorrow', tomorrowTheme as monaco.editor.IStandaloneThemeData);
    monaco.editor.defineTheme('nightOwl', tomorrowDarkTheme as monaco.editor.IStandaloneThemeData);
    monaco.editor.setTheme('tomorrow');
  }, [monaco]);
  //언어 선택
  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  //파일 선택
  useEffect(() => {
    console.log(`File selected: ${selectedFileId}`);
    if (selectedFileId && editorRef.current) {
      editorRef.current.setValue(selectedFileContent || '');
      editorRef.current.focus();
    }
  }, [selectedFileId, selectedFileContent]);
  //파일 닫기
  const handleCloseFile = () => {
    deselectFile();
    if (editorRef.current) {
      editorRef.current.setValue('');
    }
  };

  //컴포넌트가 마운트 되었을 때의 콜백함수
  const onMount: EditorProps['onMount'] = editor => {
    editorRef.current = editor;
    editor.onDidBlurEditorText(() => {
      const value = editor.getValue();
      setFileContent(value);
    });
    editor.focus();
  };

  return (
    <div className="h-3/5 w-screen overflow-scroll">
      <EditorButton>
        {selectedFileName ? `${selectedFileName}` : 'Untitled'}
        <IconButton size="small" onClick={handleCloseFile}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </EditorButton>
      {selectedFileId && (
        <Editor
          language={language || 'javascript'}
          theme={themeColor === 'light' ? 'tomorrow' : 'nightOwl'}
          value={selectedFileContent || ''}
          path={selectedFileId || ''}
          defaultValue={selectedFileContent || ''}
          onMount={onMount}
          options={MONACO_OPTIONS}
        />
      )}
    </div>
  );
};
