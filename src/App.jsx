import Footer from "./components/Footer.jsx";
import Gallery from "./components/Gallery.jsx";
import Hero from "./components/Hero.jsx";
import Nav from "./components/Nav.jsx";

const App = () => {
  return (
    <main>
      <div className="h-screen">
        <Nav />
        <Hero />
      </div>
      <h1 className="text-gray-700 font-serif italic font-semibold text-3xl text-center py-5">
        "Check The Project Screenshots!"
      </h1>
      <div id="gallery">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
};

export default App;
