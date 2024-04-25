import React from 'react';
import './styles/App.css';
import { RouterProvider } from 'react-router-dom';
import Routers from './Router';

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={Routers}></RouterProvider>
    </div>
  );
}
