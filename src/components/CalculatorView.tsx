import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Upload, ArrowRight } from 'lucide-react';

export default function CalculatorView() {
  return (
    <div className="space-y-32 py-20">
      {/* Information Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-extrabold tracking-tighter text-stone-900 mb-6">Información Técnica y Consultoría</h1>
          <p className="text-lg text-stone-500">Todo lo que necesitas saber para transformar tu hogar en un espacio energéticamente eficiente.</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-4xl font-extrabold tracking-tighter mb-4 text-stone-900">Agenda tu consultoría técnica personalizada</h2>
        <p className="text-stone-500 mb-12">Obtén un estudio de viabilidad detallado y mapeo térmico de nuestros ingenieros.</p>
        
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-stone-200 text-left border border-stone-100">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nombre Completo</label>
              <input className="w-full bg-stone-50 border-none rounded-xl h-14 px-4 focus:ring-2 focus:ring-primary/20" placeholder="Juan Pérez" type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Profesional</label>
              <input className="w-full bg-stone-50 border-none rounded-xl h-14 px-4 focus:ring-2 focus:ring-primary/20" placeholder="juan@empresa.com" type="email" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Resumen del Proyecto</label>
              <textarea className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20" placeholder="Cuéntanos sobre los requisitos de tu proyecto..." rows={4} />
            </div>
            <div className="md:col-span-2">
              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-stone-900">Subir Planos</p>
                <p className="text-xs text-stone-500 mt-1">PDF, DXF o JPG de alta resolución (Máx 50MB)</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <a 
                href="mailto:jeanochoaf@gmail.com"
                className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black text-xl hover:bg-black transition-all flex items-center justify-center gap-4 cursor-pointer"
              >
                Enviar Solicitud
                <ArrowRight className="w-6 h-6" />
              </a>
              <p className="text-center text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-8">
                Nuestro equipo técnico suele responder en 24-48 horas laborables con una evaluación preliminar.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
