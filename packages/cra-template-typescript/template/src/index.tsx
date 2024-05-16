import Reblend from 'reblend';
import ReblendDOM from 'reblend-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReblendDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Reblend.StrictMode>
    <App />
  </Reblend.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CREBA-vitals
reportWebVitals();
