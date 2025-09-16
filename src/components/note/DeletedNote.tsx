import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { restoreIcon } from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
import { useRestoreNote } from "../../hooks/api.hooks";

export const DeletedNote = () => {
  const theme = useTheme();
  const { noteid } = useParams<{ noteid: string }>();
  const { mutate: restoreNote } = useRestoreNote();
  const navigate = useNavigate();

  const handleNoteRestore = () => {
    if (!location.pathname.includes("notes")) return;
    restoreNote(
      { id: noteid },
      {
        onSuccess: (data) => {
          navigate(
            `/Nowted/folders/${data.note.folder_id}/notes/${data.note.id}`
          );
        },
      }
    );
  };
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
      <Box component="img" src={restoreIcon} />
      <Typography variant="h1">Restore note to view</Typography>
      <Typography
        variant="body1"
        maxWidth="70%"
        textAlign="center"
        color={theme.palette.text.secondary}
      >
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: theme.spacing(12),
          bgcolor: theme.palette.secondary.main,
          "&.Mui-disabled": {
            bgcolor: theme.palette.secondary.dark,
            opacity: 0.5,
            color: theme.palette.common.white,
          },
        }}
        onClick={handleNoteRestore}
        disabled={!location.pathname.includes("notes")}
      >
        Restore
      </Button>
    </Stack>
  );
};
