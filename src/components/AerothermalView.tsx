import React from 'react';
import { motion } from 'motion/react';
import { Wind, Droplets, Thermometer, Zap, ArrowRight, Home, Settings, ShieldCheck } from 'lucide-react';

export default function AerothermalView() {
  return (
    <div className="space-y-32 py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6 space-y-8"
          >
            <span className="text-primary font-bold tracking-widest text-xs uppercase">El futuro en tu casa</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-stone-900">
              Energía infinita <br />
              <span className="text-primary">extraída del aire.</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
              La aerotermia es una tecnología limpia que extrae hasta el 77% de la energía ambiental del aire exterior para climatizar tu hogar y producir agua caliente sanitaria, incluso en temperaturas bajo cero.
            </p>
            <div className="flex gap-4">
              <div className="bg-stone-100 p-4 rounded-2xl flex items-center gap-3">
                <Zap className="text-primary w-5 h-5" />
                <span className="font-bold text-sm">COP hasta 5.0</span>
              </div>
              <div className="bg-stone-100 p-4 rounded-2xl flex items-center gap-3">
                <Wind className="text-tertiary w-5 h-5" />
                <span className="font-bold text-sm">Energía Renovable</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="/assets/Monoblock.jpg" 
                alt="Aerothermal outdoor unit in garden"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xs font-bold uppercase tracking-widest mb-2">Unidad Monoblock</p>
                <p className="text-xl font-bold">Integración estética en jardines y terrazas modernas.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works: Compression Cycle */}
      <section className="bg-stone-900 text-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Compresión Milimétrica: El corazón del sistema.</h2>
              <p className="text-stone-400 text-lg leading-relaxed">
                Mediante un ciclo termodinámico cerrado, un gas refrigerante absorbe el calor del aire exterior (incluso si está frío). Al comprimirse este gas de forma milimétrica, su temperatura aumenta drásticamente, transfiriendo ese calor al agua de tu hogar.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Evaporación", desc: "El aire exterior calienta el refrigerante líquido." },
                  { title: "Compresión", desc: "Se eleva la presión y temperatura del gas." },
                  { title: "Condensación", desc: "El calor se transfiere al agua del circuito doméstico." },
                  { title: "Expansión", desc: "El refrigerante se enfría para reiniciar el ciclo." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{step.title}</h4>
                      <p className="text-sm text-stone-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-stone-800 p-8 rounded-[2.5rem] border border-stone-700">
                <div className="aspect-video bg-stone-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Simplified Schematic Animation Placeholder */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)]" />
                  <div className="z-10 text-center space-y-4">
                    <Settings className="w-16 h-16 text-primary mx-auto animate-spin-slow" />
                    <p className="text-xs font-bold tracking-widest uppercase text-stone-500">Esquema de Ciclo Termodinámico</p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-primary">ACS</p>
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Agua Caliente</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-secondary">HEAT</p>
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Calefacción</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-tertiary">COOL</p>
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Refrigeración</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Schematic */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold tracking-tighter text-stone-900 mb-4">Distribución Inteligente</h2>
          <p className="text-stone-500">Desde la unidad exterior monoblock hasta cada rincón de tu hogar.</p>
        </div>

        <div className="bg-stone-100 p-8 md:p-16 rounded-[3rem] relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Wind className="text-primary" />
                </div>
                <h4 className="font-bold text-stone-900">Unidad Exterior</h4>
                <p className="text-sm text-stone-500 mt-2">Equipo Monoblock que realiza todo el intercambio térmico en el exterior.</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="text-stone-300 rotate-90 lg:rotate-0" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <Droplets className="text-secondary" />
                </div>
                <h4 className="font-bold text-stone-900">Depósitos de Gestión</h4>
                <ul className="text-sm text-stone-500 mt-2 space-y-2">
                  <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Tanque de Inercia (Clima)</li>
                  <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Acumulador ACS (Ducha/Grifos)</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="text-stone-300 rotate-90 lg:rotate-0" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-4">
                  <Home className="text-tertiary" />
                </div>
                <h4 className="font-bold text-stone-900">Emisores Finales</h4>
                <p className="text-sm text-stone-500 mt-2">Distribución mediante suelo radiante, radiadores de baja temperatura o fancoils.</p>
              </div>
            </div>
          </div>
          
          {/* Visual Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[25%] right-[25%] h-0.5 bg-stone-200 -z-10" />
        </div>
      </section>

      {/* COP & Profitability */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-stone-50">
              <img 
                src="/assets/FRONT AEROTERMIA.png" 
                alt="Modern terrace with heat pump"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-primary text-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-2xl">
              <p className="text-2xl md:text-4xl font-black">400%</p>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Rendimiento</p>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-extrabold tracking-tighter text-stone-900">¿Qué es el COP y por qué es tan rentable?</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              El COP (Coefficient of Performance) mide la eficiencia. Un COP de 4 significa que por cada 1kW de electricidad que pagas, el sistema entrega 4kW de calor a tu casa.
            </p>
            
            <div className="space-y-4">
              <div className="p-6 bg-white border border-stone-200 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-stone-900">vs. Calderas de Gas</h4>
                  <p className="text-sm text-stone-500">Ahorro del 60% en facturas mensuales.</p>
                </div>
                <div className="text-tertiary font-black text-xl">+60%</div>
              </div>
              <div className="p-6 bg-white border border-stone-200 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-stone-900">vs. Suelo Radiante Eléctrico</h4>
                  <p className="text-sm text-stone-500">4 veces más eficiente que la resistencia directa.</p>
                </div>
                <div className="text-tertiary font-black text-xl">x4</div>
              </div>
            </div>

            <p className="text-sm text-stone-400 italic">
              * La aerotermia no genera calor mediante combustión o resistencia, simplemente lo transporta del exterior al interior, lo que la hace imbatible en eficiencia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
