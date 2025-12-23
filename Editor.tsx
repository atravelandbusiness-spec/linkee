
import React, { useState } from 'react';
import { AppState, LinkItem } from './types';
import { enhanceProfile } from './services/geminiService';

interface EditorProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const Editor: React.FC<EditorProps> = ({ state, setState }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, [name]: value }
    }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitizamos el username para que sea URL-friendly
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '');
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, username: val }
    }));
  };

  const handleSocialChange = (index: number, value: string) => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        socials: prev.profile.socials.map((social, i) =>
          i === index ? { ...social, url: value } : social
        )
      }
    }));
  };

  const handleLinkChange = (id: string, field: keyof LinkItem, value: any) => {
    setState(prev => ({
      ...prev,
      links: prev.links.map(link => 
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Nuevo Enlace',
      url: 'https://',
      enabled: true,
      clicks: 0
    };
    setState(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const deleteLink = (id: string) => {
    setState(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== id)
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({
          ...prev,
          profile: { ...prev.profile, avatar: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-6 md:p-8 pb-32">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Mi Perfil & Enlaces</h1>
        <button 
          onClick={async () => {
            setIsEnhancing(true);
            const res = await enhanceProfile(state.profile, state.links);
            if (res) {
               setState(prev => ({
                ...prev,
                profile: { 
                  ...prev.profile, 
                  bio: res.enhancedBio 
                },
                links: prev.links.map((l, i) => ({
                  ...l,
                  title: res.suggestedTitles[i] || l.title
                }))
              }));
            }
            setIsEnhancing(false);
          }}
          disabled={isEnhancing}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black text-indigo-600 hover:bg-indigo-100 transition-all uppercase tracking-widest shadow-sm"
        >
          <svg className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {isEnhancing ? 'Pensando...' : 'IA Optimizar Bio'}
        </button>
      </div>

      {/* Información de Perfil */}
      <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group shrink-0 mx-auto md:mx-0">
            <img 
              src={state.profile.avatar || 'https://picsum.photos/200'} 
              className="w-28 h-28 rounded-full object-cover border-4 border-slate-50 shadow-lg" 
              alt="Avatar" 
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity border-2 border-white/50">
              <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </label>
          </div>
          
          <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={state.profile.name}
                    onChange={handleProfileChange}
                    placeholder="Tu Nombre"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3.5 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Nombre de Usuario (Username)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">@</span>
                    <input
                        type="text"
                        value={state.profile.username}
                        onChange={handleUsernameChange}
                        placeholder="ejemplo.usuario"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3.5 pl-9 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>
        
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Biografía / Tagline</label>
          <textarea
            name="bio"
            value={state.profile.bio}
            onChange={handleProfileChange}
            placeholder="Cuenta algo sobre ti..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100 min-h-[100px] resize-none text-sm leading-relaxed"
          />
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-5 ml-1">Redes Sociales</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.profile.socials.map((social, idx) => (
            <div key={social.platform} className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3 border border-slate-100 hover:border-indigo-200 transition-all group">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest w-16">{social.platform}</span>
              <input 
                type="text" 
                value={social.url} 
                onChange={(e) => handleSocialChange(idx, e.target.value)}
                className="flex-1 bg-transparent border-none p-0 text-xs font-bold outline-none text-slate-700"
                placeholder={`URL de ${social.platform}...`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lista de Enlaces */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Mis Enlaces</h2>
            <button 
              onClick={addLink}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full font-black text-[10px] shadow-lg hover:bg-indigo-700 transition-all uppercase tracking-widest"
            >
              + Añadir Enlace
            </button>
        </div>
        {state.links.map((link) => (
          <div key={link.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex gap-4 hover:border-indigo-100 transition-all group">
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
                    className="font-black text-slate-800 text-base w-full bg-transparent border-none p-0 focus:ring-0 placeholder-slate-300"
                    placeholder="Título del enlace"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-xs text-slate-400"
                    placeholder="https://..."
                  />
                </div>
                <button 
                  onClick={() => handleLinkChange(link.id, 'enabled', !link.enabled)} 
                  className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${link.enabled ? 'bg-green-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${link.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{link.clicks || 0} clics</span>
                 <button onClick={() => deleteLink(link.id)} className="text-slate-200 hover:text-red-400 p-1 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
