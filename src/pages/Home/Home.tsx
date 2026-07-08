import Background from "../../components/home/Background";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import HowItWorks from "../../components/home/HowItWorks";
import DashboardPreview from "../../components/home/DashboardPreview";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Background />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <DashboardPreview />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;