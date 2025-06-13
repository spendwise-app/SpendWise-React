import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./component/ProtectedRoute";
import GuestRoute from "./component/GuestRoute";
import NetworkStatus from "./component/NetworkStatus/NetworkStatus";
import LoadingScreen from "./component/LoadingScreen/LoadingScreen";


const DashBoard = lazy(()=> import("./pages/DashBoard/DashBoard"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword/ForgotPassword"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const History = lazy(() => import("./pages/History/History"));
const BorrowLend = lazy(() => import("./pages/BorrowLend/BorrowLend"));
const Friends = lazy(() => import("./pages/Friends/Friends"));
const SharedExpenses = lazy(() => import("./pages/SharedExpense/SharedExpense"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage/AnalyticsPage"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrowlend"
            element={
              <ProtectedRoute>
                <BorrowLend />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shared"
            element={
              <ProtectedRoute>
                <SharedExpenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <ToastContainer autoClose={1500} />
      <NetworkStatus />
    </>
  );
};

export default App;
