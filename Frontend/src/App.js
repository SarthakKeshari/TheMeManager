
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexDetailMedicine from './components/Medicines/IndexDetailMedicine';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="details" element={<IndexDetailMedicine />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
