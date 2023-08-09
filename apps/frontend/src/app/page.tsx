import LandingBanner from './components/LandingBanner'
import LandingAboutUs from './components/LandingAboutUs'
import LandingHowItWorks from './components/LandingHowItWorks'
import LandingOtherServices from './components/LandingOtherServices'
// import LandingSubjects from './components/LandingSubjects'
// import styles from './page.module.scss'

export default function Home() {

  console.log ('Cheeseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

  return (
    <main>
      <LandingBanner  />

      <LandingAboutUs />

      <LandingHowItWorks />

      {/* <LandingSubjects /> */}

      <LandingOtherServices />

    </main>
  )
}
