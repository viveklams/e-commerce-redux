import { Route, Routes } from "react-router-dom";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AuthLayout from "./components/auth/layout";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
