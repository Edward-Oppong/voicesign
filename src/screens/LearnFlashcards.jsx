import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Minus, X, Play, Camera, ArrowsClockwise, Trophy } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

const CARDS = [
  { id: 1, term: 'DIAGNOSIS',   domain: 'healthcare', context: 'Used when a doctor explains what illness a patient has.', gsl: true },
  { id: 2, term: 'WARD',        domain: 'healthcare', context: 'The room or section of a hospital patients stay in.', gsl: true },
  { id: 3, term: 'PHARMACY',    domain: 'healthcare', context: 'Where patients collect medicine and prescriptions.', gsl: false },
  { id: 4, term: 'PARLIAMENT',  domain: 'civic',      context: 'Ghana\'s law-making body in Accra.', gsl: true },
  { id: 5, term: 'RIGHTS',      domain: 'civic',      context: 'The freedoms and protections every citizen has.', gsl: true },
  { id: 6, term: 'MEETING',     domain: 'workplace',  context: 'A gathering of colleagues to discuss work.', gsl: false },
  { id: 7, term: 'EMERGENCY',   domain: 'healthcare', context: 'An urgent situation requiring immediate help.', gsl: true },
  { id: 8, term: 'CONTRACT',    domain: 'workplace',  context: 'A signed legal agreement between parties.', gsl: false },
];

const DOMAIN_COLORS = { healthcare: 'var(--healthcare)', civic: 'var(--civic)', workplace: 'var(--workplace)' };
const DOMAIN_LABELS = { healthcare: 'Healthcare', civic: 'Civic', workplace: 'Workplace' };

function DomainPill({ domain }) {
  return (
    <span style={{ backgroundColor: DOMAIN_COLORS[domain], color: '#fff', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999 }}>
      {DOMAIN_LABELS[domain]}
    </span>
  );
}

