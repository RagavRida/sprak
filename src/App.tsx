import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AgentStore } from './pages/AgentStore';
import { Profile } from './pages/Profile';
import { Contribute } from './pages/Contribute';
import { Layout } from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="store" element={<AgentStore />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contribute" element={<Contribute />} />
      </Route>
    </Routes>
  );
}

export default App;