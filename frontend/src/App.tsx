import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchView from "./weather/view/SearchView.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchView />} />
      </Routes>
    </Router>
  );
}

export default App;
