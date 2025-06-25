import Reblend from 'reblendjs';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App container bg-light font-monospace">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
