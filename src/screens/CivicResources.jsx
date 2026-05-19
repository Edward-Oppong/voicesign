import { useState } from 'react';
import { ShieldCheck, PlayCircle, Clock, DownloadSimple, X } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

export default function CivicResources() {
  const [activeVideo, setActiveVideo] = useState(null);

  const cards = [
    { id: 1, title: 'National ID Registration', duration: '2 min sign video', bg: 'var(--primary-mid)', illustration: '🪪' },
    { id: 2, title: 'Filing Police Reports', duration: '3 min sign video', bg: 'var(--accent-strong)', illustration: '🚓' },
    { id: 3, title: 'Hospital Visit Guide', duration: '1.5 min sign video', bg: 'var(--primary-light)', illustration: '🏥' },
    { id: 4, title: 'Your Legal Rights', duration: '4 min sign video', bg: 'var(--primary-dark)', illustration: '⚖️' },
    { id: 5, title: 'Tax Filing Process', duration: '2 min sign video', bg: 'var(--n2)', illustration: '📄' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', paddingBottom: 80 }}>
      <TopNav title="Civic Resources" showBack={true} />

      {/* Government Partnership Banner */}
      <div style={{
        backgroundColor: 'var(--accent-bright)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 24, height: 24, backgroundColor: 'white', borderRadius: '50%' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--primary-dark)', fontWeight: 600 }}>
            Official Ghana Public Services Portal
          </span>
        </div>
        <ShieldCheck size={20} color="var(--primary-dark)" weight="fill" />
      </div>

      <div style={{ padding: '32px 40px', maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {cards.map(card => (
            <div key={card.id} style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-soft)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-float)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
            >
              {/* Illustration Area */}
              <div style={{
                height: 140,
                backgroundColor: card.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 56
              }}>
                {card.illustration}
              </div>

              {/* Body Area */}
              <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--primary-dark)', margin: '0 0 12px 0' }}>
                  {card.title}
                </h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--n4)' }}>
                    <Clock size={16} />
                    <span style={{ fontSize: 12 }}>{card.duration}</span>
                  </div>
                  <span style={{ backgroundColor: 'var(--primary-pale)', color: 'var(--primary-light)', padding: '4px 12px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                    GSL Certified
                  </span>
                </div>

                <button 
                  onClick={() => setActiveVideo(card)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--primary-light)',
                    color: 'white',
                    padding: '12px',
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <PlayCircle size={20} weight="fill" />
                  Watch in Sign Language
                </button>
              </div>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%',
          padding: '20px',
          marginTop: 40,
          borderRadius: 16,
          border: '2px solid var(--accent-bright)',
          backgroundColor: 'transparent',
          color: 'var(--accent-strong)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          fontWeight: 600,
          fontSize: 16,
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-pale)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <DownloadSimple size={24} weight="bold" />
          Download All Resources for Offline Use
        </button>

      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'var(--glass-dark)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column'
        }}>
          <button 
            onClick={() => setActiveVideo(null)}
            style={{ position: 'absolute', top: 32, right: 32, color: 'white', zIndex: 110 }}
          >
            <X size={32} />
          </button>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ 
              width: '80%', maxWidth: 1000, aspectRatio: '16/9', 
              backgroundColor: '#000', borderRadius: 'var(--radius-xl)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4)', overflow: 'hidden'
            }}>
              <div style={{ textAlign: 'center', color: 'var(--n4)' }}>
                <PlayCircle size={80} color="var(--accent-bright)" weight="fill" />
                <p style={{ marginTop: 16, fontSize: 18 }}>Playing: {activeVideo.title}</p>
              </div>
            </div>
          </div>

          <div style={{
            height: 120, backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <p style={{ color: 'white', fontSize: 20, margin: 0, textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Subtitles for {activeVideo.title} will appear here...
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
