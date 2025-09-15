import {
  Box,
  ButtonBase,
  Popover,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  archivedIcon,
  calenderIcon,
  favoriteIcon,
  folderIcon,
  noteOptionIcon,
  trashIcon,
} from "../../assets";
import { styled, useTheme, type Theme } from "@mui/material/styles";
import { StyledIconButton } from "../../uiComponents/StyledIconButton";
import { useParams } from "react-router-dom";
import { useGetNoteById, usePatchNote } from "../../hooks/api.hooks";
import { useEffect, useState, type ChangeEvent } from "react";
import { StyledDivider } from "../../uiComponents/StyledDivider";
import { useDebounceCallback } from "../../hooks/Debounce";

export const ActiveNote = () => {
  const theme = useTheme();
  const { noteid } = useParams<{ noteid: string }>();
  const [noteContent, setNoteContent] = useState<string>("");
  const [noteHeader, setNoteHeader] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNoteOptions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { isLoading: noteLoading, data: note } = useGetNoteById(noteid);
  const { mutate: patchNote } = usePatchNote(noteid);
  const debouncePatchNoteContent = useDebounceCallback(
    (value: string) => patchNote({ content: value }),
    2000
  );

  const debouncePatchNotetitle = useDebounceCallback(
    (value: string) => patchNote({ name: value }),
    2000
  );

  useEffect(() => {
    setNoteContent(note?.note.content);
    setNoteHeader(note?.note.title);
  }, [note]);

  const handleNoteContentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNoteContent(e.target.value);
    debouncePatchNoteContent(e.target.value);
  };

  const handleHeaderChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNoteHeader(e.target.value);
    debouncePatchNotetitle(e.target.value);
  };

  return (
    <Stack
      flex="1"
      height="100vh"
      bgcolor={theme.palette.primary.dark}
      padding={theme.spacing(6.2)}
      spacing={theme.spacing(3.6)}
      overflow="auto"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {noteLoading ? (
          <Skeleton variant="text" width={1500} height={theme.spacing(5)} />
        ) : (
          <TextField
            variant="standard"
            value={noteHeader}
            onChange={(e) => handleHeaderChange(e)}
            InputProps={{
              disableUnderline: true,
            }}
            inputProps={{
              style: { ...theme.typography.h1 },
            }}
            fullWidth
          />
        )}

        <Stack position="relative">
          <StyledIconButton onClick={handleNoteOptions}>
            <Box
              component="img"
              width={theme.spacing(2.5)}
              height={theme.spacing(2.5)}
              src={noteOptionIcon}
            />
          </StyledIconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                borderRadius: theme.spacing(1.5),
                p: theme.spacing(2),
                mt: theme.spacing(1),
              },
            }}
          >
            <Stack spacing={theme.spacing(1)} width={theme.spacing(24)}>
              <StyledStack onClick={handleClose}>
                <Box
                  component="img"
                  width={theme.spacing(2.5)}
                  height={theme.spacing(2.5)}
                  src={favoriteIcon}
                />
                <Typography variant="h4">Add to favorites</Typography>
              </StyledStack>
              <StyledStack onClick={handleClose}>
                <Box
                  component="img"
                  width={theme.spacing(2.5)}
                  height={theme.spacing(2.5)}
                  src={archivedIcon}
                />
                <Typography variant="h4">Archived</Typography>
              </StyledStack>
              <StyledStack onClick={handleClose}>
                <Box
                  component="img"
                  width={theme.spacing(2.5)}
                  height={theme.spacing(2.5)}
                  src={trashIcon}
                />
                <Typography variant="h4">Delete</Typography>
              </StyledStack>
            </Stack>
          </Popover>
        </Stack>
      </Stack>

      <Stack spacing={theme.spacing(2)}>
        <Stack direction="row" spacing={theme.spacing(2)} alignItems="center">
          <Box
            component="img"
            src={calenderIcon}
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
          ></Box>
          {noteLoading ? (
            <Skeleton variant="text" width="15%" />
          ) : (
            <Typography variant="h4" color={theme.palette.text.secondary}>
              {note?.note.formatted_date}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={theme.spacing(2)} alignItems="center">
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={folderIcon}
          ></Box>
          {noteLoading ? (
            <Skeleton variant="text" width="15%" />
          ) : (
            <Typography variant="h5" color={theme.palette.text.secondary}>
              {note?.note.folder.name}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack
        spacing={theme.spacing(1.5)}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <StyledDivider />
        {noteLoading ? (
          <Stack spacing={0.5}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="95%" />
            <Skeleton variant="text" width="80%" />
          </Stack>
        ) : (
          <TextField
            multiline
            fullWidth
            variant="outlined"
            value={noteContent}
            onChange={(e) => handleNoteContentChange(e)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />
        )}
      </Stack>
    </Stack>
  );
};

const StyledStack = styled(ButtonBase)<{ theme?: Theme }>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  padding: theme.spacing(1.2),
  borderRadius: theme.spacing(1.5),
  transition: "all 0.3s ease",
  backgroundColor: "transparent",
  gap: theme.spacing(2),

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    transform: "scale(1.02)",
  },

  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },
}));
