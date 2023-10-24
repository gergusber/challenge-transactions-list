import React from 'react';

import NaiveRouter from './components/NaiveRouter';
import Navigation from './components/Navigation';

import './App.css';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Navigation />
      <NaiveRouter />
      <Toaster  position="bottom-center"/>
    </div>
  );
}

export default App;
