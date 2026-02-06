import React from 'react';

function Header() {
  return (
    <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
      <img src="/src/assets/icon.svg" alt="VisitData Icon" style={{ width: '45px', height: '45px' }} />
      <h1>VisitData</h1>
    </div>
  );
}

export default Header;