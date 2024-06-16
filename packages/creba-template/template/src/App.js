import logo from './logo.svg';
import './App.css';
import Reblend, { useState } from 'reblendjs';

function App() {
  const [i, setState] = useState(0);
  setInterval(() => {
    setState(i + 1);
  }, 1000);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
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
