import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">React + Routing</p>
        <h2>Welcome</h2>
        <p className="hero-lead">
          This is my React rebuilt page with a routed form experience that
          matches the original theme and sends data to httpbin.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/form">
            Open the form
          </Link>
          <a className="secondary-button" href="#task-overview">
            Read the task
          </a>
        </div>
      </div>
      <div className="hero-card" id="task-overview">
        <h3>What this version includes</h3>
        <ul className="feature-list">
          <li>Client-side routing with a dedicated form page</li>
          <li>Three different HTML input types with validation</li>
          <li>Live POST request to `https://httpbin.org/post`</li>
          <li>Readable response preview directly on the page</li>
        </ul>
      </div>
    </section>
  )
}

export default Hero
