import React from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Home from '@/page/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
