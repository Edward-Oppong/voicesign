import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heartbeat, Buildings, Briefcase, Check, Lock, CaretRight, Play } from '@phosphor-icons/react';
import TopNav from '../components/TopNav';

const COURSES = [
  {
    id: 'healthcare',
    name: 'Healthcare GSL',
    icon: Heartbeat,
    color: 'var(--healthcare)',
    gradient: 'linear-gradient(135deg, #E53935, #b71c1c)',
    description: 'Learn the signs you need to communicate at hospitals, clinics, and health campaigns.',
    stats: '3 Modules · 9 Lessons · ~45 min',
    samples: ['DOCTOR','DIAGNOSIS','PRESCRIPTION'],
    pct: 34,
    modules: [
      { name: 'Body & Symptoms',        lessons: 3, done: 3, status: 'complete' },
      { name: 'At the Hospital',         lessons: 3, done: 1, status: 'progress' },
      { name: 'Talking to a Doctor',     lessons: 3, done: 0, status: 'locked'   },
    ],
    resumeLabel: 'Module 2, Lesson 2'
  },
  {
    id: 'civic',
    name: 'Civic & Government GSL',
    icon: Buildings,
    color: 'var(--civic)',
    gradient: 'linear-gradient(135deg, #1565C0, #0d3b75)',
    description: 'Signs for navigating Ghana\'s public institutions, rights, and community voice.',
    stats: '3 Modules · 9 Lessons · ~40 min',
    samples: ['PARLIAMENT','RIGHTS','VOTE'],
    pct: 15,
    modules: [
      { name: "Ghana's Institutions",    lessons: 3, done: 1, status: 'progress' },
      { name: 'Your Rights',             lessons: 3, done: 0, status: 'locked'   },
      { name: 'Community Voice',         lessons: 3, done: 0, status: 'locked'   },
    ],
    resumeLabel: 'Module 1, Lesson 2'
  },
  {
    id: 'workplace',
    name: 'Workplace GSL',
    icon: Briefcase,
    color: 'var(--workplace)',
    gradient: 'linear-gradient(135deg, #00838F, #005662)',
    description: 'Signs for office environments, meetings, interviews, and workplace safety.',
    stats: '3 Modules · 9 Lessons · ~35 min',
    samples: ['MEETING','CONTRACT','SAFETY'],
    pct: 0,
    modules: [
      { name: 'Office Basics',           lessons: 3, done: 0, status: 'locked' },
      { name: 'Meetings & Interviews',   lessons: 3, done: 0, status: 'locked' },
      { name: 'Workplace Safety',        lessons: 3, done: 0, status: 'locked' },
    ],
    resumeLabel: null
  },
];

function StatusIcon({ status, color }) {
  if (status === 'complete') return <Check size={20} color="var(--leaf)" weight="fill" />;
  if (status === 'progress') return <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} /></div>;
  return <Lock size={18} color="var(--mid-teal)" />;
}

export default function LearnCourses() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', fontFamily: 'var(--font-body)', paddingBottom: 80 }}>
      <TopNav title="Domain Courses" showBack bgColor="white" color="var(--forest)" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 16px' : '32px 48px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 40, color: 'var(--forest)', margin: '0 0 8px 0' }}>Domain Courses</h1>
          <p style={{ fontSize: 14, color: 'var(--mid-teal)', margin: 0 }}>3 domains · Beginner level · 27 lessons total</p>
        </div>

        {COURSES.map(course => {
          const Icon = course.icon;
          return (
            <div 
              key={course.id} 
              style={{ 
                backgroundColor: 'white', 
                border: '1px solid var(--lh-surface)', 
                borderRadius: 16, 
                overflow: 'hidden', 
                marginBottom: 20, 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                boxShadow: 'var(--shadow-soft)' 
              }}
            >
              {/* Left column — accent gradient */}
              <div style={{ 
                width: isMobile ? '100%' : '38%', 
                background: course.gradient, 
                padding: isMobile ? '32px 20px' : '40px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: isMobile ? 24 : 0
              }}>
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={28} color="white" weight="fill" />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'white', margin: '0 0 12px 0' }}>{course.name}</h2>
                  <span style={{ border: '1px solid rgba(255,255,255,0.6)', color: 'rgba(255,255,255,0.8)', fontSize: 13, padding: '4px 14px', borderRadius: 20 }}>Beginner Level</span>
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '0 0 16px 0' }}>{course.stats}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {course.samples.map(s => (
                      <span key={s} style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column — progress */}
              <div style={{ flex: 1, padding: isMobile ? '24px 20px' : '32px', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--forest)', margin: '0 0 16px 0' }}>Your Progress</h4>

                {course.modules.map((mod, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < course.modules.length - 1 ? '1px solid var(--lh-surface)' : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: course.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--forest)', flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{mod.name}</span>
                    {!isMobile && (
                      <span style={{ fontSize: 12, color: 'var(--mid-teal)', marginRight: 8 }}>{mod.done}/{mod.lessons} lessons</span>
                    )}
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: mod.lessons }).map((_, j) => (
                        <div key={j} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: j < mod.done ? course.color : 'var(--lh-surface)' }} />
                      ))}
                    </div>
                    <StatusIcon status={mod.status} color={course.color} />
                  </div>
                ))}

                <div style={{ marginTop: 20, borderTop: '1px solid var(--lh-surface)', paddingTop: 16 }}>
                  <div style={{ height: 8, backgroundColor: 'var(--lh-surface)', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{ width: `${course.pct}%`, height: '100%', backgroundColor: course.color, borderRadius: 8, transition: 'width 0.4s ease' }} />
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--mid-teal)', margin: '0 0 16px 0' }}>
                    {course.pct > 0 ? `${course.pct}% complete · Continue from ${course.resumeLabel}` : 'Not started yet'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, justifyContent: 'flex-end' }}>
                    <button onClick={() => navigate('/glossary')} style={{ width: isMobile ? '100%' : 'auto', padding: '0 20px', height: 44, borderRadius: 12, border: '1.5px solid var(--forest)', color: 'var(--forest)', fontWeight: 600, fontSize: 14, transition: 'all 0.15s ease' }}
                    >View All Lessons</button>
                    <button onClick={() => navigate('/learn/camera')} style={{ width: isMobile ? '100%' : 'auto', padding: '0 24px', height: 44, borderRadius: 12, backgroundColor: course.color, color: 'white', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      {course.pct > 0 ? 'Continue Course' : 'Start Course'} <CaretRight size={16} weight="bold" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
