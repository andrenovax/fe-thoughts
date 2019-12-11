import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createAppStore } from "./config/orm";

createAppStore();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
