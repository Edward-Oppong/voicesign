import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoCamera, MicrophoneSlash, Microphone, PhoneSlash, ChatCircle, ClosedCaptioning, Star, Clock, ArrowRight, SealCheck, HandWaving } from '@phosphor-icons/react';

export default function LiveInterpreter() {
  const navigate = useNavigate();
  const [state, setState] = useState('requesting');
  const [elapsed, setElapsed] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (state === 'requesting') {
      const t = setTimeout(() => setState('connected'), 3500);
      return () => clearTimeout(t);
    }
  }, [state]);

  useEffect(() => {
    if (state !== 'connected') return;
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [state]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  /* ── REQUESTING STATE ── */
  if (state === 'requesting') {
    return (
      <div style={{
        height: '100vh', fontFamily: 'var(--font-body)',
        background: 'linear-gradient(135deg, var(--forest) 0%, #0A1F1A 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '24px 16px' : '40px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative rings */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(46,158,107,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', border: '1px solid rgba(46,158,107,0.12)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(46,158,107,0.2)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        {/* Avatar ring */}
        <div style={{
          width: isMobile ? 90 : 120, height: isMobile ? 90 : 120, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--leaf), var(--emerald))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 16px rgba(46,158,107,0.08)',
          marginBottom: 32
        }} className="animate-glow-pulse">
          <VideoCamera size={isMobile ? 36 : 52} color="white" weight="fill" />
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 24 : 32, color: 'white', margin: '0 0 12px 0', textAlign: 'center' }}>
          Finding Your Interpreter
        </h2>
        <p style={{ color: 'var(--mint)', fontSize: isMobile ? 14 : 16, marginBottom: 32, textAlign: 'center', maxWidth: 360, lineHeight: 1.6 }}>
          Connecting you with a certified GSL interpreter. This usually takes under 2 minutes.
        </p>

        {/* Spinner */}
        <div style={{ relative: 'relative', width: 44, height: 44, marginBottom: 20 }}>
          <div style={{
            position: 'absolute', width: 44, height: 44, borderRadius: '50%',
            border: '3px solid rgba(46,158,107,0.2)',
            borderTopColor: 'var(--gold)',
            animation: 'spin 1s linear infinite'
          }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <Clock size={16} color="var(--gold)" />
          <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700 }}>Est. wait: ~2 minutes</span>
        </div>

        {/* Interpreter profiles */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20,
          padding: isMobile ? '16px 20px' : '24px 32px', marginBottom: 32, maxWidth: 420, width: '100%',
          border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)'
        }}>
          <p style={{ color: 'var(--soft-teal)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px 0' }}>Available Interpreters</p>
          {[
            { name: 'Ama Korantema', rating: 4.9, sessions: '1,200+', status: 'connecting' },
            { name: 'Kwesi Asante', rating: 4.8, sessions: '890+', status: 'available' },
          ].map((i, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${idx === 0 ? '#8B5524,#5C3D1E' : '#6366F1,#4338CA'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${idx === 0 ? 'var(--leaf)' : 'transparent'}` }}>
                <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>{i.name[0]}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <p style={{ color: 'white', fontSize: 13, fontWeight: 600, margin: 0 }}>{i.name}</p>
                  <SealCheck size={14} color="var(--gold)" weight="fill" />
                </div>
                <p style={{ color: 'var(--soft-teal)', fontSize: 11, margin: 0 }}>★ {i.rating} · {i.sessions} sessions</p>
              </div>
              <div style={{
                padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                backgroundColor: idx === 0 ? 'rgba(46,158,107,0.15)' : 'rgba(255,255,255,0.06)',
                color: idx === 0 ? 'var(--success)' : 'var(--soft-teal)'
              }}>
                {idx === 0 ? 'Connecting...' : 'On deck'}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/live-translation')}
          style={{
            width: '100%', maxWidth: 420, padding: '14px', borderRadius: 14,
            border: '1.5px solid rgba(46,158,107,0.4)', color: 'var(--leaf)',
            fontWeight: 700, fontSize: 15, marginBottom: 16,
            transition: 'all 0.2s ease', backgroundColor: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(46,158,107,0.08)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <HandWaving size={18} /> Continue with Avatar Instead
        </button>
        <button onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer' }}>
          Cancel Request
        </button>
      </div>
    );
  }

  /* ── CONNECTED STATE ── */
  if (state === 'connected') {
    return (
      <div style={{ 
        height: '100vh', 
        backgroundColor: '#0d0d0d', 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        fontFamily: 'var(--font-body)', 
        overflow: 'hidden' 
      }}>

        {/* Main video area */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>

          {/* Interpreter video */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <img
              src="/images/interpreter_call.png"
              alt="GSL Interpreter Ama"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
            />

            {/* Top info overlay */}
            <div style={{
              position: 'absolute', 
              top: isMobile ? 12 : 24, 
              left: isMobile ? 12 : 24,
              backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: isMobile ? '8px 14px' : '14px 20px',
              backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 14
            }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#8B5524,#5C3D1E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>A</span>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--success)' }} className="animate-pulse" />
                  <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>Ama Korantema</span>
                  <SealCheck size={14} color="var(--gold)" weight="fill" />
                </div>
                <span style={{ color: 'var(--soft-teal)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>GSL Certified · {fmt(elapsed)}</span>
              </div>
            </div>

            {/* Captions */}
            {captionsOn && (
              <div style={{
                position: 'absolute', bottom: isMobile ? 120 : 100, left: '50%', transform: 'translateX(-50%)',
                width: isMobile ? '90%' : '70%', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)',
                borderRadius: 16, padding: '12px 20px', textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <p style={{ color: 'white', fontSize: isMobile ? 15 : 20, margin: 0, fontFamily: 'var(--font-display)', lineHeight: 1.4 }}>
                  "I understand, can you show me the document again?"
                </p>
              </div>
            )}
          </div>

          {/* Controls bar */}
          <div style={{
            height: isMobile ? 80 : 96, backgroundColor: '#1a1a1a', borderTop: '1px solid #2a2a2a',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 8 : 16, padding: isMobile ? '0 12px' : '0 32px'
          }}>
            {/* Mic */}
            <button
              onClick={() => setMicOn(!micOn)}
              style={{
                width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: '50%',
                backgroundColor: micOn ? 'rgba(255,255,255,0.1)' : 'var(--danger)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease', cursor: 'pointer'
              }}
            >
              {micOn ? <Microphone size={isMobile ? 18 : 24} color="white" /> : <MicrophoneSlash size={isMobile ? 18 : 24} color="white" weight="fill" />}
            </button>

            {/* Captions */}
            <button
              onClick={() => setCaptionsOn(!captionsOn)}
              style={{
                width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: '50%',
                backgroundColor: captionsOn ? 'rgba(245,166,35,0.2)' : 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${captionsOn ? 'rgba(245,166,35,0.4)' : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.2s ease', cursor: 'pointer'
              }}
            >
              <ClosedCaptioning size={isMobile ? 18 : 24} color={captionsOn ? 'var(--gold)' : 'rgba(255,255,255,0.5)'} weight={captionsOn ? 'fill' : 'regular'} />
            </button>

            {/* End Call */}
            <button
              onClick={() => setState('post')}
              style={{
                width: isMobile ? 56 : 72, height: isMobile ? 56 : 72, borderRadius: '50%',
                backgroundColor: 'var(--danger)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(239,68,68,0.4)',
                border: 'none', transition: 'all 0.2s ease', cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <PhoneSlash size={isMobile ? 24 : 30} color="white" weight="fill" />
            </button>

            {/* Chat */}
            <button
              onClick={() => setChatOpen(!chatOpen)}
              style={{
                width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: '50%',
                backgroundColor: chatOpen ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${chatOpen ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.2s ease', cursor: 'pointer'
              }}
            >
              <ChatCircle size={isMobile ? 18 : 24} color={chatOpen ? '#60A5FA' : 'rgba(255,255,255,0.5)'} weight={chatOpen ? 'fill' : 'regular'} />
            </button>

            {/* Video */}
            <button style={{
              width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer'
            }}>
              <VideoCamera size={isMobile ? 18 : 24} color="rgba(255,255,255,0.5)" />
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{
          width: isMobile ? '100%' : (chatOpen ? 340 : 260),
          height: isMobile ? (chatOpen ? '320px' : '160px') : 'auto',
          backgroundColor: '#111', borderLeft: isMobile ? 'none' : '1px solid #222',
          borderTop: isMobile ? '1px solid #222' : 'none',
          display: 'flex', flexDirection: isMobile && !chatOpen ? 'row' : 'column',
          alignItems: isMobile && !chatOpen ? 'center' : 'stretch',
          transition: 'all 0.3s var(--spring)',
          flexShrink: 0
        }}>
          {/* Self preview */}
          <div style={{ 
            padding: 16, 
            borderBottom: isMobile && !chatOpen ? 'none' : '1px solid #222',
            width: isMobile && !chatOpen ? 160 : 'auto',
            flexShrink: 0
          }}>
            <div style={{
              width: '100%', aspectRatio: '16/9',
              backgroundColor: '#222', borderRadius: 12,
              border: '2px solid var(--leaf)',
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <VideoCamera size={20} color="#444" />
              </div>
            </div>
            <p style={{ color: 'var(--soft-teal)', fontSize: 11, textAlign: 'center', marginTop: 4, margin: 0 }}>You · On</p>
          </div>

          {/* Chat / captions panel */}
          {chatOpen ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <p style={{ color: 'var(--soft-teal)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', padding: '12px 16px 4px', margin: 0 }}>Chat</p>
              <div style={{ flex: 1, padding: '0 16px', overflowY: 'auto' }}>
                {[
                  { from: 'Ama', text: 'Hello! How can I help you today?', time: '04:10' },
                  { from: 'You', text: 'I need help with my hospital registration.', time: '04:15' },
                  { from: 'Ama', text: 'Of course! Let me guide you through the process.', time: '04:18' },
                ].map((m, i) => (
                  <div key={i} style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: m.from === 'You' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      backgroundColor: m.from === 'You' ? 'var(--emerald)' : '#222',
                      borderRadius: m.from === 'You' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      padding: '8px 12px', maxWidth: '85%'
                    }}>
                      <p style={{ color: 'white', fontSize: 13, margin: 0, lineHeight: 1.4 }}>{m.text}</p>
                    </div>
                    <span style={{ color: '#444', fontSize: 9, marginTop: 2 }}>{m.from} · {m.time}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 12, borderTop: '1px solid #222', display: 'flex', gap: 8 }}>
                <input placeholder="Type a message..." style={{
                  flex: 1, backgroundColor: '#222', border: '1px solid #333',
                  borderRadius: 12, padding: '8px 12px', color: 'white', fontSize: 13,
                  fontFamily: 'var(--font-body)', outline: 'none'
                }} />
                <button style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'var(--leaf)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <ArrowRight size={16} color="white" weight="bold" />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: 16 }}>
              <ChatCircle size={24} color="#333" />
              <p style={{ color: '#444', fontSize: 11, textAlign: 'center', margin: 0 }}>Open chat to message your interpreter</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── POST SESSION STATE ── */
  return (
    <div style={{
      minHeight: '100vh', fontFamily: 'var(--font-body)', backgroundColor: 'var(--surface)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '24px 16px' : '40px'
    }}>
      <div style={{
        maxWidth: 520, width: '100%', backgroundColor: 'white', borderRadius: 'var(--radius-xl)',
        padding: isMobile ? '32px 20px' : '60px 48px', textAlign: 'center', boxShadow: 'var(--shadow-float)',
        border: '1px solid var(--lh-surface)'
      }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--lh-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <VideoCamera size={32} color="var(--leaf)" weight="duotone" />
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 24 : 32, color: 'var(--forest)', margin: '0 0 8px 0' }}>Session Complete</h2>
        <p style={{ color: 'var(--mid-teal)', fontSize: 15, margin: '0 0 4px 0' }}>with Ama Korantema · {fmt(elapsed)}</p>
        <p style={{ color: 'var(--soft-teal)', fontSize: 13, margin: '0 0 24px 0' }}>How was your experience?</p>

        {/* Stars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
          {[1,2,3,4,5].map(i => (
            <button key={i} onClick={() => setRating(i)} style={{ transition: 'transform 0.15s var(--spring)', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Star size={isMobile ? 36 : 48} color="var(--gold)" weight={i <= rating ? 'fill' : 'regular'} />
            </button>
          ))}
        </div>

        <textarea
          placeholder="Leave a comment (optional)..."
          style={{
            width: '100%', height: 100, borderRadius: 16,
            border: '1.5px solid var(--lh-surface)', padding: '14px 18px',
            fontFamily: 'var(--font-body)', fontSize: 13, resize: 'none',
            outline: 'none', marginBottom: 24,
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--leaf)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--lh-surface)'}
        />

        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%', padding: '16px', borderRadius: 16,
            backgroundColor: 'var(--leaf)',
            color: 'white', fontWeight: 700, fontSize: 16,
            border: 'none',
            boxShadow: '0 8px 24px rgba(46,158,107,0.3)',
            marginBottom: 16, transition: 'all 0.2s var(--spring)', cursor: 'pointer'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 32px rgba(46,158,107,0.35)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,158,107,0.3)'; }}
        >
          Submit Rating
        </button>

        <p style={{ color: 'var(--mid-teal)', fontSize: 13, margin: 0 }}>
          Session cost: <strong style={{ color: 'var(--forest)' }}>GHS 15.00</strong> · MTN MoMo charged
        </p>
      </div>
    </div>
  );
}
