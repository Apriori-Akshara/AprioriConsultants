import Footer from './Home/footer'
import Navbar from './NavbarJS'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()

  const isSatLibraryExperience =
    router.pathname === '/SATMocks' ||
    router.pathname === '/SATMocks/purchase' ||
    router.pathname.startsWith('/SATMocks/purchase/')

  return (
    <>
      {isSatLibraryExperience && <Navbar />}

      <main className='top'>{children}</main>

      {isSatLibraryExperience && <Footer />}
    </>
  )
}
