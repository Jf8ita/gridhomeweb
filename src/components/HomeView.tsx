import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Zap, Thermometer, Layers, Home as HomeIcon, Wind } from 'lucide-react';

interface HomeViewProps {
  onExplore: (sectionId: string) => void;
}

export default function HomeView({ onExplore }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'no-inertia',
      title: "Suelo radiante sin inercia",
      subtitle: "Respuesta inmediata",
      desc: "Sistema seco sin vertido de hormigón. Lámina de aluminio difusora sobre aislamiento ranurado para un control térmico dinámico y ligero.",
      image: "/assets/Suelo radiante sin inercia.png",
      icon: <Layers className="w-6 h-6" />,
      stats: { val: "Instantáneo", label: "Tiempo de Respuesta" }
    },
    {
      id: 'inertia',
      title: "Suelo radiante con inercia",
      subtitle: "Confort constante",
      desc: "Distribución sobre aislamiento y malla con hormigón autonivelante. La losa actúa como batería térmica para una estabilidad inigualable.",
      image: "/assets/Suelo radiante con Inercia.jpg",
      icon: <Zap className="w-6 h-6" />,
      stats: { val: "24h", label: "Estabilidad Térmica" }
    },
    {
      id: 'radiators',
      title: "Radiadores de Baja Temperatura",
      subtitle: "Eficiencia Renovada",
      desc: "Emisores de aluminio diseñados para trabajar a 35-45°C. La solución perfecta para reformas sin obra pesada manteniendo un alto confort.",
      image: "/assets/Radiadores y Fancoils.png",
      icon: <Thermometer className="w-6 h-6" />,
      stats: { val: "45°C", label: "Impulso Típico" }
    },
    {
      id: 'fancoils',
      title: "Fancoils",
      subtitle: "Climatización Activa",
      desc: "Equipos dinámicos de suelo o techo que permiten calefacción y refrigeración rápida. Ideales para estancias de uso ocasional.",
      image: "/assets/Fancoil.png", 
      icon: <Wind className="w-6 h-6" />,
      stats: { val: "Dual", label: "Calor & Frío" }
    },
    {
      id: 'electric',
      title: "Suelo Radiante Eléctrico",
      subtitle: "Calor Directo",
      desc: "Sistema mediante resistencias bajo el suelo. La solución perfecta para estancias pequeñas o reformas rápidas sin necesidad de agua.",
      image: "/assets/suelo_radiante_electrico_ceramica.webp", 
      icon: <Zap className="w-6 h-6" />,
      stats: { val: "Simple", label: "Instalación" }
    },
    {
      id: 'hybrid',
      title: "Integración Completa",
      subtitle: "El hogar del futuro",
      desc: "Hibridación total: Aerotermia + ACS + Calefacción + Fotovoltaica. Máximo ahorro mediante gestión inteligente de excedentes.",
      image: "/assets/Sistema completo 1.jpg",
      icon: <HomeIcon className="w-6 h-6" />,
      stats: { val: "Zero", label: "Emisiones Locales" }
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 16000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero Section / Slider */}
      <section className="relative min-h-screen lg:min-h-[850px] bg-stone-50 overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:absolute lg:inset-0 pt-32 pb-32 lg:pt-0 lg:pb-0 flex items-center"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              <div className="lg:col-span-5 space-y-8 z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold tracking-widest uppercase"
                >
                  Slide 0{currentSlide + 1} / 0{slides.length} — {slides[currentSlide].subtitle}
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tighter text-stone-900"
                >
                  {slides[currentSlide].title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="text-primary">{slides[currentSlide].title.split(' ').slice(-1)}</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-stone-600 max-w-md leading-relaxed"
                >
                  {slides[currentSlide].desc}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-6 items-center"
                >
                  <button 
                    onClick={() => onExplore(slides[currentSlide].id)}
                    className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-container transition-all shadow-xl shadow-primary/20"
                  >
                    Explorar Sistema
                  </button>
                  <div className="flex gap-4">
                    <button onClick={prevSlide} className="p-3 rounded-full border border-stone-200 hover:bg-white transition-colors">
                      <ArrowLeft className="w-5 h-5 text-stone-600" />
                    </button>
                    <button onClick={nextSlide} className="p-3 rounded-full border border-stone-200 hover:bg-white transition-colors">
                      <ArrowRight className="w-5 h-5 text-stone-600" />
                    </button>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="lg:col-span-7 relative"
              >
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-50/20 to-transparent" />
                  
                  {/* Info Card Overlay */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-4 max-w-[180px] md:max-w-xs border border-white/20"
                  >
                    <div className="bg-primary/10 p-2 md:p-3 rounded-lg md:rounded-xl">
                      {React.cloneElement(slides[currentSlide].icon as React.ReactElement, { className: "w-4 h-4 md:w-6 md:h-6" })}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-sm md:text-base">{slides[currentSlide].stats.val}</p>
                      <p className="text-[10px] md:text-xs text-stone-500">{slides[currentSlide].stats.label}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-500 shadow-sm ${currentSlide === i ? 'w-12 bg-primary' : 'w-4 bg-stone-300'}`}
            />
          ))}
        </div>
      </section>

      {/* Smart Ecosystem Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="bg-stone-100 p-8 rounded-[3rem] relative">
              <img 
                src="/assets/aerotermia-con-suelo-radiante.jpg" 
                alt="Aerotermia con suelo radiante"
                className="rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -right-4 bottom-6 md:-right-8 md:bottom-12 w-40 md:w-64 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-2 md:border-4 border-stone-900">
                <div className="flex justify-between items-center mb-3 md:mb-6">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-primary rounded-sm md:rounded-md" />
                  <span className="text-[6px] md:text-[8px] font-black text-stone-400 tracking-widest uppercase">Gridhome OS</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-primary/5 p-3 md:p-4 rounded-xl md:rounded-2xl">
                    <p className="text-[6px] md:text-[8px] font-bold text-primary uppercase tracking-wider mb-0.5 md:mb-1">Temperatura Actual</p>
                    <p className="text-xl md:text-3xl font-black text-primary">22.5°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <span className="text-tertiary font-bold tracking-widest text-xs uppercase">Smart Ecosystem</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-stone-900 tracking-tighter leading-tight">
              Tu hogar se autogestiona para el máximo ahorro.
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              Integramos unidades exteriores aerotérmicas con paneles fotovoltaicos y control inteligente. El sistema aprende de tus hábitos y del clima para optimizar el consumo de energía en tiempo real.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
