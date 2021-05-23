import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Config from './pages/Config/Config';
import { ConfigModel } from './pages/Config/config.model';
import { useLocalStorage } from './custom-hooks/useLocalStorage';
import WebsiteTester from './pages/WebsiteTester/WebsiteTester';

function App() {
  const [config, setConfig] = useLocalStorage<ConfigModel | undefined>('config');

  return (
    <div className="App">
      {config?.whatsappSentType ? <WebsiteTester config={config}/> : <Config config={config} setConfig={setConfig}/>}
    </div>
  );
}

export default App;
