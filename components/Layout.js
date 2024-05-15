import Navbar from './Navbar.js'
import Footer from './Home/footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='top'>{children}</main>
      <Footer />
    </>
  )
}