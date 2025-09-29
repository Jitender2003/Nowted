import { Stack } from "@mui/material";
import { Folder } from "../components/folder/Folder";
import { Note } from "../components/note/Note";
import { Sidebar } from "../components/sidebar/Sidebar";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Login } from "../components/login-signup/Login";
import { Signup } from "../components/login-signup/Signup";

// Layout components
const AppLayout = () => (
  <Stack direction="row" margin="0px" padding="0px">
    <Sidebar />
    <Outlet />
  </Stack>
);

const FolderAndNote = () => (
  <Stack direction="row" margin="0px" padding="0px" flex={1}>
    <Folder />
    <Note />
  </Stack>
);

// ProtectedRoute wrapper
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/Nowted/login" replace />;
  return <Outlet />;
};

// Main Layout
export const Layout = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/Nowted/login" element={<Login />} />
          <Route path="/Nowted/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/Nowted" element={<AppLayout />}>
              {/* Folders */}
              <Route path="folders/:folderid" element={<FolderAndNote />}>
                <Route path="notes/:noteid" element={<FolderAndNote />} />
              </Route>

              {/* Favorite / Trash / Archived */}
              <Route path="favorite" element={<FolderAndNote />}>
                <Route path="notes/:noteid" element={<FolderAndNote />} />
              </Route>
              <Route path="trash" element={<FolderAndNote />}>
                <Route path="notes/:noteid" element={<FolderAndNote />} />
              </Route>
              <Route path="archived" element={<FolderAndNote />}>
                <Route path="notes/:noteid" element={<FolderAndNote />} />
              </Route>
            </Route>
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/Nowted/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
