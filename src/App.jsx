import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import CodeEditorTabs from './CodeEditorTabs';


function App() {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);
  return (
    <div className='grid grid-cols-2 bg-gray-800 p-5 py-0 gap-5'>
      <CodeEditorTabs/>
      <div className="inline-block py-5 px-2 text-sm text-gray-500 ">
        <h1>Consola: </h1>
        <CodeMirror readOnly="true" className='scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thin rounded-md' height='590px' value="console.log('hello world!');" theme="dark" onChange={onChange} />
      </div>
      
    </div>
    
  );
}
export default App;