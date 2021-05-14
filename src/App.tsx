import React, { useEffect } from 'react';
import './App.css';
import Config from './pages/Config/Config';
import { useLocalStorage } from './custom-hooks/useLocalStorage';

function App() {
  const [directInvitationUrl, setDirectInvitationUrl] = useLocalStorage('directInvitationUrl');

  useEffect(() => {
    console.log({ directInvitationUrl });
  }, [directInvitationUrl]);

  return (
    <div className="App">
      {!directInvitationUrl && <Config setDirectInvitationUrl={setDirectInvitationUrl}/>}
      {directInvitationUrl && <span>ToDo</span>}
    </div>
  );
}

export default App;
