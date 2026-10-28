import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  FileText, 
  Image as ImageIcon, 
  Trash2, 
  Edit3, 
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
  Upload, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  image: string;
  shortDesc: string;
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
  datasheetUrl?: string; // base64 or link
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
  mainImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  createdAt: string;
}

const INITIAL_EQUIPMENTS: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Bomba de Calor Aerotermia Monoblock Grid-Pro',
    category: 'Aerotermia Monoblock1',
    image: '/assets/Monoblock.jpg',
    shortDesc: 'Unidad exterior integral de alta eficiencia R32/R290 para climatización frío/calor y ACS.',
    specs: {
      power: '8.4 kW - 16.0 kW',
      cop: 'Hasta 5.1 (A7/W35)',
      tempRange: 'Agua hasta 65°C / Temp exterior -25°C',
      refrigerant: 'Ecológico R32 / R290',
      soundLevel: '38 dB(A) ultra silencioso',
      dimensions: '1100 x 870 x 420 mm',
      electrical: 'Monofásico 230V / Trifásico 400V',
      idealFor: 'Casas unifamiliares, chalets y residencias con suelo radiante'
    },
    datasheetName: 'Ficha_Tecnica_Aerotermia_Monoblock_GridPro.pdf',
    createdAt: '2025-01-10'
  },
  {
    id: 'eq-2',
    name: 'Sistema Climatización Integral Biblock split',
    category: 'Aerotermia Biblock',
    image: '/assets/FRONT AEROTERMIA.png',
    shortDesc: 'Conjunto split hidrokit interior con depósito de inercia y acumulador ACS para máxima versatilidad.',
    specs: {
      power: '12.0 kW - 22.0 kW',
      cop: '4.95 (A7/W35)',
      tempRange: 'Impulsión hasta 60°C',
      refrigerant: 'R32',
      soundLevel: '40 dB(A) exterior / 28 dB(A) interior',
      dimensions: 'Interior: 1800 x 600 x 600 mm',
      electrical: 'Trifásico 380-415V',
      idealFor: 'Viviendas de gran tamaño, proyectos en Cusco y zonas de altura'
    },
    datasheetName: 'Ficha_Tecnica_GridHome_Biblock_Industrial.pdf',
    createdAt: '2025-01-15'
  },
  {
    id: 'eq-3',
    name: 'Panel Suelo Radiante Seco EPS Alta Densidad (Sin Inercia)',
    category: 'Suelo Radiante Seco',
    image: '/assets/Suelo radiante sin inercia.png',
    shortDesc: 'Placas preformadas con difusores de aluminio conductivo para respuesta térmica casi inmediata sin losa de mortero.',
    specs: {
      power: 'Emisión hasta 95 W/m²',
      cop: 'Optimiza COP de aerotermia a > 5.0',
      tempRange: 'Impulsión óptima 30°C - 35°C',
      refrigerant: 'Agua climatizada de circuito cerrado',
      soundLevel: '0 dB (100% Inaudible)',
      dimensions: 'Espesor ultra delgado 25-30 mm',
      electrical: 'No requiere energía adicional',
      idealFor: 'Reformas, pisos de madera, oficinas y departamentos'
    },
    datasheetName: 'Ficha_Tecnica_Suelo_Seco_UltraSlim.pdf',
    createdAt: '2025-02-01'
  },
  {
    id: 'eq-4',
    name: 'Fancoil Hidrónico Slim de Pared y Techo',
    category: 'Fancoils & Emisores',
    image: '/assets/Fancoil.png',
    shortDesc: 'Emisores de bajo consumo con motor DC inverter para calefacción y refrigeración rápida con deshumidificación activa.',
    specs: {
      power: '1.8 kW - 5.2 kW',
      cop: 'Eficiencia energética A+++',
      tempRange: 'Agua fría 7/12°C - Caliente 35/45°C',
      soundLevel: '21 dB(A) modo silencioso nocturno',
      dimensions: 'Fondo ultra fino de solo 130 mm',
      electrical: '220V - 15 a 45W consumo eléctrico',
      idealFor: 'Dormitorios, salas de estar y zonas costeras de alta humedad'
    },
    datasheetName: 'Ficha_Tecnica_Fancoil_Slim_GridHome.pdf',
    createdAt: '2025-02-12'
  },
  {
    id: 'eq-5',
    name: 'Malla Suelo Radiante Eléctrico Carbon Tech',
    category: 'Suelo Radiante Eléctrico',
    image: '/assets/suelo_radiante_electrico_ceramica.webp',
    shortDesc: 'Malla calefactora ultrafina de cable o grafeno apantallado con termostato digital Wi-Fi.',
    specs: {
      power: '150 W/m²',
      cop: '1.0 (Calor resistivo directo)',
      tempRange: 'Hasta 28°C en superficie de piso',
      soundLevel: '0 dB (Silencio absoluto)',
      dimensions: 'Grosor de solo 3.5 mm bajo porcelanato',
      electrical: '230V con protección diferencial',
      idealFor: 'Baños, cocinas, departamentos y zonas puntuales de confort'
    },
    datasheetName: 'Ficha_Tecnica_Malla_Electrica_GridHome.pdf',
    createdAt: '2025-02-20'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Residencia Privada Valle Sagrado',
    location: 'Urubamba, Cusco, Perú',
    area: '480 m²',
    system: 'Aerotermia Monoblock + Suelo Radiante Seco',
    year: '2025',
    status: 'Completado',
    mainImage: '/assets/Sistema completo 1.jpg',
    gallery: [
      '/assets/Sistema completo 1.jpg',
      '/assets/Monoblock.jpg',
      '/assets/Suelo radiante sin inercia.png'
    ],
    description: 'Instalación de sistema integral de aerotermia para vivienda bioclimática a 2,870 msnm. Resuelve temperaturas nocturnas de hasta 2°C manteniendo una temperatura interior constante de 21°C con consumo eléctrico ultra bajo.',
    highlights: [
      'Ahorro del 72% comparado con calefacción GLP tradicional',
      'Temperatura uniforme en dos niveles sin corrientes de aire',
      'Control domótico zonificado habitación por habitación'
    ],
    createdAt: '2025-01-20'
  },
  {
    id: 'proj-2',
    title: 'Chalet de Montaña Wanchaq',
    location: 'Cusco, Perú',
    area: '260 m²',
    system: 'Aerotermia Biblock + Suelo Radiante y ACS',
    year: '2024',
    status: 'Completado',
    mainImage: '/assets/FRONT AEROTERMIA.png',
    gallery: [
      '/assets/FRONT AEROTERMIA.png',
      '/assets/Monoblock.jpg'
    ],
    description: 'Modernización térmica y sustitución de caldera de gasóleo por sistema aerotérmico de alta temperatura para calefacción y 300 litros de Agua Caliente Sanitaria continua.',
    highlights: [
      'Eliminación total de emisiones directas de CO2 en la propiedad',
      'Agua caliente sanitaria instantánea para 6 ocupantes',
      'Monitoreo remoto de COP y rendimiento energético en tiempo real'
    ],
    createdAt: '2024-11-15'
  },
  {
    id: 'proj-3',
    title: 'Edificio Residencial San Felipe',
    location: 'Jesús María, Lima, Perú',
    area: '720 m²',
    system: 'Sistema Híbrido Fancoils Inverter + Malla Eléctrica en Baños',
    year: '2025',
    status: 'En ejecución',
    mainImage: '/assets/Sistema completo de aerotermia.png',
    gallery: [
      '/assets/Sistema completo de aerotermia.png',
      '/assets/Fancoil.png',
      '/assets/suelo_radiante_electrico_ceramica.webp'
    ],
    description: 'Proyecto de climatización reversible (calor en invierno, frío y deshumidificación en verano costero limeño) con confort de suelo cálido en áreas húmedas.',
    highlights: [
      'Control activo de humedad relativa para el invierno húmedo de Lima',
      'Mallas eléctricas de bajo consumo bajo revestimiento de gres porcelánico',
      'Arquitectura integrada sin impacto estético en fachadas'
    ],
    createdAt: '2025-03-02'
  }
];

