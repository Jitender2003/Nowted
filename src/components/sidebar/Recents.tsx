import { Box, Stack, Typography, useTheme, type Theme } from "@mui/material";
import { file } from "../../assets";
import styled from "@emotion/styled";
import { useGetRecentNotes } from "../../hooks/api.hooks";
import { NoteSkeleton } from "../../loader/Skeletonnote&folderloader";

export const Recents = () => {
  const theme = useTheme();
  const { isLoading: recentnotesLoading, data: recentnotes } =
    useGetRecentNotes();

  return (
    <Stack spacing={theme.spacing(1)} width="100%">
      <Typography variant="h5" color={theme.palette.text.secondary}>
        Recents
      </Typography>
      <Stack
        maxHeight={theme.spacing(20)}
       
        spacing={theme.spacing(0.6)}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {recentnotesLoading ? (
          <NoteSkeleton />
        ) : (
          recentnotes?.recentNotes.map((note) => {
            return (
              <StyledStack
                direction="row"
                spacing={theme.spacing(2)}
                key={note.note.id}
              >
                <Box
                  component="img"
                  width={theme.spacing(2.5)}
                  height={theme.spacing(2.5)}
                  src={file}
                ></Box>
                <Typography variant="h6" color={theme.palette.text.secondary}>
                  {note.note.name}
                </Typography>
              </StyledStack>
            );
          })
        )}
      </Stack>
    </Stack>
  );
};

const StyledStack = styled(Stack)<{ theme?: Theme }>(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  alignItems: "center",

  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));
