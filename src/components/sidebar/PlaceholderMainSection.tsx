import { Stack, Typography, useTheme } from "@mui/material";
import { FolderOpen } from "@mui/icons-material";

export const PlaceholderMainSection = () => {
  const theme = useTheme();

  return (
    <Stack flex={1} alignItems="center" justifyContent="center" spacing={3}>
      {/* Big folder icon */}
      <FolderOpen sx={{ fontSize: 80, color: theme.palette.text.disabled }} />
      {/* Heading */}
      <Typography
        variant="h4"
        textAlign="center"
        color={theme.palette.text.primary}
      >
        No folders or notes yet
      </Typography>
      {/* Subtext */}
      <Typography
        variant="body1"
        textAlign="center"
        color={theme.palette.text.secondary}
        sx={{ maxWidth: 400 }}
      >
        Start by creating your first folder. Organize your thoughts and keep
        everything in one place!
      </Typography>

      {/* <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FolderOpen />}
          onClick={() => alert("Create Folder clicked")} // replace with real handler
        >
          Create Folder
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<NoteAdd />}
          onClick={() => alert("Create Note clicked")} // replace with real handler
        >
          Create Note
        </Button>
      </Stack> */}
    </Stack>
  );
};
