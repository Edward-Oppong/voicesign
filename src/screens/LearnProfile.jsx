import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fire, Check, Lock, Heartbeat, Buildings, Briefcase, Star, HandWaving, BookOpen, Trophy } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

// SVG progress ring
function Ring({ pct, size = 100, color = 'var(--leaf)', bg = 'var(--lh-surface)', label, sub }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bg} strokeWidth={8} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        <text x="50%" y="50%" fill={color} fontFamily="var(--font-display)" fontSize={size === 100 ? 20 : 14} textAnchor="middle" dominantBaseline="central" style={{ transform: `rotate(90deg)`, transformOrigin: '50% 50%' }}>{label}</text>
      </svg>
      {sub && <p style={{ fontSize: 11, color: 'var(--mint)', margin: '4px 0 0 0' }}>{sub}</p>}
    </div>
  );
}

const BADGES = [
  { icon: HandWaving, label: 'First Sign',       desc: 'Learned your first GSL sign',  earned: true,  day: 1 },
  { icon: Fire,       label: '7-Day Streak',     desc: '7 consecutive days',            earned: true,  day: 3 },
  { icon: BookOpen,   label: 'Course Started',   desc: 'Began a domain course',         earned: true,  day: 2 },
  { icon: Star,       label: '50 Signs',          desc: 'Learned 50 signs',             earned: true,  day: 5 },
  { icon: Trophy,     label: 'Domain Complete',  desc: 'Complete a full course',        earned: false, day: null },
];

const DOMAINS = [
  { id: 'healthcare', name: 'Healthcare GSL', icon: Heartbeat, color: 'var(--healthcare)', pct: 34, signs: 47, module: 'Module 2, Lesson 1' },
  { id: 'civic',      name: 'Civic GSL',      icon: Buildings,  color: 'var(--civic)',      pct: 15, signs: 22, module: 'Module 1, Lesson 2' },
  { id: 'workplace',  name: 'Workplace GSL',  icon: Briefcase,  color: 'var(--workplace)',  pct: 0,  signs: 0,  module: 'Not started' },
];

const LAST_30 = Array.from({ length: 30 }, (_, i) => {
  if (i >= 30) return 'future';
  if (i < 23) return Math.random() > 0.3 ? 'done' : 'missed';
  if (i < 29) return 'done';
  return 'today';
});

