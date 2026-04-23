import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="brand-block">
        <p className="eyebrow">Task J1 Demo</p>
        <h1>My Website</h1>
      </div>
      <nav className="site-nav" aria-label="Primary">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/form"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Form Page
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
