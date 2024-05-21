import Footer from './Home/footer'
 
export default function Layout({ children }) {
  return (
    <>
      <main className='top'>{children}</main>
      <Footer />
    </>
  )
}