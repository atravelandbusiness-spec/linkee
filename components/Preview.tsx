
import React from 'react';
import { AppState } from '../types';
import { FONTS } from '../constants';

interface PreviewProps {
  state: AppState;
}

const Preview: React.FC<PreviewProps> = ({ state }) => {
  const { profile, links, design, showBranding } = state;

  const getFontValue = (name: string) => {
    return FONTS.find(f => f.name === name)?.value || 'sans-serif';
  };

  const getShadowStyle = () => {
    switch(design.buttonShadow) {
      case 'subtle': return '0 4px 6px -1px rgba(0,0,0,0.05)';
      case 'strong': return '0 10px 25px -5px rgba(0,0,0,0.15)';
      case 'hard': return '6px 6px 0px 0px rgba(0,0,0,0.8)';
      default: return 'none';
    }
  };

  const buttonStyle: React.CSSProperties = {
    borderRadius: `${design.buttonRounding}px`,
    boxShadow: getShadowStyle(),
    backgroundColor: design.buttonType === 'outline' ? 'transparent' : (design.buttonType === 'glass' ? 'rgba(255,255,255,0.1)' : design.buttonColor),
    color: design.buttonTextColor,
    border: design.buttonType === 'outline' ? `2px solid ${design.buttonColor}` : (design.buttonType === 'glass' ? '1px solid rgba(255,255,255,0.2)' : 'none'),
    backdropFilter: design.buttonType === 'glass' ? 'blur(12px)' : 'none',
    fontFamily: getFontValue(design.fontFamily),
    fontWeight: 700,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const containerStyle: React.CSSProperties = {
    background: design.wallpaperValue,
    fontFamily: getFontValue(design.fontFamily),
    transition: 'background 0.5s ease',
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 1.5rem'
  };

  return (
    <div className="relative w-full h-full mobile-frame bg-white shadow-2xl overflow-hidden shrink-0 mx-auto border-[10px] border-slate-900 rounded-[3rem]">
      <div 
        className="absolute inset-0 overflow-y-auto no-scrollbar"
        style={containerStyle}
      >
        {/* Profile */}
        <div className={`mb-6 flex flex-col items-center w-full transition-transform duration-500 ${design.profileLayout === 'hero' ? 'scale-110 mb-8' : ''}`}>
           <div className="relative mb-4">
              <img 
                src={profile.avatar} 
                className={`${design.headerSize === 'large' ? 'w-24 h-24' : 'w-20 h-20'} rounded-full border-4 border-white/20 shadow-xl object-cover transition-all duration-500`}
                alt="avatar"
              />
           </div>
           
           <h1 className="text-lg mb-1 leading-tight break-words px-2" style={{ color: design.titleColor, fontFamily: getFontValue(design.titleFont), fontWeight: 900 }}>
              @{profile.username || 'usuario'}
           </h1>
           
           <p className="text-[11px] px-4 leading-relaxed opacity-90 font-medium" style={{ color: design.pageTextColor }}>
             {profile.bio || 'Tu biografía aquí'}
           </p>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {profile.socials.filter(s => s.url).map((social) => (
            <div key={social.platform} style={{ color: design.titleColor }} className="opacity-80">
               {social.platform === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/></svg>}
               {social.platform === 'facebook' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
               {social.platform === 'whatsapp' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.437 5.662 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="w-full space-y-4 pb-16">
          {links.filter(l => l.enabled).map((link) => (
            <div
              key={link.id}
              className="w-full py-4 px-6 text-[13px] text-center shadow-sm"
              style={buttonStyle}
            >
              <span className="truncate block">{link.title}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        {showBranding && (
          <div className="mt-auto py-6">
             <div className="bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/30 text-slate-800">
               <div className="w-4 h-4 bg-[#8129D9] rounded flex items-center justify-center text-white text-[6px] font-black">L</div>
               LinkPulse
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
