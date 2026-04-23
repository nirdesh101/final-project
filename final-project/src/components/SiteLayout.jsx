import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function SiteLayout() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default SiteLayout
