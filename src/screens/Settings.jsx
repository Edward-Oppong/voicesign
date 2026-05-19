import { useState } from 'react';
import { CaretRight, TextAUnderline, Rabbit, CircleHalf, MagicWand, Translate, ClockCounterClockwise, Star, Info, ShieldCheck, FileText, SignOut } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

export default function Settings() {
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [rememberMode, setRememberMode] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showConfidence, setShowConfidence] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', paddingBottom: 80 }}>
      <TopNav title="Settings" />

      {/* User Profile Card */}
      <div style={{ backgroundColor: 'var(--emerald)', padding: 24, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 800, margin: '0 auto' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid var(--gold)', backgroundColor: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>
            K
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, margin: '0 0 4px 0' }}>Kofi Mensah</h2>
            <p style={{ color: 'var(--mint)', fontSize: 13, margin: 0 }}>Deaf User · Kumasi, Ghana</p>
          </div>
          <button style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, backgroundColor: 'transparent' }}>
            Edit Profile
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px 40px 20px' }}>
        
        {/* SECTION - Accessibility */}
        <SettingsSection title="Accessibility">
          <SettingsRow icon={TextAUnderline} label="Font Size">
            <span style={{ fontSize: 12, color: 'var(--mid-teal)' }}>Medium <CaretRight size={14} /></span>
          </SettingsRow>
          <SettingsRow icon={Rabbit} label="Signing Speed">
            <div style={{ width: 100, height: 4, backgroundColor: 'var(--lh-surface)', borderRadius: 2 }}>
              <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--leaf)', borderRadius: 2 }} />
            </div>
          </SettingsRow>
          <SettingsRow icon={CircleHalf} label="High Contrast Mode">
            <Toggle checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
          </SettingsRow>
          <SettingsRow icon={MagicWand} label="Reduce Motion">
            <Toggle checked={reduceMotion} onChange={() => setReduceMotion(!reduceMotion)} />
          </SettingsRow>
          <SettingsRow icon={Translate} label="Preferred Language">
            <span style={{ fontSize: 12, color: 'var(--mid-teal)' }}>English <CaretRight size={14} /></span>
          </SettingsRow>
        </SettingsSection>

        {/* SECTION - My Preferences */}
        <SettingsSection title="My Preferences">
          <SettingsRow label="Default Output Mode">
            <span style={{ fontSize: 12, color: 'var(--mid-teal)' }}>Avatar <CaretRight size={14} /></span>
          </SettingsRow>
          <SettingsRow label="Remember Mode Choice">
            <Toggle checked={rememberMode} onChange={() => setRememberMode(!rememberMode)} />
          </SettingsRow>
          <SettingsRow label="Auto-play Signs">
            <Toggle checked={autoPlay} onChange={() => setAutoPlay(!autoPlay)} />
          </SettingsRow>
          <SettingsRow label="Show Confidence Score">
            <Toggle checked={showConfidence} onChange={() => setShowConfidence(!showConfidence)} />
          </SettingsRow>
        </SettingsSection>

        {/* SECTION - Interpreter */}
        <SettingsSection title="Interpreter">
          <SettingsRow label="Payment Method">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 12, backgroundColor: 'var(--gold)', borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: 'var(--mid-teal)' }}><CaretRight size={14} /></span>
            </div>
          </SettingsRow>
          <SettingsRow icon={ClockCounterClockwise} label="Session History"><CaretRight size={14} color="var(--mid-teal)" /></SettingsRow>
          <SettingsRow icon={Star} label="Rate Past Sessions"><CaretRight size={14} color="var(--mid-teal)" /></SettingsRow>
        </SettingsSection>

        {/* SECTION - About */}
        <SettingsSection title="About">
          <SettingsRow icon={Info} label="App Version"><span style={{ fontSize: 12, color: 'var(--mid-teal)' }}>1.2.0</span></SettingsRow>
          <SettingsRow icon={ShieldCheck} label="Privacy Policy"><CaretRight size={14} color="var(--mid-teal)" /></SettingsRow>
          <SettingsRow icon={FileText} label="Open Source Licenses"><CaretRight size={14} color="var(--mid-teal)" /></SettingsRow>
        </SettingsSection>

        <button 
          onClick={() => window.location.href = '/'}
          style={{
            width: '100%', height: 48, marginTop: 24, borderRadius: 12,
            border: '1.5px solid var(--healthcare)', color: 'var(--healthcare)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontSize: 14, fontWeight: 700, backgroundColor: 'transparent'
          }}
        >
          <SignOut size={20} weight="bold" /> Sign Out
        </button>

      </div>
    </div>
  );
}

function SettingsSection({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 11, color: 'var(--emerald)', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 8, fontWeight: 700 }}>{title}</h3>
      <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid var(--lh-surface)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function SettingsRow({ icon: Icon, label, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px', borderBottom: '1px solid var(--lh-surface)', minHeight: 48
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {Icon && <Icon size={20} color="var(--forest)" />}
        <span style={{ fontSize: 14, color: 'var(--forest)', fontWeight: 500 }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button 
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 12,
        backgroundColor: checked ? 'var(--success)' : 'var(--lh-surface)',
        position: 'relative', transition: 'background-color 0.2s ease',
        border: 'none', cursor: 'pointer'
      }}
    >
      <div style={{
        width: 20, height: 20, backgroundColor: 'white', borderRadius: '50%',
        position: 'absolute', top: 2, left: checked ? 22 : 2,
        transition: 'left 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </button>
  );
}
