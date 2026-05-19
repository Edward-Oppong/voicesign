import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Camera, BookmarkSimple, Share, ArrowRight, Copy, Check } from '@phosphor-icons/react';

const SIGNS = [
  { n: '01', term: 'HELLO',         cat: 'Greeting',     use: 'Say this when you meet a deaf person for the first time.' },
  { n: '02', term: 'THANK YOU',     cat: 'Courtesy',     use: 'Express gratitude clearly and respectfully.' },
  { n: '03', term: 'PLEASE',        cat: 'Courtesy',     use: 'Use when making a polite request.' },
  { n: '04', term: 'SORRY',         cat: 'Courtesy',     use: 'Apologise or express empathy.' },
  { n: '05', term: 'YES',           cat: 'Basic',        use: 'Confirm agreement or understanding.' },
  { n: '06', term: 'NO',            cat: 'Basic',        use: 'Clearly indicate disagreement or refusal.' },
  { n: '07', term: 'HELP',          cat: 'Emergency',    use: 'Signal that you or someone nearby needs immediate assistance.' },
  { n: '08', term: 'DOCTOR',        cat: 'Healthcare',   use: 'Ask for or direct someone to a medical professional.' },
  { n: '09', term: 'HOSPITAL',      cat: 'Healthcare',   use: 'Indicate a medical facility or ask for directions to one.' },
  { n: '10', term: 'WATER',         cat: 'Daily',        use: 'Ask for water — essential in everyday situations.' },
  { n: '11', term: 'FOOD',          cat: 'Daily',        use: 'Indicate hunger or ask about a meal.' },
  { n: '12', term: 'TOILET',        cat: 'Daily',        use: 'Ask for or direct someone to the restroom.' },
  { n: '13', term: 'NAME',          cat: 'Introduction', use: 'Ask "What is your name?" or introduce yourself.' },
  { n: '14', term: 'UNDERSTAND',    cat: 'Communication',use: 'Show that you understand, or check if the other person does.' },
  { n: '15', term: 'REPEAT',        cat: 'Communication',use: 'Ask someone to sign or say something again.' },
  { n: '16', term: 'SLOW DOWN',     cat: 'Communication',use: 'Request that the other person sign more slowly.' },
  { n: '17', term: 'WRITE IT DOWN', cat: 'Communication',use: 'Ask someone to write what they mean.' },
  { n: '18', term: 'EMERGENCY',     cat: 'Emergency',    use: 'Signal a critical urgent situation.' },
  { n: '19', term: 'POLICE',        cat: 'Emergency',    use: 'Ask for or refer to law enforcement.' },
  { n: '20', term: 'SAFE',          cat: 'Emergency',    use: 'Indicate that a situation or person is safe and secure.' },
];

const CAT_COLORS = { Greeting: '#7C3AED', Courtesy: 'var(--mid-teal)', Basic: 'var(--workplace)', Emergency: 'var(--healthcare)', Healthcare: 'var(--healthcare)', Daily: 'var(--civic)', Introduction: '#0D9488', Communication: 'var(--workplace)' };

