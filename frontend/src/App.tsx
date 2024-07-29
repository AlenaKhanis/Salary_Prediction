import { BrowserRouter, Route, Routes } from "react-router-dom";
import Predict from "./Predict";
import DataChart from "./Explore";
import OffCanvasMenu from "./OffCanvasMenu";

const App = () => {

  return (
    <BrowserRouter>
    <OffCanvasMenu />
    <Routes>
      <Route path='/' element={<Predict />} />
      <Route path='/explore' element={<DataChart />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
