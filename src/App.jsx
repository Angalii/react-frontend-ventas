import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/Login";
import PanelVentas from "./components/PanelVentas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/panel"
          element={
            <PanelVentas />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;