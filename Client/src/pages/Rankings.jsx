import NavBar from "../components/NavBar";
import SponcerBar from "../components/Sponcer/SponcerBar";
import Footer from "../components/Footer";
import Ranking from "../components/Ranking/Ranking";

function Rankings({getDates}) {
  return (
    <>
      <SponcerBar />
      <NavBar />
      <Ranking getDates={getDates}/>
      <Footer />
    </>
  );
}

export default Rankings;
