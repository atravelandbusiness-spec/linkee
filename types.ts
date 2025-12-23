
export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'whatsapp' | 'twitter' | 'youtube';
  url: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  icon?: string;
  clicks?: number;
}

export interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar?: string;
  socials: SocialLink[];
}

export interface DesignConfig {
  profileLayout: 'classic' | 'hero';
  headerSize: 'small' | 'large';
  titleStyle: 'text' | 'logo';
  titleFont: string;
  titleColor: string;
  fontFamily: string; // Font for bio/page
  pageTextColor: string;
  wallpaperType: 'fill' | 'gradient' | 'blur' | 'pattern' | 'image';
  wallpaperValue: string;
  buttonType: 'solid' | 'glass' | 'outline';
  buttonRounding: number; // 0 to 30
  buttonShadow: 'none' | 'subtle' | 'strong' | 'hard';
  buttonColor: string;
  buttonTextColor: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  design: Partial<DesignConfig>;
}

export interface AppState {
  profile: UserProfile;
  links: LinkItem[];
  design: DesignConfig;
  showBranding: boolean;
}
