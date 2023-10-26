import HeroSection from "../../../components/general/HeroSection"
import Testimonials from "../../../components/general/Testimonials"
import Stats from "../../../components/general/Stats"
import OurPartner from "../../../components/general/OurPartner"

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Stats />
      <hr />
      <Testimonials />
      <hr />
      <OurPartner />
    </div>
  )
}

export default HomePage
