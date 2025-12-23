
import React from 'react';
import { AppState, DesignConfig } from '../types';
import { FONTS, THEME_PRESETS } from '../constants';

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
    <div id={id} className="mb-10 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-[#8129D9] rounded-full"></span>
        {title}
      </h2>
      {children}
    </div>
  );

  const ToggleButton = ({ active, onClick, label }: any) => (
    <button
      onClick={onClick}
      className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
        active ? 'border-[#8129D9] bg-indigo-50/50 text-[#8129D9]' : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'
      }`}
    >
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );

  const ColorInput = ({ label, value, onChange }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-3 hover:border-slate-200 transition-colors">
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 rounded-lg border-2 border-white shadow-md relative overflow-hidden cursor-pointer"
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
      {/* Navegación Rápida */}
      <div className="sticky top-0 z-30 bg-[#F8F9FB]/80 backdrop-blur-xl py-4 -mx-4 px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['Themes', 'Appearance', 'Typography', 'Buttons', 'Branding'].map(tab => (
            <button 
              key={tab} 
              onClick={() => document.getElementById(tab.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 bg-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-sm border border-slate-100 hover:text-[#8129D9] transition-all whitespace-nowrap"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <Section title="Temas Pro" id="themes">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {THEME_PRESETS.map((theme) => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme)}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all p-3 ${
                design.wallpaperValue === theme.design.wallpaperValue ? 'border-[#8129D9] bg-indigo-50/20' : 'border-slate-50 hover:border-slate-200 bg-white shadow-sm'
              }`}
            >
              <div 
                className="h-20 w-full rounded-xl mb-3 flex flex-col items-center justify-center gap-2 border border-slate-100 shadow-inner"
                style={{ background: theme.design.wallpaperValue || '#f3f3f1' }}
              >
                <div className="w-1/2 h-1.5 rounded-full opacity-60" style={{ backgroundColor: theme.design.buttonColor || '#000' }}></div>
                <div className="w-1/2 h-1.5 rounded-full opacity-60" style={{ backgroundColor: theme.design.buttonColor || '#000' }}></div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:text-[#8129D9]">{theme.name}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Fondo y Estilo" id="appearance">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {['Fill', 'Gradient', 'Blur'].map(type => (
              <button 
                key={type}
                onClick={() => updateDesign('wallpaperType', type.toLowerCase())}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  design.wallpaperType === type.toLowerCase() ? 'border-[#8129D9] bg-indigo-50/50 text-[#8129D9]' : 'border-slate-100 text-slate-400 bg-white'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">{type}</span>
              </button>
            ))}
          </div>
          <ColorInput 
            label="Color de Fondo" 
            value={design.wallpaperValue.includes('#') ? design.wallpaperValue : '#F8F9FB'} 
            onChange={(val: string) => updateDesign('wallpaperValue', val)} 
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Avatar</label>
              <div className="flex gap-2">
                <ToggleButton label="S" active={design.headerSize === 'small'} onClick={() => updateDesign('headerSize', 'small')} />
                <ToggleButton label="L" active={design.headerSize === 'large'} onClick={() => updateDesign('headerSize', 'large')} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Diseño</label>
              <div className="flex gap-2">
                <ToggleButton label="Classic" active={design.profileLayout === 'classic'} onClick={() => updateDesign('profileLayout', 'classic')} />
                <ToggleButton label="Hero" active={design.profileLayout === 'hero'} onClick={() => updateDesign('profileLayout', 'hero')} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Fuentes y Colores de Letra" id="typography">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Fuente Principal</label>
              <select 
                value={design.titleFont}
                onChange={(e) => updateDesign('titleFont', e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Fuente del Cuerpo</label>
              <select 
                value={design.fontFamily}
                onChange={(e) => updateDesign('fontFamily', e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
              <ColorInput label="Color del Nombre (Título)" value={design.titleColor} onChange={(val: string) => updateDesign('titleColor', val)} />
              <ColorInput label="Color de la Bio (Texto)" value={design.pageTextColor} onChange={(val: string) => updateDesign('pageTextColor', val)} />
          </div>
        </div>
      </Section>

      <Section title="Botones de Enlace" id="buttons">
        <div className="space-y-6">
          <div className="flex gap-3">
            <ToggleButton label="Sólido" active={design.buttonType === 'solid'} onClick={() => updateDesign('buttonType', 'solid')} />
            <ToggleButton label="Cristal" active={design.buttonType === 'glass'} onClick={() => updateDesign('buttonType', 'glass')} />
            <ToggleButton label="Borde" active={design.buttonType === 'outline'} onClick={() => updateDesign('buttonType', 'outline')} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <ColorInput label="Fondo Botón" value={design.buttonColor} onChange={(val: string) => updateDesign('buttonColor', val)} />
             <ColorInput label="Texto Botón" value={design.buttonTextColor} onChange={(val: string) => updateDesign('buttonTextColor', val)} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Redondeo</label>
                <span className="text-[10px] font-black text-[#8129D9] bg-indigo-50 px-2 py-1 rounded">{design.buttonRounding}px</span>
            </div>
            <input 
              type="range" min="0" max="30" value={design.buttonRounding} 
              onChange={(e) => updateDesign('buttonRounding', parseInt(e.target.value))}
              className="w-full accent-[#8129D9] h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {['None', 'Subtle', 'Strong', 'Hard'].map(s => (
              <button 
                key={s} 
                onClick={() => updateDesign('buttonShadow', s.toLowerCase())}
                className={`py-2 rounded-xl border-2 text-[8px] font-black uppercase tracking-wider transition-all ${design.buttonShadow === s.toLowerCase() ? 'bg-[#8129D9] text-white border-[#8129D9]' : 'bg-white text-slate-400 border-slate-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Marca Blanca (White Label)" id="branding">
        <div className="p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
             <p className="text-xs font-black text-slate-800 uppercase tracking-widest">Ocultar Logo LinkPulse</p>
             <p className="text-[10px] text-slate-500 max-w-[200px]">Elimina cualquier rastro de nuestra marca para un aspecto 100% propio.</p>
          </div>
          <button 
            onClick={() => setState(prev => ({ ...prev, showBranding: !prev.showBranding }))}
            className={`w-14 h-7 rounded-full transition-colors relative shadow-inner ${!state.showBranding ? 'bg-[#8129D9]' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform shadow-md ${!state.showBranding ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Settings;