function GslBadge({ gsl }) {
  return (
    <span style={{ backgroundColor: gsl ? 'var(--mint)' : 'var(--pale-gold)', color: gsl ? 'var(--forest)' : 'var(--deep-gold)', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
      {gsl ? 'GSL Verified' : 'ASL Bootstrap'}
    </span>
  );
}

export default function LearnFlashcards() {
  const navigate = useNavigate();
  const [domainFilter, setDomainFilter] = useState('all');
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState({ got: 0, almost: 0, missed: 0 });
  const [done, setDone] = useState(false);
  const [animate, setAnimate] = useState(false);

  const cards = domainFilter === 'all' ? CARDS : CARDS.filter(c => c.domain === domainFilter);
  const card = cards[idx];
  const total = cards.length;
  const gotPct   = total ? Math.round(results.got   / total * 100) : 0;
  const almostPct= total ? Math.round(results.almost/ total * 100) : 0;
  const missedPct= total ? Math.round(results.missed/ total * 100) : 0;

  const rate = (key) => {
    const newResults = { ...results, [key]: results[key] + 1 };
    setResults(newResults);
    if (idx + 1 >= total) { setDone(true); return; }
    setAnimate(true);
    setTimeout(() => { setIdx(idx + 1); setRevealed(false); setAnimate(false); }, 250);
  };

  const restart = () => { setIdx(0); setRevealed(false); setResults({ got: 0, almost: 0, missed: 0 }); setDone(false); };

  const filterPills = [
    { key: 'all', label: 'All Domains' },
    { key: 'healthcare', label: 'Healthcare' },
    { key: 'civic', label: 'Civic' },
    { key: 'workplace', label: 'Workplace' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', fontFamily: 'var(--font-body)' }}>
      <TopNav title="Flashcard Practice" showBack bgColor="white" color="var(--forest)" />

      {/* Filter row */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid var(--lh-surface)', padding: '14px 48px', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 30 }}>
        {filterPills.map(p => (
          <button key={p.key} onClick={() => { setDomainFilter(p.key); restart(); }} style={{
            padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600,
            backgroundColor: domainFilter === p.key ? 'var(--gold)' : 'var(--lh-surface)',
            color: domainFilter === p.key ? 'var(--forest)' : 'var(--mid-teal)',
            transition: 'all 0.15s ease'
          }}>{p.label}</button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--soft-teal)', marginLeft: 'auto' }}>{total} cards available</span>
      </div>

      <div style={{ maxWidth: 640, margin: '48px auto', padding: '0 24px' }}>

        {done ? (
          /* ── SESSION COMPLETE ── */
          <div style={{ backgroundColor: 'white', borderRadius: 20, padding: 48, textAlign: 'center', boxShadow: 'var(--shadow-soft)', animation: 'fade-in 0.3s ease' }}>
            <Trophy size={56} color="var(--gold)" weight="fill" style={{ marginBottom: 16 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--forest)', margin: '0 0 24px 0' }}>Session Complete!</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 24 }}>
              {[
                { label: 'Got it', val: results.got,    color: 'var(--leaf)' },
                { label: 'Almost', val: results.almost, color: 'var(--gold)' },
                { label: 'Missed', val: results.missed, color: 'var(--healthcare)' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: s.color, margin: '0 0 4px 0' }}>{s.val}</p>
                  <p style={{ fontSize: 12, color: 'var(--mid-teal)', margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--forest)', marginBottom: 24 }}>Score: {gotPct}%</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={restart} style={{ padding: '0 28px', height: 52, borderRadius: 14, border: '2px solid var(--healthcare)', color: 'var(--healthcare)', fontWeight: 700, fontSize: 15 }}>Practice Missed Cards Again</button>
              <button onClick={() => navigate('/glossary')} style={{ padding: '0 28px', height: 52, borderRadius: 14, backgroundColor: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, fontSize: 15 }}>Back to Learning Hub</button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ height: 8, backgroundColor: 'var(--lh-surface)', borderRadius: 8, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${gotPct}%`,    height: '100%', backgroundColor: 'var(--leaf)',        transition: 'width 0.4s ease' }} />
                <div style={{ width: `${almostPct}%`, height: '100%', backgroundColor: 'var(--gold)',        transition: 'width 0.4s ease' }} />
                <div style={{ width: `${missedPct}%`, height: '100%', backgroundColor: 'var(--healthcare)',  transition: 'width 0.4s ease' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--mid-teal)', textAlign: 'center', marginTop: 8 }}>Card {idx + 1} of {total}</p>
            </div>

            {/* Flashcard */}
            <div style={{
              backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 20,
              padding: 48, textAlign: 'center', minHeight: 320,
              boxShadow: '0 2px 20px rgba(13,59,46,0.04)',
              transform: animate ? 'translateX(60px)' : 'translateX(0)',
              opacity: animate ? 0 : 1,
              transition: 'transform 0.25s ease, opacity 0.25s ease'
            }}>
              {!revealed ? (
                <>
                  <div style={{ marginBottom: 16 }}><DomainPill domain={card.domain} /></div>
                  <p style={{ fontSize: 14, color: 'var(--mid-teal)', margin: '0 0 12px 0' }}>What is the sign for...</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--forest)', margin: '0 0 12px 0' }}>{card.term}</h2>
                  <p style={{ fontSize: 13, color: 'var(--soft-teal)', fontStyle: 'italic', maxWidth: 360, margin: '0 auto 12px', lineHeight: 1.6 }}>{card.context}</p>
                  <div style={{ marginBottom: 32 }}><GslBadge gsl={card.gsl} /></div>
                  <button onClick={() => setRevealed(true)} style={{ backgroundColor: 'var(--gold)', color: 'var(--forest)', padding: '0 32px', height: 52, borderRadius: 14, fontWeight: 700, fontSize: 15, transition: 'all 0.15s var(--spring)' }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >Reveal Sign</button>
                </>
              ) : (
                <>
                  <div style={{ backgroundColor: 'var(--emerald)', borderRadius: 12, overflow: 'hidden', marginBottom: 16, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={32} color="var(--forest)" weight="fill" />
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--forest)', margin: '0 0 8px 0' }}>{card.term}</h3>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--mid-teal)' }}><ArrowsClockwise size={14} /> Replay</button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--leaf)' }}><Camera size={14} /> Practice this sign</button>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--mid-teal)', marginBottom: 12 }}>How did you do?</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => rate('got')} style={{ flex: 1, height: 52, borderRadius: 12, backgroundColor: 'var(--leaf)', color: 'white', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Check size={18} weight="bold" /> Got it</button>
                    <button onClick={() => rate('almost')} style={{ flex: 1, height: 52, borderRadius: 12, backgroundColor: 'var(--gold)', color: 'var(--forest)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Minus size={18} weight="bold" /> Almost</button>
                    <button onClick={() => rate('missed')} style={{ flex: 1, height: 52, borderRadius: 12, border: '2px solid var(--healthcare)', color: 'var(--healthcare)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><X size={18} weight="bold" /> Missed it</button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

