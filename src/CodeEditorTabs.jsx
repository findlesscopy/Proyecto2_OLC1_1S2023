import { useState } from 'react';
import CodeEditor from './CodeEditor';

function TabPanel({ value, index, children }) {
  return <div hidden={value !== index}>{children}</div>;
}

function CodeEditorTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([{ title: 'Tab 1' }]);

  function handleChangeTab(event, newActiveTab) {
    setActiveTab(newActiveTab);
  }

  function handleAddTab() {
    setTabs([...tabs, { title: `Tab ${tabs.length + 1}` }]);
  }

  function handleRemoveTab(index) {
    setTabs(tabs.filter((tab, i) => i !== index));
    setActiveTab(Math.max(0, activeTab - 1));
  }

  return (
    <div className="relative">
  {tabs.map((tab, index) => (
    <div
    key={index}
    className="inline-block py-1 px-2 text-sm text-gray-500 hover:bg-gray-200 cursor-pointer"
    onClick={() => setActiveTab(index)}
  >
    {tab.title}
    <button
      className="inline-block ml-2 px-1 py-0.5 rounded-full text-xs text-gray-500 hover:text-white hover:bg-gray-500 focus:outline-none"
      onClick={(e) => {
        e.stopPropagation();
        handleRemoveTab(index);
      }}
    >
      x
    </button>
  </div>
  ))}
  <button
    className="inline-block py-2 px-4 text-gray-800 hover:bg-gray-200 cursor-pointer"
    onClick={handleAddTab}
  >
    +
  </button>
  {tabs.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          <CodeEditor/>
        </TabPanel>
      ))}
</div>

  );
}

export default CodeEditorTabs;