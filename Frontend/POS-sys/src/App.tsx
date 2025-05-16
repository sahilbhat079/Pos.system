import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Home, Orders,Table, Menu, Dashboard,Auth } from "./pages";
import Header from "./components/Shared/Header";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useloaddata";
import FullScreenLoader from "./components/Shared/FullScreenLoader";
import { RootState } from "./store/store";
import { ReactNode } from "react";
import NotFound from "./components/Shared/NotFound";

function Layout() {
  const isLoading = useLoadData();
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];
  const { isAuth } = useSelector((state: RootState) => state.userReducer);

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/auth"
          element={isAuth ? <Navigate to="/" /> : <Auth />}
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/table"
          element={
            <ProtectedRoutes>
              <Table />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { isAuth } = useSelector((state: RootState) => state.userReducer);

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
