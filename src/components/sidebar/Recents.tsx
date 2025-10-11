import {
  alpha,
  Box,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import { file } from "../../assets";
import styled from "@emotion/styled";
import { useGetRecentNotes } from "../../hooks/api.hooks";
import { NoteSkeleton } from "../../loader/Skeletonnote&folderloader";
import { useNavigate, useParams } from "react-router-dom";

export const Recents = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { noteid } = useParams<{ noteid: string }>();
  const { isLoading: recentnotesLoading, data: recentnotes } =
    useGetRecentNotes();

  return (
    <Stack spacing={theme.spacing(1)} width="100%" height={"100%"}>
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
        ) : recentnotes?.recentNotes.length === 0 ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            height={theme.spacing(10)}
            spacing={theme.spacing(0.5)}
          >
            <Typography
              variant="body1"
              color={alpha(theme.palette.text.secondary, 0.5)}
              textAlign="center"
            >
              Start editing notes to see them here
            </Typography>
          </Stack>
        ) : (
          recentnotes?.recentNotes.map((note) => (
            <StyledStack
              direction="row"
              spacing={theme.spacing(2)}
              key={note.note.id}
              onClick={() =>
                navigate(`folders/${note.note.folder.id}/notes/${note.note.id}`)
              }
              sx={{
                bgcolor:
                  note.note.id === noteid
                    ? theme.palette.secondary.main
                    : "transparent",
              }}
            >
              <Box
                component="img"
                width={theme.spacing(2.5)}
                height={theme.spacing(2.5)}
                src={file}
              />
              <Typography variant="h6" color={theme.palette.text.secondary}>
                {note.note.name}
              </Typography>
            </StyledStack>
          ))
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
