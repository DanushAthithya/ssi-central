
import Features from "../LandingPage/Features";
import Footer from "../LandingPage/Footer";
import LandingPage from "../LandingPage/LandingPage";
import Screenshots from "../LandingPage/ScreenShots";
import AdminNavbar from "../Navbar/AdminNavbar";

const AdminHome=()=>{
    return(
        <div className="AdminHome">
            <AdminNavbar/>
            <LandingPage/>
            <Screenshots/>
            <Features/>
            <Footer/>
        </div>
    )
}
export default AdminHome;