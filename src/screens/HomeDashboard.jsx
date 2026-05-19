import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CaretRight, HandWaving, BookBookmark, FileText, VideoCamera, Clock, WarningCircle, Translate, NotePencil } from '@phosphor-icons/react';

export default function HomeDashboard() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ paddingBottom: 80, minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      
      {/* Top Navigation - Desktop only */}
      {!isMobile && (
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderBottom: '1px solid var(--lh-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button style={{ 
              width: 48, height: 48, borderRadius: '50%', backgroundColor: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              boxShadow: 'var(--shadow-soft)', color: 'var(--mid-teal)', border: 'none', cursor: 'pointer'
            }}>
              <Bell size={24} weight="bold" />
            </button>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '2px solid var(--gold)',
              backgroundColor: 'var(--forest)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              color: 'white',
              fontWeight: 700
            }}>
              K
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: isMobile ? '20px 16px' : '32px 40px', maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--emerald) 0%, var(--forest) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '24px 20px' : '32px',
          color: 'white',
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          gap: isMobile ? 16 : 0,
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          marginBottom: isMobile ? 24 : 40,
          boxShadow: 'var(--shadow-float)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glass Decor */}
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 24 : 32, margin: '0 0 8px 0', fontWeight: 600 }}>Welcome back, Kofi</h2>
            <p style={{ color: 'var(--mint)', fontSize: isMobile ? 14 : 16, margin: 0, opacity: 0.9 }}>What would you like to do today?</p>
          </div>
          <div className="animate-float" style={{ color: 'var(--gold)', position: 'relative', zIndex: 1, alignSelf: isMobile ? 'flex-end' : 'auto' }}>
            <HandWaving size={isMobile ? 48 : 64} weight="fill" />
          </div>
        </div>

        {/* Mode Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 16 : 24, marginBottom: isMobile ? 32 : 48 }}>
          
          {/* Card A */}
          <button 
            onClick={() => navigate('/live-translation?mode=speech')}
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? 20 : 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'var(--forest)',
              textAlign: 'left',
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--lh-surface)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-float)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'var(--mint)', color: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Translate size={24} weight="fill" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 22, margin: '0 0 4px 0' }}>AI Real-Time Translator</h3>
                <p style={{ color: 'var(--mid-teal)', fontSize: 13, margin: 0 }}>Spoken translation & camera sign reader</p>
              </div>
            </div>
            <CaretRight size={22} color="var(--soft-teal)" weight="bold" />
          </button>

          {/* Card B */}
          <button 
            onClick={() => navigate('/live-translation?mode=camera&feature=dictation')}
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? 20 : 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'var(--forest)',
              textAlign: 'left',
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid var(--lh-surface)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-float)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'var(--pale-gold)', color: 'var(--deep-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <NotePencil size={24} weight="fill" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 22, margin: '0 0 4px 0' }}>AI Sign Dictator & Writer</h3>
                <p style={{ color: 'var(--mid-teal)', fontSize: 13, margin: 0 }}>Draft official documents using GSL signs</p>
              </div>
            </div>
            <CaretRight size={22} color="var(--soft-teal)" weight="bold" />
          </button>

        </div>

        {/* Quick Access */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--forest)', marginBottom: 20 }}>Quick Access</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: isMobile ? 12 : 20 
        }}>
          {[
            { label: 'Learning Hub', icon: BookBookmark, path: '/glossary' },
            { label: 'Civic Resources', icon: FileText, path: '/civic-resources' },
            { label: 'Interpreter', icon: VideoCamera, path: '/live-interpreter' },
            { label: 'Emergency SOS', icon: WarningCircle, path: '/emergency', danger: true },
            { label: 'History', icon: Clock, path: '/home' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={idx}
                onClick={() => navigate(item.path)}
                style={{
                  backgroundColor: item.danger ? 'rgba(239, 68, 68, 0.06)' : 'white',
                  border: item.danger ? '1.5px solid rgba(239, 68, 68, 0.2)' : '1px solid var(--lh-surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: isMobile ? '16px 12px' : '24px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: 'var(--forest)',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ color: item.danger ? 'var(--danger)' : 'var(--leaf)', display: 'flex', flexShrink: 0 }}>
                  <Icon size={24} weight="duotone" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{item.label}</span>
              </button>
            )
          })}
        </div>

      </div>

    </div>
  );
}
