import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Config from './pages/Config/Config';
import { ConfigModel } from './pages/Config/config.model';
import { useLocalStorage } from './custom-hooks/useLocalStorage';

function App() {
  const [config, setConfig] = useLocalStorage<ConfigModel | undefined>('config');

  return (
    <div className="App">
      {!(config?.whatsappSentType) && <Config config={config} setConfig={setConfig}/>}

      {config?.whatsappSentType && <span>ToDo</span>}

      {/* TODO - Remove this before merging to master branch */}
      <button onClick={() => setConfig(undefined as any)}>Clear</button>
    </div>
  );
}

export default App;
