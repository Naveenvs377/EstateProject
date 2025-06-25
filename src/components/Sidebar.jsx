import React from 'react';
import { Home, CheckSquare, Search, LogOut } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, onLogout, isOpen }) => {
    const navItems = [
        { name: 'Dashboard', icon: Home, view: 'dashboard' },
        { name: 'Organizational', icon: CheckSquare, view: 'org' },
        { name: 'Micro Level Data', icon: Search, view: 'micro' },
    ];
    
    const NavLink = ({ item }) => (
        <button 
            onClick={() => setActiveView(item.view)}
            className={`w-full flex items-center text-left px-4 py-2.5 rounded-md transition-colors duration-200 ${
                activeView === item.view ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
        >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="flex-1">{item.name}</span>
        </button>
    );

    return (
        <div className={`bg-gray-900 text-white flex flex-col p-4 shadow-2xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 p-0 overflow-hidden'}`}>
            <div className="flex items-center mb-8 px-2 min-w-max">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/512px-Bharatiya_Janata_Party_logo.svg.png"
                      alt="BJP Logo" 
                      className="h-10 w-10 mr-3"
                 />
                <div>
                    <h1 className="font-bold text-lg leading-tight text-orange-500">Mission 2025</h1>
                    <p className="text-xs text-gray-400">Kerala Local Body Elections</p>
                </div>
            </div>
            <nav className="flex-1 space-y-2">
                {navItems.map(item => <NavLink key={item.name} item={item} />)}
            </nav>
            <div className="mt-auto">
                <div className="p-3 bg-gray-800 rounded-lg flex items-center">
                    <img className="h-10 w-10 rounded-full object-cover" 
                         src="https://placehold.co/100x100/F97316/FFFFFF?text=RC" 
                         alt="User Avatar" />
                    <div className="ml-3">
                        <p className="font-semibold text-white">State President</p>
                        <p className="text-xs text-gray-400">Rajeev Chandrasekhar</p>
                    </div>
                </div>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center text-left px-4 py-2.5 mt-4 rounded-md text-red-400 hover:bg-red-500/20 transition-colors duration-200"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-semibold">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;