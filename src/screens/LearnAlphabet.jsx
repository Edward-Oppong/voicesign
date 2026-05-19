import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Play, Camera, X, YoutubeLogo } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

function SignTile({ label, isLetter = true, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white',
        border: `1px solid ${hovered ? 'var(--leaf)' : 'var(--lh-surface)'}`,
        borderRadius: 12, padding: 16, textAlign: 'center', cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.15s ease',
        boxShadow: hovered ? 'var(--shadow-soft)' : 'none'
      }}
    >
      <p style={{ fontFamily: 'var(--font-display)', fontSize: isLetter ? 32 : 36, color: 'var(--forest)', margin: '0 0 8px 0', lineHeight: 1 }}>{label}</p>
      <div style={{ backgroundColor: 'var(--emerald)', borderRadius: 8, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={12} color="var(--forest)" weight="fill" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--leaf)', fontWeight: 600 }}>Play</span>
        <span style={{ fontSize: 11, color: 'var(--mid-teal)' }}>Practice</span>
      </div>
    </div>
  );
}

function SignModal({ label, isLetter, onClose }) {
  // Map letters or numbers to specific timestamp start points on Ghanaian Sign Language video tutorials
  let youtubeUrl = '';
  if (isLetter) {
    const lettersArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const idx = lettersArr.indexOf(label);
    const startSec = 10 + (idx >= 0 ? idx : 0) * 8; // A=10s, B=18s, C=26s...
    youtubeUrl = `https://www.youtube.com/embed/VpdJEV-mP7k?start=${startSec}&autoplay=1`;
  } else {
    const numVal = parseInt(label, 10);
    const startSec = 5 + (numVal ? numVal : 1) * 6; // 1=11s, 2=17s...
    youtubeUrl = `https://www.youtube.com/embed/VpdJEV-mP7k?start=${startSec}&autoplay=1`;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(13,59,46,0.7)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ backgroundColor: 'white', borderRadius: 24, padding: 32, maxWidth: 460, width: '100%', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', animation: 'fade-in 0.2s ease', textAlign: 'center' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--lh-surface)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mid-teal)', cursor: 'pointer' }}>
          <X size={18} weight="bold" />
        </button>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--gold)', margin: '0 0 4px 0', lineHeight: 1 }}>{label}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 11, color: 'var(--mint)', backgroundColor: 'var(--forest)', padding: '4px 14px', borderRadius: 20 }}>
              GSL Handshape for {isLetter ? `Letter "${label}"` : `Number ${label}`}
            </span>
            <span style={{ backgroundColor: '#FF00001A', color: '#FF0000', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <YoutubeLogo size={14} weight="fill" /> YouTube
            </span>
          </div>

          {/* YouTube Video Iframe Embed */}
          <div style={{ backgroundColor: 'black', borderRadius: 12, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden', position: 'relative' }}>
            <iframe 
              width="100%" 
              height="100%" 
              src={youtubeUrl} 
              title={`GSL handshape tutorial for ${label}`} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ border: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: 'var(--mid-teal)', fontWeight: 600 }}>Ghanaian Sign Language fingerspelling tutorial</span>
          </div>
          <button style={{ border: 'none', cursor: 'pointer', width: '100%', height: 48, borderRadius: 14, backgroundColor: 'var(--leaf)', color: 'white', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Camera size={20} /> Practice with Camera
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LearnAlphabet() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('alphabet');
  const [search, setSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredLetters = LETTERS.filter(l => !search || l.toLowerCase().includes(search.toLowerCase()));
  const filteredNumbers = NUMBERS.filter(n => !search || String(n).includes(search));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', fontFamily: 'var(--font-body)', paddingBottom: 120 }}>
      <TopNav title="Alphabet & Numbers" showBack bgColor="white" color="var(--forest)" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 16px' : '32px 48px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'stretch' : 'flex-start', 
          gap: 16,
          marginBottom: 28 
        }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 40, color: 'var(--forest)', margin: '0 0 8px 0' }}>GSL Alphabet & Numbers</h1>
            <p style={{ fontSize: 14, color: 'var(--mid-teal)', margin: 0 }}>The foundation of Ghanaian Sign Language. Learn all 26 handshapes and numbers 1–20.</p>
          </div>
          <div style={{ position: 'relative', width: isMobile ? '100%' : 280, flexShrink: 0 }}>
            <MagnifyingGlass size={16} color="var(--soft-teal)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Jump to a letter..."
              style={{ width: '100%', height: 44, border: '1px solid var(--lh-surface)', borderRadius: 10, paddingLeft: 36, fontSize: 14, fontFamily: 'var(--font-body)', backgroundColor: 'white', outline: 'none', color: 'var(--forest)' }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[{ key: 'alphabet', label: 'A–Z Alphabet' }, { key: 'numbers', label: 'Numbers 1–20' }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
              backgroundColor: tab === t.key ? 'var(--gold)' : 'var(--lh-surface)',
              color: tab === t.key ? 'var(--forest)' : 'var(--mid-teal)',
              transition: 'all 0.15s ease'
            }}>{t.label}</button>
          ))}
        </div>

        {/* Grid */}
        {tab === 'alphabet' ? (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(7, 1fr)', gap: 12 }}>
            {filteredLetters.map(l => <SignTile key={l} label={l} isLetter onClick={() => setActiveModal({ label: l, isLetter: true })} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: 12 }}>
            {filteredNumbers.map(n => <SignTile key={n} label={n} isLetter={false} onClick={() => setActiveModal({ label: n, isLetter: false })} />)}
          </div>
        )}
      </div>

      {/* Sticky bottom practice bar */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: isMobile ? 0 : 280, 
        right: 0, 
        height: isMobile ? 'auto' : 72, 
        backgroundColor: 'var(--forest)', 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: isMobile ? '16px 20px' : '0 48px', 
        gap: isMobile ? 12 : 0,
        zIndex: 50 
      }}>
        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <p style={{ color: 'var(--mint)', fontSize: 14, margin: 0, fontWeight: 600 }}>Practice the full alphabet</p>
          <p style={{ color: 'var(--soft-teal)', fontSize: 12, margin: 0 }}>26 handshapes · 5 min session</p>
        </div>
        <button 
          onClick={() => navigate('/learn/flashcards?domain=all')}
          style={{ width: isMobile ? '100%' : 'auto', backgroundColor: 'var(--gold)', color: 'var(--forest)', padding: '12px 28px', borderRadius: 12, fontWeight: 700, fontSize: 14 }}
        >
          Start Alphabet Flashcards
        </button>
      </div>

      {activeModal && <SignModal {...activeModal} onClose={() => setActiveModal(null)} />}
    </div>
  );
}
