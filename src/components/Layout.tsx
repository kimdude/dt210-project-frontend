import { Header } from "./header"
import { Outlet } from "react-router-dom"
import { Footer } from "./footer"


export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}