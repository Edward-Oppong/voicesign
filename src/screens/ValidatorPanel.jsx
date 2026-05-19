import { useState, useEffect } from 'react';
import { SealCheck, PlayCircle, Check, X } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

export default function ValidatorPanel() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [submissions, setSubmissions] = useState([
    { id: 1, term: 'ELECTORAL COMMISSION', user: '@kofi_gh', time: '2 hours ago', status: 'pending' },
    { id: 2, term: 'PARLIAMENT', user: '@ama_signs', time: '5 hours ago', status: 'pending' },
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApprove = (id) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
  };

  const handleReject = (id) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface)', paddingBottom: 80 }}>
      <TopNav 
        title="Validator Panel" 
        customRight={
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--gold)', padding: '4px 10px', borderRadius: 12, gap: 4 }}>
            <SealCheck size={14} weight="fill" color="var(--forest)" />
            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--forest)', whiteSpace: 'nowrap' }}>VERIFIED SIGNER</span>
          </div>
        }
      />

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 12, padding: isMobile ? '16px' : '20px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <StatCard title="Pending Reviews" value="12" color="white" />
        <StatCard title="Approved This Week" value="45" color="white" />
        <StatCard title="Accuracy Rate" value="98%" color="var(--gold)" />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--lh-surface)', padding: isMobile ? '0 16px' : '0 20px', marginBottom: 20 }}>
        {['Pending (12)', 'Approved', 'Rejected'].map(tab => {
          const baseTabName = tab.split(' ')[0];
          const isActive = activeTab === baseTabName;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(baseTabName)}
              style={{
                padding: '12px 16px',
                fontSize: 12,
                color: isActive ? 'var(--forest)' : 'var(--mid-teal)',
                fontWeight: isActive ? 700 : 400,
                borderBottom: isActive ? '2px solid var(--leaf)' : '2px solid transparent',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Submission List */}
      <div style={{ 
        padding: isMobile ? '0 16px' : '0 24px', 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(450px, 1fr))', 
        gap: 20 
      }}>
        {submissions.map(sub => (
          <div key={sub.id} style={{
            backgroundColor: 'white',
            borderRadius: 16,
            border: '1px solid var(--lh-surface)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            padding: 20,
            gap: 20,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: 'var(--shadow-soft)'
          }}>
            {/* Left - Thumbnail */}
            <div style={{
              width: isMobile ? '100%' : 80, 
              height: isMobile ? 160 : 80, 
              borderRadius: 12, 
              backgroundColor: 'var(--emerald)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white',
              flexShrink: 0
            }}>
              <PlayCircle size={isMobile ? 48 : 32} weight="fill" color="var(--gold)" />
            </div>

            {/* Center - Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--forest)', margin: '0 0 6px 0' }}>{sub.term}</h4>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--mid-teal)' }}>Submitted by {sub.user} • {sub.time}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                <div style={{ width: 36, height: 24, backgroundColor: 'var(--lh-surface)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircle size={14} color="var(--forest)" />
                </div>
                <span style={{ fontSize: 11, color: 'var(--mid-teal)', fontWeight: 500 }}>Current GSL Reference</span>
              </div>
            </div>

            {/* Right - Actions */}
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'row' : 'column', 
              gap: 12, 
              justifyContent: 'center',
              width: isMobile ? '100%' : 'auto'
            }}>
              <button 
                onClick={() => handleApprove(sub.id)}
                style={{
                  flex: isMobile ? 1 : 'none',
                  height: 40, padding: '0 20px', borderRadius: 8,
                  backgroundColor: 'var(--leaf)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer'
                }}
              >
                <Check size={16} weight="bold" /> Approve
              </button>
              <button 
                onClick={() => handleReject(sub.id)}
                style={{
                  flex: isMobile ? 1 : 'none',
                  height: 40, padding: '0 20px', borderRadius: 8,
                  border: '1.5px solid var(--healthcare)', color: 'var(--healthcare)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 13, fontWeight: 700, backgroundColor: 'transparent', cursor: 'pointer'
                }}
              >
                <X size={16} weight="bold" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {submissions.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--mid-teal)', fontSize: 16 }}>
          No pending submissions right now.
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--leaf)', fontSize: 14, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>
          View Full Submission History
        </button>
      </div>

    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{
      minWidth: 140,
      flex: 1,
      backgroundColor: 'var(--forest)',
      borderRadius: 12,
      padding: 16,
      display: 'flex', flexDirection: 'column', gap: 8
    }}>
      <span style={{ fontSize: 11, color: 'var(--mint)', whiteSpace: 'nowrap', fontWeight: 600 }}>{title}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: color }}>{value}</span>
    </div>
  );
}
