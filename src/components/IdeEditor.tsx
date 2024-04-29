import Editor, { EditorProps } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useRef, useState } from 'react';
import { CODE_SNIPPETS } from '../const/LanguageOption';

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
  const [value] = useState<string>('');
  const [language] = useState<string>('javascript');

  const onMount: EditorProps['onMount'] = editor => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-auto w-screen">
      <Editor
        language={language || 'javascript'}
        theme={'vs-dark'}
        value={value}
        onMount={onMount}
        defaultValue={CODE_SNIPPETS[language] || ''}
        options={MONACO_OPTIONS}
      />
    </div>
  );
};
