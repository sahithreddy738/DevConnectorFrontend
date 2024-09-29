import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";


const Body=() => {
    return (
        <div className="w-screen h-screen" data-theme="dark">
           <NavBar />
           <Outlet/>
           <Footer/>
        </div>
    )
}

export default Body;