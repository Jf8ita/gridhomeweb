import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ShieldCheck, Zap, Thermometer, Info, Layers, Wind, Check, X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface TechnologyViewProps {
  expandedSection?: string | null;
}

export default function TechnologyView({ expandedSection }: TechnologyViewProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!tableRef.current) return;
    
    try {
      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('analisis-comparativo-gridhome.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    if (expandedSection) {
      setOpenSection(expandedSection);
      const element = document.getElementById('engineered-systems');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [expandedSection]);

  const systems = [
    { 
      id: 'inertia',
      title: "Suelo Radiante con Inercia (Sistema Húmedo)", 
      desc: "El estándar de oro del confort térmico.", 
      icon: <Zap className="w-6 h-6" />,
      quote: "Utiliza la estructura de tu hogar como un acumulador de energía, liberando calor de forma constante y uniforme. Ideal para viviendas permanentes que buscan la máxima eficiencia.",
      functioning: "Tubos de polietileno embebidos en una capa de mortero de cemento de 4-7 cm. El mortero absorbe el calor y lo libera lentamente (inercia térmica).",
      pros: ["Máximo Confort: Calor radiante desde los pies", "Ahorro Extremo: Trabaja a temperaturas de 30-35°C", "Inercia: La casa sigue caliente por horas tras apagarlo"],
      cons: ["Respuesta lenta: Tarda horas en alcanzar temperatura", "Obra Mayor: Requiere construcción nueva o reforma pesada"],
      ideal: "Viviendas habituales con ocupación continua."
    },
    { 
      id: 'no-inertia',
      title: "Suelo Radiante sin Inercia (Sistema Seco)", 
      desc: "Calor inteligente y de respuesta rápida.", 
      icon: <Layers className="w-6 h-6" />,
      quote: "Diseñado para quienes necesitan confort inmediato sin esperar horas. Al no tener mortero, es el sistema más ligero y eficiente para reformas y oficinas.",
      functioning: "Los tubos se instalan sobre paneles aislantes con difusores de aluminio y el acabado (parquet o laminado) va directamente encima.",
      pros: ["Rapidez: Se calienta y enfría casi como un radiador", "Bajo Perfil: Solo ocupa unos 3 cm de altura", "Peso: Perfecto para estructuras de madera o pisos altos"],
      cons: ["Baja Inercia: Pierde calor rápidamente al apagar el sistema"],
      ideal: "Oficinas, casas de fin de semana o departamentos donde no se quiere perder altura."
    },
    { 
      id: 'radiators',
      title: "Radiadores de Baja Temperatura", 
      desc: "La evolución de la calefacción tradicional.", 
      icon: <Thermometer className="w-6 h-6" />,
      quote: "Diseñados para trabajar en armonía con la aerotermia, ofrecen una instalación limpia y eficiente sin necesidad de tocar tus suelos.",
      functioning: "Radiadores de aluminio con superficie ampliada que permite calentar usando agua a solo 45°C (en lugar de los 70°C antiguos).",
      pros: ["Instalación Sencilla: Sin reformas estructurales", "Costo Inicial: La opción de inversión (CAPEX) más equilibrada"],
      cons: ["Estética: Ocupan espacio en las paredes", "Distribución: El calor se concentra cerca del emisor"],
      ideal: "Reformas donde se quiere mantener el suelo actual pero migrar a aerotermia."
    },
    { 
      id: 'fancoils',
      title: "Fan Coils (Agua-Aire)", 
      desc: "Versatilidad total: calefacción y refrigeración.", 
      icon: <Wind className="w-6 h-6" />,
      quote: "La solución técnica perfecta para climas húmedos, permitiendo un control preciso de la temperatura y la humedad sin riesgo de condensación.",
      functioning: "Intercambiador de calor agua-aire con ventilador silencioso. Disponibles en pared, techo (cassette) o conductos.",
      pros: ["Doble Función: Aire acondicionado y calefacción", "Deshumidificación: Vital para ciudades con alta humedad", "Seguridad: Evita el punto de rocío en el suelo"],
      cons: ["Movimiento de aire: Generan ligero flujo de aire", "Mantenimiento: Requieren limpieza periódica de filtros"],
      ideal: "Oficinas y hogares en zonas costeras o con alta humedad relativa."
    },
    { 
      id: 'electric',
      title: "Suelo Radiante Eléctrico", 
      desc: "Calor directo y focalizado mediante electricidad.", 
      icon: <Zap className="w-6 h-6" />,
      quote: "La solución más sencilla para climatizar estancias específicas sin necesidad de calderas o bombas de calor. Calor instantáneo donde y cuando lo necesites.",
      functioning: "Cables o mallas calefactoras instaladas directamente bajo el pavimento que convierten la electricidad en calor por efecto Joule.",
      pros: ["Instalación mínima: Sin tuberías ni sala de máquinas", "Independencia: No requiere conexión al sistema central", "Costo de instalación: El más bajo del mercado"],
      cons: ["Costo operativo: Consumo eléctrico elevado si se usa globalmente", "Solo Calor: No permite refrigeración"],
      ideal: "Baños, cocinas o estancias de uso esporádico en reformas rápidas."
    },
    { 
      id: 'hybrid',
      title: "Integración: Aerotermia + Fotovoltaica", 
      desc: "La libertad energética total.", 
      icon: <Info className="w-6 h-6" />,
      quote: "El cerebro de Gridhome combina la energía gratuita del sol con la eficiencia de la aerotermia para que tu hogar trabaje gratis para ti.",
      functioning: "La Aerotermia extrae hasta el 75% de energía del aire. Los paneles FV cubren el consumo eléctrico. HomeAssistant optimiza el encendido solar.",
      pros: ["Cero OPEX: Clima y ACS gratis durante horas de sol", "Control Total: Gestión desde el móvil y ahorro en tiempo real", "Sostenibilidad: Máxima reducción de huella de carbono"],
      cons: ["Inversión Inicial: Requiere mayor capital inicial (CAPEX)"],
      ideal: "Hogares que buscan independencia energética y máxima rentabilidad a largo plazo."
    }
  ];

  const comparisons = [
    { metric: "Confort Térmico", noInertia: "Excelente", inertia: "Máximo", radiators: "Buena", fancoils: "Media", electric: "Buena", hybrid: "Excelente" },
    { metric: "Velocidad Respuesta", noInertia: "Muy Rápida", inertia: "Lenta", radiators: "Rápida", fancoils: "Muy Rápida", electric: "Muy Rápida", hybrid: "Variable" },
    { metric: "Temp. Operación", noInertia: "30-35°C", inertia: "30-35°C", radiators: "40-45°C", fancoils: "35-45°C", electric: "25-30°C", hybrid: "30-45°C" },
    { metric: "COP Estimado", noInertia: "4.8 - 5.2", inertia: "4.8 - 5.2", radiators: "3.5 - 4.0", fancoils: "4.0 - 4.5", electric: "1.0", hybrid: "Máximo" },
    { metric: "Instalación Ideal", noInertia: "Reforma/Obra", inertia: "Obra Nueva", radiators: "Reforma", fancoils: "Ambas", electric: "Pequeñas Reformas", hybrid: "Ambas" },
    { metric: "Impacto Visual", noInertia: "Invisible (0)", inertia: "Invisible (0)", radiators: "Visible", fancoils: "Visible (Mínimo)", electric: "Invisible (0)", hybrid: "Variable" },
    { metric: "Frío Activo", noInertia: "Refrescamiento", inertia: "Refrescamiento", radiators: "No", fancoils: "Sí (Potente)", electric: "No", hybrid: "Sí" },
  ];

  return (
    <div className="space-y-32 py-20">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-6">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Future-Proof Living</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-stone-900">
              Tecnología <br />
              <span className="text-primary">Climática Avanzada.</span>
            </h1>
            <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
              Redefinimos el confort del hogar mediante ingeniería térmica integrada. Desde sistemas de alta inercia hasta eficiencia aerotérmica de última generación.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-stone-100">
              <img 
                src="/assets/aerotermia-con-suelo-radiante.jpg" 
                alt="Aerotermia con suelo radiante"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 max-w-xs z-10">
              <div className="flex items-center gap-3 text-tertiary mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm">Eficiencia A++</span>
              </div>
              <p className="text-xs text-stone-500">La distribución térmica inteligente ahorra hasta un 45% en el consumo anual de energía.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineered Systems Accordion */}
      <section id="engineered-systems" className="max-w-7xl mx-auto px-6 md:px-8 scroll-mt-32">
        <h2 className="text-4xl font-extrabold tracking-tighter mb-12 text-stone-900">Sistemas de Ingeniería</h2>
        <div className="space-y-4">
          {systems.map((item) => (
            <div key={item.id} className="bg-stone-100 rounded-2xl overflow-hidden group">
              <button 
                onClick={() => setOpenSection(openSection === item.id ? null : item.id)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-stone-200 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="text-primary">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">{item.title}</h3>
                    <p className="text-sm text-stone-500">{item.desc}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${openSection === item.id ? 'rotate-180' : ''}`} />
              </button>
              <motion.div 
                initial={false}
                animate={{ height: openSection === item.id ? 'auto' : 0, opacity: openSection === item.id ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-10 pt-4 border-t border-stone-200/50 mt-2">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Description & Functioning */}
                    <div className="lg:col-span-8 space-y-8 order-1">
                      <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary rounded-full opacity-20" />
                        <p className="text-xl font-medium text-stone-900 leading-snug pl-4 italic">
                          "{item.quote}"
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Funcionamiento Técnico</h4>
                        <p className="text-stone-600 leading-relaxed text-sm">
                          {item.functioning}
                        </p>
                      </div>

                      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Uso Ideal</h4>
                        <p className="text-stone-900 font-bold">
                          {item.ideal}
                        </p>
                      </div>
                    </div>

                    {/* Right: Pros & Cons */}
                    <div className="lg:col-span-4 space-y-6 order-2 outline outline-stone-200/50 p-6 rounded-2xl bg-white/50">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                          <Check className="w-4 h-4" /> Pros
                        </h4>
                        <ul className="space-y-3">
                          {item.pros?.map((pro, i) => (
                            <li key={i} className="text-sm text-stone-600 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-secondary mt-2 shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t border-stone-100">
                        <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                          <X className="w-4 h-4" /> Contras
                        </h4>
                        <ul className="space-y-3">
                          {item.cons?.map((con, i) => (
                            <li key={i} className="text-sm text-stone-400 flex items-start gap-2 italic">
                              <span className="w-1 h-1 rounded-full bg-stone-300 mt-2 shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tighter text-stone-900 mb-4">Análisis Comparativo</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">Compara el rendimiento y las características de cada sistema para encontrar la solución que mejor se adapte a tus necesidades.</p>
        </div>
        
        <div ref={tableRef} className="overflow-x-auto rounded-[2rem] border border-stone-200 shadow-xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="p-6 font-bold text-stone-400 text-xs uppercase tracking-widest">Atributo</th>
                <th className="p-6 font-bold text-stone-900 text-center text-sm">Sin Inercia</th>
                <th className="p-6 font-bold text-stone-900 text-center text-sm">Con Inercia</th>
                <th className="p-6 font-bold text-stone-900 text-center text-sm">Radiadores</th>
                <th className="p-6 font-bold text-stone-900 text-center text-sm">Fancoils</th>
                <th className="p-6 font-bold text-stone-900 text-center text-sm">Eléctrico</th>
                <th className="p-6 font-bold text-stone-900 text-center text-sm">Híbrido</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors">
                  <td className="p-6 font-bold text-stone-700 bg-stone-50/20">{row.metric}</td>
                  <td className="p-6 text-center text-stone-600 text-sm">{row.noInertia}</td>
                  <td className="p-6 text-center text-stone-600 text-sm">{row.inertia}</td>
                  <td className="p-6 text-center text-stone-600 text-sm">{row.radiators}</td>
                  <td className="p-6 text-center text-stone-600 text-sm">{row.fancoils}</td>
                  <td className="p-6 text-center text-stone-600 text-sm">{row.electric}</td>
                  <td className="p-6 text-center text-stone-900 font-bold text-sm bg-primary/5">{row.hybrid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl hover:shadow-stone-200"
          >
            <Download className="w-5 h-5" />
            Descargar Tabla Comparativa (PDF)
          </button>
          
          <p className="max-w-xl text-center text-xs text-stone-400 italic">
            * Los valores de COP son estimaciones basadas en condiciones nominales de funcionamiento de Aerotermia avanzada. El PDF descargable permite revisar la comparativa técnica de forma offline.
          </p>
        </div>
      </section>
    </div>
  );
}
