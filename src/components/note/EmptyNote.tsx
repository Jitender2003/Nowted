import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { EmptyNoteIcon } from "../../assets";

export const EmptyNote = () => {
  const theme = useTheme();
  return (
    <Stack
      flex="1"
      height="100vh"
      bgcolor={theme.palette.primary.dark}
      padding={theme.spacing(6.2)}
      spacing={theme.spacing(1.5)}
      overflow="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box component="img" src={EmptyNoteIcon} />
      <Typography variant="h1">Select a note to view</Typography>
      <Typography
        variant="body1"
        maxWidth="70%"
        textAlign="center"
        color={theme.palette.text.secondary}
      >
        Choose a note from the list on the left to view its contents, or create
        a new note to add to your collection.
      </Typography>
    </Stack>
  );
};
