import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Home, Heart, Lightbulb, Store, MessageCircle, Building, MapPin, User, ShoppingCart, Menu, Globe, LogOut, ChevronDown, Activity, Hospital, Shield, Moon, Sun } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar: React.FC = () => {
  const { t, language, setLanguage, languageNames, availableLanguages, currentLanguageName } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [pincodeOpen, setPincodeOpen] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState('Select Pincode');

  const navItems = [
    { path: '/', label: t.home, icon: Home },
    { path: '/symptoms', label: t.symptomTracker, icon: Activity },
    { path: '/tips', label: t.healthTips, icon: Lightbulb },
    { path: '/store', label: t.medicineStore, icon: Store },
    { path: '/assistant', label: t.aiAssistant, icon: MessageCircle },
    { path: '/schemes', label: t.schemes, icon: Building },
    { path: '/nearby', label: t.nearbyHospitals, icon: MapPin },
  ];

  const moreItems = [
    { path: '/', label: t.home, icon: Home },
    { path: '/schemes', label: t.sarkariYojana, icon: Shield },
    { path: '/nearby', label: t.nearbyHospitals, icon: Hospital },
  ];

  const isActive = (path: string) => location.pathname === path;

  const languageFlags: Record<string, string> = {
    hi: '🇮🇳',
    en: '🇬🇧',
    bn: '🇧🇩',
    mr: '🇮🇳',
    bho: '🇮🇳',
    mai: '🇮🇳',
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">{language === 'en' ? 'Swasthya Saathi' : t.appName}</span>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="w-4 h-4" />
                <span>{currentLanguageName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                  <span className="mr-2">{languageFlags[lang]}</span>
                  {languageNames[lang]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">{user?.name?.split(' ')[0] || 'User'}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">{t.myProfile}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>{t.logout}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{itemCount}</span>
            )}
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm"><Menu className="w-5 h-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{language === 'en' ? 'Swasthya Saathi' : t.appName}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button variant={isActive(item.path) ? 'secondary' : 'ghost'} className="w-full justify-start gap-2">{item.label}</Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex container mx-auto justify-center gap-4 py-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button variant={isActive(item.path) ? 'secondary' : 'ghost'}>{item.label}</Button>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
