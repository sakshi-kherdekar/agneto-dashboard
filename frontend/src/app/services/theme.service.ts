import { Injectable, signal, effect } from '@angular/core';

export interface Theme {
  id: string;
  name: string;
  icon: string;
  vars: Record<string, string>;
}

const THEMES: Theme[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    icon: 'dark_mode',
    vars: {
      '--bg-body': '#1a1a2e',
      '--bg-card': '#16213e',
      '--bg-item': '#1a2744',
      '--bg-item-hover': '#1e2f52',
      '--bg-header': '#16213e',
      '--bg-pill': '#1e2a4a',
      '--border-primary': '#2a2a4a',
      '--border-secondary': '#3a3a5a',
      '--text-primary': '#e0e0e0',
      '--text-secondary': '#ccc',
      '--text-muted': '#888',
      '--accent-primary': '#667eea',
      '--accent-secondary': '#764ba2',
      '--accent-holiday': '#4caf50',
      '--accent-birthday': '#e91e63',
      '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '--shadow-card': '0 2px 12px rgba(0, 0, 0, 0.2)',
      '--shadow-card-hover': '0 6px 24px rgba(118, 75, 162, 0.15)',
      '--detail-holiday-bg': 'linear-gradient(135deg, #1a2e1a 0%, #1e3620 100%)',
      '--detail-holiday-border': '#2e7d32',
      '--detail-birthday-bg': 'linear-gradient(135deg, #2e1a22 0%, #3a1a2a 100%)',
      '--detail-birthday-border': '#ad1457',
      '--holiday-item-hover': '#1a2e1a',
      '--birthday-item-hover': '#2e1a22',
      '--pill-hover-bg': '#252a4a',
      '--pill-hover-shadow': '0 2px 8px rgba(102, 126, 234, 0.15)',
      '--shuffle-hover-bg': '#2a1a2a',
      '--shuffle-hover-shadow': '0 2px 8px rgba(233, 30, 99, 0.15)',
      '--textarea-bg': '#1a2744',
      '--textarea-border': '#2a2a4a',
      '--textarea-focus-border': '#667eea',
      '--textarea-focus-shadow': '0 0 0 3px rgba(102, 126, 234, 0.2)',
      '--textarea-placeholder': '#666',
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    icon: 'electric_bolt',
    vars: {
      '--bg-body': '#0a0a0a',
      '--bg-card': '#111111',
      '--bg-item': '#1a1a1a',
      '--bg-item-hover': '#222222',
      '--bg-header': '#0d0d0d',
      '--bg-pill': '#1a1a1a',
      '--border-primary': '#1a2a1a',
      '--border-secondary': '#2a3a2a',
      '--text-primary': '#e0ffe0',
      '--text-secondary': '#b0d0b0',
      '--text-muted': '#5a7a5a',
      '--accent-primary': '#00ff41',
      '--accent-secondary': '#ff00ff',
      '--accent-holiday': '#00ff41',
      '--accent-birthday': '#ff00ff',
      '--gradient-primary': 'linear-gradient(135deg, #00ff41 0%, #00cc33 100%)',
      '--shadow-card': '0 2px 12px rgba(0, 255, 65, 0.08)',
      '--shadow-card-hover': '0 6px 24px rgba(0, 255, 65, 0.15)',
      '--detail-holiday-bg': 'linear-gradient(135deg, #0a1a0a 0%, #0d220d 100%)',
      '--detail-holiday-border': '#00ff41',
      '--detail-birthday-bg': 'linear-gradient(135deg, #1a0a1a 0%, #220d22 100%)',
      '--detail-birthday-border': '#ff00ff',
      '--holiday-item-hover': '#0a1a0a',
      '--birthday-item-hover': '#1a0a1a',
      '--pill-hover-bg': '#1a2a1a',
      '--pill-hover-shadow': '0 2px 8px rgba(0, 255, 65, 0.2)',
      '--shuffle-hover-bg': '#1a0a1a',
      '--shuffle-hover-shadow': '0 2px 8px rgba(255, 0, 255, 0.2)',
      '--textarea-bg': '#1a1a1a',
      '--textarea-border': '#1a2a1a',
      '--textarea-focus-border': '#00ff41',
      '--textarea-focus-shadow': '0 0 0 3px rgba(0, 255, 65, 0.2)',
      '--textarea-placeholder': '#3a5a3a',
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: 'wb_twilight',
    vars: {
      '--bg-body': '#1a1210',
      '--bg-card': '#2a1f1a',
      '--bg-item': '#332820',
      '--bg-item-hover': '#3d3028',
      '--bg-header': '#231a14',
      '--bg-pill': '#332820',
      '--border-primary': '#4a3a2a',
      '--border-secondary': '#5a4a3a',
      '--text-primary': '#f0e0d0',
      '--text-secondary': '#d4b896',
      '--text-muted': '#8a7a6a',
      '--accent-primary': '#ff6b35',
      '--accent-secondary': '#ff1493',
      '--accent-holiday': '#ffa040',
      '--accent-birthday': '#ff69b4',
      '--gradient-primary': 'linear-gradient(135deg, #ff6b35 0%, #ff1493 100%)',
      '--shadow-card': '0 2px 12px rgba(255, 107, 53, 0.08)',
      '--shadow-card-hover': '0 6px 24px rgba(255, 107, 53, 0.15)',
      '--detail-holiday-bg': 'linear-gradient(135deg, #332a1a 0%, #3d3020 100%)',
      '--detail-holiday-border': '#ffa040',
      '--detail-birthday-bg': 'linear-gradient(135deg, #331a28 0%, #3d2030 100%)',
      '--detail-birthday-border': '#ff69b4',
      '--holiday-item-hover': '#332a1a',
      '--birthday-item-hover': '#331a28',
      '--pill-hover-bg': '#3d3028',
      '--pill-hover-shadow': '0 2px 8px rgba(255, 107, 53, 0.2)',
      '--shuffle-hover-bg': '#331a28',
      '--shuffle-hover-shadow': '0 2px 8px rgba(255, 20, 147, 0.2)',
      '--textarea-bg': '#332820',
      '--textarea-border': '#4a3a2a',
      '--textarea-focus-border': '#ff6b35',
      '--textarea-focus-shadow': '0 0 0 3px rgba(255, 107, 53, 0.2)',
      '--textarea-placeholder': '#6a5a4a',
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: 'water',
    vars: {
      '--bg-body': '#0a1628',
      '--bg-card': '#0f2038',
      '--bg-item': '#142a44',
      '--bg-item-hover': '#1a3352',
      '--bg-header': '#0c1a30',
      '--bg-pill': '#142a44',
      '--border-primary': '#1e3a5a',
      '--border-secondary': '#2a4a6a',
      '--text-primary': '#d0e8f0',
      '--text-secondary': '#a0c8d8',
      '--text-muted': '#607888',
      '--accent-primary': '#00bcd4',
      '--accent-secondary': '#0097a7',
      '--accent-holiday': '#26c6da',
      '--accent-birthday': '#ff4081',
      '--gradient-primary': 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
      '--shadow-card': '0 2px 12px rgba(0, 188, 212, 0.08)',
      '--shadow-card-hover': '0 6px 24px rgba(0, 188, 212, 0.15)',
      '--detail-holiday-bg': 'linear-gradient(135deg, #0a2a2a 0%, #0d3333 100%)',
      '--detail-holiday-border': '#26c6da',
      '--detail-birthday-bg': 'linear-gradient(135deg, #2a0a1a 0%, #330d22 100%)',
      '--detail-birthday-border': '#ff4081',
      '--holiday-item-hover': '#0a2a2a',
      '--birthday-item-hover': '#2a0a1a',
      '--pill-hover-bg': '#1a3352',
      '--pill-hover-shadow': '0 2px 8px rgba(0, 188, 212, 0.2)',
      '--shuffle-hover-bg': '#2a0a1a',
      '--shuffle-hover-shadow': '0 2px 8px rgba(255, 64, 129, 0.2)',
      '--textarea-bg': '#142a44',
      '--textarea-border': '#1e3a5a',
      '--textarea-focus-border': '#00bcd4',
      '--textarea-focus-shadow': '0 0 0 3px rgba(0, 188, 212, 0.2)',
      '--textarea-placeholder': '#3a5a6a',
    }
  },
  {
    id: 'candy',
    name: 'Candy',
    icon: 'cookie',
    vars: {
      '--bg-body': '#1a1020',
      '--bg-card': '#261830',
      '--bg-item': '#2e2038',
      '--bg-item-hover': '#382842',
      '--bg-header': '#201428',
      '--bg-pill': '#2e2038',
      '--border-primary': '#3e2e50',
      '--border-secondary': '#4e3e60',
      '--text-primary': '#f0e0f8',
      '--text-secondary': '#d0b8e0',
      '--text-muted': '#8a7094',
      '--accent-primary': '#e040fb',
      '--accent-secondary': '#ea80fc',
      '--accent-holiday': '#b388ff',
      '--accent-birthday': '#ff80ab',
      '--gradient-primary': 'linear-gradient(135deg, #e040fb 0%, #ea80fc 100%)',
      '--shadow-card': '0 2px 12px rgba(224, 64, 251, 0.08)',
      '--shadow-card-hover': '0 6px 24px rgba(224, 64, 251, 0.15)',
      '--detail-holiday-bg': 'linear-gradient(135deg, #1a1a30 0%, #222240 100%)',
      '--detail-holiday-border': '#b388ff',
      '--detail-birthday-bg': 'linear-gradient(135deg, #301020 0%, #3a1828 100%)',
      '--detail-birthday-border': '#ff80ab',
      '--holiday-item-hover': '#1a1a30',
      '--birthday-item-hover': '#301020',
      '--pill-hover-bg': '#382842',
      '--pill-hover-shadow': '0 2px 8px rgba(224, 64, 251, 0.2)',
      '--shuffle-hover-bg': '#301020',
      '--shuffle-hover-shadow': '0 2px 8px rgba(255, 128, 171, 0.2)',
      '--textarea-bg': '#2e2038',
      '--textarea-border': '#3e2e50',
      '--textarea-focus-border': '#e040fb',
      '--textarea-focus-shadow': '0 0 0 3px rgba(224, 64, 251, 0.2)',
      '--textarea-placeholder': '#5a4a6a',
    }
  },
  {
    id: 'clean',
    name: 'Clean',
    icon: 'light_mode',
    vars: {
      '--bg-body': '#f0f2f5',
      '--bg-card': '#ffffff',
      '--bg-item': '#f5f6f8',
      '--bg-item-hover': '#ebedf0',
      '--bg-header': '#ffffff',
      '--bg-pill': '#f0f2f5',
      '--border-primary': '#e0e2e8',
      '--border-secondary': '#d0d2d8',
      '--text-primary': '#1a1a2e',
      '--text-secondary': '#444',
      '--text-muted': '#888',
      '--accent-primary': '#4f6bed',
      '--accent-secondary': '#6c4ba2',
      '--accent-holiday': '#2e7d32',
      '--accent-birthday': '#c2185b',
      '--gradient-primary': 'linear-gradient(135deg, #4f6bed 0%, #6c4ba2 100%)',
      '--shadow-card': '0 2px 12px rgba(0, 0, 0, 0.06)',
      '--shadow-card-hover': '0 6px 24px rgba(79, 107, 237, 0.12)',
      '--detail-holiday-bg': 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
      '--detail-holiday-border': '#66bb6a',
      '--detail-birthday-bg': 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
      '--detail-birthday-border': '#e91e63',
      '--holiday-item-hover': '#e8f5e9',
      '--birthday-item-hover': '#fce4ec',
      '--pill-hover-bg': '#e8eaf6',
      '--pill-hover-shadow': '0 2px 8px rgba(79, 107, 237, 0.15)',
      '--shuffle-hover-bg': '#fce4ec',
      '--shuffle-hover-shadow': '0 2px 8px rgba(194, 24, 91, 0.15)',
      '--textarea-bg': '#f5f6f8',
      '--textarea-border': '#e0e2e8',
      '--textarea-focus-border': '#4f6bed',
      '--textarea-focus-shadow': '0 0 0 3px rgba(79, 107, 237, 0.15)',
      '--textarea-placeholder': '#aaa',
    }
  }
];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'dashboard-theme';

  readonly themes = THEMES;
  readonly currentTheme = signal<Theme>(this.loadTheme());

  constructor() {
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  cycleTheme(): void {
    const current = this.currentTheme();
    const idx = this.themes.findIndex(t => t.id === current.id);
    const next = this.themes[(idx + 1) % this.themes.length];
    this.currentTheme.set(next);
  }

  private applyTheme(theme: Theme): void {
    const body = document.body;
    Object.entries(theme.vars).forEach(([key, value]) => {
      body.style.setProperty(key, value);
    });
    localStorage.setItem(this.STORAGE_KEY, theme.id);
  }

  private loadTheme(): Theme {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return this.themes.find(t => t.id === saved) ?? this.themes[0];
  }
}
