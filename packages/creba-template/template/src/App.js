import logo from './logo.svg';
import './App.css';
import Reblend, { useState } from 'reblendjs';
import Alert from './Alert';

function App() {
  const [i, setState] = useState(0);
  setInterval(() => {
    setState(i + 1);
  }, 1000);
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Alert show={showAlert}>Happy Reblend</Alert>
        <p
          onmouseover={() => setShowAlert(true)}
          onmouseout={() => setShowAlert(false)}
        >
          Edit <code>src/App.js</code> and save to reload. {i}
        </p>
        <a
          className="App-link"
          href="https://reblendjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reblend
        </a>
      </header>
    </div>
  );
}

export default App;
