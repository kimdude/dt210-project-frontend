import { Header } from "./header"
import { BreadCrumbs } from "./BreadCrumbs"
import { Outlet } from "react-router-dom"
import { Footer } from "./footer"


export const LayoutSubPage = () => {
  return (
    <>
      <Header />
      <main style={{backgroundColor: "rgba(0,0,0,0.5)", padding: "40px 4vw"}}>
        <BreadCrumbs />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}