import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ActionCable from "actioncable";
import { CHANNEL_URL } from "./utils/constants";

const cableApp = {}
cableApp.cable = ActionCable.createConsumer(CHANNEL_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App cable={cableApp.cable} />
    </BrowserRouter>
  </React.StrictMode>
);
