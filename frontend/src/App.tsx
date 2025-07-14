import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainLayout from "./components/Layout/MainLayout";
import DashboardPage from "./pages/dashboard";
import UsersTable from "./components/Users/UsersTable";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NotFound from "./pages/NotFound";
import KeycloakAuth from "./components/Auth/KeycloakAuth";

const App = () => (
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/keycloak-auth" element={<KeycloakAuth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

export default App;
