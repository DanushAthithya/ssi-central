import Features from "./Features"
import Footer from "./Footer"
import LandingPage from "./LandingPage"
import LandingPageHeader from "./LandingPageHeader"
import Screenshots from "./ScreenShots"

const LandingPageHome=()=>{
    return(
        <div className="LandingPageHome">
            <LandingPageHeader/>
            <LandingPage/>
            <Screenshots/>
            <Features/>
            <Footer/>
        </div>
    )
}
export default LandingPageHome;