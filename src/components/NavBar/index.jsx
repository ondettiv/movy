import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import movyLogo from '../../assets/logos/movy.png';
import './styles.css';

function NavBar() {
  return (
    <nav className="absolute top-4 left-20 nav">
      <div className="bg-cover bg-center bg-top w-[76px] h-[40px]" style={{ backgroundImage: `url(${movyLogo})` }} />
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/movies">Movies</CustomLink>
        <CustomLink to="/series">Series</CustomLink>
        <CustomLink to="/recently-added">Recently Added</CustomLink>
        <CustomLink to="/my-list">My List</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default NavBar;
