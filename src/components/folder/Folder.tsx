import styled from "@emotion/styled";
import {
  Box,
  Skeleton,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import { BackgroundBeams } from "../ui/background-beams";

import { useGetNote, type GetNotesParams } from "../../hooks/api.hooks";
import { useNavigate, useParams } from "react-router-dom";

import { NoteListSkeleton } from "../../loader/NoteListSkeleton";

export const Folder = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { folderid, noteid } = useParams<{
    folderid: string;
    noteid: string;
  }>();
  const params: GetNotesParams = {};
  let isMoreOptRoute = false;
  let folderTitle = "";

  if (folderid) {
    params.folderid = folderid;
    params.archived = false;
    params.deleted = false;
  } else if (location.pathname.includes("favorite")) {
    isMoreOptRoute = true;
    folderTitle = "Favorite";
    params.favorite = true;
  } else if (location.pathname.includes("archived")) {
    isMoreOptRoute = true;
    folderTitle = "Archived";
    params.archived = true;
  } else if (location.pathname.includes("trash")) {
    isMoreOptRoute = true;
    folderTitle = "Trash";
    params.deleted = true;
  }

  const { isLoading: noteListLoading, data: noteList } = useGetNote(params);

  return (
    <Stack
      width="25vw"
      bgcolor={theme.palette.secondary.light}
      paddingX={theme.spacing(2.5)}
      paddingY={theme.spacing(3.6)}
      spacing={theme.spacing(3.6)}
      position="relative"
      height="100vh"
      overflow="auto"
    >
      {noteListLoading ? (
        <Skeleton variant="text" width="45%" height={theme.spacing(4.5)} />
      ) : (
        <Typography variant="h2">
          {isMoreOptRoute
            ? folderTitle
            : noteList?.[0]?.folder_name || "Create a note to view"}
        </Typography>
      )}

      {noteListLoading ? (
        <NoteListSkeleton />
      ) : (
        <Stack
          spacing={theme.spacing(3.6)}
          zIndex={1}
          sx={{
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {noteList &&
            noteList.map((note) => {
              return (
                <StyledStack
                  spacing={theme.spacing(1.5)}
                  key={note.id}
                  onClick={() => navigate(`notes/${note.id}`)}
                  sx={{
                    cursor: "pointer",
                    bgcolor:
                      note.id === noteid
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                  }}
                >
                  <Typography variant="h3">{note.name}</Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="h4"
                      color={theme.palette.text.secondary}
                    >
                      {note.formatted_date}
                    </Typography>
                    <Typography
                      variant="h4"
                      color={theme.palette.text.secondary}
                    >
                      {note.preview_content}
                    </Typography>
                  </Stack>
                </StyledStack>
              );
            })}
        </Stack>
      )}

      {theme.palette.customTheme === "midnight" && (
        <Box
          position="absolute"
          top={-30}
          left={0}
          right={0}
          bottom={0}
          sx={{
            padding: 0,
            margin: 0,
          }}
          zIndex={0}
          height="100%"
        >
          <BackgroundBeams />
        </Box>
      )}
    </Stack>
  );
};

const StyledStack = styled(Stack)<{ theme?: Theme; disableHover?: boolean }>(
  ({ theme, disableHover }) => ({
    padding: theme.spacing(2.5),
    borderRadius: theme.spacing(1),
    ...(disableHover
      ? {}
      : {
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            cursor: "pointer",
          },
        }),
  })
);
