import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';

import AuthorityDashboard from './pages/AuthorityDashboard';
import PilgrimGuidance from './pages/PilgrimGuidance';

function App() {
    return (
        <>
            <div className="background-layer"></div>

            <Routes>
                {/* Public Routes with Global Layout */}
                <Route element={
                    <div className="app-container">
                        <Header />
                        <Outlet />
                        <Footer />
                    </div>
                }>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* Protected/Dashboard Routes - Use their own Layout */}
                <Route path="/dashboard" element={<AuthorityDashboard />} />
                <Route path="/pilgrim-guidance" element={<PilgrimGuidance />} />
            </Routes>
        </>
    );
}

export default App;