export default function LearnProfile() {
  const [goal, setGoal] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', fontFamily: 'var(--font-body)', paddingBottom: 80 }}>
      <TopNav title="My Learning Profile" showBack bgColor="white" color="var(--forest)" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 16px' : '32px 48px' }}>

        {/* Profile header card */}
        <div style={{ 
          backgroundColor: 'var(--emerald)', 
          borderRadius: 16, 
          padding: isMobile ? '32px 20px' : '40px', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 32, 
          alignItems: 'center', 
          marginBottom: 32 
        }}>
          {/* Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid var(--gold)', backgroundColor: 'var(--mid-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'white' }}>K</span>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'white', margin: 0 }}>Kofi A.</p>
            <p style={{ fontSize: 13, color: 'var(--mint)', margin: 0 }}>Deaf User · Kumasi, Ghana</p>
          </div>

          {/* Stats */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 24 : 32, 
            justifyContent: 'center', 
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto'
          }}>
            {[
              { val: '247', label: 'Signs Learned', color: 'white' },
              { val: '7', label: 'Day Streak', color: 'var(--gold)', suffix: <Fire size={24} color="var(--gold)" weight="fill" /> },
              { val: '34%', label: 'Avg Course Progress', color: 'white' },
            ].map((s, i) => (
              <div 
                key={i} 
                style={{ 
                  textAlign: 'center', 
                  paddingRight: isMobile ? 0 : 32, 
                  paddingBottom: isMobile ? 16 : 0,
                  borderRight: isMobile ? 'none' : (i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none'),
                  borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: s.color, margin: 0, lineHeight: 1 }}>{s.val}</p>
                  {s.suffix}
                </div>
                <p style={{ fontSize: 13, color: 'var(--mint)', margin: '4px 0 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Weekly ring */}
          <div style={{ textAlign: 'center' }}>
            <Ring pct={71} label="5/7" sub="Weekly Goal" color="var(--leaf)" bg="rgba(255,255,255,0.15)" />
          </div>
        </div>

        {/* Domain progress */}
        <p style={{ margin: '0 0 16px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Domain Progress</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {DOMAINS.map(d => {
            const Icon = d.icon;
            return (
              <div key={d.id} style={{ backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 14, padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: `${d.id === 'healthcare' ? '#E5393522' : d.id === 'civic' ? '#1565C022' : '#00838F22'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${d.color}33` }}>
                  <Icon size={22} color={d.color} weight="fill" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--forest)', margin: 0 }}>{d.name}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: d.color, margin: 0 }}>{d.signs} signs</p>
                  </div>
                  <div style={{ height: 10, backgroundColor: 'var(--lh-surface)', borderRadius: 8, overflow: 'hidden', marginBottom: 4 }}>
                    <div style={{ width: `${d.pct}%`, height: '100%', backgroundColor: d.color, borderRadius: 8, transition: 'width 0.4s ease' }} />
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--mid-teal)', margin: 0 }}>{d.pct}% · {d.module}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Streak calendar */}
        <p style={{ margin: '0 0 16px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Your Learning Streak</p>
        <div style={{ backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Fire size={24} color="var(--gold)" weight="fill" />
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--forest)', margin: 0 }}>7 Day Streak</p>
            </div>
            <p style={{ fontSize: 13, color: 'var(--mid-teal)', margin: 0 }}>Personal best: 12 days</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(10, 1fr)', gap: 12 }}>
            {LAST_30.map((day, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%',
                backgroundColor: day === 'done' ? 'var(--leaf)' : day === 'today' ? 'var(--gold)' : day === 'missed' ? 'var(--lh-surface)' : 'transparent',
                border: day === 'today' ? '2px solid var(--gold)' : day === 'future' ? '1px solid var(--soft-teal)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
                animation: day === 'today' ? 'pulse 2s ease-in-out infinite' : 'none'
              }}>
                {day === 'done' && <Check size={14} color="white" weight="bold" />}
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <p style={{ margin: '0 0 16px 0', fontSize: 11, fontWeight: 700, color: 'var(--deep-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Your Badges</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(5,1fr)', 
          gap: 16, 
          marginBottom: 32 
        }}>
          {BADGES.map(b => {
            const Icon = b.icon;
            return (
              <div key={b.label} style={{ backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 12, padding: 20, textAlign: 'center', opacity: b.earned ? 1 : 0.45, position: 'relative' }}>
                {!b.earned && <Lock size={18} color="var(--soft-teal)" style={{ position: 'absolute', top: 12, right: 12 }} />}
                <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: b.earned ? 'var(--pale-gold)' : 'var(--lh-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <Icon size={24} color={b.earned ? 'var(--gold)' : 'var(--soft-teal)'} weight="fill" />
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--forest)', margin: '0 0 4px 0' }}>{b.label}</p>
                <p style={{ fontSize: 11, color: 'var(--mid-teal)', margin: '0 0 4px 0', lineHeight: 1.4 }}>{b.desc}</p>
                {b.earned && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--soft-teal)', margin: 0 }}>Earned Day {b.day}</p>}
                {!b.earned && <p style={{ fontSize: 11, color: 'var(--soft-teal)', fontStyle: 'italic', margin: 0 }}>Locked</p>}
              </div>
            );
          })}
        </div>

        {/* Weekly goal */}
        <div style={{ 
          backgroundColor: 'white', 
          border: '1px solid var(--lh-surface)', 
          borderRadius: 14, 
          padding: 28, 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 20,
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'stretch' : 'center' 
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--forest)', margin: '0 0 4px 0' }}>Daily Learning Goal</p>
            <p style={{ fontSize: 13, color: 'var(--mid-teal)', margin: 0 }}>How many signs do you want to learn each day?</p>
          </div>
          <div style={{ display: 'flex', backgroundColor: 'var(--lh-surface)', borderRadius: 12, padding: 4, gap: 4, justifyContent: 'center' }}>
            {[3,5,10,20].map(n => (
              <button key={n} onClick={() => setGoal(n)} style={{ flex: isMobile ? 1 : 'none', padding: '8px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, backgroundColor: goal === n ? 'var(--gold)' : 'transparent', color: goal === n ? 'var(--forest)' : 'var(--mid-teal)', transition: 'all 0.15s ease' }}>
                {n}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
