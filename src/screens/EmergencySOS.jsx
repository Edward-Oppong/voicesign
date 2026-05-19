import { useState, useEffect } from 'react';
import { WarningCircle, Ambulance, PoliceCar, Fire, MapPin, VideoCamera, PaperPlaneRight, CaretRight } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

export default function EmergencySOS() {
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const emergencyTypes = [
    { id: 'police', title: 'Police / Security', icon: PoliceCar, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    { id: 'ambulance', title: 'Medical / Ambulance', icon: Ambulance, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
    { id: 'fire', title: 'Fire Service', icon: Fire, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', paddingBottom: 80, overflowX: 'hidden' }}>
      <TopNav title="Emergency SOS" />

      <div style={{ padding: isMobile ? '24px 16px' : '32px 40px', maxWidth: 1000, margin: '0 auto' }}>
        
        {/* HERO WARNING */}
        <div style={{
          backgroundColor: 'var(--error)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '24px 20px' : '32px 40px',
          color: 'white',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? 16 : 32,
          marginBottom: 32,
          boxShadow: '0 20px 40px rgba(239, 68, 68, 0.2)',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div className="animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: isMobile ? 16 : 24, borderRadius: '50%' }}>
            <WarningCircle size={isMobile ? 48 : 64} weight="fill" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 26 : 36, margin: '0 0 8px 0' }}>Need Immediate Help?</h2>
            <p style={{ fontSize: isMobile ? 15 : 18, margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
              Select a service below. We will instantly share your GPS location and deaf profile with emergency dispatchers via text.
            </p>
          </div>
        </div>

        {/* LOCATION STATUS */}
        <div style={{ 
          backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: 20, 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center', 
          justifyContent: 'space-between',
          gap: isMobile ? 16 : 0,
          border: '1px solid var(--lh-surface)', marginBottom: 32, boxShadow: 'var(--shadow-soft)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={22} weight="fill" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', color: 'var(--mid-teal)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Current Location Tracking</p>
              <h4 style={{ margin: 0, fontSize: 16, color: 'var(--forest)' }}>Ring Road Central, Accra</h4>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success)', fontWeight: 600, fontSize: 14 }}>
            <div className="animate-pulse" style={{ width: 8, height: 8, backgroundColor: 'var(--success)', borderRadius: '50%' }} />
            GPS Active
          </div>
        </div>

        {/* EMERGENCY BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
          {emergencyTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveEmergency(type.id)}
                style={{
                  backgroundColor: 'white',
                  border: `2px solid ${activeEmergency === type.id ? type.color : 'var(--lh-surface)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 24,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  boxShadow: activeEmergency === type.id ? `0 12px 24px ${type.bg}` : 'var(--shadow-soft)',
                  transition: 'all 0.2s var(--spring)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 15px 30px ${type.bg}`; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = activeEmergency === type.id ? `0 12px 24px ${type.bg}` : 'var(--shadow-soft)'; }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: type.bg, color: type.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={32} weight="duotone" />
                </div>
                <h3 style={{ fontSize: 18, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--forest)' }}>{type.title}</h3>
              </button>
            )
          })}
        </div>

        {/* ACTION PANEL (Appears when service selected) */}
        {activeEmergency && (
          <div style={{ animation: 'slide-up 0.3s var(--spring)' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
              
              {/* Dispatch Text */}
              <button style={{
                flex: 1, backgroundColor: 'var(--forest)', color: 'white',
                borderRadius: 'var(--radius-lg)', padding: 24,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                boxShadow: 'var(--shadow-float)', border: 'none', cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PaperPlaneRight size={24} weight="fill" color="var(--gold)" />
                  <span style={{ fontSize: 20, fontFamily: 'var(--font-display)' }}>Send SOS Text</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--mint)', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
                  Dispatches an automated alert with your profile and location to emergency services.
                </p>
              </button>

              {/* Video Relay */}
              <button style={{
                flex: 1, backgroundColor: 'var(--gold)', color: 'var(--forest)',
                borderRadius: 'var(--radius-lg)', padding: 24,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                boxShadow: 'var(--shadow-float)', border: 'none', cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <VideoCamera size={24} weight="fill" />
                  <span style={{ fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 700 }}>Call Interpreter</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--forest)', opacity: 0.9, margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
                  Connect instantly to a 24/7 emergency video relay interpreter.
                </p>
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
