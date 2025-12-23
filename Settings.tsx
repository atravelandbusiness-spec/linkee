
import React from 'react';
import { AppState, DesignConfig } from './types';
import { FONTS, THEME_PRESETS } from './constants';

interface SettingsProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const Settings: React.FC<SettingsProps> = ({ state, setState }) => {
  const { design } = state;

  const updateDesign = (field: keyof DesignConfig, value: any) => {
    setState(prev => ({
      ...prev,
      design: { ...prev.design, [field]: value }
    }));
  };

  const applyTheme = (preset: typeof THEME_PRESETS[0]) => {
    setState(prev => ({
      ...prev,
      design: { ...prev.design, ...preset.design }
    }));
  };

  const Section = ({ title, id, children }: { title: string, id: string, children?: React.ReactNode }) => (
    <div id={id} className="mb-10 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
        {title}
      </h2>
      {children}
    </div>
  );

  const ToggleButton = ({ active, onClick, label }: any) => (
    <button
      onClick={onClick}
      className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
        active ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' : 'border-slate-100 text-slate-400 hover:border-slate-200'
      }`}
    >
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );

  const ColorInput = ({ label, value, onChange }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-3 hover:border-slate-200 transition-colors">
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 rounded-xl border-2 border-white shadow-md relative overflow-hidden cursor-pointer"
          style={{ backgroundColor: value }}
        >
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer scale-150"
          />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-800 uppercase tracking-wide">{label}</p>
          <p className="text-[9px] text-slate-400 font-mono uppercase">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-4 pb-32">
      <div className="sticky top-0 z-30 bg-[#F8F9FB]/80 backdrop-blur-xl py-4 -mx-4 px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['Themes', 'Background', 'Typography', 'Buttons'].map(tab => (
            <button 
              key={tab} 
              onClick={() => document.getElementById(tab.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 bg-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-sm border border-slate-100 hover:text-indigo-600 transition-all whitespace-nowrap"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <Section title="Temas Prediseñados" id="themes">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {THEME_PRESETS.map((theme) => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme)}
              className={`group relative overflow-hidden rounded-3xl border-2 transition-all p-3 ${
                design.wallpaperValue === theme.design.wallpaperValue ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-50 hover:border-slate-200 bg-white'
              }`}
            >
              <div 
                className="h-24 w-full rounded-2xl mb-3 flex flex-col items-center justify-center gap-2 border border-slate-100"
                style={{ background: theme.design.wallpaperValue || '#f3f3f1' }}
              >
                <div className="w-2/3 h-2 rounded-full" style={{ backgroundColor: theme.design.buttonColor || '#000' }}></div>
                <div className="w-2/3 h-2 rounded-full" style={{ backgroundColor: theme.design.buttonColor || '#000' }}></div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-600">{theme.name}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Fondo de Pantalla" id="background">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {['Fill', 'Gradient', 'Blur'].map(type => (
              <button 
                key={type}
                onClick={() => updateDesign('wallpaperType', type.toLowerCase())}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  design.wallpaperType === type.toLowerCase() ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">{type}</span>
              </button>
            ))}
          </div>
          <ColorInput 
            label="Color Principal de Fondo" 
            value={design.wallpaperValue.includes('#') ? design.wallpaperValue : '#F8F9FB'} 
            onChange={(val: string) => updateDesign('wallpaperValue', val)} 
          />
        </div>
      </Section>

      <Section title="Tipografía y Colores de Letra" id="typography">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Fuente del Título</label>
              <select 
                value={design.titleFont}
                onChange={(e) => updateDesign('titleFont', e.target.value)}
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-black outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Fuente del Cuerpo</label>
              <select 
                value={design.fontFamily}
                onChange={(e) => updateDesign('fontFamily', e.target.value)}
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
              <ColorInput label="Color del Nombre (Título)" value={design.titleColor} onChange={(val: string) => updateDesign('titleColor', val)} />
              <ColorInput label="Color de la Biografía (Cuerpo)" value={design.pageTextColor} onChange={(val: string) => updateDesign('pageTextColor', val)} />
          </div>
        </div>
      </Section>

      <Section title="Estilo de Botones" id="buttons">
        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Forma Visual</label>
            <div className="flex gap-3">
              <ToggleButton label="Sólido" active={design.buttonType === 'solid'} onClick={() => updateDesign('buttonType', 'solid')} />
              <ToggleButton label="Cristal" active={design.buttonType === 'glass'} onClick={() => updateDesign('buttonType', 'glass')} />
              <ToggleButton label="Borde" active={design.buttonType === 'outline'} onClick={() => updateDesign('buttonType', 'outline')} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <ColorInput label="Color de Fondo Botón" value={design.buttonColor} onChange={(val: string) => updateDesign('buttonColor', val)} />
             <ColorInput label="Color de Texto Botón" value={design.buttonTextColor} onChange={(val: string) => updateDesign('buttonTextColor', val)} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Redondeo de Esquinas</label>
                <span className="text-[10px] font-black text-indigo-600">{design.buttonRounding}px</span>
            </div>
            <input 
              type="range" min="0" max="30" value={design.buttonRounding} 
              onChange={(e) => updateDesign('buttonRounding', parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Sombras</label>
            <div className="grid grid-cols-4 gap-2">
              {['None', 'Subtle', 'Strong', 'Hard'].map(s => (
                <button 
                  key={s} 
                  onClick={() => updateDesign('buttonShadow', s.toLowerCase())}
                  className={`py-2 rounded-xl border-2 text-[8px] font-black uppercase tracking-wider transition-all ${design.buttonShadow === s.toLowerCase() ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Settings;