export default function EquipmentsProjectsView() {
  const [activeTab, setActiveTab] = useState<'equipments' | 'projects'>('equipments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // State from LocalStorage or defaults
  const [equipments, setEquipments] = useState<Equipment[]>(() => {
    try {
      const saved = localStorage.getItem('gridhome_equipments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EQUIPMENTS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('gridhome_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS;
  });

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEquipmentForSpecs, setSelectedEquipmentForSpecs] = useState<Equipment | null>(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);

  // Form states for new equipment
  const [newEqName, setNewEqName] = useState('');
  const [newEqCategory, setNewEqCategory] = useState('Aerotermia Monoblock');
  const [newEqShortDesc, setNewEqShortDesc] = useState('');
  const [newEqImage, setNewEqImage] = useState('');
  const [newEqPower, setNewEqPower] = useState('');
  const [newEqCop, setNewEqCop] = useState('');
  const [newEqTempRange, setNewEqTempRange] = useState('');
  const [newEqRefrigerant, setNewEqRefrigerant] = useState('');
  const [newEqSound, setNewEqSound] = useState('');
  const [newEqDimensions, setNewEqDimensions] = useState('');
  const [newEqElectrical, setNewEqElectrical] = useState('');
  const [newEqIdealFor, setNewEqIdealFor] = useState('');
  const [newEqDatasheetName, setNewEqDatasheetName] = useState('');
  const [newEqDatasheetData, setNewEqDatasheetData] = useState('');

  // Form states for new project
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjLocation, setNewProjLocation] = useState('');
  const [newProjArea, setNewProjArea] = useState('');
  const [newProjSystem, setNewProjSystem] = useState('');
  const [newProjYear, setNewProjYear] = useState('2025');
  const [newProjStatus, setNewProjStatus] = useState<'Completado' | 'En ejecución' | 'En diseño'>('Completado');
  const [newProjImage, setNewProjImage] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjHighlight1, setNewProjHighlight1] = useState('');
  const [newProjHighlight2, setNewProjHighlight2] = useState('');
  const [newProjHighlight3, setNewProjHighlight3] = useState('');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const datasheetInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gridhome_equipments', JSON.stringify(equipments));
  }, [equipments]);

  useEffect(() => {
    localStorage.setItem('gridhome_projects', JSON.stringify(projects));
  }, [projects]);

  // Handle image upload from computer (Base64)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'eq' | 'proj') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (target === 'eq') {
        setNewEqImage(result);
      } else {
        setNewProjImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle datasheet PDF / document upload
  const handleDatasheetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewEqDatasheetName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setNewEqDatasheetData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Save New Equipment
  const handleCreateEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEqName.trim()) return;

    const newEquip: Equipment = {
      id: `eq-${Date.now()}`,
      name: newEqName,
      category: newEqCategory,
      image: newEqImage || '/assets/Monoblock.jpg',
      shortDesc: newEqShortDesc || 'Equipo de alta eficiencia GridHome para climatización residencial o comercial.',
      specs: {
        power: newEqPower || 'Personalizado',
        cop: newEqCop || '4.5 - 5.0',
        tempRange: newEqTempRange || '30°C - 55°C',
        refrigerant: newEqRefrigerant || 'R32 Ecológico',
        soundLevel: newEqSound || 'Silencioso',
        dimensions: newEqDimensions || 'Estándar',
        electrical: newEqElectrical || '220V',
        idealFor: newEqIdealFor || 'Viviendas y proyectos a medida'
      },
      datasheetName: newEqDatasheetName || `${newEqName.replace(/\s+/g, '_')}_Ficha_Tecnica.pdf`,
      datasheetUrl: newEqDatasheetData || undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setEquipments([newEquip, ...equipments]);
    resetEquipmentForm();
    setShowAddModal(false);
  };

  // Save New Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const highlights: string[] = [];
    if (newProjHighlight1.trim()) highlights.push(newProjHighlight1.trim());
    if (newProjHighlight2.trim()) highlights.push(newProjHighlight2.trim());
    if (newProjHighlight3.trim()) highlights.push(newProjHighlight3.trim());

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: newProjTitle,
      location: newProjLocation || 'Perú',
      area: newProjArea || '200 m²',
      system: newProjSystem || 'Aerotermia + Suelo Radiante',
      year: newProjYear || '2025',
      status: newProjStatus,
      mainImage: newProjImage || '/assets/Sistema completo 1.jpg',
      gallery: [newProjImage || '/assets/Sistema completo 1.jpg'],
      description: newProjDesc || 'Obra ejecutada con ingeniería de climatización integral GridHome.',
      highlights: highlights.length > 0 ? highlights : [
        'Confort térmico continuo los 365 días del año',
        'Eficiencia energética superior y bajo consumo',
        'Garantía de instalación e ingeniería certificada'
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects([newProj, ...projects]);
    resetProjectForm();
    setShowAddModal(false);
  };

  const resetEquipmentForm = () => {
    setNewEqName('');
    setNewEqCategory('Aerotermia Monoblock');
    setNewEqShortDesc('');
    setNewEqImage('');
    setNewEqPower('');
    setNewEqCop('');
    setNewEqTempRange('');
    setNewEqRefrigerant('');
    setNewEqSound('');
    setNewEqDimensions('');
    setNewEqElectrical('');
    setNewEqIdealFor('');
    setNewEqDatasheetName('');
    setNewEqDatasheetData('');
  };

  const resetProjectForm = () => {
    setNewProjTitle('');
    setNewProjLocation('');
    setNewProjArea('');
    setNewProjSystem('');
    setNewProjYear('2025');
    setNewProjStatus('Completado');
    setNewProjImage('');
    setNewProjDesc('');
    setNewProjHighlight1('');
    setNewProjHighlight2('');
    setNewProjHighlight3('');
  };

  const handleDeleteEquipment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Seguro que deseas eliminar este equipo del catálogo?')) {
      setEquipments(equipments.filter(item => item.id !== id));
      if (selectedEquipmentForSpecs?.id === id) setSelectedEquipmentForSpecs(null);
    }
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Seguro que deseas eliminar este proyecto?')) {
      setProjects(projects.filter(item => item.id !== id));
      if (selectedProjectForDetail?.id === id) setSelectedProjectForDetail(null);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Restablecer el catálogo y proyectos a los datos predeterminados de fábrica?')) {
      setEquipments(INITIAL_EQUIPMENTS);
      setProjects(INITIAL_PROJECTS);
      localStorage.removeItem('gridhome_equipments');
      localStorage.removeItem('gridhome_projects');
    }
  };

  // Download PDF Datasheet for an equipment
  const handleDownloadDatasheetPDF = (eq: Equipment) => {
    if (eq.datasheetUrl && eq.datasheetUrl.startsWith('data:application/pdf')) {
      // Direct trigger of user-uploaded PDF
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
    doc.setFontSize(18);
    doc.text('GRIDHOME PERU - FICHA TÉCNICA OFICIAL', 14, 16);

    // Title
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(eq.name, 14, 38);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(`Categoría: ${eq.category} | Fecha de emisión: ${eq.createdAt}`, 14, 45);

    // Description
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    const splitDesc = doc.splitTextToSize(eq.shortDesc, 180);
    doc.text(splitDesc, 14, 55);

    // Table of Specs
    let y = 72;
    doc.setFillColor(245, 245, 245);
    doc.rect(14, y, 182, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PARÁMETRO TÉCNICO', 18, y + 5.5);
    doc.text('ESPECIFICACIÓN DE RENDIMIENTO', 105, y + 5.5);
    y += 10;

    const specsList = [
      { label: 'Potencia Nominal / Térmica', value: eq.specs.power || 'Consultar' },
      { label: 'Rendimiento COP / EER', value: eq.specs.cop || 'Consultar' },
      { label: 'Rango de Temperatura', value: eq.specs.tempRange || 'Consultar' },
      { label: 'Gas Refrigerante / Fluido', value: eq.specs.refrigerant || 'Consultar' },
      { label: 'Presión Sonora (Ruido)', value: eq.specs.soundLevel || 'Consultar' },
      { label: 'Dimensiones Físicas', value: eq.specs.dimensions || 'Consultar' },
      { label: 'Conexión Eléctrica', value: eq.specs.electrical || 'Consultar' },
      { label: 'Aplicación Recomendada', value: eq.specs.idealFor || 'Viviendas y oficinas' }
    ];

    specsList.forEach((item, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(250, 250, 250);
        doc.rect(14, y - 2, 182, 9, 'F');
      }
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text(item.label, 18, y + 4);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 70);
      doc.text(item.value, 105, y + 4);

      doc.setDrawColor(230, 230, 230);
      doc.line(14, y + 7, 196, y + 7);
      y += 10;
    });

    // Contact & Footer
    y += 15;
    doc.setFillColor(245, 242, 238);
    doc.roundedRect(14, y, 182, 35, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('GRIDHOME PERU S.A.C - Soporte e Ingeniería', 20, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('Sedes: Lima (Av. San Felipe 637, Jesús María) | Cusco (Av. Manco Cápac 619, Wanchaq)', 20, y + 17);
    doc.text('Contacto: info@gridhomeperu.com | +51 972 494 017', 20, y + 24);
    doc.text('www.gridhomeperu.com | Climatización inteligente y sostenible', 20, y + 31);

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

  const categories = ['all', ...Array.from(new Set(equipments.map(e => e.category)))];

  return (
    <div className="space-y-16 py-12 px-6 md:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
        <div>
          <span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Gestor de Equipos & Obras
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Equipos, Fichas Técnicas & Proyectos
          </h1>
          <p className="text-stone-500 mt-2 max-w-2xl text-base">
            Catálogo técnico actualizado con especificaciones de rendimiento térmico y registro de obras ejecutadas por los ingenieros de GridHome en todo el Perú.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>{activeTab === 'equipments' ? 'Cargar Nuevo Equipo' : 'Cargar Nuevo Proyecto'}</span>
          </button>

          <button
            onClick={handleResetDefaults}
            title="Restablecer datos de fábrica"
            className="p-3 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-2xl transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
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
              placeholder={activeTab === 'equipments' ? "Buscar equipo o categoría..." : "Buscar proyecto o ciudad..."}
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
              <p className="text-stone-400 text-sm mt-1">Prueba con otro término de búsqueda o añade un nuevo equipo con el botón superior.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEquipments.map((eq) => (
                <div 
                  key={eq.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Equipment Image */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedEquipmentForSpecs(eq)}>
                    <img 
                      src={eq.image} 
                      alt={eq.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {eq.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={(e) => handleDeleteEquipment(eq.id, e)}
                        title="Eliminar equipo"
                        className="p-2 bg-white/90 hover:bg-red-50 text-stone-600 hover:text-red-600 rounded-full shadow-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {eq.specs.cop && (
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-stone-400">COP:</span>
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

                    {/* Specs Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                      {eq.specs.power && (
                        <div className="bg-stone-50 p-2 rounded-xl">
                          <span className="text-[10px] text-stone-400 block font-semibold">Potencia</span>
                          <span className="font-bold text-stone-700 truncate block">{eq.specs.power}</span>
                        </div>
                      )}
                      {eq.specs.tempRange && (
                        <div className="bg-stone-50 p-2 rounded-xl">
                          <span className="text-[10px] text-stone-400 block font-semibold">Rango Temp</span>
                          <span className="font-bold text-stone-700 truncate block">{eq.specs.tempRange}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedEquipmentForSpecs(eq)}
                        className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Ver Ficha</span>
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
              <p className="text-stone-400 text-sm mt-1">Añade tu primera obra o proyecto ejecutado usando el botón superior.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProjectForDetail(proj)}>
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

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={(e) => handleDeleteProject(proj.id, e)}
                        title="Eliminar proyecto"
                        className="p-2 bg-white/90 hover:bg-red-50 text-stone-600 hover:text-red-600 rounded-full shadow-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

                    {/* Highlights bullets */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
                      {proj.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-stone-600">
                          <Check className="w-3.5 h-3.5 text-tertiary shrink-0 mt-0.5" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
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

      {/* MODAL 1: ADD NEW EQUIPMENT OR PROJECT */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-stone-100 max-h-[90vh] overflow-y-auto my-8"
            >
              <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-stone-900">
                      {activeTab === 'equipments' ? 'Cargar Nuevo Equipo al Catálogo' : 'Registrar Nuevo Proyecto Realizado'}
                    </h2>
                    <p className="text-xs text-stone-500">
                      Los datos e imágenes se guardan de inmediato en la aplicación.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* FORM: EQUIPMENT */}
              {activeTab === 'equipments' ? (
                <form onSubmit={handleCreateEquipment} className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Nombre del Equipo *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Bomba de Calor Aerotermia Split 16kW"
                        value={newEqName}
                        onChange={(e) => setNewEqName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Categoría</label>
                      <select
                        value={newEqCategory}
                        onChange={(e) => setNewEqCategory(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      >
                        <option value="Aerotermia Monoblock">Aerotermia Monoblock</option>
                        <option value="Aerotermia Biblock">Aerotermia Biblock</option>
                        <option value="Suelo Radiante Seco">Suelo Radiante Seco (Sin Inercia)</option>
                        <option value="Suelo Radiante Húmedo">Suelo Radiante Húmedo (Con Inercia)</option>
                        <option value="Suelo Radiante Eléctrico">Suelo Radiante Eléctrico</option>
                        <option value="Fancoils & Emisores">Fancoils & Emisores</option>
                        <option value="Depósitos ACS & Hidráulica">Depósitos ACS & Hidráulica</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Potencia Nominal</label>
                      <input
                        type="text"
                        placeholder="Ej. 12.5 kW / 42,000 BTU"
                        value={newEqPower}
                        onChange={(e) => setNewEqPower(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Rendimiento COP</label>
                      <input
                        type="text"
                        placeholder="Ej. 5.10 (A7/W35)"
                        value={newEqCop}
                        onChange={(e) => setNewEqCop(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Rango Temp. Agua</label>
                      <input
                        type="text"
                        placeholder="Ej. 30°C a 65°C"
                        value={newEqTempRange}
                        onChange={(e) => setNewEqTempRange(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Refrigerante</label>
                      <input
                        type="text"
                        placeholder="Ej. R32 / R290 Ecológico"
                        value={newEqRefrigerant}
                        onChange={(e) => setNewEqRefrigerant(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Nivel Sonoro</label>
                      <input
                        type="text"
                        placeholder="Ej. 38 dB(A) a 1m"
                        value={newEqSound}
                        onChange={(e) => setNewEqSound(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Descripción Breve</label>
                      <textarea
                        rows={2}
                        placeholder="Detalles sobre aplicación, características de componentes y fiabilidad..."
                        value={newEqShortDesc}
                        onChange={(e) => setNewEqShortDesc(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Foto del Equipo</label>
                      <div className="flex gap-4 items-center">
                        <div 
                          onClick={() => imageInputRef.current?.click()}
                          className="flex-1 border-2 border-dashed border-stone-200 hover:border-primary/50 bg-stone-50 p-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-colors"
                        >
                          <Upload className="w-5 h-5 text-stone-400" />
                          <span className="text-xs font-bold text-stone-600">
                            {newEqImage ? 'Foto seleccionada (clic para cambiar)' : 'Subir imagen desde el dispositivo'}
                          </span>
                        </div>
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, 'eq')}
                          className="hidden"
                        />
                        {newEqImage && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-200 shrink-0">
                            <img src={newEqImage} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Datasheet Upload */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Ficha Técnica (PDF / Documento)</label>
                      <div className="flex gap-4 items-center">
                        <div 
                          onClick={() => datasheetInputRef.current?.click()}
                          className="flex-1 border-2 border-dashed border-stone-200 hover:border-primary/50 bg-stone-50 p-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-colors"
                        >
                          <FileText className="w-5 h-5 text-stone-400" />
                          <span className="text-xs font-bold text-stone-600 truncate">
                            {newEqDatasheetName ? newEqDatasheetName : 'Adjuntar archivo PDF o dejar vacío para generar automático'}
                          </span>
                        </div>
                        <input
                          ref={datasheetInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleDatasheetFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-3 rounded-xl font-bold text-sm text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                    >
                      Guardar Equipo en Catálogo
                    </button>
                  </div>
                </form>
              ) : (
                /* FORM: PROJECT */
                <form onSubmit={handleCreateProject} className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Título de la Obra / Proyecto *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Residencia Bioclimática Valle Sagrado"
                        value={newProjTitle}
                        onChange={(e) => setNewProjTitle(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Ubicación (Ciudad, Región)</label>
                      <input
                        type="text"
                        placeholder="Ej. Urubamba, Cusco"
                        value={newProjLocation}
                        onChange={(e) => setNewProjLocation(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Área Climatizada (m²)</label>
                      <input
                        type="text"
                        placeholder="Ej. 350 m²"
                        value={newProjArea}
                        onChange={(e) => setNewProjArea(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Sistema Instalado</label>
                      <input
                        type="text"
                        placeholder="Ej. Aerotermia Monoblock + Suelo Seco"
                        value={newProjSystem}
                        onChange={(e) => setNewProjSystem(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Estado</label>
                      <select
                        value={newProjStatus}
                        onChange={(e) => setNewProjStatus(e.target.value as any)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      >
                        <option value="Completado">Completado</option>
                        <option value="En ejecución">En ejecución</option>
                        <option value="En diseño">En diseño</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Descripción del Proyecto</label>
                      <textarea
                        rows={3}
                        placeholder="Detalles sobre el reto climático, la solución implementada y los resultados de confort..."
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Logros Clave / Aspectos Destacados</label>
                      <input
                        type="text"
                        placeholder="1. Ahorro energético del 70% comparado con gas"
                        value={newProjHighlight1}
                        onChange={(e) => setNewProjHighlight1(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none mb-1.5"
                      />
                      <input
                        type="text"
                        placeholder="2. Temperatura interior continua de 21°C todo el año"
                        value={newProjHighlight2}
                        onChange={(e) => setNewProjHighlight2(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none mb-1.5"
                      />
                      <input
                        type="text"
                        placeholder="3. Control zonificado con termostatos inteligentes"
                        value={newProjHighlight3}
                        onChange={(e) => setNewProjHighlight3(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Foto Principal de la Obra</label>
                      <div className="flex gap-4 items-center">
                        <div 
                          onClick={() => projectImageInputRef.current?.click()}
                          className="flex-1 border-2 border-dashed border-stone-200 hover:border-primary/50 bg-stone-50 p-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-colors"
                        >
                          <Upload className="w-5 h-5 text-stone-400" />
                          <span className="text-xs font-bold text-stone-600">
                            {newProjImage ? 'Foto cargada (clic para cambiar)' : 'Subir foto de la instalación / obra'}
                          </span>
                        </div>
                        <input
                          ref={projectImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, 'proj')}
                          className="hidden"
                        />
                        {newProjImage && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-200 shrink-0">
                            <img src={newProjImage} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-3 rounded-xl font-bold text-sm text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                    >
                      Registrar Proyecto
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: FULL EQUIPMENT SPEC SHEET & PDF */}
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
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {selectedEquipmentForSpecs.shortDesc}
                  </p>
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Garantía e Ingeniería GridHome</h4>
                      <p className="text-[11px] text-stone-500">Componentes con certificación europea y soporte directo en Perú.</p>
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

      {/* MODAL 3: PROJECT DETAILS & GALLERY */}
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
