
import React from 'react';
import { AppState } from './types';
import { FONTS } from './constants';

interface PublicProfileProps {
  state: AppState;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ state }) => {
  const { profile, links, design, showBranding } = state;

  const getFontValue = (name: string) => {
    return FONTS.find(f => f.name === name)?.value || 'sans-serif';
  };

  const getShadow = () => {
    switch(design.buttonShadow) {
      case 'subtle': return '0 4px 6px -1px rgba(0,0,0,0.05)';
      case 'strong': return '0 10px 25px -5px rgba(0,0,0,0.15)';
      case 'hard': return '8px 8px 0px 0px rgba(0,0,0,0.8)';
      default: return 'none';
    }
  };

  const buttonStyle: React.CSSProperties = {
    borderRadius: `${design.buttonRounding}px`,
    boxShadow: getShadow(),
    backgroundColor: design.buttonType === 'outline' ? 'transparent' : (design.buttonType === 'glass' ? 'rgba(255,255,255,0.15)' : design.buttonColor),
    color: design.buttonTextColor,
    border: design.buttonType === 'outline' ? `2px solid ${design.buttonColor}` : (design.buttonType === 'glass' ? '1px solid rgba(255,255,255,0.2)' : 'none'),
    backdropFilter: design.buttonType === 'glass' ? 'blur(16px)' : 'none',
    fontFamily: getFontValue(design.fontFamily),
    fontWeight: 700,
    width: '100%',
    padding: '1.25rem 2rem',
    textAlign: 'center',
    display: 'block',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const containerStyle: React.CSSProperties = {
    background: design.wallpaperValue,
    color: design.pageTextColor,
    fontFamily: getFontValue(design.fontFamily),
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 1.5rem'
  };

  return (
    <div style={containerStyle} className="animate-gradient overflow-x-hidden">
      <div className="w-full max-w-xl flex flex-col items-center">
        
        {/* Profile Header */}
        <div className={`flex flex-col items-center text-center mb-12 transition-all ${design.profileLayout === 'hero' ? 'scale-110 mb-16' : ''}`}>
          <div className="mb-6 relative">
            <img 
              src={profile.avatar} 
              alt={profile.username}
              className={`${design.headerSize === 'large' ? 'w-32 h-32 md:w-40 md:h-40' : 'w-24 h-24 md:w-28 md:h-28'} rounded-full border-4 border-white shadow-2xl object-cover transform transition-transform hover:scale-105`}
            />
          </div>
          <h1 
            className="text-2xl md:text-3xl font-black mb-3 tracking-tighter" 
            style={{ color: design.titleColor, fontFamily: getFontValue(design.titleFont) }}
          >
            @{profile.username || 'usuario'}
          </h1>
          <p className="text-sm md:text-base opacity-90 px-6 max-w-md leading-relaxed font-medium">
            {profile.bio}
          </p>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {profile.socials.filter(s => s.url).map((social) => (
            <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform" style={{ color: design.titleColor }}>
               {social.platform === 'instagram' && <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/></svg>}
               {social.platform === 'facebook' && <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
               {social.platform === 'whatsapp' && <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.437 5.662 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
            </a>
          ))}
        </div>

        {/* Links List */}
        <div className="w-full space-y-6 px-4 mb-24 max-w-lg">
          {links.filter(l => l.enabled).map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-[1.03] active:scale-[0.98] transform"
              style={buttonStyle}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Footer Branding */}
        {showBranding && (
          <div className="mt-auto flex flex-col items-center gap-4 py-12">
            <div className="bg-white/30 backdrop-blur-3xl px-8 py-4 rounded-3xl shadow-2xl text-base font-black text-slate-900 flex items-center gap-3 border border-white/40 hover:scale-105 transition-all cursor-default">
               <div className="w-8 h-8 bg-[#8129D9] rounded-xl flex items-center justify-center text-white text-xs font-black">L</div>
               LinkPulse AI
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
