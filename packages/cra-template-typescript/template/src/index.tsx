import Scansio from 'scansio';
import ScansioDOM from 'scansio-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ScansioDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Scansio.StrictMode>
    <App />
  </Scansio.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
