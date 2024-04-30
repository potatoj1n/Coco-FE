import Editor, { EditorProps } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { CODE_SNIPPETS } from '../const/LanguageOption';
import useLanguageStore from '../store/IdeStore';

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  autoIndent: 'full',
  automaticLayout: true,
  contextmenu: true,
  fontFamily: 'Pretendard',
  fontSize: 16,
  lineHeight: 20,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: false,
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
        theme={'vs-dark'}
        value={CODE_SNIPPETS[language] || ''}
        onMount={onMount}
        options={MONACO_OPTIONS}
      />
    </div>
  );
};
