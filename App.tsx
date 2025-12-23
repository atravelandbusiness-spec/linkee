
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Settings from './components/Settings';
import PublicProfile from './PublicProfile';
import { INITIAL_STATE } from './constants';
import { AppState } from './types';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 w-20 h-20 bg-[#8129D9] rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
        <span className="text-white text-4xl font-black">L</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
        Todo lo que eres <br/><span className="text-[#8129D9]">en un solo enlace.</span>
      </h1>
      <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
        Crea tu página profesional con IA, temas personalizados y marca blanca en segundos.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate('/admin')}
          className="bg-[#8129D9] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-[#6b22b5] transition-all transform hover:scale-105 active:scale-95"
        >
          Crear mi Enlace
        </button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { path: '/admin', label: 'Links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
    { path: '/admin/settings', label: 'Diseño', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' }
  ];

  return (
    <aside className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 md:relative md:w-24 md:h-screen md:border-t-0 md:border-r z-50">
      <div className="flex md:flex-col items-center justify-around md:justify-start md:py-8 h-full gap-4">
        <div className="hidden md:block mb-10">
          <Link to="/">
            <div className="w-12 h-12 bg-[#8129D9] rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl">L</span>
            </div>
          </Link>
        </div>
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 transition-all group ${
              location.pathname === item.path ? 'text-[#8129D9]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${location.pathname === item.path ? 'bg-indigo-50' : 'group-hover:bg-slate-50'}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

const AdminLayout = ({ children, state }: { children?: React.ReactNode, state: AppState }) => {
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8F9FB] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-3">
            <span className="text-slate-800 font-bold hidden sm:block">Dashboard</span>
            <span className="text-slate-200 hidden sm:block">|</span>
            <a 
              href={`#/${state.profile.username}`} 
              target="_blank"
              className="text-[#8129D9] text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-1"
            >
              linkpulse.ai/{state.profile.username || 'usuario'}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="md:hidden bg-indigo-50 text-[#8129D9] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-indigo-100"
            >
              {showMobilePreview ? 'Cerrar Vista' : 'Ver Vista Previa'}
            </button>
            <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg">
              Compartir
            </button>
          </div>
        </header>
        
        <div className="flex-1 flex overflow-hidden relative">
          <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth w-full">
            <div className="max-w-4xl mx-auto w-full">
              {children}
            </div>
          </main>
          
          {showMobilePreview && (
            <div className="md:hidden fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md p-6 flex flex-col items-center justify-center">
              <button 
                onClick={() => setShowMobilePreview(false)} 
                className="mb-6 bg-white/20 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs border border-white/20"
              >
                Volver a Editar
              </button>
              <div className="w-full max-w-[280px] h-[80vh]">
                <Preview state={state} />
              </div>
            </div>
          )}

          <aside className="hidden md:flex w-[400px] lg:w-[480px] border-l border-slate-200 bg-slate-100 items-center justify-center p-8 shrink-0 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="w-full max-w-[320px] h-[90%] sticky top-8 transition-all duration-500">
              <Preview state={state} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('linkpulse_master_state_v4');
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (e) {
      return INITIAL_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('linkpulse_master_state_v4', JSON.stringify(state));
  }, [state]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:username" element={<PublicProfile state={state} />} />
        <Route path="/admin/*" element={
          <AdminLayout state={state}>
            <Routes>
              <Route path="/" element={<Editor state={state} setState={setState} />} />
              <Route path="/settings" element={<Settings state={state} setState={setState} />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
