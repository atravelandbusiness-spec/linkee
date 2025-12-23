
import { AppState, ThemePreset } from './types';

export const FONTS = [
  { name: 'DM Sans', value: "'DM Sans', sans-serif" },
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Roboto Mono', value: "'Roboto Mono', monospace" },
  { name: 'Playfair Display', value: "'Playfair Display', serif" }
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'midnight-luxury',
    name: 'Midnight Luxury',
    design: {
      wallpaperType: 'fill',
      wallpaperValue: '#0f172a',
      buttonColor: '#334155',
      buttonTextColor: '#f8fafc',
      titleColor: '#ffffff',
      pageTextColor: '#94a3b8',
      buttonRounding: 12,
      buttonShadow: 'strong',
      buttonType: 'solid'
    }
  },
  {
    id: 'soft-lavender',
    name: 'Soft Lavender',
    design: {
      wallpaperType: 'fill',
      wallpaperValue: '#f5f3ff',
      buttonColor: '#8129D9',
      buttonTextColor: '#ffffff',
      titleColor: '#4c1d95',
      pageTextColor: '#7c3aed',
      buttonRounding: 30,
      buttonShadow: 'subtle',
      buttonType: 'solid'
    }
  },
  {
    id: 'neon-matrix',
    name: 'Neon Matrix',
    design: {
      wallpaperType: 'fill',
      wallpaperValue: '#000000',
      buttonColor: '#00ff41',
      buttonTextColor: '#000000',
      titleColor: '#00ff41',
      pageTextColor: '#00ff41',
      buttonRounding: 4,
      buttonShadow: 'hard',
      fontFamily: 'Roboto Mono',
      buttonType: 'solid'
    }
  },
  {
    id: 'glassmorphism-blue',
    name: 'Glass Ocean',
    design: {
      wallpaperType: 'gradient',
      wallpaperValue: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      buttonColor: 'rgba(255, 255, 255, 0.1)',
      buttonTextColor: '#ffffff',
      titleColor: '#ffffff',
      pageTextColor: '#dbeafe',
      buttonRounding: 16,
      buttonShadow: 'none',
      buttonType: 'glass'
    }
  },
  {
    id: 'minimal-zen',
    name: 'Minimal Zen',
    design: {
      wallpaperType: 'fill',
      wallpaperValue: '#ffffff',
      buttonColor: '#18181b',
      buttonTextColor: '#ffffff',
      titleColor: '#18181b',
      pageTextColor: '#71717a',
      buttonRounding: 0,
      buttonShadow: 'none',
      buttonType: 'solid'
    }
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Glow',
    design: {
      wallpaperType: 'gradient',
      wallpaperValue: 'linear-gradient(to top, #f97316, #ef4444)',
      buttonColor: '#ffffff',
      buttonTextColor: '#991b1b',
      titleColor: '#ffffff',
      pageTextColor: '#fee2e2',
      buttonRounding: 12,
      buttonShadow: 'strong',
      buttonType: 'solid'
    }
  },
  {
    id: 'pastel-pink',
    name: 'Pastel Dream',
    design: {
      wallpaperType: 'fill',
      wallpaperValue: '#fdf2f8',
      buttonColor: '#f472b6',
      buttonTextColor: '#ffffff',
      titleColor: '#be185d',
      pageTextColor: '#db2777',
      buttonRounding: 20,
      buttonShadow: 'subtle',
      buttonType: 'solid'
    }
  },
  {
    id: 'industrial-gray',
    name: 'Industrial',
    design: {
      wallpaperType: 'fill',
      wallpaperValue: '#27272a',
      buttonColor: '#fbbf24',
      buttonTextColor: '#18181b',
      titleColor: '#fbbf24',
      pageTextColor: '#a1a1aa',
      buttonRounding: 4,
      buttonShadow: 'hard',
      buttonType: 'solid'
    }
  }
];

export const INITIAL_STATE: AppState = {
  profile: {
    name: 'Tu Nombre',
    username: 'usuario',
    bio: 'Bienvenido a mi espacio digital. Aquí puedes encontrar todos mis enlaces importantes y proyectos actuales.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    socials: [
      { platform: 'instagram', url: '' },
      { platform: 'whatsapp', url: '' },
      { platform: 'facebook', url: '' }
    ]
  },
  links: [
    { 
      id: '1', 
      title: '¡Visita mi sitio web!', 
      url: 'https://google.com', 
      enabled: true,
      clicks: 0
    }
  ],
  design: {
    profileLayout: 'classic',
    headerSize: 'small',
    titleStyle: 'text',
    titleFont: 'DM Sans',
    titleColor: '#18181b',
    fontFamily: 'Inter',
    pageTextColor: '#71717a',
    wallpaperType: 'fill',
    wallpaperValue: '#F8F9FB',
    buttonType: 'solid',
    buttonRounding: 16,
    buttonShadow: 'subtle',
    buttonColor: '#18181b',
    buttonTextColor: '#ffffff'
  },
  showBranding: true
};
