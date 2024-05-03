import Editor, { EditorProps, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { CODE_SNIPPETS } from '../const/LanguageOption';
import useLanguageStore from '../state/IDE/IdeStore';
import { useTheTheme } from './Theme';

loader.config({
  paths: {
    vs: '/monaco-editor/min/vs',
  },
});

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  autoIndent: 'full',
  automaticLayout: true,
  contextmenu: true,
  fontSize: 16,
  lineHeight: 24,
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

export const IdeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);
  const { themeColor } = useTheTheme();

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  const onMount: EditorProps['onMount'] = editor => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-3/5 w-screen overflow-scroll">
      <Editor
        language={language || 'javascript'}
        theme={themeColor === 'light' ? 'light' : 'vs-dark'}
        value={CODE_SNIPPETS[language] || ''}
        onMount={onMount}
        options={MONACO_OPTIONS}
      />
    </div>
  );
};
