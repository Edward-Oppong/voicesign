import { useState, useEffect } from 'react';
import SideNav from './SideNav';
import { List, X } from '@phosphor-icons/react';

export default function DesktopLayout({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false); // Reset sidebar open state on desktop resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      {/* ── Desktop Sidebar / Mobile Drawer Backdrop ── */}
      {isMobile ? (
        <>
          {isOpen && (
            <div 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute', inset: 0,
                backgroundColor: 'rgba(9, 21, 18, 0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 99,
                animation: 'fade-in 0.2s ease'
              }}
            />
          )}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: 280, zIndex: 100,
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isOpen ? '10px 0 40px rgba(0,0,0,0.2)' : 'none'
          }}>
            <SideNav />
            {/* Close button inside sidebar on mobile */}
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute', top: 20, right: -50,
                width: 40, height: 40, borderRadius: '50%',
                backgroundColor: 'var(--primary-dark)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'var(--shadow-float)'
              }}
            >
              <X size={20} weight="bold" />
            </button>
          </div>
        </>
      ) : (
        <SideNav />
      )}

      {/* ── Content Viewport ── */}
      <div style={{ 
        flex: 1, height: '100vh', overflowY: 'auto', 
        backgroundColor: 'var(--surface)', position: 'relative',
        paddingTop: isMobile ? 64 : 0 // Make space for the mobile top bar
      }}>
        {/* Mobile Top Bar */}
        {isMobile && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 64,
            backgroundColor: 'white', borderBottom: '1px solid var(--n5)',
            display: 'flex', alignItems: 'center', padding: '0 20px',
            justifyContent: 'space-between', zIndex: 10
          }}>
            <button 
              onClick={() => setIsOpen(true)}
              style={{
                width: 40, height: 40, borderRadius: 12,
                backgroundColor: 'var(--primary-pale)', color: 'var(--primary-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <List size={22} weight="bold" />
            </button>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--primary-dark)', fontWeight: 700 }}>
              VoiceSign GH
            </span>
            <div style={{ width: 40 }} /> {/* balance spacing */}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
