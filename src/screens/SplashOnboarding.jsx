import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashOnboarding() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCarousel(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      title: "Understand Speech",
      body: "Public announcements and conversations signed for you in real-time.",
      imgBg: 'linear-gradient(135deg, var(--primary-mid), var(--primary-dark))',
      emoji: '🤲'
    },
    {
      title: "Speak Through Signs",
      body: "Sign and be understood by anyone around you — instantly.",
      imgBg: 'linear-gradient(135deg, var(--accent-strong), #a36800)',
      emoji: '🗣️'
    },
    {
      title: "Community Verified",
      body: "Help validate Ghana Sign Language signs to build a stronger platform.",
      imgBg: 'linear-gradient(135deg, var(--primary-light), var(--primary-mid))',
      emoji: '🌍'
    }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: 'var(--primary-dark)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* SPLASH SCREEN */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.5s var(--spring), opacity 0.5s ease',
        transform: showCarousel ? 'translateY(-100%)' : 'translateY(0)',
        opacity: showCarousel ? 0 : 1,
      }}>
        <div style={{
          width: 80,
          height: 80,
          color: 'var(--accent-bright)',
          marginBottom: 24,
        }} className="animate-pulse">
          {/* Minimal SVG line-art icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>
        
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, margin: 0 }}>VoiceSign GH</h1>
        
        <p style={{ 
          fontFamily: 'var(--font-body)', 
          fontSize: 14, 
          color: 'var(--primary-pale)', 
          marginTop: 8,
          opacity: 0,
          animation: 'fade-in 1s ease forwards 0.6s'
        }}>
          Your Voice. Your Access. Your Sign.
        </p>

        <div style={{ position: 'absolute', bottom: 48 }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 24,
            border: '1px solid var(--accent-bright)',
            color: 'white',
            fontSize: 14
          }}>
            <span>🇬🇭</span> English
          </button>
        </div>
      </div>

      {/* CAROUSEL SCREEN */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.5s var(--spring)',
        transform: showCarousel ? 'translateY(0)' : 'translateY(100%)',
        backgroundColor: 'var(--primary-dark)'
      }}>
        
        <div style={{ flex: 1, position: 'relative' }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              opacity: activeCard === idx ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: activeCard === idx ? 'auto' : 'none',
            }}>
              <div style={{ 
                height: '55%', 
                background: card.imgBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: -40, right: -40 }} />
                <span style={{ fontSize: 96, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>{card.emoji}</span>
              </div>
              
              <div style={{ padding: '32px 24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, margin: '0 0 12px 0' }}>{card.title}</h2>
                <p style={{ color: 'var(--primary-pale)', fontSize: 14, lineHeight: 1.5 }}>{card.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 24px 48px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
            {cards.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCard(idx)}
                style={{
                  width: 8, height: 8, borderRadius: 4,
                  backgroundColor: activeCard === idx ? 'var(--accent-bright)' : 'var(--n4)',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <button 
              onClick={() => navigate('/home')}
              style={{
                width: '100%', padding: '16px', borderRadius: 12,
                backgroundColor: 'var(--accent-bright)',
                color: 'var(--primary-dark)',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16
              }}>
              Get Started
            </button>
            <button 
              onClick={() => navigate('/home')}
              style={{
                width: '100%', padding: '16px', borderRadius: 12,
                border: '1px solid white',
                color: 'white',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16
              }}>
              I Already Have an Account
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
