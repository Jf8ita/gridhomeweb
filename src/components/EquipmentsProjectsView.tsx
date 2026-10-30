import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Layers, 
  Zap, 
  Search, 
  Filter, 
  Check, 
  X, 
  ChevronRight,
  ShieldCheck,
  Tag,
  Info
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// Public assets
const imgTermostatoAnalogico = '/assets/Termostato analogico.png';
const imgTermostatoZH1 = '/assets/Termostato ZH1.png';
const imgTermostatoSR = '/assets/SR1.png';
const imgMantaMalla = '/assets/manta tipo malla.png';
const imgMantaaAluminio = '/assets/Manta de aluminio.png';
const imgPanelesSolares = '/assets/paneles_solares_inversor.jpg';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  image: string;
  shortDesc: string;
  estimatedPrice: string;
  specs: {
    power?: string;
    cop?: string;
    tempRange?: string;
    refrigerant?: string;
    soundLevel?: string;
    dimensions?: string;
    electrical?: string;
    idealFor?: string;
  };
  datasheetName?: string;
  datasheetUrl?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  area: string;
  system: string;
  year: string;
  status: 'Completado' | 'En ejecución' | 'En diseño';
  estimatedPrice: string;
  mainImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  createdAt: string;
}

export const INITIAL_EQUIPMENTS: Equipment[] = [
  {
    id: 'suelo-malla-std',
    name: 'Suelo Radiante Eléctrico Tipo Malla',
    category: 'Suelo Radiante',
    image: imgMantaMalla,
    shortDesc: 'Malla calefactora ultrafina de cable apantallado sobre malla de fibra de vidrio para instalación directa bajo gres porcelánico, cerámica o piedra natural, suelo flotante SPC.',
    estimatedPrice: 'Desde S/50 / m²',
    specs: {
      power: '150 W/m² (Rendimiento estándar)',
      cop: '1.0 (100% Eficiencia resistiva directa)',
      tempRange: '20°C a 29°C en superficie de suelo',
      refrigerant: 'N/A (Conductor bifilar blindado)',
      soundLevel: '0 dB (100% Silencioso e imperceptible)',
      dimensions: 'Espesor ultradelgado de 2 mm',
      electrical: 'Monofásico 220V - 230V / 60 Hz',
      idealFor: 'Baños, dormitorios, cocinas y reformas donde no es posible elevar la cota de piso.'
    },
    datasheetName: 'Ficha_Tecnica_Malla_Electrica_Estandar.pdf',
    createdAt: '2026-10-01'
  },
  {
    id: 'suelo-malla-aluminio',
    name: 'Suelo Radiante Eléctrico Tipo Malla con Recubrimiento de Aluminio',
    category: 'Suelo Radiante',
    image: imgMantaaAluminio,
    shortDesc: 'Malla calefactora encapsulada en lámina continua de aluminio reflectante, diseñada específicamente para suelos laminados, vinílicos, SPC y parquet en seco sin necesidad de cemento.',
    estimatedPrice: 'Desde S/70/m²',
    specs: {
      power: '140 W/m² - 160 W/m²',
      cop: 'Difusión de calor homogénea por aluminio foil',
      tempRange: 'Hasta 27°C (protección de suelos flotantes)',
      refrigerant: 'N/A (Lámina reflectante termoflexible)',
      soundLevel: '0 dB (Silencio absoluto)',
      dimensions: 'Espesor de solo 2.0 mm',
      electrical: '220V / 60 Hz con tierra continua',
      idealFor: 'Piso laminado, madera estructurada, piso vinílico SPC e instalaciones en seco.'
    },
    datasheetName: 'Ficha_Tecnica_Malla_Aluminio_Suelo_Seco.pdf',
    createdAt: '2026-10-01'
  },
  {
    id: 'termostato-analogico',
    name: 'Termostato Analógico para Climatización',
    category: 'Termostatos',
    image: imgTermostatoAnalogico,
    shortDesc: 'Termostato de control manual por dial selector graduado. Precisión mecánica robusta, alta durabilidad y máxima sencillez operativa sin configuración compleja.',
    estimatedPrice: 'Desde S/ 100',
    specs: {
      power: 'Carga resistiva hasta 16A (3600W)',
      cop: 'Control blanco de respuesta precisa',
      tempRange: 'Escala regulable de 5°C a 30°C',
      refrigerant: 'N/A',
      soundLevel: '0 dB (Silencioso con clic de conmutación)',
      dimensions: '86 x 86 x 32 mm (Caja universal)',
      electrical: '220V - 240V / 50-60 Hz',
      idealFor: 'Habitaciones auxiliares, casas de campo, hoteles y usuarios que prefieren control simple.'
    },
    datasheetName: 'Ficha_Tecnica_Termostato_Analogico.pdf',
    createdAt: '2026-10-01'
  },
  {
    id: 'termostato-zh1',
    name: 'Termostato Digital Inteligente Modelo ZH1',
    category: 'Termostatos',
    image: imgTermostatoZH1,
    shortDesc: 'Termostato digital con pantalla táctil retroiluminada de cristal oscuro, conectividad Wi-Fi, control por app móvil (Tuya/SmartLife) y programación horaria 7 días.',
    estimatedPrice: 'Desde 180 soles)',
    specs: {
      power: 'Relé de salida 16A con sensor dual',
      cop: 'Programación y control via wifi',
      tempRange: '5°C a 35°C (Precisión ±0.5°C)',
      refrigerant: 'Wi-Fi 2.4 GHz + Bluetooth integrados',
      soundLevel: 'Silencioso (Relé de estado sólido disponible)',
      dimensions: '86 x 86 x 14 mm (Frontal extraplano)',
      electrical: '220V AC / Consumo en reposo < 1W',
      idealFor: 'Viviendas modernas con domótica, integración Google Home / Alexa y control a distancia.'
    },
    datasheetName: 'Ficha_Tecnica_Termostato_ZH1_WiFi.pdf',
    createdAt: '2026-10-01'
  },
  {
    id: 'termostato-sr',
    name: 'Termostato Inteligente Serie SR',
    category: 'Termostatos',
    image: imgTermostatoSR,
    shortDesc: 'Termostato premium de alta gama Serie SR con dial circular iluminado OLED, sensor de humedad y temperatura ambiente, algoritmos de anticipación térmica y modo ECO inteligente.',
    estimatedPrice: 'Desde 280',
    specs: {
      power: 'Capacidad de mando 16A / Contacto seco opcional',
      cop: 'Diseño exclusivo para control optimización de consumo via wifi ',
      tempRange: '4°C a 45°C con monitor de humedad relativa',
      refrigerant: 'Conectividad Wi-Fi,  Zigbee compatible',
      soundLevel: '0 dB',
      dimensions: '86 x 86 x 14 mm con corona giratoria táctil',
      electrical: '220V AC / 50-60Hz',
      idealFor: 'Residencias de lujo, chalets bioclimáticos y proyectos con control avanzado de confort.'
    },
    datasheetName: 'Ficha_Tecnica_Termostato_Serie_SR.pdf',
    createdAt: '2026-10-01'
  },
  {
    id: 'aerotermia-monoblock-acumulador',
    name: 'Sistema de Aerotermia Monoblock con Tanque de Acumulación',
    category: 'Aerotermia Monoblock',
    image: '/assets/Aerotermia bomba.png',
    shortDesc: 'Bomba de calor aerotérmica monoblock R32/R290 conectada a tanque de acumulación / inercia para suministro integral de calefacción por agua, suelo radiante y Agua Caliente Sanitaria (ACS).',
    estimatedPrice: 'A consultar',
    specs: {
      power: '8 kW a 16 kW térmicos (Modulante Inverter)',
      cop: 'Hasta 5.1 (A7/W35) - Clase A+++',
      tempRange: 'Impulsión hasta 65°C / Trabajo exterior hasta -25°C',
      refrigerant: 'R32 / R290 Ecológico de bajo GWP',
      soundLevel: '38 dB(A) a 3 metros (Modo Ultra Silent)',
      dimensions: '1100 x 870 x 420 mm (Tanque: 200L - 300L)',
      electrical: '220V Monofásico / 380V Trifásico',
      idealFor: 'Casas unifamiliares, casa de campo en proyectos de alta eficiencia.'
    },
    datasheetName: 'Ficha_Tecnica_Aerotermia_Monoblock_Acumulador.pdf',
    createdAt: '2026-10-01'
  },
  {
    id: 'paneles-solares-inversor',
    name: 'Instalación de Paneles Solares con Inversor',
    category: 'Energía Solar',
    image: imgPanelesSolares,
    shortDesc: 'Generación solar fotovoltaica con paneles monocristalinos Tier-1 de tecnología bifacial PERC/TOPCon e inversor solar inteligente (on-grid o híbrido) para autoconsumo térmico y eléctrico.',
    estimatedPrice: 'Desde 3 soles kW instalado' ,
    specs: {
      power: '3.0 kWp a 12.0 kWp (Configurable por m²)',
      cop: 'Eficiencia de celda superior al 22.5%',
      tempRange: 'Operación continua de -40°C a +85°C',
      refrigerant: 'N/A (Inversor con disipación pasiva IP65)',
      soundLevel: '< 25 dB(A)',
      dimensions: 'Paneles de 2278 x 1134 x 30 mm (550W - 650W c/u)',
      electrical: 'Inversor 220V/380V con monitoreo WiFi cloud',
      idealFor: 'Reducción hasta el 70% en la factura eléctrica dependiendo de su perfi l de consumo.'
    },
    datasheetName: 'Ficha_Tecnica_Paneles_Solares_Inversor.pdf',
    createdAt: '2025-02-18'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Residencia Privada Valle Sagrado',
    location: 'Urubamba, Cusco, Perú',
    area: '280 m²',
    system: 'Instalación fotovoltaica con calefacción u control interal',
    year: '2025',
    status: 'En ejecución',
    estimatedPrice: 'Inversión referencial proyecto: $12,000',
    mainImage: '/assets/Sistema completo 1.jpg',
    gallery: [
      '/assets/Sistema completo 1.jpg',
      '/assets/Monoblock.jpg',
      '/assets/Suelo radiante sin inercia.png'
    ],
    description: 'Instalación de sistema fotovoltaico de 8kW para autoconsumo junto con sistema de calefacción por suelo radiante eléctrico, aislamiento térmico, monitoreo de consumo de equipos eléctricos, tableros eléctricos y integración de equipos eléctricos con el fin de optimizar al máximo el ahorro energético.',
    highlights: [
      'Optimización de consumo energetico por integración de equipos eléctricos',
      'Modularidad de operación de calefacción por zonas de trabajos, evitando un sobre consumo electrico',
      'Control domótico de todos los equipos capaces de conectarse via wifi o zigbee.',
      'Diseño y montaje de tablero electricos para operación de equipos bajo normativa europea.'
    ],
    createdAt: '2025-01-20'
  },
  {
    id: 'proj-2',
    title: 'Casa en Wanchaq',
    location: 'Cusco, Perú',
    area: '60 m²',
    system: 'Aerotermia con Tanque de Inercia + Suelo Radiante',
    year: '2027',
    status: 'En ejecución',
    estimatedPrice: 'Inversión referencial proyecto: $11,500 - $14,000',
    mainImage: '/assets/FRONT AEROTERMIA.png',
    gallery: [
      '/assets/FRONT AEROTERMIA.png',
      '/assets/Monoblock.jpg'
    ],
    description: 'Modernización térmica y sustitución de terma tradicional por sistema aerotérmico monoblock con acumulador para calefacción radiante y 300 litros de Agua Caliente Sanitaria continua.',
    highlights: [
      'Eliminación total de emisiones directas de combustión fósil',
      'Agua caliente sanitaria instantánea para 4 ocupantes continuos',
      'Monitoreo remoto de rendimiento y COP en tiempo real'
    ],
    createdAt: '2026-12-01'
  },
  
];

