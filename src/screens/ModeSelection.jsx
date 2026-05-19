import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ear, HandWaving, Users, CaretRight, NotePencil, Translate, VideoCamera } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

export default function ModeSelection() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const modes = [
    {
      id: 'translate',
      title: 'AI Real-Time Translator',
      desc: 'Translate spoken or written speech into signs in real-time, or sign to the camera to speak aloud instantly.',
      icon: Translate,
      path: '/live-translation?mode=speech',
      bg: 'linear-gradient(135deg, var(--emerald) 0%, var(--forest) 100%)',
      color: 'white'
    },
    {
      id: 'interpreter',
      title: 'Live Human Interpreter',
      desc: 'Connect with a certified 24/7 GSL video relay interpreter for important hospital visits, police reports, or business meetings.',
      icon: VideoCamera,
      path: '/live-interpreter',
      bg: 'linear-gradient(135deg, var(--gold) 0%, var(--deep-gold) 100%)',
      color: 'white'
    },
    {
      id: 'dictator',
      title: 'AI Sign Dictator & Writer',
      desc: 'Sign to your camera to dictate, edit, and export structured letters, official emails, or formal public applications in text.',
      icon: NotePencil,
      path: '/live-translation?mode=camera&feature=dictation',
      bg: 'white',
      color: 'var(--forest)'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', paddingBottom: 80 }}>
      <TopNav title="Select Mode" showBack={true} />
      
      <div style={{ padding: isMobile ? '24px 16px' : '40px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 36, margin: '0 0 12px 0', color: 'var(--forest)', textAlign: 'center', fontWeight: 600 }}>
          How can we help you today?
        </h2>
        <p style={{ color: 'var(--mid-teal)', fontSize: isMobile ? 15 : 18, margin: '0 0 40px 0', textAlign: 'center' }}>
          Choose a mode to start communicating seamlessly.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: isMobile ? 20 : 32 
        }}>
          {modes.map(mode => {
            const Icon = mode.icon;
            const isDark = mode.color === 'white';
            
            return (
              <button 
                key={mode.id}
                onClick={() => navigate(mode.path)}
                style={{
                  background: mode.bg,
                  color: mode.color,
                  borderRadius: 'var(--radius-xl)',
                  padding: isMobile ? '24px 20px' : '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: isDark ? 'none' : '1px solid var(--lh-surface)',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-float)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
              >
                {/* Decorative background glow */}
                <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', filter: 'blur(30px)' }} />

                <div style={{ 
                  width: 80, height: 80, borderRadius: 24, 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.18)' : 'var(--mint)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                  color: isDark ? 'white' : 'var(--forest)',
                  boxShadow: 'var(--shadow-soft)'
                }}>
                  <Icon size={44} weight={isDark ? "fill" : "duotone"} />
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: '0 0 16px 0', fontWeight: 700 }}>{mode.title}</h3>
                <p style={{ fontSize: 14, opacity: 0.9, margin: '0 0 32px 0', lineHeight: 1.6, flex: 1 }}>{mode.desc}</p>
                
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, fontWeight: 700,
                  padding: '12px 24px',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'var(--surface)',
                  borderRadius: 24,
                  color: isDark ? 'white' : 'var(--forest)',
                  boxShadow: 'var(--shadow-soft)'
                }}>
                  Select Mode <CaretRight size={16} weight="bold" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
