import React from 'react';
import logo from '../image/profile.png'; // Import file gambar logo
import './Header.css';

function Header({ handleLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Sukasuka Logo" className="header__logo" /> {/* Tambahkan tag img dengan sumber gambar */}
      <h1 className="header__title">SUKASUKAstore</h1>
      <p className="header__teks">~tersedia produk lokal hingga luar negeri~</p>
    </header>
  );
}

export default Header;