export default function EquipmentsProjectsView() {
  const [activeTab, setActiveTab] = useState<'equipments' | 'projects'>('equipments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Equipments and projects list (Public View-Only catalog)
  const [equipments] = useState<Equipment[]>(INITIAL_EQUIPMENTS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);

  // Detail Modals
  const [selectedEquipmentForSpecs, setSelectedEquipmentForSpecs] = useState<Equipment | null>(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);

  // Download PDF Datasheet for an equipment
  const handleDownloadDatasheetPDF = (eq: Equipment) => {
    if (eq.datasheetUrl && eq.datasheetUrl.startsWith('data:application/pdf')) {
      const link = document.createElement('a');
      link.href = eq.datasheetUrl;
      link.download = eq.datasheetName || `${eq.name}_Ficha_Tecnica.pdf`;
      link.click();
      return;
    }

    // Generate formatted PDF using jsPDF
    const doc = new jsPDF('p', 'mm', 'a4');
    const primaryColor = [158, 61, 0]; // #9e3d00
    const darkColor = [25, 28, 29];

    // Header bar
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 25, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('GRIDHOME PERU - FICHA TÉCNICA OFICIAL', 14, 16);

    // Title
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text(eq.name, 14, 38);

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(110, 110, 110);
    doc.text(`Categoría: ${eq.category} | Fecha: ${eq.createdAt}`, 14, 45);

    // Estimated Price Box
    doc.setFillColor(254, 242, 237);
    doc.roundedRect(14, 50, 182, 16, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`PRECIO ESTIMADO DE REFERENCIA: ${eq.estimatedPrice}`, 18, 57);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(120, 100, 90);
    doc.text('* Precio base orientativo. El costo final dependerá del metraje, diseño hidráulico/eléctrico y especificaciones de obra.', 18, 63);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const splitDesc = doc.splitTextToSize(eq.shortDesc, 182);
    doc.text(splitDesc, 14, 73);

    // Table of Specs
    let y = 86;
    doc.setFillColor(245, 245, 245);
    doc.rect(14, y, 182, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PARÁMETRO TÉCNICO', 18, y + 5.5);
    doc.text('ESPECIFICACIÓN / VALOR NOMINAL', 105, y + 5.5);
    y += 10;

    const specsList = [
      { label: 'Precio Base Estimado', value: eq.estimatedPrice },
      { label: 'Potencia / Capacidad', value: eq.specs.power || 'Según dimensionamiento' },
      { label: 'Rendimiento COP / Eficiencia', value: eq.specs.cop || 'Consultar' },
      { label: 'Rango de Temperatura', value: eq.specs.tempRange || 'Consultar' },
      { label: 'Refrigerante / Tecnología', value: eq.specs.refrigerant || 'Conductor blindado' },
      { label: 'Presión Sonora (Ruido)', value: eq.specs.soundLevel || '0 dB (Inaudible)' },
      { label: 'Dimensiones / Espesor', value: eq.specs.dimensions || 'Estándar' },
      { label: 'Suministro Eléctrico', value: eq.specs.electrical || '220V - 60 Hz' },
      { label: 'Aplicación Recomendada', value: eq.specs.idealFor || 'Viviendas y proyectos a medida' }
    ];

    specsList.forEach((item, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(250, 250, 250);
        doc.rect(14, y - 2, 182, 8.5, 'F');
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(50, 50, 50);
      doc.text(item.label, 18, y + 4);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 70);
      const valStr = doc.splitTextToSize(item.value, 90);
      doc.text(valStr, 105, y + 4);

      doc.setDrawColor(230, 230, 230);
      doc.line(14, y + 6.5, 196, y + 6.5);
      y += 8.5;
    });

    // Contact & Footer
    y += 12;
    doc.setFillColor(245, 242, 238);
    doc.roundedRect(14, y, 182, 34, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('GRIDHOME PERU S.A.C - Ingeniería y Climatización Eficiente', 20, y + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text('Sedes: Lima (Av. San Felipe 637, Jesús María) | Cusco (Av. Manco Cápac 619, Wanchaq)', 20, y + 16);
    doc.text('Contacto directo: info@gridhomeperu.com | Central: +51 972 494 017', 20, y + 22);
    doc.text('Sitio web: www.gridhomeperu.com | Consultoría técnica y cotización sin costo', 20, y + 28);

    doc.save(`${eq.name.replace(/[^a-zA-Z0-9]/g, '_')}_Ficha_Tecnica.pdf`);
  };

  // Filtered lists
  const filteredEquipments = equipments.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredProjects = projects.filter(item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.system.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const categories = ['all', 'Suelo Radiante', 'Termostatos', 'Aerotermia Monoblock', 'Energía Solar'];

  return (
    <div className="space-y-12 py-12 px-6 md:px-8 max-w-7xl mx-auto">
      {/* Hero Header (Public Clean View) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
        <div>
          <span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Catálogo Oficial de Soluciones
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Equipos, Fichas Técnicas & Proyectos
          </h1>
          <p className="text-stone-500 mt-2 max-w-2xl text-base">
            Explora las especificaciones técnicas completas de nuestros equipos de climatización, descarga fichas en PDF y revisa proyectos ejecutados por los ingenieros de GridHome en el Perú.
          </p>
        </div>

        {/* Informative Price Notice Badge */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 max-w-md shadow-xs flex items-start gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-stone-600">
            <span className="font-bold text-stone-900 block mb-0.5">Precios Base de Referencia</span>
            Los valores indicados son precios de base orientativa. El presupuesto final se ajusta según el metraje, potencia requerida y particularidades de su obra.
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Segmented Tab Control */}
        <div className="flex p-1.5 bg-stone-100 rounded-2xl w-full md:w-auto">
          <button
            onClick={() => { setActiveTab('equipments'); setSearchTerm(''); }}
            className={`flex-1 md:flex-initial px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'equipments' 
                ? 'bg-white text-stone-900 shadow-sm' 
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span>Catálogo de Equipos ({equipments.length})</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('projects'); setSearchTerm(''); }}
            className={`flex-1 md:flex-initial px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'projects' 
                ? 'bg-white text-stone-900 shadow-sm' 
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4 text-primary" />
            <span>Proyectos Realizados ({projects.length})</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-grow md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeTab === 'equipments' ? "Buscar por modelo o tecnología..." : "Buscar proyecto o ciudad..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {activeTab === 'equipments' && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm font-medium"
              >
                <option value="all">Todas las categorías</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: EQUIPOS Y FICHAS TECNICAS */}
      {activeTab === 'equipments' && (
        <div className="space-y-8">
          {filteredEquipments.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
              <Zap className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-stone-700">No se encontraron equipos</h3>
              <p className="text-stone-400 text-sm mt-1">Prueba seleccionando otra categoría o borrando el término de búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEquipments.map((eq) => (
                <div 
                  key={eq.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Equipment Image */}
                  <div 
                    className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" 
                    onClick={() => setSelectedEquipmentForSpecs(eq)}
                  >
                    <img 
                      src={eq.image} 
                      alt={eq.name} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/FRONT%20AEROTERMIA.png';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-stone-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {eq.category}
                      </span>
                    </div>

                    {eq.specs.cop && (
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-stone-400">Eficiencia:</span>
                        <span className="text-xs font-black text-primary">{eq.specs.cop}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h3 
                        onClick={() => setSelectedEquipmentForSpecs(eq)}
                        className="text-lg font-bold text-stone-900 group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
                      >
                        {eq.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                        {eq.shortDesc}
                      </p>
                    </div>

                    {/* Prominent Estimated Price Box */}
                    <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <Tag className="w-3.5 h-3.5 text-primary" />
                        <span>Precio estimado:</span>
                        <span className="text-sm font-black text-primary ml-auto">{eq.estimatedPrice}</span>
                      </div>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        * Precio base de referencia. Sujeto a evaluación técnica y metraje del proyecto.
                      </p>
                    </div>

                    {/* Specs Quick Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100 text-xs">
                      {eq.specs.power && (
                        <div className="bg-stone-50 p-2.5 rounded-xl">
                          <span className="text-[10px] text-stone-400 block font-semibold">Potencia / Capacidad</span>
                          <span className="font-bold text-stone-700 truncate block text-xs">{eq.specs.power}</span>
                        </div>
                      )}
                      {eq.specs.tempRange && (
                        <div className="bg-stone-50 p-2.5 rounded-xl">
                          <span className="text-[10px] text-stone-400 block font-semibold">Temperatura</span>
                          <span className="font-bold text-stone-700 truncate block text-xs">{eq.specs.tempRange}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions: View Spec Sheet & Download PDF */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedEquipmentForSpecs(eq)}
                        className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Ver Ficha Técnica</span>
                      </button>
                      
                      <button
                        onClick={() => handleDownloadDatasheetPDF(eq)}
                        title="Descargar Ficha Técnica en PDF"
                        className="bg-primary hover:bg-primary-container text-white p-2.5 rounded-xl text-xs flex items-center justify-center transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROYECTOS Y OBRAS */}
      {activeTab === 'projects' && (
        <div className="space-y-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
              <Layers className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-stone-700">No se encontraron proyectos</h3>
              <p className="text-stone-400 text-sm mt-1">Prueba con otro término de búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Project Image */}
                  <div 
                    className="relative aspect-[16/10] bg-stone-100 overflow-hidden cursor-pointer" 
                    onClick={() => setSelectedProjectForDetail(proj)}
                  >
                    <img 
                      src={proj.mainImage} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm ${
                        proj.status === 'Completado' 
                          ? 'bg-emerald-950/80 text-emerald-300' 
                          : 'bg-amber-950/80 text-amber-300'
                      }`}>
                        {proj.status} • {proj.year}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="font-medium truncate max-w-[200px]">{proj.location}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1 text-xs text-stone-400 font-semibold">
                        <span>Área: {proj.area}</span>
                        <span>{proj.year}</span>
                      </div>
                      <h3 
                        onClick={() => setSelectedProjectForDetail(proj)}
                        className="text-xl font-bold text-stone-900 group-hover:text-primary transition-colors cursor-pointer"
                      >
                        {proj.title}
                      </h3>
                      
                      <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{proj.system}</span>
                      </div>

                      <p className="text-xs text-stone-500 mt-3 line-clamp-3 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    {/* Estimated Price for Project */}
                    <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <Tag className="w-3.5 h-3.5 text-primary" />
                        <span>{proj.estimatedPrice}</span>
                      </div>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        * Precio base referencial según escala y características particulares de la obra.
                      </p>
                    </div>

                    {/* Highlights bullets */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
                      {proj.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-stone-600">
                          <Check className="w-3.5 h-3.5 text-tertiary shrink-0 mt-0.5" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedProjectForDetail(proj)}
                      className="w-full bg-stone-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <span>Ver Detalles de Obra</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: FULL EQUIPMENT SPEC SHEET & PDF */}
      <AnimatePresence>
        {selectedEquipmentForSpecs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl border border-stone-100 max-h-[90vh] overflow-y-auto my-8 space-y-6"
            >
              <div className="flex items-start justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest">Ficha Técnica Oficial</span>
                  <h2 className="text-2xl font-black text-stone-900 mt-1">{selectedEquipmentForSpecs.name}</h2>
                  <span className="text-xs text-stone-400">Categoría: {selectedEquipmentForSpecs.category}</span>
                </div>
                <button 
                  onClick={() => setSelectedEquipmentForSpecs(null)}
                  className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                  <img 
                    src={selectedEquipmentForSpecs.image} 
                    alt={selectedEquipmentForSpecs.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/FRONT%20AEROTERMIA.png';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {selectedEquipmentForSpecs.shortDesc}
                  </p>

                  {/* Estimated Price in Modal */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Precio Estimado de Referencia</span>
                    </div>
                    <div className="text-xl font-extrabold text-primary">
                      {selectedEquipmentForSpecs.estimatedPrice}
                    </div>
                    <p className="text-xs text-stone-500">
                      * Este precio es una base orientativa para estimación inicial. El presupuesto técnico oficial se define tras la evaluación de planos, aislamiento térmico, m² y características de su proyecto.
                    </p>
                  </div>

                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 flex items-center gap-3">
                    <ShieldCheck className="w-7 h-7 text-primary shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Garantía e Ingeniería GridHome</h4>
                      <p className="text-[11px] text-stone-500">Componentes con certificación de fábrica y asesoría técnica en todo el Perú.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Specifications */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">Parámetros Técnicos</h4>
                <div className="rounded-2xl border border-stone-200 overflow-hidden divide-y divide-stone-100 text-sm">
                  {Object.entries(selectedEquipmentForSpecs.specs).map(([key, value]) => {
                    if (!value) return null;
                    const labels: Record<string, string> = {
                      power: 'Potencia Nominal / Capacidad',
                      cop: 'Coeficiente de Rendimiento (COP)',
                      tempRange: 'Rango de Temperatura de Trabajo',
                      refrigerant: 'Gas Refrigerante / Fluido',
                      soundLevel: 'Presión Sonora (Ruido)',
                      dimensions: 'Dimensiones / Espesor',
                      electrical: 'Suministro Eléctrico',
                      idealFor: 'Aplicación Óptima Recomendada'
                    };
                    return (
                      <div key={key} className="grid grid-cols-3 p-3.5 hover:bg-stone-50/50 transition-colors">
                        <span className="font-bold text-stone-600 text-xs">{labels[key] || key}</span>
                        <span className="col-span-2 text-stone-800 font-medium text-xs">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-stone-400 italic">
                  Documento técnico expedido por GRIDHOME PERU S.A.C.
                </span>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleDownloadDatasheetPDF(selectedEquipmentForSpecs)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Ficha en PDF</span>
                  </button>

                  <button
                    onClick={() => setSelectedEquipmentForSpecs(null)}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-6 py-3 rounded-xl font-bold text-xs transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: PROJECT DETAILS & GALLERY */}
      <AnimatePresence>
        {selectedProjectForDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl border border-stone-100 max-h-[90vh] overflow-y-auto my-8 space-y-6"
            >
              <div className="flex items-start justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                      {selectedProjectForDetail.status} • {selectedProjectForDetail.year}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {selectedProjectForDetail.location}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-stone-900 mt-1">{selectedProjectForDetail.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedProjectForDetail(null)}
                  className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image */}
              <div className="aspect-video rounded-2xl overflow-hidden border border-stone-200 shadow-md">
                <img 
                  src={selectedProjectForDetail.mainImage} 
                  alt={selectedProjectForDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Details Badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Área Climatizada</span>
                  <span className="font-extrabold text-stone-900 text-sm">{selectedProjectForDetail.area}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Solución Técnica</span>
                  <span className="font-extrabold text-primary text-sm truncate block">{selectedProjectForDetail.system}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 col-span-2 md:col-span-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Año de Ejecución</span>
                  <span className="font-extrabold text-stone-900 text-sm">{selectedProjectForDetail.year}</span>
                </div>
              </div>

              {/* Estimated Project Reference */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Inversión Base Estimada</span>
                </div>
                <div className="text-lg font-extrabold text-primary">
                  {selectedProjectForDetail.estimatedPrice}
                </div>
                <p className="text-xs text-stone-500">
                  * Costo referencial de obra completa. Cada proyecto se cotiza a medida tras estudio térmico.
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">Memoria del Proyecto</h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {selectedProjectForDetail.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider">Resultados e Ingeniería Aplicada</h4>
                <div className="space-y-2">
                  {selectedProjectForDetail.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-stone-700">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setSelectedProjectForDetail(null)}
                  className="bg-stone-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold text-xs transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
