import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

function CodeEditor({ defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');

  function handleChange(editor, data, value) {
    setValue(value);
  }

  return (
    <CodeMirror value={value} className='scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thin rounded-md' 
    height='590px' 
    theme="dark" onChange={handleChange} />
    
  );
}

export default CodeEditor;