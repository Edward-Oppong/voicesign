import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandWaving, Ear, VideoCamera, BookBookmark, ShieldCheck, CaretRight, Globe, Users, Star, ArrowRight, List, X } from '@phosphor-icons/react';
import gslBanner from '../assets/gsl_banner.png';


export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      icon: Ear,
      title: 'Speech to Sign',
      desc: 'Public announcements, speeches and conversations translated into Ghana Sign Language in real-time.',
      color: 'var(--primary-light)',
      bg: 'var(--primary-pale)'
    },
    {
      icon: HandWaving,
      title: 'Sign to Text',
      desc: 'Point your camera at anyone signing and get instant text output — speak for yourself effortlessly.',
      color: 'var(--accent-strong)',
      bg: 'var(--accent-pale)'
    },
    {
      icon: VideoCamera,
      title: 'Live Interpreters',
      desc: 'Connect to a certified GSL interpreter 24/7 for medical visits, legal meetings, and more.',
      color: '#3B82F6',
      bg: 'rgba(59,130,246,0.08)'
    },
    {
      icon: BookBookmark,
      title: 'Learning Hub',
      desc: 'Gamified daily modules covering everyday life — markets, hospitals, transport and more.',
      color: 'var(--primary-mid)',
      bg: 'var(--primary-pale)'
    },
    {
      icon: Globe,
      title: 'Civic Resources',
      desc: 'Official Ghana government services explained in sign language — rights, ID, healthcare.',
      color: '#8B5CF6',
      bg: 'rgba(139,92,246,0.08)'
    },
    {
      icon: ShieldCheck,
      title: 'Community Verified',
      desc: 'Every sign is validated by certified GSL signers from across Ghana for accuracy.',
      color: 'var(--success)',
      bg: 'rgba(34,197,94,0.08)'
    }
  ];

  const steps = [
    { num: '01', title: 'Create Your Profile', desc: 'Sign up in seconds. Tell us your preferred sign dialect and communication needs.' },
    { num: '02', title: 'Choose a Mode', desc: 'Pick from Speech-to-Sign, Sign-to-Text, or Live Interpreter depending on your situation.' },
    { num: '03', title: 'Communicate Freely', desc: 'Break barriers in real-time. Save signs, track learning progress, and grow your vocabulary.' },
  ];

  const stats = [
    { value: '12,400+', label: 'Active Users' },
    { value: '5,800+', label: 'GSL Signs Verified' },
    { value: '98%', label: 'Accuracy Rate' },
    { value: '24/7', label: 'Interpreter Access' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: 'rgba(250,252,251,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: isMobile ? '0 20px' : '0 40px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'var(--accent-bright)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--primary-dark)', fontWeight: 600 }}>VoiceSign GH</span>
        </div>

        {isMobile ? (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 44, height: 44, borderRadius: 12,
              backgroundColor: 'var(--primary-pale)', color: 'var(--primary-dark)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => navigate('/home')}
              style={{ padding: '10px 20px', borderRadius: 12, color: 'var(--primary-dark)', fontWeight: 500, fontSize: 15 }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/home')}
              style={{
                padding: '10px 24px', borderRadius: 12,
                backgroundColor: 'var(--primary-dark)', color: 'white',
                fontWeight: 600, fontSize: 15,
                boxShadow: '0 4px 12px rgba(18,43,36,0.2)'
              }}
            >
              Get Started Free
            </button>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'absolute', top: 72, left: 0, right: 0,
            backgroundColor: 'white', borderBottom: '1px solid var(--n5)',
            padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16,
            boxShadow: 'var(--shadow-float)', zIndex: 99
          }}>
            <button
              onClick={() => { navigate('/home'); setMenuOpen(false); }}
              style={{ padding: '12px', borderRadius: 12, backgroundColor: 'var(--surface)', color: 'var(--primary-dark)', fontWeight: 600, width: '100%' }}
            >
              Sign In
            </button>
            <button
              onClick={() => { navigate('/home'); setMenuOpen(false); }}
              style={{ padding: '12px', borderRadius: 12, backgroundColor: 'var(--primary-dark)', color: 'white', fontWeight: 600, width: '100%' }}
            >
              Get Started Free
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 92,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,168,115,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: isMobile ? '40px 20px 80px' : '80px 40px',
          display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row',
          alignItems: 'center', gap: isMobile ? 48 : 80, width: '100%'
        }}>

          {/* Left: Text */}
          <div style={{ flex: 1, animation: 'fade-in 0.8s ease', textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: 'var(--primary-pale)', color: 'var(--primary-mid)',
              padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700,
              marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.5px'
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary-light)' }} />
              Ghana Sign Language Platform
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.1,
              color: 'var(--primary-dark)',
              margin: '0 0 20px 0',
              fontWeight: 700
            }}>
              Breaking Barriers,<br />
              <span style={{ color: 'var(--primary-light)' }}>One Sign</span> at a Time.
            </h1>

            <p style={{
              fontSize: isMobile ? 16 : 20, lineHeight: 1.7, color: 'var(--n2)',
              margin: '0 0 32px 0', maxWidth: 520, marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0
            }}>
              VoiceSign GH makes public life accessible for Ghana's deaf and hard-of-hearing community — with real-time sign translation, a learning hub, and 24/7 live interpreters.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/home')}
                style={{
                  padding: '14px 28px', borderRadius: 14,
                  background: 'linear-gradient(135deg, var(--primary-light), var(--primary-mid))',
                  color: 'white', fontWeight: 700, fontSize: 16,
                  boxShadow: '0 12px 32px rgba(52,168,115,0.3)',
                  display: 'flex', alignItems: 'center', gap: 8
                }}
              >
                Start for Free <ArrowRight size={18} weight="bold" />
              </button>
              <button
                onClick={() => navigate('/home')}
                style={{
                  padding: '14px 28px', borderRadius: 14,
                  border: '2px solid var(--n5)', color: 'var(--primary-dark)',
                  fontWeight: 600, fontSize: 16, backgroundColor: 'white',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                Sign In <CaretRight size={16} weight="bold" />
              </button>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 16, marginTop: 40 }}>
              <div style={{ display: 'flex' }}>
                {['#8B5524','#5C3D1E','#C68642','#A0522D'].map((c, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, borderRadius: '50%',
                    backgroundColor: c, border: '2px solid white',
                    marginLeft: i > 0 ? -8 : 0
                  }} />
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} color="var(--accent-bright)" weight="fill" />)}
                </div>
                <p style={{ fontSize: 12, color: 'var(--n2)', margin: '2px 0 0 0' }}>Trusted by 12,400+ Ghanaians</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{
              width: '100%', maxWidth: 440, aspectRatio: '4/5',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(18,43,36,0.12)',
              position: 'relative'
            }}>
              <img
                src={gslBanner}
                alt="Person using Ghana Sign Language"
                style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'white' }}
              />
              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: 16, left: 16, right: 16,
                backgroundColor: 'rgba(18,43,36,0.9)', backdropFilter: 'blur(12px)',
                borderRadius: 16, padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'var(--accent-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <HandWaving size={20} color="var(--primary-dark)" weight="fill" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: 13 }}>Live GSL translation</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--success)' }} className="animate-pulse" />
                  <span style={{ color: 'var(--success)', fontSize: 10, fontWeight: 700 }}>LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-mid) 0%, var(--primary-dark) 100%)',
        padding: isMobile ? '40px 20px' : '60px 40px'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 24 : 40 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 48, color: 'var(--accent-bright)', margin: '0 0 4px 0', fontWeight: 700 }}>{s.value}</p>
              <p style={{ fontSize: 14, color: 'var(--primary-pale)', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: isMobile ? '60px 20px' : '120px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 80 }}>
          <p style={{ color: 'var(--primary-light)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>Everything You Need</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 44, color: 'var(--primary-dark)', margin: '0 0 16px 0' }}>Built for Ghana's Deaf Community</h2>
          <p style={{ color: 'var(--n2)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Every feature is co-designed with deaf Ghanaians and certified GSL professionals.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{
                backgroundColor: 'white', borderRadius: 'var(--radius-xl)', padding: 32,
                border: '1px solid var(--n5)', boxShadow: 'var(--shadow-soft)'
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={28} color={f.color} weight="duotone" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--primary-dark)', margin: '0 0 10px 0' }}>{f.title}</h3>
                <p style={{ color: 'var(--n2)', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ backgroundColor: 'var(--primary-pale)', padding: isMobile ? '60px 20px' : '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 80 }}>
            <p style={{ color: 'var(--primary-light)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>Simple Process</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 44, color: 'var(--primary-dark)', margin: 0 }}>Up and Running in Minutes</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 32 : 48 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-light), var(--primary-mid))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 12px 24px rgba(52,168,115,0.2)'
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'white', fontWeight: 700 }}>{s.num}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--primary-dark)', margin: '0 0 12px 0' }}>{s.title}</h3>
                <p style={{ color: 'var(--n2)', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 40px' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          background: 'linear-gradient(135deg, var(--primary-mid) 0%, var(--primary-dark) 100%)',
          borderRadius: 'var(--radius-xl)', padding: isMobile ? '48px 24px' : '80px 60px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(18,43,36,0.15)'
        }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          <div style={{ color: 'var(--accent-bright)', marginBottom: 16, display: 'inline-block' }}>
            <HandWaving size={48} weight="fill" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 26 : 40, color: 'white', margin: '0 0 16px 0' }}>
            Ready to Break Barriers?
          </h2>
          <p style={{ color: 'var(--primary-pale)', fontSize: 15, margin: '0 0 32px 0', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            Join thousands of Ghanaians already using VoiceSign GH to communicate freely.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/home')}
              style={{
                padding: '14px 32px', borderRadius: 12,
                backgroundColor: 'var(--accent-bright)', color: 'var(--primary-dark)',
                fontWeight: 700, fontSize: 16,
                boxShadow: '0 8px 24px rgba(245,166,35,0.2)',
                display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              Create Free Account <ArrowRight size={18} weight="bold" />
            </button>
            <button
              onClick={() => navigate('/home')}
              style={{
                padding: '14px 32px', borderRadius: 12,
                border: '2px solid rgba(255,255,255,0.3)', color: 'white',
                fontWeight: 600, fontSize: 16
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--n5)', padding: '32px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ color: 'var(--accent-bright)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', fontWeight: 600 }}>VoiceSign GH</span>
          </div>
          <p style={{ color: 'var(--n4)', fontSize: 13, margin: 0 }}>© 2026 VoiceSign GH. Making Ghana accessible for all.</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Privacy', 'Terms', 'Accessibility'].map(l => (
              <button key={l} style={{ color: 'var(--n4)', fontSize: 13 }}
              >{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
