import { Stack } from "@mui/material";
import { Folder } from "../components/folder/Folder";
import { Note } from "../components/note/Note";
import { Sidebar } from "../components/sidebar/Sidebar";

export const Layout = () => {
  return (
    <Stack height="100vh" width="100vw" direction="row">
      <Sidebar />
      <Folder />
      <Note />
    </Stack>
  );
};
