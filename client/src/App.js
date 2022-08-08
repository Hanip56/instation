import { useSelector } from "react-redux";
import MainContainer from "./pages/MainContainer";
import StarterContainer from "./pages/StarterContainer";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <ScrollToTop />
      {token ? <MainContainer /> : <StarterContainer />}
    </div>
  );
}

export default App;
