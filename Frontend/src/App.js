import Details from './components/Details';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="details" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