function SignCard({ sign, onPlay }) {
  const [hovered, setHovered] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', border: `1px solid ${hovered ? 'var(--leaf)' : 'var(--lh-surface)'}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.15s ease', boxShadow: hovered ? 'var(--shadow-soft)' : 'none' }}
    >
      {/* Thumbnail */}
      <div onClick={() => onPlay(sign)} style={{ backgroundColor: 'var(--emerald)', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 10, left: 10, width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--forest)', fontWeight: 700 }}>{sign.n}</span>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={22} color="var(--forest)" weight="fill" />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--forest)', margin: '0 0 4px 0' }}>{sign.term}</h3>
        <p style={{ fontSize: 11, color: CAT_COLORS[sign.cat] || 'var(--mid-teal)', margin: '0 0 6px 0', fontWeight: 600 }}>{sign.cat}</p>
        <p style={{ fontSize: 11, color: 'var(--soft-teal)', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>{sign.use}</p>
      </div>

      {/* Footer */}
      <div style={{ padding: '0 16px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{ fontSize: 12, color: 'var(--leaf)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><Camera size={14} /> Practice</button>
        <button 
          onClick={() => setSaved(!saved)}
          style={{ fontSize: 12, color: saved ? 'var(--leaf)' : 'var(--mid-teal)', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <BookmarkSimple size={14} weight={saved ? "fill" : "regular"} /> {saved ? 'Saved!' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default function LearnHearing() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeSign, setActiveSign] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', fontFamily: 'var(--font-body)' }}>

      {/* Public Top Bar */}
      <div style={{ 
        backgroundColor: 'var(--forest)', 
        height: isMobile ? 'auto' : 72, 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: isMobile ? '16px 20px' : '0 48px', 
        gap: isMobile ? 12 : 0,
        flexShrink: 0 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white' }}>VoiceSign GH</span>
        </div>
        {!isMobile && (
          <p style={{ fontSize: 13, color: 'var(--mint)', margin: 0 }}>This page is for hearing people who want to communicate with deaf Ghanaians</p>
        )}
        <div style={{ display: 'flex', gap: 10, width: isMobile ? '100%' : 'auto' }}>
          <button onClick={copy} style={{ flex: 1, backgroundColor: 'var(--gold)', color: 'var(--forest)', padding: '0 20px', height: 40, borderRadius: 10, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Share size={16} /> Share This Page
          </button>
          <button onClick={() => navigate('/')} style={{ flex: 1, border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', padding: '0 20px', height: 40, borderRadius: 10, fontWeight: 600, fontSize: 13 }}>
            Get Full App
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 16px' : '32px 48px', paddingBottom: 80 }}>

        {/* Hero */}
        <div style={{ backgroundColor: 'var(--forest)', borderRadius: 16, padding: isMobile ? '32px 20px' : '48px', textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '24px' : 'clamp(36px,4vw,52px)', color: 'white', margin: '0 0 4px 0', lineHeight: 1.1 }}>20 Essential Signs</h1>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '24px' : 'clamp(36px,4vw,52px)', color: 'var(--gold)', margin: '0 0 16px 0', lineHeight: 1.1 }}>Every Ghanaian Should Know</h2>
          <p style={{ fontSize: isMobile ? 14 : 15, color: 'var(--mint)', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.7 }}>
            You don't need the app for these. Just watch, learn, and practice — so you can communicate directly with deaf colleagues, patients, family members, and fellow citizens.
          </p>
          {/* Share bar */}
          <div style={{ 
            backgroundColor: 'var(--lh-surface)', 
            borderRadius: 10, 
            padding: '12px 16px', 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center', 
            gap: 12, 
            maxWidth: 480, 
            margin: '0 auto' 
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--mid-teal)', flex: 1, textAlign: 'left' }}>voicesign.gh/learn/hearing</span>
            <button onClick={copy} style={{ color: 'var(--leaf)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button style={{ color: 'var(--gold)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
              📱 Share on WhatsApp
            </button>
          </div>
        </div>

        {/* 20 signs grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: 16, 
          marginBottom: 32 
        }}>
          {SIGNS.map(s => <SignCard key={s.n} sign={s} onPlay={(s) => setActiveSign(s)} />)}
        </div>

        {/* Bottom CTA */}
        <div style={{ backgroundColor: 'var(--forest)', borderRadius: 16, padding: isMobile ? '32px 20px' : '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 24 : 32, color: 'white', margin: '0 0 8px 0' }}>Want to learn more?</h2>
          <p style={{ fontSize: 14, color: 'var(--mint)', margin: '0 0 24px 0' }}>Sign up for VoiceSign GH and access 200+ domain signs, camera practice, and structured courses.</p>
          <button onClick={() => navigate('/')} style={{ backgroundColor: 'var(--gold)', color: 'var(--forest)', padding: '0 40px', height: 52, borderRadius: 14, fontWeight: 700, fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            Get Started Free <ArrowRight size={20} weight="bold" />
          </button>
          <p style={{ fontSize: 13, color: 'var(--soft-teal)', margin: 0 }}>Already have an account? <button onClick={() => navigate('/home')} style={{ color: 'var(--soft-teal)', textDecoration: 'underline' }}>Sign in</button></p>
        </div>

      </div>

      {/* Video Modal Overlay */}
      {activeSign && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 110,
          backgroundColor: 'rgba(9, 21, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: 20, padding: 32,
            maxWidth: 500, width: '90%', textAlign: 'center',
            position: 'relative'
          }}>
            <button 
              onClick={() => setActiveSign(null)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, color: 'var(--mid-teal)' }}
            >
              ✕
            </button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--forest)', marginBottom: 4 }}>{activeSign.term}</h3>
            <span style={{ backgroundColor: 'var(--mint)', color: 'var(--forest)', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 999 }}>{activeSign.cat}</span>
            
            <div style={{
              backgroundColor: 'var(--emerald)', height: 220, borderRadius: 16,
              margin: '24px 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={32} color="var(--forest)" weight="fill" />
              </div>
            </div>
            <p style={{ color: 'var(--mid-teal)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{activeSign.use}</p>
          </div>
        </div>
      )}

    </div>
  );
}
