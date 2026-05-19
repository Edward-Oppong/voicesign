import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fire, Play, ArrowsClockwise, Camera, Check, CaretLeft, CaretRight, Lock } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const PREV_SIGNS = [
  { day: 'Mon', term: 'DOCTOR' },
  { day: 'Tue', term: 'PAIN' },
  { day: 'Wed', term: 'HELP' },
  { day: 'Thu', term: 'HOSPITAL' },
  { day: 'Fri', term: 'MEDICINE' },
  { day: 'Sat', term: 'NURSE' },
];

function VideoThumb({ height = 180, playSize = 52 }) {
  return (
    <div style={{ width: '100%', height, backgroundColor: 'var(--emerald)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ width: playSize, height: playSize, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Play size={playSize * 0.5} color="var(--forest)" weight="fill" />
      </div>
    </div>
  );
}

export default function LearnDaily() {
  const navigate = useNavigate();
  const [learned, setLearned] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', fontFamily: 'var(--font-body)', paddingBottom: 80 }}>
      <TopNav title="Daily Sign" showBack bgColor="white" color="var(--forest)" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 16px' : '32px 48px' }}>

        {/* Hero header */}
        <div style={{ 
          backgroundColor: 'var(--forest)', 
          borderRadius: 16, 
          padding: isMobile ? '32px 20px' : '40px', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: isMobile ? 32 : 0,
          marginBottom: 32 
        }}>
          <div>
            <p style={{ margin: '0 0 6px 0', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Day 7 of Your Streak</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 40, color: 'white', margin: '0 0 8px 0' }}>Today's Sign</h1>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--mint)' }}>Come back every day to learn a new GSL sign. Missing a day resets your streak.</p>
          </div>
          <div style={{ textAlign: 'center', width: isMobile ? '100%' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'center' }}>
              <Fire size={48} color="var(--gold)" weight="fill" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'white', lineHeight: 1 }}>7</span>
            </div>
            <p style={{ color: 'var(--mint)', fontSize: 13, margin: '8px 0 12px' }}>Day streak</p>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              {WEEK_DAYS.map((d, i) => (
                <div key={d} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 9, color: 'var(--soft-teal)', margin: '0 0 4px 0' }}>{d}</p>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    backgroundColor: i < 7 ? 'var(--gold)' : 'transparent',
                    border: i >= 7 ? '1px solid var(--soft-teal)' : 'none',
                    animation: i === 6 ? 'pulse 2s ease-in-out infinite' : 'none'
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Sign Card */}
        <div style={{ maxWidth: 680, margin: '0 auto 32px' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ height: 8, backgroundColor: 'var(--healthcare)', width: '100%' }} />
            <div style={{ padding: isMobile ? '24px 16px' : '40px' }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{ backgroundColor: 'var(--healthcare)', color: 'white', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999 }}>Healthcare</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 52, color: 'var(--forest)', margin: '12px 0 0' }}>DIAGNOSIS</h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--mid-teal)', margin: '4px 0 24px' }}>Day 7 · Healthcare Domain</p>
              </div>

              <VideoThumb height={isMobile ? 180 : 220} playSize={56} />

              {/* Controls */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16, marginBottom: 20 }}>
                {[{ icon: ArrowsClockwise, label: 'Replay' },{ label: '0.5x Slow' },{ label: 'Fullscreen' }].map((c, i) => (
                  <button key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'var(--soft-teal)', fontSize: 11 }}>
                    {c.icon ? <c.icon size={18} /> : <span style={{ fontSize: 16 }}>⏱</span>}
                    {c.label}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 14, color: 'var(--mid-teal)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 16px', textAlign: 'center' }}>
                DIAGNOSIS — used when a healthcare provider explains what condition or illness a patient has.
              </p>

              {/* Context example */}
              <div style={{ backgroundColor: 'var(--lh-surface)', borderRadius: 10, padding: '16px 20px', marginBottom: 28 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--deep-gold)', margin: '0 0 6px 0' }}>In context:</p>
                <p style={{ fontSize: 14, color: 'var(--forest)', fontStyle: 'italic', margin: 0 }}>"The doctor gave me a DIAGNOSIS of malaria."</p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, justifyContent: 'center' }}>
                <button
                  onClick={() => setLearned(true)}
                  style={{
                    padding: '12px 32px', borderRadius: 14,
                    backgroundColor: 'var(--leaf)',
                    color: 'white', fontWeight: 700, fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: learned ? '0 8px 24px rgba(46,158,107,0.3)' : 'none',
                    transition: 'all 0.3s var(--spring)'
                  }}
                >
                  <Check size={20} weight="bold" />
                  {learned ? '✓ Learned!' : 'Mark as Learned'}
                </button>
                <button onClick={() => navigate('/learn/camera')} style={{ padding: '12px 32px', borderRadius: 14, border: '2px solid var(--emerald)', color: 'var(--emerald)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Camera size={20} /> Practice with Camera
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Previous signs */}
        <p style={{ margin: '0 0 16px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Previous Signs This Week</p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }}>
          {PREV_SIGNS.map(s => (
            <div key={s.day} style={{ minWidth: 140, backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 12, padding: 14, textAlign: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: 11, color: 'var(--soft-teal)', margin: '0 0 8px 0' }}>{s.day}</p>
              <div style={{ backgroundColor: 'var(--emerald)', borderRadius: 8, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Play size={20} color="var(--gold)" weight="fill" />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--forest)', margin: '0 0 4px 0' }}>{s.term}</p>
              <Check size={18} color="var(--leaf)" weight="fill" />
            </div>
          ))}
        </div>

        {/* Upcoming (blurred/locked) */}
        <p style={{ margin: '0 0 16px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Coming Up</p>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {[{label:'Tomorrow · Day 8'},{label:'Day 9'},{label:'Day 10'}].map((u, i) => (
            <div key={i} style={{ minWidth: 160, backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 12, padding: 14, textAlign: 'center', opacity: 0.6, flexShrink: 0 }}>
              <p style={{ fontSize: 11, color: 'var(--soft-teal)', margin: '0 0 8px 0' }}>{u.label}</p>
              <div style={{ backgroundColor: 'var(--emerald)', borderRadius: 8, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, filter: 'blur(4px)' }}>
                <Play size={24} color="var(--gold)" weight="fill" />
              </div>
              <Lock size={20} color="var(--mid-teal)" />
              <p style={{ fontSize: 11, color: 'var(--soft-teal)', fontStyle: 'italic', margin: '4px 0 0' }}>Come back tomorrow</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
