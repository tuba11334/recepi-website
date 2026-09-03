import Header from "./components/Header";
import Recipes from "./pages/Recipes";
import "./styles.css";

function App() {
  return (
    <>
      <Header />

      <main>
        <section className="page active">
          <Recipes />
        </section>
      </main>
    </>
  );
}

export default App;

 