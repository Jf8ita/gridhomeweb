import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Upload, ArrowRight } from 'lucide-react';

export default function CalculatorView() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    project: ''
  });
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Consulta Técnica GridHome - ${formData.name}`);
    const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nResumen del Proyecto:\n${formData.project}`);
    
    window.location.href = `mailto:jeanochoaf@gmail.com?subject=${subject}&body=${body}`;
    setIsSent(true);
    
    // Reset after some time
    setTimeout(() => setIsSent(false), 5000);
  };

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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nombre Completo</label>
              <input 
                required
                className="w-full bg-stone-50 border-none rounded-xl h-14 px-4 focus:ring-2 focus:ring-primary/20" 
                placeholder="Juan Pérez" 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Profesional</label>
              <input 
                required
                className="w-full bg-stone-50 border-none rounded-xl h-14 px-4 focus:ring-2 focus:ring-primary/20" 
                placeholder="juan@empresa.com" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Resumen del Proyecto</label>
              <textarea 
                required
                className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20" 
                placeholder="Cuéntanos sobre los requisitos de tu proyecto..." 
                rows={4} 
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer group relative overflow-hidden">
                <Upload className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-stone-900">Subir Planos</p>
                <p className="text-xs text-stone-500 mt-1">PDF, DXF o JPG de alta resolución (Máx 50MB)</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
            <div className="md:col-span-2">
              <button 
                type="submit"
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-4 ${isSent ? 'bg-secondary text-white' : 'bg-stone-900 text-white hover:bg-black'}`}
              >
                {isSent ? '¡Listo para enviar!' : 'Enviar Solicitud'}
                <ArrowRight className={`w-6 h-6 ${isSent ? 'rotate-90' : ''} transition-transform`} />
              </button>
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
