import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Fire, BookOpen, Cards, Camera, TextAa, Ear, UserCircle,
  ArrowRight, CheckCircle, Lock, Trophy, Star, HandWaving,
  Play, Heartbeat, Buildings, Briefcase
} from '@phosphor-icons/react';
import gslBanner from '../assets/gsl_banner.png';


// ── Shared mini components ──────────────────────────────────────────

function DomainPill({ domain }) {
  const map = {
    healthcare: { bg: 'var(--healthcare)', label: 'Healthcare' },
    civic:      { bg: 'var(--civic)',      label: 'Civic' },
    workplace:  { bg: 'var(--workplace)',  label: 'Workplace' },
  };
  const d = map[domain] || { bg: 'var(--mid-teal)', label: domain };
  return (
    <span style={{
      backgroundColor: d.bg, color: '#fff',
      fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
      padding: '3px 10px', borderRadius: 999, letterSpacing: '0.04em'
    }}>{d.label}</span>
  );
}

function ProgressBar({ pct, color = 'var(--leaf)' }) {
  return (
    <div style={{ height: 8, backgroundColor: 'var(--lh-surface)', borderRadius: 8, overflow: 'hidden', width: '100%' }}>
      <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: 8, transition: 'width 0.4s ease' }} />
    </div>
  );
}

