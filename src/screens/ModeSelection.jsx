import { useNavigate } from 'react-router-dom';
import { Ear, HandWaving, Users, CaretLeft, CaretRight } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

export default function ModeSelection() {
  const navigate = useNavigate();

  const modes = [
    {
      id: 'translate',
      title: 'Understand Speech',
      desc: 'Watch public addresses translated into Ghanaian Sign Language in real-time.',
      icon: Ear,
      path: '/live-translation?mode=speech',
      bg: 'linear-gradient(135deg, var(--primary-light) 0%, var(--primary-mid) 100%)',
      color: 'white'
    },
    {
      id: 'speak',
      title: 'Speak Through Signs',
      desc: 'Sign to the camera and have your signs translated into text and speech.',
      icon: HandWaving,
      path: '/live-translation?mode=camera',
      bg: 'linear-gradient(135deg, var(--accent-strong) 0%, #8B5E00 100%)',
      color: 'white'
    },
    {
      id: 'interpreter',
      title: 'Live Human Interpreter',
      desc: 'Connect with a certified GSL interpreter for important meetings or appointments.',
      icon: Users,
      path: '/live-interpreter',
      bg: 'white',
      color: 'var(--primary-dark)'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', paddingBottom: 80 }}>
      <TopNav title="Select Mode" showBack={true} />
      
      <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: '0 0 12px 0', color: 'var(--primary-dark)', textAlign: 'center' }}>
          How can we help you today?
        </h2>
        <p style={{ color: 'var(--n2)', fontSize: 18, margin: '0 0 48px 0', textAlign: 'center' }}>
          Choose a mode to start communicating seamlessly.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
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
                  padding: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: isDark ? 'none' : '1px solid var(--n5)',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.3s var(--spring)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = 'var(--shadow-float)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
              >
                {/* Decorative background glow */}
                <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', filter: 'blur(30px)' }} />

                <div style={{ 
                  width: 80, height: 80, borderRadius: 24, 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'var(--primary-pale)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                  color: isDark ? 'white' : 'var(--primary-dark)'
                }}>
                  <Icon size={48} weight={isDark ? "fill" : "duotone"} />
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, margin: '0 0 16px 0', fontWeight: 600 }}>{mode.title}</h3>
                <p style={{ fontSize: 16, opacity: 0.9, margin: '0 0 32px 0', lineHeight: 1.5, flex: 1 }}>{mode.desc}</p>
                
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 16, fontWeight: 600,
                  padding: '12px 24px',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'var(--surface)',
                  borderRadius: 24,
                  color: isDark ? 'white' : 'var(--primary-dark)'
                }}>
                  Select Mode <CaretRight size={18} weight="bold" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
