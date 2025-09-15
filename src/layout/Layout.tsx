import { Stack } from "@mui/material";
import { Folder } from "../components/folder/Folder";
import { Note } from "../components/note/Note";
import { Sidebar } from "../components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Stack direction="row" margin="0px" padding="0px">
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

const FolderAndNote = () => {
  return (
    <Stack direction="row" margin="0px" padding="0px" flex={1}>
      <Folder />
      <Note />
    </Stack>
  );
};

export const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};
