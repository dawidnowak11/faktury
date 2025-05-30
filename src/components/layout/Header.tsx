import React from 'react';
import { Moon, Sun, Menu, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="md:hidden mr-2" 
          onClick={onMenuToggle}
          aria-label={t('common.actions.menu')}
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Blinq</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          aria-label={t('header.language')}
          className="rounded-full p-2"
        >
          <Languages size={20} className="text-gray-500 dark:text-gray-400" />
          <span className="ml-2 text-sm">{i18n.language.toUpperCase()}</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('header.theme.light') : t('header.theme.dark')}
          className="rounded-full p-2"
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-500" />
          )}
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;