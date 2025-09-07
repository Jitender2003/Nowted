import { Stack } from "@mui/material";
import { Folder } from "../components/folder/Folder";
import { Note } from "../components/note/Note";
import { Sidebar } from "../components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Nowted"
          element={
            <Stack height="100vh" width="100vw" direction="row">
              <Sidebar />
              <Folder />
              <Note />
            </Stack>
          }
        >
          <Route
            path="folders/:folderid"
            element={
              <Stack height="100vh" width="100vw" direction="row">
                <Sidebar />
                <Folder />
                <Note />
              </Stack>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