function SignVideoThumb({ size = 'md' }) {
  const h = size === 'lg' ? 140 : size === 'sm' ? 60 : 100;
  const playSize = size === 'lg' ? 44 : size === 'sm' ? 24 : 32;
  return (
    <div style={{
      width: '100%', height: h, backgroundColor: 'var(--emerald)',
      borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', flexShrink: 0
    }}>
      <div style={{ width: playSize + 12, height: playSize + 12, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Play size={playSize * 0.6} color="var(--forest)" weight="fill" />
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────

export default function LearningHub() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const courses = [
    { id: 'healthcare', label: 'Healthcare GSL', icon: Heartbeat, color: 'var(--healthcare)', pct: 34, modProgress: 'Module 2 of 3 · Lesson 1 of 3' },
    { id: 'civic',      label: 'Civic GSL',       icon: Buildings,  color: 'var(--civic)',      pct: 15, modProgress: 'Module 1 of 3 · Lesson 2 of 3' },
    { id: 'workplace',  label: 'Workplace GSL',    icon: Briefcase,  color: 'var(--workplace)',  pct: 0,  modProgress: null },
  ];

  const features = [
    { id: 'flashcards', icon: Cards,   bg: 'var(--leaf)',     label: 'Flashcard Practice',    body: 'Test yourself on 200 domain signs. Self-rate each card. Missed signs come back around.',    sub: '200 cards available',         path: '/learn/flashcards', cta: 'Start Practicing →' },
    { id: 'camera',     icon: Camera,  bg: 'var(--emerald)',  label: 'Camera Practice',        body: 'Sign to your camera. AI compares your hand shape to the reference and gives you a match score.', sub: 'Uses your device camera', path: '/learn/camera',      cta: 'Open Camera →' },
    { id: 'alphabet',   icon: TextAa,  bg: 'var(--gold)',     label: 'Alphabet & Numbers',     body: 'Learn all 26 GSL handshapes and numbers 1–20. The foundation every signer needs.',          sub: '46 signs · fully offline',    path: '/learn/alphabet',    cta: 'Open Reference →', iconColor: 'var(--forest)' },
    { id: 'hearing',    icon: Ear,     bg: 'var(--deep-gold)',label: 'For Hearing People',     body: '20 essential GSL signs every Ghanaian should know. Share this with colleagues and family.', sub: 'No login required · shareable', path: '/learn/hearing',   cta: 'Open Pack →' },
  ];

  const badges = [
    { id: 1, icon: HandWaving, label: 'First Sign',      desc: 'Learned your first GSL sign',    earned: true },
    { id: 2, icon: Fire,       label: '7-Day Streak',    desc: '7 consecutive days',              earned: true },
    { id: 3, icon: BookOpen,   label: 'Course Started',  desc: 'Began a domain course',           earned: true },
    { id: 4, icon: Star,       label: '50 Signs',        desc: 'Learned 50 signs',               earned: true },
    { id: 5, icon: Trophy,     label: 'Domain Complete', desc: 'Complete a full course',          earned: false },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', paddingBottom: 80, overflowX: 'hidden', fontFamily: 'var(--font-body)' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ 
        backgroundColor: 'var(--off-white)', 
        padding: isMobile ? '24px 16px' : '40px 48px', 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        gap: 20,
        borderBottom: '1px solid var(--lh-surface)', 
        maxWidth: 1280, 
        margin: '0 auto' 
      }}>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Learning Hub</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 40, color: 'var(--forest)', margin: 0 }}>Learn Ghanaian Sign Language</h1>
          <p style={{ margin: '6px 0 0 0', fontSize: 14, color: 'var(--mid-teal)', lineHeight: 1.5 }}>Structured lessons, daily practice, and camera feedback — across healthcare, civic, and workplace domains.</p>
        </div>

        {/* Streak card */}
        <div style={{ 
          backgroundColor: 'var(--emerald)', 
          borderRadius: 12, 
          padding: '16px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 16, 
          flexShrink: 0,
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'space-between' : 'flex-start'
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Fire size={24} color="var(--gold)" weight="fill" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white' }}>7 Day Streak</span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: 12, color: 'var(--mint)' }}>Keep it going!</p>
          </div>
          <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white' }}>247 Signs</span>
            <p style={{ margin: '4px 0 0 0', fontSize: 12, color: 'var(--mint)' }}>across 3 domains</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '20px 16px' : '32px 48px' }}>

        {/* ── DAILY SIGN BANNER ── */}
        <div style={{ 
          backgroundColor: 'var(--forest)', 
          borderRadius: 16, 
          padding: isMobile ? '24px 20px' : '32px', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', 
          gap: isMobile ? 24 : 32, 
          marginBottom: 32 
        }}>
          {/* Badge */}
          <div style={{ 
            backgroundColor: 'var(--gold)', 
            borderRadius: 20, 
            padding: '6px 16px', 
            flexShrink: 0,
            alignSelf: isMobile ? 'flex-start' : 'auto'
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--forest)' }}>TODAY'S SIGN</span>
          </div>

          {/* Term */}
          <div style={{ flex: 1, width: '100%', textAlign: isMobile ? 'left' : 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'white' }}>DIAGNOSIS</span>
              <DomainPill domain="healthcare" />
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--mint)' }}>Tap to learn this sign</p>
          </div>

          {/* Thumbnail */}
          <div style={{ width: isMobile ? '100%' : 120, height: 120, flexShrink: 0, borderRadius: 12, overflow: 'hidden', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={gslBanner} alt="GSL Learn" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          {/* Streak dots */}
          <div style={{ flexShrink: 0, textAlign: 'center', width: isMobile ? '100%' : 'auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--gold)', fontWeight: 700, margin: '0 0 8px 0' }}>Day 7</p>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 8 }}>
              {[1,2,3,4,5,6,7].map(d => (
                <div key={d} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: d <= 7 ? 'var(--gold)' : 'var(--lh-surface)' }} />
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--soft-teal)', margin: 0 }}>Come back tomorrow</p>
          </div>

          <button
            onClick={() => navigate('/learn/daily')}
            style={{ 
              backgroundColor: 'var(--gold)', 
              color: 'var(--forest)', 
              padding: '12px 24px', 
              height: 48, 
              borderRadius: 12, 
              fontWeight: 700, 
              fontSize: 14, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 8, 
              flexShrink: 0, 
              width: isMobile ? '100%' : 'auto',
              transition: 'all 0.2s var(--spring)' 
            }}
          >
            Learn Today's Sign <ArrowRight size={16} weight="bold" />
          </button>
        </div>

        {/* ── PROGRESS OVERVIEW ── */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', 
          gap: 20, 
          marginBottom: 32 
        }}>
          {courses.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.id} style={{ backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 14, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: `${c.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={22} color={c.color} weight="fill" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--forest)' }}>{c.label}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--mid-teal)', backgroundColor: 'var(--lh-surface)', padding: '4px 10px', borderRadius: 20 }}>Beginner</span>
                </div>

                {c.pct > 0 ? (
                  <>
                    <ProgressBar pct={c.pct} color={c.color} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, marginBottom: 12 }}>
                      <span style={{ fontSize: 12, color: 'var(--mid-teal)' }}>{c.modProgress}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: c.color }}>{c.pct}% complete</span>
                    </div>
                    <button onClick={() => navigate('/learn/courses')} style={{ border: `1.5px solid var(--leaf)`, color: 'var(--leaf)', padding: '0 16px', height: 36, borderRadius: 10, fontWeight: 600, fontSize: 13, transition: 'all 0.15s ease' }}
                    >Continue →</button>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: 'var(--mid-teal)', fontStyle: 'italic', margin: '0 0 12px 0' }}>Not started yet</p>
                    <button onClick={() => navigate('/learn/courses')} style={{ backgroundColor: 'var(--gold)', color: 'var(--forest)', padding: '0 16px', height: 36, borderRadius: 10, fontWeight: 700, fontSize: 13 }}>Start Course →</button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── FEATURE CARDS ── */}
        <p style={{ margin: '0 0 16px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>What Would You Like To Do?</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', 
          gap: 20, 
          marginBottom: 40 
        }}>
          {features.map(f => {
            const Icon = f.icon;
            const hovered = hoveredCard === f.id;
            return (
              <div
                key={f.id}
                onClick={() => navigate(f.path)}
                onMouseEnter={() => setHoveredCard(f.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: 'white', border: `1px solid ${hovered ? 'var(--leaf)' : 'var(--lh-surface)'}`,
                  borderRadius: 14, padding: 28, cursor: 'pointer',
                  transform: hovered ? 'translateY(-3px)' : 'none',
                  transition: 'all 0.15s ease',
                  boxShadow: hovered ? 'var(--shadow-soft)' : 'none'
                }}
              >
                <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={26} color={f.iconColor || 'white'} weight="fill" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--forest)', margin: '0 0 8px 0' }}>{f.label}</h3>
                <p style={{ fontSize: 13, color: 'var(--mid-teal)', lineHeight: 1.6, margin: '0 0 16px 0' }}>{f.body}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--soft-teal)' }}>{f.sub}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--leaf)' }}>{f.cta}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BADGES ── */}
        <p style={{ margin: '0 0 14px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Your Badges</p>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {badges.map(b => {
            const Icon = b.icon;
            return (
              <div key={b.id} style={{
                minWidth: 120, backgroundColor: 'white', border: '1px solid var(--lh-surface)',
                borderRadius: 12, padding: 16, textAlign: 'center', flexShrink: 0,
                opacity: b.earned ? 1 : 0.5, position: 'relative'
              }}>
                {!b.earned && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                    <Lock size={20} color="var(--mid-teal)" />
                  </div>
                )}
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: b.earned ? 'var(--pale-gold)' : 'var(--lh-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <Icon size={24} color={b.earned ? 'var(--gold)' : 'var(--soft-teal)'} weight="fill" />
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--forest)', margin: '0 0 4px 0' }}>{b.label}</p>
                <p style={{ fontSize: 10, color: b.earned ? 'var(--mid-teal)' : 'var(--soft-teal)', margin: 0, lineHeight: 1.4, fontStyle: b.earned ? 'normal' : 'italic' }}>{b.earned ? b.desc : 'Locked'}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
