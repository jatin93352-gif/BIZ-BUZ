import React from 'react';
import { LayoutDashboard, Users, BarChart3, Settings, X, PlusCircle, Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userEmail?: string;
  businessName?: string;
  category?: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, userEmail, businessName, category, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Add Customer', path: '/add-customer', icon: <PlusCircle size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:block flex flex-col justify-between shadow-xl
        `}
      >
        <div>
          <div className="flex items-center justify-between h-20 px-6 bg-slate-950 border-b border-slate-800">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-emerald-400">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <Building2 size={18} />
                </div>
                <span className="truncate max-w-[140px]" title={businessName || 'PulseMate'}>
                  {businessName || 'PulseMate'}
                </span>
              </div>
              {category && <span className="text-xs text-slate-500 mt-0.5 ml-10 truncate max-w-[140px]">{category}</span>}
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="px-3 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive(item.path) 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3 px-2">
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-sm font-bold shadow-inner">
                {userEmail ? userEmail[0].toUpperCase() : 'U'}
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="text-sm text-slate-200 truncate font-medium">{userEmail?.split('@')[0]}</p>
                <button onClick={onLogout} className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors">Sign Out</button>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;