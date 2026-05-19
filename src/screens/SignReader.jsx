import { useState } from 'react';
import { CaretLeft, VideoCamera, StopCircle, SpeakerHigh, Clipboard, WarningCircle, CheckCircle, ArrowsClockwise } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export default function SignReader() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(true);
  const [outputText, setOutputText] = useState('Hello, I need assistance with my application form.');
  const [confidence, setConfidence] = useState(92);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Skeleton overlay points for hand tracking
  const fingerTips = [
    { x: 100, y: 100 }, { x: 60, y: 40 }, { x: 80, y: 30 },
    { x: 110, y: 25 }, { x: 130, y: 40 }, { x: 155, y: 60 }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'var(--font-body)', backgroundColor: '#0a0a0a' }}>

      {/* ── LEFT PANE: Camera Feed (58%) ── */}
      <div style={{ flex: 58, position: 'relative', overflow: 'hidden' }}>

        {/* Camera BG */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)' }} />

        {/* Sign reader hands image */}
        <img
          src="/images/sign_reader_hands.png"
          alt="Sign language detection"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: isRecording ? 0.75 : 0.2,
            transition: 'opacity 0.5s ease'
          }}
        />

        {/* AR Hand Skeleton Overlay */}
        {isRecording && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
            <svg width="320" height="320" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 8px rgba(52,168,115,0.6))' }}>
              {/* Palm connections */}
              <path d="M100 150 L100 100 M100 100 L60 40 M100 100 L80 30 M100 100 L110 25 M100 100 L130 40 M100 100 L155 60" stroke="rgba(52,168,115,0.8)" strokeWidth="3" strokeLinecap="round" fill="none" className="animate-pulse" />
              {/* Joint dots */}
              {fingerTips.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r={i === 0 ? 7 : 5} fill={i === 0 ? 'var(--accent-bright)' : 'var(--primary-light)'} />
              ))}
              {/* Palm circle */}
              <circle cx="100" cy="150" r="12" fill="none" stroke="rgba(52,168,115,0.5)" strokeWidth="2" />
            </svg>
          </div>
        )}

        {/* Reading quality badge */}
        {isRecording && (
          <div style={{
            position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
            backgroundColor: confidence >= 85 ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
            border: `1px solid ${confidence >= 85 ? 'rgba(34,197,94,0.4)' : 'rgba(245,158,11,0.4)'}`,
            padding: '10px 24px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 10,
            backdropFilter: 'blur(10px)'
          }}>
            <CheckCircle size={18} color={confidence >= 85 ? 'var(--success)' : 'var(--warning)'} weight="fill" />
            <span style={{ color: confidence >= 85 ? 'var(--success)' : 'var(--warning)', fontWeight: 700, fontSize: 14 }}>
              {confidence}% Confidence — {confidence >= 85 ? 'Reading Clearly' : 'Move Closer'}
            </span>
          </div>
        )}

        {/* Paused state */}
        {!isRecording && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <VideoCamera size={72} color="rgba(255,255,255,0.2)" weight="duotone" />
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, marginTop: 16 }}>Camera Paused</p>
          </div>
        )}

        {/* Top HUD */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
          padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, color: 'white',
              backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 16px', borderRadius: 14,
              backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
          >
            <CaretLeft size={20} weight="bold" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Back</span>
          </button>

          <div style={{
            backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
            border: `1px solid ${isRecording ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
            padding: '8px 20px', borderRadius: 24,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            {isRecording
              ? <><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--success)' }} className="animate-pulse" /><span style={{ color: 'var(--success)', fontSize: 13, fontWeight: 700 }}>CAMERA ACTIVE</span></>
              : <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>CAMERA OFF</span>
            }
          </div>
        </div>

        {/* Corner guide frame */}
        {isRecording && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
            {/* TL */}
            <div style={{ position: 'absolute', top: 80, left: 60, width: 50, height: 50, borderTop: '3px solid rgba(52,168,115,0.6)', borderLeft: '3px solid rgba(52,168,115,0.6)', borderRadius: '4px 0 0 0' }} />
            {/* TR */}
            <div style={{ position: 'absolute', top: 80, right: 60, width: 50, height: 50, borderTop: '3px solid rgba(52,168,115,0.6)', borderRight: '3px solid rgba(52,168,115,0.6)', borderRadius: '0 4px 0 0' }} />
            {/* BL */}
            <div style={{ position: 'absolute', bottom: 160, left: 60, width: 50, height: 50, borderBottom: '3px solid rgba(52,168,115,0.6)', borderLeft: '3px solid rgba(52,168,115,0.6)', borderRadius: '0 0 0 4px' }} />
            {/* BR */}
            <div style={{ position: 'absolute', bottom: 160, right: 60, width: 50, height: 50, borderBottom: '3px solid rgba(52,168,115,0.6)', borderRight: '3px solid rgba(52,168,115,0.6)', borderRadius: '0 0 4px 0' }} />
          </div>
        )}

        {/* Record toggle */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
          <button
            onClick={() => setIsRecording(!isRecording)}
            style={{
              width: 88, height: 88, borderRadius: '50%',
              backgroundColor: isRecording ? 'var(--error)' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isRecording ? '0 0 0 8px rgba(239,68,68,0.2), 0 16px 40px rgba(239,68,68,0.4)' : '0 16px 40px rgba(0,0,0,0.5)',
              transition: 'all 0.3s var(--spring)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isRecording
              ? <StopCircle size={44} color="white" weight="fill" />
              : <VideoCamera size={44} color="var(--primary-dark)" weight="fill" />
            }
          </button>
        </div>
      </div>

      {/* ── RIGHT PANE: Text Output (42%) ── */}
      <div style={{
        flex: 42, backgroundColor: 'white',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.2)'
      }}>

        {/* Header */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--n5)', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--n4)' }}>Live Output</p>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--primary-dark)' }}>Sign → Text</h2>
            </div>
            <button
              onClick={() => setOutputText('')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--n4)', fontSize: 13, padding: '8px 14px', borderRadius: 10, border: '1px solid var(--n5)', backgroundColor: 'var(--surface)' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--error)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--n4)'}
            >
              <ArrowsClockwise size={16} /> Clear
            </button>
          </div>
        </div>

        {/* Output Text Area */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto', position: 'relative' }}>
          {outputText ? (
            <>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                margin: 0,
                animation: 'fade-in 0.4s ease'
              }}>
                {outputText}
              </p>
              {isRecording && (
                <span className="animate-pulse" style={{
                  display: 'inline-block', width: 14, height: 40,
                  backgroundColor: 'var(--primary-light)',
                  borderRadius: 4, marginLeft: 8, verticalAlign: 'middle'
                }} />
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 80 }}>
              <VideoCamera size={64} color="var(--n5)" weight="duotone" />
              <p style={{ color: 'var(--n4)', marginTop: 16, fontSize: 16 }}>Start signing to see output...</p>
            </div>
          )}
        </div>

        {/* Confidence Meter */}
        {isRecording && outputText && (
          <div style={{ padding: '0 32px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--n4)', fontWeight: 600 }}>Detection Confidence</span>
              <span style={{ fontSize: 12, color: 'var(--primary-light)', fontWeight: 700 }}>{confidence}%</span>
            </div>
            <div style={{ height: 6, backgroundColor: 'var(--n5)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                width: `${confidence}%`, height: '100%', borderRadius: 3,
                background: confidence >= 85 ? 'linear-gradient(90deg, var(--primary-light), var(--success))' : 'var(--warning)',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        )}

        {/* Tip banner */}
        <div style={{ padding: '0 32px 20px' }}>
          <div style={{
            backgroundColor: 'var(--accent-pale)', borderRadius: 16,
            padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'flex-start'
          }}>
            <WarningCircle size={20} color="var(--accent-strong)" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, fontSize: 13, color: 'var(--accent-strong)', lineHeight: 1.6 }}>
              Ensure your hands are well-lit and visible in the frame for best results.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding: '0 32px 32px', display: 'flex', gap: 12 }}>
          <button
            onClick={handleCopy}
            style={{
              flex: 1, padding: '16px', borderRadius: 16,
              border: `2px solid ${copied ? 'var(--success)' : 'var(--n5)'}`,
              color: copied ? 'var(--success)' : 'var(--n2)',
              fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s ease', backgroundColor: copied ? 'rgba(34,197,94,0.06)' : 'white'
            }}
          >
            {copied ? <CheckCircle size={18} weight="fill" /> : <Clipboard size={18} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            style={{
              flex: 2, padding: '16px', borderRadius: 16,
              background: 'linear-gradient(135deg, var(--primary-light), var(--primary-mid))',
              color: 'white', fontWeight: 700, fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(52,168,115,0.3)',
              transition: 'all 0.2s var(--spring)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(52,168,115,0.35)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(52,168,115,0.3)'; }}
          >
            <SpeakerHigh size={20} weight="fill" /> Speak Aloud
          </button>
        </div>
      </div>
    </div>
  );
}
