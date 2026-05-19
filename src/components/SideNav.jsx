import { useNavigate, useLocation } from 'react-router-dom';
import { House, BookBookmark, VideoCamera, WarningCircle, Gear, ShieldCheck, GraduationCap, Cards, CalendarDot, TextAa, Ear, UserCircle, Camera, Fire } from '@phosphor-icons/react';

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', path: '/home', icon: House, label: 'Dashboard' },
    { id: 'glossary', path: '/glossary', icon: BookBookmark, label: 'Learning Hub' },
    { id: 'live', path: '/mode-selection', icon: VideoCamera, label: 'Translate' },
    { id: 'emergency', path: '/emergency', icon: WarningCircle, label: 'Emergency SOS' },
    { id: 'admin', path: '/admin', icon: ShieldCheck, label: 'Admin Portal' },
    { id: 'settings', path: '/settings', icon: Gear, label: 'Settings' },
  ];

  return (
    <div style={{
      width: 280,
      height: '100vh',
      background: 'linear-gradient(180deg, var(--primary-dark) 0%, #0E221D 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0 0 0',
      color: 'white',
      flexShrink: 0,
      boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
      zIndex: 10,
      overflowY: 'auto'
    }}>
      <div style={{ padding: '0 32px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ color: 'var(--accent-bright)' }}>
          {/* Softer Logo */}
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, margin: 0, letterSpacing: '-0.5px' }}>VoiceSign GH</h1>
      </div>

      {/* ── Main nav ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 16px' }}>
        {tabs.map(tab => {
          const isLearningHub = tab.id === 'glossary';
          const isLearningSectionActive = location.pathname === '/glossary' || location.pathname.startsWith('/learn');
          const isActive = location.pathname.startsWith(tab.path) || 
                           (tab.id === 'live' && (location.pathname === '/live-translation' || location.pathname === '/sign-reader' || location.pathname === '/live-interpreter')) ||
                           (isLearningHub && isLearningSectionActive);
          const Icon = tab.icon;
          
          return (
            <div key={tab.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={() => navigate(tab.path)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '12px 20px',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: isActive ? 'var(--accent-bright)' : 'var(--primary-pale)',
                  borderRadius: 14,
                  textAlign: 'left',
                  width: '100%',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? 600 : 400
                }}
                onMouseOver={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'white'; } }}
                onMouseOut={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--primary-pale)'; } }}
              >
                <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
                <span style={{ fontSize: 15 }}>{tab.label}</span>
              </button>

              {isLearningHub && isLearningSectionActive && (
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: 2,
                  padding: '4px 0 4px 20px',
                  borderLeft: '1.5px solid rgba(255,255,255,0.15)',
                  marginLeft: 30, marginTop: 4, marginBottom: 4
                }}>
                  {[
                    { id: 'learn-courses',   path: '/learn/courses',   icon: BookBookmark,  label: 'Domain Courses' },
                    { id: 'learn-flashcards',path: '/learn/flashcards',icon: Cards,         label: 'Flashcards' },
                    { id: 'learn-daily',     path: '/learn/daily',     icon: CalendarDot,   label: 'Daily Sign', badge: <><Fire size={11} color="var(--gold)" weight="fill" /><span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', fontWeight: 700 }}>7</span></> },
                    { id: 'learn-alphabet',  path: '/learn/alphabet',  icon: TextAa,        label: 'Alphabet & Numbers' },
                    { id: 'learn-camera',    path: '/learn/camera',    icon: Camera,        label: 'Camera Practice' },
                    { id: 'learn-profile',   path: '/learn/profile',   icon: UserCircle,    label: 'Learning Profile' },
                    { id: 'learn-hearing',   path: '/learn/hearing',   icon: Ear,           label: 'For Hearing People', badge: <span style={{ fontSize: 8, fontWeight: 700, backgroundColor: 'var(--leaf)', color: 'white', padding: '1px 5px', borderRadius: 999 }}>PUBLIC</span> },
                  ].map(item => {
                    const isSubActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                    const SubIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '8px 12px',
                          backgroundColor: isSubActive ? 'rgba(245,166,35,0.12)' : 'transparent',
                          color: isSubActive ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                          borderRadius: 8,
                          textAlign: 'left',
                          width: '100%',
                          transition: 'all 0.15s ease',
                          fontWeight: isSubActive ? 600 : 400
                        }}
                        onMouseOver={(e) => { if (!isSubActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; } }}
                        onMouseOut={(e) => { if (!isSubActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; } }}
                      >
                        <SubIcon size={16} weight={isSubActive ? 'fill' : 'regular'} />
                        <span style={{ fontSize: 13, flex: 1 }}>{item.label}</span>
                        {item.badge && <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>{item.badge}</div>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User profile snippet at bottom */}
      <div style={{ marginTop: 'auto', padding: '0 24px' }}>
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '16px 20px', 
          display: 'flex', alignItems: 'center', gap: 16,
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--primary-light)', backgroundColor: 'var(--n4)' }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: 15, fontWeight: 600 }}>Kofi Mensah</h4>
            <span style={{ fontSize: 12, color: 'var(--primary-pale)', opacity: 0.8 }}>Premium User</span>
          </div>
        </div>
      </div>
    </div>
  );
}
