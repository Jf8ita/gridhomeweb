import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Globe, Mail, MapPin, Phone, ArrowRight, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Layout({ children, currentPath, onNavigate }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'technology', label: 'Tecnología' },
    { id: 'aerothermal', label: 'Aerotermia' },
    { id: 'calculator', label: 'Información' },
  ];

  const handleMobileNavigate = (path: string) => {
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-24 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img 
              src="/assets/Logo base.png" 
              alt="GRIDHOME Logo" 
              className="h-20 w-auto object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <span className="text-[11px] font-bold text-primary tracking-widest hidden sm:block uppercase pt-1">Calentando Hogares</span>
          </div>
          
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-semibold transition-colors ${currentPath === item.id ? 'text-primary border-b-2 border-primary' : 'text-stone-600 hover:text-stone-900'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-stone-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-stone-200"
            >
              <nav className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => handleMobileNavigate(item.id)}
                    className={`text-left text-lg font-bold py-2 ${currentPath === item.id ? 'text-primary' : 'text-stone-900'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <footer className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="text-lg font-bold text-stone-900">GRIDHOME PERU S.A.C</div>
              <p className="text-stone-500 text-sm leading-relaxed">
                Transformando hogares en ecosistemas climáticos inteligentes y sostenibles. Ingeniería europea al servicio del confort.
              </p>
              <div className="flex gap-4">
                <Share2 className="w-5 h-5 text-stone-400 hover:text-primary cursor-pointer transition-colors" />
                <Globe className="w-5 h-5 text-stone-400 hover:text-primary cursor-pointer transition-colors" />
                <Mail className="w-5 h-5 text-stone-400 hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="font-headline font-bold text-stone-900 mb-6">Explorar</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => onNavigate('home')} className="text-stone-500 hover:text-primary transition-colors">Inicio</button></li>
                <li><button onClick={() => onNavigate('technology')} className="text-stone-500 hover:text-primary transition-colors">Tecnología</button></li>
                <li><button onClick={() => onNavigate('aerothermal')} className="text-stone-500 hover:text-primary transition-colors">Aerotermia</button></li>
                <li><button onClick={() => onNavigate('calculator')} className="text-stone-500 hover:text-primary transition-colors">Información</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-stone-900 mb-6">Contáctanos</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3 items-center text-stone-500">
                  <MapPin className="w-4 h-4" />
                  AV San Felipe 637 Jesus María, Lima, Perú
                </li>
                <li className="flex gap-3 items-center text-stone-500">
                  <Phone className="w-4 h-4" />
                  +51972494017
                </li>
                <li className="flex gap-3 items-center text-stone-500">
                  <Mail className="w-4 h-4" />
                  jeanochoaf@gmail.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-stone-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><button className="text-stone-500 hover:text-primary transition-colors">Política de Privacidad</button></li>
                <li><button className="text-stone-500 hover:text-primary transition-colors">Especificaciones Técnicas</button></li>
                <li><button className="text-stone-500 hover:text-primary transition-colors">Soporte</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">
              © GRIDHOME PERU Calentando hogares.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
