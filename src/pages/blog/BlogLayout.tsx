import { Outlet } from 'react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function BlogLayout() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav />
      <main style={{ paddingTop: '54px', minHeight: 'calc(100vh - 54px)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
