import { BrowserRouter, Route, Routes } from "react-router-dom";
import Predict from "./Predict";
import Explore from "./Explore";
import OffCanvasMenu from "./OffCanvasMenu";

const App = () => {

  return (
    <BrowserRouter>
    <OffCanvasMenu />
    <Routes>
      <Route path='/' element={<Predict />} />
      <Route path='/explore' element={<Explore />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
