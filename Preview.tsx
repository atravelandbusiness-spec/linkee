
import React from 'react';
import { AppState } from './types';
import { FONTS } from './constants';

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
    padding: '3.5rem 1.5rem 1.5rem'
  };

  return (
    <div className="relative w-full h-full mobile-frame bg-white shadow-2xl overflow-hidden shrink-0 mx-auto">
      <div 
        className="absolute inset-0 overflow-y-auto no-scrollbar"
        style={containerStyle}
      >
        {/* Profile */}
        <div className={`mb-8 flex flex-col items-center w-full transition-transform duration-500 ${design.profileLayout === 'hero' ? 'scale-110 mb-10' : ''}`}>
           <div className="relative mb-4">
              <img 
                src={profile.avatar || 'https://picsum.photos/200'} 
                className={`${design.headerSize === 'large' ? 'w-24 h-24' : 'w-20 h-20'} rounded-full border-4 border-white/20 shadow-xl object-cover transition-all duration-500`}
                alt="avatar"
              />
           </div>
           
           <h1 className="text-xl mb-1 leading-tight break-words px-4 text-center" style={{ color: design.titleColor, fontFamily: getFontValue(design.titleFont), fontWeight: 900 }}>
              {profile.name}
           </h1>
           <p className="text-[12px] opacity-80 mb-2 font-black" style={{ color: design.titleColor }}>
              @{profile.username || 'usuario'}
           </p>
           
           <p className="text-[12px] px-4 leading-relaxed opacity-90 text-center" style={{ color: design.pageTextColor }}>
             {profile.bio || 'Tu biografía se verá aquí...'}
           </p>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {profile.socials.filter(s => s.url).map((social) => (
            <div key={social.platform} style={{ color: design.titleColor }} className="opacity-80">
               {social.platform === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/></svg>}
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="w-full space-y-4 pb-16 px-2">
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
