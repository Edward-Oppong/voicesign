import { useState } from 'react';
import {
  CaretLeft, HandWaving, Microphone, StopCircle, Translate,
  BookmarkSimple, SpeakerHigh, DotsThreeOutline, CheckCircle,
  ArrowsLeftRight, VideoCamera, Clipboard, WarningCircle, ArrowsClockwise
} from '@phosphor-icons/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LiveTranslation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'camera' ? 'camera' : 'speech';
  const isDictation = searchParams.get('feature') === 'dictation';
  const [activeTab, setActiveTab] = useState(isDictation ? 'camera' : initialMode);
  const [isLive, setIsLive] = useState(true);
  const [showWordPanel, setShowWordPanel] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const [speed, setSpeed] = useState('Normal');

  // Camera Reader State
  const [cameraActive, setCameraActive] = useState(true);
  const [outputText, setOutputText] = useState('Hello, I need assistance with my application form.');
  const [confidence, setConfidence] = useState(92);
  const [copied, setCopied] = useState(false);
  const [dictationCopied, setDictationCopied] = useState(false);

  // Document Dictation States
  const [documentText, setDocumentText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('none');

  const templates = {
    registrar: "To the NHIS Registrar,\n\nI am signing to request urgent assistance with my healthcare card registration. My current registration has been delayed, and I require access to medical services.\n\nThank you,\nKofi Oppong",
    inquiry: "Dear Sir/Madam,\n\nI would like to inquire about the requirements for registering a new business in Accra. Please let me know the fee structure and average processing timeline.\n\nBest regards,\nKofi Oppong",
    medical: "Dear Doctor,\n\nI am writing to explain that I have been experiencing severe fatigue and symptoms of malaria for the past two days. I would appreciate an appointment as soon as possible.\n\nSincerely,\nKofi Oppong"
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDictationCopy = () => {
    setDictationCopied(true);
    setTimeout(() => setDictationCopied(false), 2000);
  };

  const transcriptWords = [
    { id: 1, text: 'The', gsl: true },
    { id: 2, text: 'Ministry', gsl: true },
    { id: 3, text: 'of', gsl: true },
    { id: 4, text: 'Health', gsl: true, current: true },
    { id: 5, text: 'has', gsl: true },
    { id: 6, text: 'announced', gsl: true },
    { id: 7, text: 'the', gsl: true },
    { id: 8, text: 'opening', gsl: true },
    { id: 9, text: 'of', gsl: true },
    { id: 10, text: 'new', gsl: true },
    { id: 11, text: 'regional', gsl: true },
    { id: 12, text: 'hospital', gsl: true },
    { id: 13, text: 'services', gsl: true },
    { id: 14, text: 'in', gsl: true },
    { id: 15, text: 'Kumasi', gsl: true },
    { id: 16, text: 'starting', gsl: false },
    { id: 17, text: 'next', gsl: false },
    { id: 18, text: 'month.', gsl: false },
  ];

  const fingerTips = [
    { x: 100, y: 100 }, { x: 60, y: 40 }, { x: 80, y: 30 },
    { x: 110, y: 25 }, { x: 130, y: 40 }, { x: 155, y: 60 }
  ];

  const handleWordClick = (word) => {
    setActiveWord(word.text);
    setShowWordPanel(true);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--primary-dark)', overflow: 'hidden', fontFamily: 'var(--font-body)' }}>

      {/* ── LEFT PANE: Mode display (Speech Avatar or Camera Feed) ── */}
      <div style={{ flex: 58, display: 'flex', flexDirection: 'column', position: 'relative', background: activeTab === 'speech' ? 'radial-gradient(ellipse at 50% 40%, #1E5C45 0%, #122B24 60%, #0A1F1A 100%)' : '#0F1F1A' }}>

        {/* Top HUD Bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
          padding: '20px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: 'white', backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '10px 16px', borderRadius: 14, backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            <CaretLeft size={20} weight="bold" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Back</span>
          </button>

          {/* Dynamic mode switcher */}
          <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', padding: 4, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setActiveTab('speech')}
              style={{
                padding: '8px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                backgroundColor: activeTab === 'speech' ? 'var(--primary-light)' : 'transparent',
                color: 'white', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 6
              }}
            >
              <Microphone size={16} /> Speech Translation
            </button>
            <button
              onClick={() => setActiveTab('camera')}
              style={{
                padding: '8px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                backgroundColor: activeTab === 'camera' ? 'var(--accent-bright)' : 'transparent',
                color: 'white', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 6
              }}
            >
              <VideoCamera size={16} /> Camera Sign Reader
            </button>
          </div>

          {/* Active status pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            backgroundColor: (activeTab === 'speech' ? isLive : cameraActive) ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${(activeTab === 'speech' ? isLive : cameraActive) ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
            padding: '8px 20px', borderRadius: 24, backdropFilter: 'blur(10px)'
          }}>
            {(activeTab === 'speech' ? isLive : cameraActive) ? (
              <>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--success)' }} className="animate-pulse" />
                <span style={{ color: 'var(--success)', fontSize: 13, fontWeight: 700, letterSpacing: '0.5px' }}>
                  {activeTab === 'speech' ? 'SPEECH ACTIVE' : 'CAMERA ACTIVE'}
                </span>
              </>
            ) : (
              <span style={{ color: 'var(--n4)', fontSize: 13, fontWeight: 600 }}>PAUSED</span>
            )}
          </div>
        </div>

        {/* ── Mode CONTENT: Speech Avatar ── */}
        {activeTab === 'speech' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingTop: 80 }}>
            {/* Glow ring */}
            <div style={{
              position: 'absolute', width: 320, height: 320, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52,168,115,0.12) 0%, transparent 70%)',
              animation: isLive ? 'pulse 3s ease-in-out infinite' : 'none'
            }} />

            {/* Avatar Circle */}
            <div style={{
              width: 260, height: 260, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(52,168,115,0.2) 0%, rgba(18,43,36,0.6) 100%)',
              border: `3px solid ${isLive ? 'rgba(52,168,115,0.4)' : 'rgba(255,255,255,0.1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isLive ? '0 0 60px rgba(52,168,115,0.15)' : 'none',
              transition: 'all 0.5s ease',
              backdropFilter: 'blur(4px)',
              position: 'relative'
            }}>
              <HandWaving
                size={120}
                color={isLive ? 'var(--primary-light)' : 'var(--n4)'}
                weight="duotone"
                className={isLive ? 'animate-float' : ''}
              />
            </div>

            {/* Current word being signed */}
            {isLive && (
              <div style={{
                marginTop: 36,
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, padding: '12px 32px',
                backdropFilter: 'blur(10px)',
                animation: 'fade-in 0.3s ease'
              }}>
                <p style={{ color: 'var(--n4)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px 0', textAlign: 'center' }}>Now Signing</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'white', margin: 0, textAlign: 'center' }}>Health</p>
              </div>
            )}

            {/* Language row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 32 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: 12, marginBottom: 6 }}>
                  <Microphone size={16} color="var(--primary-pale)" />
                  <span style={{ color: 'var(--primary-pale)', fontSize: 13, fontWeight: 600 }}>English</span>
                </div>
                <p style={{ color: 'var(--n4)', fontSize: 11, margin: 0 }}>Source</p>
              </div>
              <ArrowsLeftRight size={20} color="var(--accent-bright)" />
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(245,166,35,0.15)', padding: '8px 16px', borderRadius: 12, marginBottom: 6 }}>
                  <HandWaving size={16} color="var(--accent-bright)" />
                  <span style={{ color: 'var(--accent-bright)', fontSize: 13, fontWeight: 600 }}>GSL</span>
                </div>
                <p style={{ color: 'var(--n4)', fontSize: 11, margin: 0 }}>Output</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Mode CONTENT: Camera Sign Reader ── */}
        {activeTab === 'camera' && (
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Camera mock backdrop */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #112 0%, #0c0c16 100%)' }} />

            {/* Guide box overlay */}
            {cameraActive && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '18%', left: '15%', right: '15%', bottom: '22%', border: '2px dashed rgba(245,166,35,0.4)', borderRadius: 24 }} />
                <div style={{ position: 'absolute', bottom: '26%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'var(--gold)', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  KEEP HANDS INSIDE FRAME
                </div>
              </div>
            )}

            {/* Skeleton overlay points */}
            {cameraActive && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                <svg width="280" height="280" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 8px rgba(245,166,35,0.6))' }}>
                  <path d="M100 150 L100 100 M100 100 L60 40 M100 100 L80 30 M100 100 L110 25 M100 100 L130 40 M100 100 L155 60" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" fill="none" className="animate-pulse" />
                  {fingerTips.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r={i === 0 ? 7 : 5} fill={i === 0 ? 'var(--gold)' : 'var(--primary-light)'} />
                  ))}
                </svg>
              </div>
            )}

            {!cameraActive && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <VideoCamera size={64} color="rgba(255,255,255,0.15)" weight="duotone" />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 12 }}>Camera Stream Paused</p>
              </div>
            )}

            {/* Confidence indicator overlay */}
            {cameraActive && (
              <div style={{
                position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(245,166,35,0.3)',
                padding: '8px 20px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8
              }}>
                <CheckCircle size={16} color="var(--gold)" weight="fill" />
                <span style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700 }}>
                  {confidence}% confidence match
                </span>
              </div>
            )}
          </div>
        )}

        {/* Dynamic bottom controls bar */}
        <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {activeTab === 'speech' ? (
            <>
              {/* Speech Controls */}
              <div style={{ display: 'flex', gap: 4, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 4 }}>
                {['Slow','Normal','Fast'].map(s => (
                  <button key={s} onClick={() => setSpeed(s)} style={{
                    padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                    backgroundColor: speed === s ? 'var(--primary-light)' : 'transparent',
                    color: speed === s ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.2s ease'
                  }}>{s}</button>
                ))}
              </div>

              <button
                onClick={() => setIsLive(!isLive)}
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  backgroundColor: isLive ? 'var(--error)' : 'var(--primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isLive ? '0 8px 32px rgba(239,68,68,0.4)' : '0 8px 32px rgba(52,168,115,0.4)',
                  transition: 'all 0.3s var(--spring)'
                }}
              >
                {isLive ? <StopCircle size={40} color="white" weight="fill" /> : <Microphone size={40} color="white" weight="fill" />}
              </button>

              <button style={{
                backgroundColor: 'rgba(255,255,255,0.06)', padding: '16px 24px', borderRadius: 16,
                color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Translate size={18} /> Settings
              </button>
            </>
          ) : (
            <>
              {/* Camera Controls */}
              <button
                onClick={() => setCameraActive(!cameraActive)}
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  backgroundColor: cameraActive ? 'var(--error)' : 'var(--accent-bright)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: cameraActive ? '0 8px 32px rgba(239,68,68,0.4)' : '0 8px 32px rgba(245,166,35,0.4)',
                  transition: 'all 0.3s var(--spring)'
                }}
              >
                {cameraActive ? <StopCircle size={40} color="white" weight="fill" /> : <VideoCamera size={40} color="white" weight="fill" />}
              </button>

              <button
                onClick={() => setConfidence(cameraActive ? Math.min(100, confidence + 3) : 92)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)', padding: '16px 24px', borderRadius: 16,
                  color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <ArrowsClockwise size={18} /> Recalibrate
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── RIGHT PANE: Output panel (Transcript for Speech or Output text for Camera) ── */}
      <div style={{
        flex: 42, backgroundColor: 'var(--surface)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.15)'
      }}>

        {/* Pane Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--n5)',
          backgroundColor: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--mid-teal)', marginBottom: 4 }}>
              {isDictation ? 'AI GSL Document Writer' : activeTab === 'speech' ? 'Live Transcript' : 'Camera Translation'}
            </p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--forest)' }}>
              {isDictation ? 'GSL Sign → Formal Text Document' : activeTab === 'speech' ? 'Speech → GSL Sign' : 'GSL Sign → English Text'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--success)' }} className="animate-pulse" />
            <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700 }}>Live Feed</span>
          </div>
        </div>

        {/* Content body based on active translation tab */}
        {activeTab === 'speech' ? (
          /* ── Speech Transcript View ── */
          <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 6px', lineHeight: 1.8 }}>
              {transcriptWords.map(word => (
                <button
                  key={word.id}
                  onClick={() => handleWordClick(word)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 30,
                    color: word.current ? 'var(--primary-dark)' : word.gsl ? 'var(--n2)' : 'var(--n4)',
                    backgroundColor: word.current ? 'var(--accent-pale)' : 'transparent',
                    borderBottom: word.gsl && !word.current ? '2px dotted var(--n5)' : 'none',
                    padding: word.current ? '2px 10px' : '2px 4px',
                    borderRadius: word.current ? 10 : 0,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => { if (!word.current) e.currentTarget.style.backgroundColor = 'var(--primary-pale)'; }}
                  onMouseOut={(e) => { if (!word.current) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {word.text}
                </button>
              ))}
            </div>
            <p style={{ marginTop: 32, color: 'var(--n4)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, fontStyle: 'italic' }}>
              <CheckCircle size={16} color="var(--primary-light)" weight="fill" />
              Tap any word to see its GSL sign
            </p>
          </div>
        ) : (
          /* ── Camera Text Output View ── */
          isDictation ? (
            /* ── AI GSL Document Writer Panel ── */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', overflowY: 'auto' }}>
              
              {/* Template Picker */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--mid-teal)', marginBottom: 8, letterSpacing: '0.5px' }}>
                  Document Template
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <button 
                    onClick={() => {
                      setSelectedTemplate('registrar');
                      setDocumentText(templates.registrar);
                    }}
                    style={{
                      padding: '8px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                      backgroundColor: selectedTemplate === 'registrar' ? 'var(--mint)' : 'white',
                      border: `1px solid ${selectedTemplate === 'registrar' ? 'var(--emerald)' : 'var(--lh-surface)'}`,
                      color: 'var(--forest)', transition: 'all 0.2s ease', cursor: 'pointer'
                    }}
                  >
                    🏥 NHIS Application
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedTemplate('inquiry');
                      setDocumentText(templates.inquiry);
                    }}
                    style={{
                      padding: '8px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                      backgroundColor: selectedTemplate === 'inquiry' ? 'var(--mint)' : 'white',
                      border: `1px solid ${selectedTemplate === 'inquiry' ? 'var(--emerald)' : 'var(--lh-surface)'}`,
                      color: 'var(--forest)', transition: 'all 0.2s ease', cursor: 'pointer'
                    }}
                  >
                    💼 Business inquiry
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedTemplate('medical');
                      setDocumentText(templates.medical);
                    }}
                    style={{
                      padding: '8px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                      backgroundColor: selectedTemplate === 'medical' ? 'var(--mint)' : 'white',
                      border: `1px solid ${selectedTemplate === 'medical' ? 'var(--emerald)' : 'var(--lh-surface)'}`,
                      color: 'var(--forest)', transition: 'all 0.2s ease', cursor: 'pointer'
                    }}
                  >
                    🩺 Medical Symptom
                  </button>
                </div>
              </div>

              {/* Editor Workspace */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', minHeight: 200, marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--mid-teal)', marginBottom: 8, letterSpacing: '0.5px' }}>
                  Document Canvas (Editable)
                </label>
                <textarea
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  placeholder="Your GSL dictated paragraphs will appear here... Click templates above to load presets, or start signing to camera and click 'Append' below."
                  style={{
                    flex: 1, width: '100%', borderRadius: 16, border: '1px solid var(--lh-surface)',
                    padding: 16, fontSize: 14, fontFamily: 'var(--font-body)', lineHeight: 1.6,
                    color: 'var(--near-black)', outline: 'none', resize: 'none',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                  }}
                />
              </div>

              {/* Append Tooltip banner */}
              <div style={{
                backgroundColor: 'var(--mint)', borderRadius: 12,
                padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--success)' }} className="animate-pulse" />
                <p style={{ margin: 0, fontSize: 12, color: 'var(--forest)', fontWeight: 600 }}>
                  Camera translation matches: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>"{outputText}"</span>
                </p>
              </div>

              {/* Control Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={() => {
                    const separator = documentText.length > 0 ? '\n\n' : '';
                    setDocumentText(prev => prev + separator + outputText);
                  }}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 14,
                    background: 'linear-gradient(135deg, var(--leaf) 0%, var(--emerald) 100%)',
                    color: 'white', fontWeight: 700, fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 6px 18px rgba(46,158,107,0.2)', transition: 'all 0.2s ease', cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <HandWaving size={18} weight="fill" /> Append GSL Sign Dictation
                </button>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={handleDictationCopy}
                    style={{
                      flex: 1, padding: '12px', borderRadius: 12,
                      border: `1px solid ${dictationCopied ? 'var(--success)' : 'var(--lh-surface)'}`,
                      color: dictationCopied ? 'var(--success)' : 'var(--forest)',
                      fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      transition: 'all 0.2s ease', backgroundColor: dictationCopied ? 'rgba(34,197,94,0.06)' : 'white', cursor: 'pointer'
                    }}
                  >
                    {dictationCopied ? <CheckCircle size={16} weight="fill" /> : <Clipboard size={16} />}
                    {dictationCopied ? 'Copied Document!' : 'Copy Document'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setDocumentText('');
                      setSelectedTemplate('none');
                    }}
                    style={{
                      padding: '12px 16px', borderRadius: 12,
                      border: '1px solid var(--lh-surface)', color: 'var(--danger)',
                      fontWeight: 600, fontSize: 13, cursor: 'pointer', backgroundColor: 'white'
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px', overflowY: 'auto' }}>
              <div style={{ flex: 1 }}>
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
                    {cameraActive && (
                      <span className="animate-pulse" style={{
                        display: 'inline-block', width: 14, height: 40,
                        backgroundColor: 'var(--accent-bright)',
                        borderRadius: 4, marginLeft: 8, verticalAlign: 'middle'
                      }} />
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', paddingTop: 80 }}>
                    <VideoCamera size={64} color="var(--n5)" weight="duotone" />
                    <p style={{ color: 'var(--n4)', marginTop: 16, fontSize: 16 }}>Start signing inside guide-frame to translate...</p>
                  </div>
                )}
              </div>

              {/* Confidence indicator in Camera view */}
              {cameraActive && outputText && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: 'var(--n4)', fontWeight: 600 }}>Translation accuracy confidence</span>
                    <span style={{ fontSize: 12, color: 'var(--accent-bright)', fontWeight: 700 }}>{confidence}%</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: 'var(--n5)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      width: `${confidence}%`, height: '100%', borderRadius: 3,
                      backgroundColor: 'var(--accent-bright)',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              )}

              {/* Tip banner */}
              <div style={{
                backgroundColor: 'var(--accent-pale)', borderRadius: 16,
                padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 24
              }}>
                <WarningCircle size={20} color="var(--accent-strong)" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ margin: 0, fontSize: 13, color: 'var(--accent-strong)', lineHeight: 1.6 }}>
                  Tip: Position your device camera at eye-level so both hands and face are clearly visible.
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 12 }}>
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
                    background: 'linear-gradient(135deg, var(--accent-bright), var(--accent-strong))',
                    color: 'white', fontWeight: 700, fontSize: 15,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 8px 24px rgba(245,166,35,0.3)',
                    transition: 'all 0.2s var(--spring)'
                  }}
                >
                  <SpeakerHigh size={20} weight="fill" /> Speak Aloud
                </button>
              </div>
            </div>
          )
        )}

        {/* Word Detail Panel (slide-up) */}
        {showWordPanel && activeTab === 'speech' && (
          <div style={{
            borderTop: '2px solid var(--n5)',
            backgroundColor: 'white',
            animation: 'slide-up 0.3s var(--spring)'
          }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--n5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '0 0 6px 0', color: 'var(--primary-dark)' }}>{activeWord}</h3>
                <span style={{ backgroundColor: 'var(--primary-pale)', color: 'var(--primary-light)', padding: '4px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700 }}>GSL Verified ✓</span>
              </div>
              <button
                onClick={() => setShowWordPanel(false)}
                style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--n5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--n2)' }}
              >
                ✕
              </button>
            </div>

            {/* Mini sign preview */}
            <div style={{ padding: '20px 32px' }}>
              <div style={{
                height: 160, borderRadius: 20, overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--primary-mid), var(--primary-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', marginBottom: 16
              }}>
                <HandWaving size={72} color="white" weight="duotone" className="animate-float" />
                <div style={{ position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: 10, color: 'white', fontSize: 12 }}>
                  Auto-looping
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{
                  flex: 1, padding: '12px', borderRadius: 14,
                  border: '2px solid var(--primary-light)', color: 'var(--primary-light)',
                  fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}>
                  <BookmarkSimple size={18} weight="bold" /> Save Sign
                </button>
                <button style={{
                  flex: 2, padding: '12px', borderRadius: 14,
                  backgroundColor: 'var(--primary-light)', color: 'white',
                  fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 6px 20px rgba(52,168,115,0.3)'
                }}>
                  <SpeakerHigh size={18} weight="fill" /> Speak Aloud
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
