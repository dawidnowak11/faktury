import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, FileText, Users, Settings, BarChart2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  
  const navItems = [
    { name: t('nav.dashboard'), path: '/', icon: <Home size={20} /> },
    { name: t('nav.invoices'), path: '/invoices', icon: <FileText size={20} /> },
    { name: t('nav.clients'), path: '/clients', icon: <Users size={20} /> },
    { name: t('nav.reports'), path: '/reports', icon: <BarChart2 size={20} /> }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 z-40 h-full w-64 transform border-r border-gray-200 
          bg-white transition-transform duration-200 ease-in-out dark:border-gray-800 
          dark:bg-gray-900 md:static md:translate-x-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500">Blinq</h1>
        </div>
        
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;