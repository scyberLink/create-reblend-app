import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Reblend from 'reblendjs';

Reblend.mounOn('root', <App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CREBA-vitals
reportWebVitals();
