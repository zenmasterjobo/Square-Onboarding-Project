import Navbar from '../Navbar'

const Bars = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Bars