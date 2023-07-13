import React from 'react';
import logo from '../image/profile.png'; // Import file gambar logo
import './Header.css'; // Import file CSS

function Header({ handleLogout }) {
  return (
    <header className="header">
      <img src={logo} alt=" Logo" className="header__logo" /> {/* Tambahkan tag img dengan sumber gambar */}
      <h1 className="header__title">SUKASUKA</h1>
    </header>
  );
}

export default Header;
