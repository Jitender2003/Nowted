import styled from "@emotion/styled";
import { Box, Stack, Typography, useTheme, type Theme } from "@mui/material";
import { BackgroundBeams } from "../ui/background-beams";
// import { useNavigate } from "react-router-dom";
import { useGetNote } from "../../hooks/api.hooks";
import { useNavigate, useParams } from "react-router-dom";

export const Folder = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { folderid } = useParams<{ folderid: string }>();

  const { data: noteList } = useGetNote({ folderid: folderid });

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
      <Typography variant="h2">Personal</Typography>
      <Stack spacing={theme.spacing(3.6)} zIndex={1}>
        {noteList &&
          noteList.map((note) => {
            return (
              <StyledStack
                spacing={theme.spacing(1.5)}
                key={note.id}
                onClick={() => navigate(`folders/${folderid}/notes/${note.id}`)}
              >
                <Typography variant="h3">{note.name}</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h4" color={theme.palette.text.secondary}>
                    {note.formatted_date}
                  </Typography>
                  <Typography variant="h4" color={theme.palette.text.secondary}>
                    {note.preview_content}
                  </Typography>
                </Stack>
              </StyledStack>
            );
          })}
      </Stack>
      {theme.palette.customTheme === "midnight" && (
        <Box
          position="absolute"
          // bgcolor="tomato"
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

const StyledStack = styled(Stack)<{ theme?: Theme }>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(1),

  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));
