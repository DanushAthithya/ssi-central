import Features from "../LandingPage/Features"
import Footer from "../LandingPage/Footer"
import LandingPage from "../LandingPage/LandingPage"
import Screenshots from "../LandingPage/ScreenShots"
import UserNavbar from "../Navbar/UserNavbar"


const UserHome=()=>{
    return(
        <div className="UserHome">
            <UserNavbar/>
            <LandingPage/>
            <Screenshots/>
            <Features/>
            <Footer/>
        </div>
    )
}
export default UserHome;