import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false); 
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language.toUpperCase();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng.toLowerCase());
    setIsOpen(false); 
  };

  return (
    <nav className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} shadow-md sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold italic text-red-600">
              {t('app_name', 'Global News')}
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-sm">
            <Link to="/" className="hover:text-red-600 transition">{t('nav.home', 'Home')}</Link>
            <Link to="/Contact" className="hover:text-red-600 transition">{t('nav.Contact', 'Contact')}</Link>
            <Link to="/SearchNews" className="hover:text-red-600 transition">{t('nav.search', 'Search')}</Link>
            <Link to="/LiveNews" className="hover:text-red-600 transition">{t('nav.live', 'Live')}</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-1 border rounded-lg p-1 bg-gray-50 dark:bg-gray-800">
              {["EN", "RW", "FR"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2 py-1 text-xs font-bold rounded transition ${
                    currentLanguage.includes(lang) ? "bg-red-600 text-white" : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
             <button onClick={() => setDarkMode(!darkMode)} className="p-2">
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-2xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`md:hidden border-t ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"} px-4 pt-2 pb-6 space-y-4`}>
          <div className="flex flex-col gap-4 font-semibold pt-2">
            <Link to="/" onClick={() => setIsOpen(false)}>{t('nav.home', 'Home')}</Link>
            <Link to="/world" onClick={() => setIsOpen(false)}>{t('nav.world', 'World')}</Link>
            <Link to="/SearchNews" onClick={() => setIsOpen(false)}>{t('nav.search', 'Search')}</Link>
            <Link to="/LiveNews" onClick={() => setIsOpen(false)}>{t('nav.live', 'Live')}</Link>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs mb-2 opacity-70">Select Language:</p>
            <div className="flex gap-2">
              {["EN", "RW", "FR"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`flex-1 py-2 rounded border ${
                    currentLanguage.includes(lang) ? "bg-red-600 text-white border-red-600" : "border-gray-300"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}