import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Target, Users, CheckSquare, X as XIcon, Map, BarChart2, Flag, Settings, ChevronDown, ChevronRight, Home, Building, MapPin, LogIn, User, Lock, LogOut, Menu, Search, Phone, CheckCircle2, XCircle } from 'lucide-react';

// Import components
import LoginPage from './components/LoginPage';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import OrganizationalView from './components/OrganizationalView';
import MicroLevelDataView from './components/MicroLevelDataView';
import { mockData } from './data/mockData';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => {
        setIsAuthenticated(false);
        setActiveView('dashboard');
    };

    const handleDistrictClick = (districtName) => {
        setSelectedDistrict(districtName);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDistrict(null);
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView data={mockData} />;
            case 'org':
                return <OrganizationalView data={mockData.organizationalVoters} />;
            case 'micro':
                return <MicroLevelDataView />;
            default:
                return <DashboardView data={mockData} />;
        }
    }

    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <>
            <div className="bg-gray-900 flex h-screen font-sans">
                <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} isOpen={isSidebarOpen} />
                <main className="flex-1 bg-gray-800/20 flex flex-col overflow-y-auto">
                    {/* Main Header */}
                    <div className="bg-gray-800 text-white p-3 shadow-md sticky top-0 z-30 flex items-center">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-700 transition-colors mr-4">
                           {isSidebarOpen ? <XIcon size={20}/> : <Menu size={20}/>}
                        </button>
                        <h2 className="font-bold text-xl flex-1">
                           {
                             activeView === 'org' ? 'Organizational' : 
                             activeView === 'micro' ? 'Micro Level Data' : 
                             activeView.charAt(0).toUpperCase() + activeView.slice(1)
                           }
                        </h2>
                    </div>
                    
                    <div className="flex-1 bg-gray-900 text-white overflow-y-auto">
                        {renderView()}
                    </div>
                </main>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={`District Details: ${selectedDistrict}`}>
                <p>A detailed view for <strong>{selectedDistrict}</strong> would open here.</p>
                <p className="text-sm text-gray-400 mt-2">This is where specific analytics, local body data, and candidate information for the selected district would be displayed.</p>
                <button onClick={closeModal} className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg">Close</button>
            </Modal>
        </>
    );
}