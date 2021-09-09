import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import './App.css';
import PokemonBg from './images/bg1.jpg';
import LandscapeBg from './images/bg3.jpg';

function App() {
  return (
    <>
      <Header title="This is title" descr="This is Description!" />

      <Layout title="Layout 1" descr="Layout1 description" urlBg={PokemonBg} />
      <Layout title="Layout 2" descr="Layout2 description" colorBg="#FF8080" />
      <Layout
        title="Layout 3"
        descr="Layout3 description"
        urlBg={LandscapeBg}
      />

      <Footer />
    </>
  );
}

export default App;
