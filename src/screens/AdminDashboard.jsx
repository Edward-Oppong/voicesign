import { useState, useEffect } from 'react';
import { House, Users, Translate, Database, VideoCamera, ChartBar, ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react';

export default function AdminDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Overview', icon: House, active: true },
    { label: 'Users', icon: Users, active: false },
    { label: 'Translations', icon: Translate, active: false },
    { label: 'Signs Database', icon: Database, active: false },
    { label: 'Interpreters', icon: VideoCamera, active: false },
    { label: 'Reports', icon: ChartBar, active: false }
  ];

  const metrics = [
    { label: 'ACTIVE USERS', value: '1,247', trend: 'up', pct: '12%' },
    { label: 'SPEECHES TRANSLATED', value: '3,891', trend: 'up', pct: '8%' },
    { label: 'SIGNS VALIDATED', value: '189', trend: 'up', pct: '24%' },
    { label: 'INTERPRETER SESSIONS', value: '47', trend: 'down', pct: '3%' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
      display: 'flex',
      flexDirection: 'column',
      padding: isMobile ? 16 : 32
    }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--primary-dark)', margin: '0 0 24px 0' }}>Overview</h2>

        {/* KPI Cards Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
          gap: 16, 
          marginBottom: 32 
        }}>
          {metrics.map((metric, i) => (
            <div key={i} style={{
              backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 16, padding: 24,
              borderLeft: `4px solid ${metric.trend === 'up' ? 'var(--success)' : 'var(--error)'}`,
              boxShadow: 'var(--shadow-soft)'
            }}>
              <span style={{ fontSize: 11, color: 'var(--mid-teal)', fontWeight: 600, letterSpacing: 0.5 }}>{metric.label}</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--forest)', lineHeight: 1 }}>{metric.value}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: metric.trend === 'up' ? 'var(--success)' : 'var(--error)' }}>
                  {metric.trend === 'up' ? <ArrowUpRight size={16} weight="bold" /> : <ArrowDownRight size={16} weight="bold" />}
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{metric.pct}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Row */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 24, 
          marginBottom: 32 
        }}>
          {/* Line Chart Mock */}
          <div style={{ flex: '6', backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ fontSize: 14, color: 'var(--forest)', margin: '0 0 20px 0', fontWeight: 600 }}>GSL Database Growth</h3>
            <div style={{ height: 200, position: 'relative', borderLeft: '1px solid var(--lh-surface)', borderBottom: '1px solid var(--lh-surface)', display: 'flex', alignItems: 'flex-end' }}>
              <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <polygon points="0,50 0,40 20,35 40,20 60,25 80,10 100,5 100,50" fill="var(--mint)" opacity="0.5" />
                <polyline points="0,40 20,35 40,20 60,25 80,10 100,5" fill="none" stroke="var(--leaf)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <circle cx="20" cy="35" r="1.5" fill="var(--gold)" />
                <circle cx="40" cy="20" r="1.5" fill="var(--gold)" />
                <circle cx="60" cy="25" r="1.5" fill="var(--gold)" />
                <circle cx="80" cy="10" r="1.5" fill="var(--gold)" />
                <circle cx="100" cy="5" r="1.5" fill="var(--gold)" />
              </svg>
              <div style={{ position: 'absolute', bottom: -24, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mid-teal)' }}>
                <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Mock */}
          <div style={{ flex: '4', backgroundColor: 'white', border: '1px solid var(--lh-surface)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ fontSize: 14, color: 'var(--forest)', margin: '0 0 20px 0', fontWeight: 600 }}>Mode Usage</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180, position: 'relative' }}>
              <div style={{
                width: 160, height: 160, borderRadius: '50%',
                background: 'conic-gradient(var(--mid-teal) 0% 15%, var(--gold) 15% 35%, var(--leaf) 35% 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{ width: 110, height: 110, backgroundColor: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--forest)' }}>3,891</span>
                  <span style={{ fontSize: 10, color: 'var(--mid-teal)' }}>Total Sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
