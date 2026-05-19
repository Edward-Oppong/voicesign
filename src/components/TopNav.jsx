import { useNavigate } from 'react-router-dom';
import { CaretLeft } from '@phosphor-icons/react';

export default function TopNav({ title, rightIcon, showBack = false, customRight, bgColor = 'var(--primary-dark)', color = 'white' }) {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      backgroundColor: bgColor,
      color: color,
    }}>
      <div style={{ width: 40 }}>
        {showBack && (
          <button onClick={() => navigate(-1)} style={{ color: 'inherit' }}>
            <CaretLeft size={24} weight="bold" />
          </button>
        )}
      </div>
      
      <h1 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '20px',
        fontWeight: 500,
        margin: 0,
      }}>
        {title}
      </h1>

      <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
        {customRight ? customRight : (rightIcon && rightIcon)}
      </div>
    </div>
  );
}
