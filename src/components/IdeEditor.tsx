import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

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
export default function IdeEditor() {
  const onChange = (newCode?: string) => {
    console.log('onChange', newCode);
  };
  return (
    <div className="h-auto w-screen">
      <Editor language="java" theme={'vs-dark'} onChange={onChange} options={MONACO_OPTIONS} />
    </div>
  );
}
