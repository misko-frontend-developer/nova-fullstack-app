import { Route, Routes } from "react-router";
import { Registration } from "./pages/Registration";
import { Home } from "./pages/Home";
import PageGuard from "./components/PageGuard";
function App() {
  const AuthComponent = PageGuard(Home);
  return (
    <Routes>
      <Route path='/registration' element={<Registration />} />
      <Route path='/home' element={<AuthComponent />} />
      <Route path='*' element={<Registration />} />
    </Routes>
  );
}

export default App;
