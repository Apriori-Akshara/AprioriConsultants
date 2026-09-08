import Footer from './Home/footer'
import Navbar from './NavbarJS'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()

  const isSatExperience =
    router.pathname === '/SATMocks' ||
    router.pathname.startsWith('/SATMocks/')

  return (
    <>
      {isSatExperience && <Navbar />}

      <main className='top'>{children}</main>

      <Footer />
    </>
  )
}
