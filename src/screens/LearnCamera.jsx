import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowLeft, ArrowRight, Camera, ArrowsClockwise, ArrowsHorizontal } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

const SIGNS = [
  { term: 'DIAGNOSIS',   domain: 'healthcare', points: ['Hand facing outward, palm open','Fingertips pointing upward','Move hand from chin downward'] },
  { term: 'WARD',        domain: 'healthcare', points: ['Both hands flat, palms down','Move hands outward from center','Signal a room or space'] },
  { term: 'PHARMACY',    domain: 'healthcare', points: ['Mimic mixing medicine in palm','Circular motion with finger','Other hand held flat beneath'] },
  { term: 'EMERGENCY',   domain: 'healthcare', points: ['Both hands raised open','Rapid shaking motion','Urgent facial expression'] },
];

function ConfidenceScore({ pct }) {
  const color = pct >= 75 ? 'var(--leaf)' : pct >= 50 ? 'var(--gold)' : 'var(--healthcare)';
  const label = pct >= 75 ? 'Good match!' : pct >= 50 ? 'Keep trying' : 'Try again';
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, color, margin: '0 0 4px 0' }}>{pct}%</p>
      <p style={{ fontSize: 13, color, margin: '0 0 10px 0' }}>{label}</p>
      <div style={{ height: 10, backgroundColor: 'var(--lh-surface)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: 8, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

export default function LearnCamera() {
  const [signIdx, setSignIdx] = useState(0);
  const [loop, setLoop] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [score, setScore] = useState(null);

  const sign = SIGNS[signIdx];

  const handlePractice = () => {
    setCameraActive(true);
    setTimeout(() => setScore(87), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', fontFamily: 'var(--font-body)', paddingBottom: 80 }}>
      <TopNav title="Camera Practice" showBack bgColor="white" color="var(--forest)" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 48px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--forest)', margin: '0 0 8px 0' }}>Camera Practice</h1>
          <p style={{ fontSize: 14, color: 'var(--mid-teal)', margin: 0 }}>Sign to your camera. AI compares your hand shape to the reference and gives you a match score.</p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>

          {/* Left — Reference Sign */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, padding: 32 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--forest)', margin: '0 0 16px 0' }}>Reference Sign</h4>

            {/* Sign selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <button onClick={() => { setSignIdx((signIdx - 1 + SIGNS.length) % SIGNS.length); setScore(null); setCameraActive(false); }} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--lh-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeft size={16} /></button>
              <div style={{ flex: 1 }}>
                <span style={{ backgroundColor: 'var(--healthcare)', color: '#fff', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999 }}>Healthcare</span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--forest)', margin: '6px 0 0 0' }}>{sign.term}</p>
              </div>
              <button onClick={() => { setSignIdx((signIdx + 1) % SIGNS.length); setScore(null); setCameraActive(false); }} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--lh-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowRight size={16} /></button>
            </div>

            {/* Video player */}
            <div style={{ backgroundColor: 'var(--emerald)', borderRadius: 12, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, position: 'relative' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={32} color="var(--forest)" weight="fill" />
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <button onClick={() => setLoop(!loop)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: `1px solid ${loop ? 'var(--leaf)' : 'var(--lh-surface)'}`, backgroundColor: loop ? 'rgba(46,158,107,0.08)' : 'transparent', color: loop ? 'var(--leaf)' : 'var(--mid-teal)', fontSize: 13 }}>
                <ArrowsClockwise size={14} /> Loop video
              </button>
              <button style={{ padding: '6px 14px', borderRadius: 20, backgroundColor: 'var(--lh-surface)', color: 'var(--mid-teal)', fontSize: 12 }}>0.5x Speed</button>
            </div>

            {/* Key points */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--deep-gold)', margin: '0 0 10px 0' }}>Watch for:</p>
              {sign.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: 'var(--leaf)', fontSize: 14, marginTop: 1 }}>→</span>
                  <p style={{ fontSize: 13, color: 'var(--mid-teal)', margin: 0, lineHeight: 1.5 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Camera Feed */}
          <div style={{ backgroundColor: '#0A1F18', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Camera area */}
            <div style={{ flex: 1, position: 'relative', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cameraActive ? (
                <>
                  {/* Simulated camera feed */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f2d20, #0a1a12)' }} />
                  {/* Skeleton overlay simulation */}
                  <svg width="200" height="260" viewBox="0 0 200 260" style={{ position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 6px rgba(46,158,107,0.6))' }}>
                    <path d="M100 200 L100 130 M100 130 L60 70 M100 130 L80 55 M100 130 L115 50 M100 130 L135 65 M100 130 L150 90" stroke="rgba(46,158,107,0.7)" strokeWidth="3" strokeLinecap="round" fill="none" className="animate-pulse" />
                    {[[100,200],[60,70],[80,55],[115,50],[135,65],[150,90],[100,130]].map(([x,y],i) => (
                      <circle key={i} cx={x} cy={y} r={i===6?8:5} fill={i===6?'var(--gold)':'var(--leaf)'} />
                    ))}
                  </svg>
                  {/* Live badge */}
                  <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.5)', padding: '6px 14px', borderRadius: 20 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--leaf)' }} className="animate-pulse" />
                    <span style={{ fontSize: 11, color: 'white', fontWeight: 700 }}>READING YOUR SIGNS</span>
                  </div>
                  {/* Score overlay */}
                  {score && (
                    <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: score >= 75 ? 'var(--leaf)' : 'var(--gold)', margin: 0, textAlign: 'right' }}>{score}%</p>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handlePractice}>
                  <Camera size={36} color="var(--soft-teal)" style={{ marginBottom: 10 }} />
                  <p style={{ color: 'var(--soft-teal)', fontSize: 13, margin: 0 }}>Click to start camera</p>
                </div>
              )}
            </div>

            {/* Match result */}
            {score && (
              <div style={{ padding: '16px 24px', backgroundColor: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'white', margin: 0 }}>{score}% Match</p>
                  <p style={{ fontSize: 14, color: 'var(--leaf)', margin: 0 }}>Good match!</p>
                </div>
                <div style={{ height: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${score}%`, height: '100%', backgroundColor: 'var(--leaf)', borderRadius: 8 }} />
                </div>
              </div>
            )}

            {/* Controls */}
            <div style={{ backgroundColor: 'var(--forest)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button style={{ fontSize: 13, color: 'var(--soft-teal)', display: 'flex', alignItems: 'center', gap: 6 }}><ArrowsHorizontal size={16} /> Flip Camera</button>
              <button onClick={() => { setScore(null); setCameraActive(false); }} style={{ padding: '0 20px', height: 44, borderRadius: 12, border: '1.5px solid var(--soft-teal)', color: 'var(--soft-teal)', fontSize: 13 }}>Try Again</button>
              <button onClick={() => { setSignIdx((signIdx + 1) % SIGNS.length); setScore(null); setCameraActive(false); }} style={{ padding: '0 24px', height: 44, borderRadius: 12, backgroundColor: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                Next Sign <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Sign selector row */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
          {SIGNS.map((s, i) => (
            <button key={i} onClick={() => { setSignIdx(i); setScore(null); setCameraActive(false); }} style={{
              minWidth: 140, padding: '10px 16px', borderRadius: 10, flexShrink: 0, textAlign: 'left',
              border: `2px solid ${i === signIdx ? 'var(--leaf)' : 'var(--lh-surface)'}`,
              backgroundColor: i === signIdx ? 'var(--mint)' : 'white',
              transition: 'all 0.15s ease'
            }}>
              <span style={{ backgroundColor: 'var(--healthcare)', color: '#fff', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 999, display: 'block', marginBottom: 4 }}>Healthcare</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--forest)', margin: 0 }}>{s.term}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

