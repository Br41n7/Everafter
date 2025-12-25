
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Venues from './pages/Venues.tsx';
import Vendors from './pages/Vendors.tsx';
import Guests from './pages/Guests.tsx';
import Planner from './pages/Planner.tsx';
import Travel from './pages/Travel.tsx';
import EventPlanner from './pages/EventPlanner.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { RoleProvider } from './context/RoleContext.tsx';

const App: React.FC = () => {
  return (
    <RoleProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/customizer" element={<EventPlanner />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>
        </Layout>
      </Router>
    </RoleProvider>
  );
};

export default App;
