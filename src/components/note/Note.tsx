import { Box, ButtonBase, Popover, Stack, Typography } from "@mui/material";
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
import { useState } from "react";
import { StyledDivider } from "../../uiComponents/StyledDivider";

export const Note = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNoteOptions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
        <Typography variant="h1">Reflection on the Month of June</Typography>

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
          <Typography variant="h4" color={theme.palette.text.secondary}>
            21/06/2022
          </Typography>
        </Stack>
        <Stack direction="row" spacing={theme.spacing(2)} alignItems="center">
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={folderIcon}
          ></Box>
          <Typography variant="h5" color={theme.palette.text.secondary}>
            Personal
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={theme.spacing(1.5)}>
        <StyledDivider />
        <Typography variant="h4">
          It's hard to believe that June is already over! Looking back on the
          month, there were a few highlights that stand out to me. One of the
          best things that happened was getting promoted at work. I've been
          working really hard and it's great to see that effort recognized. It's
          also exciting to have more responsibility and the opportunity to
        </Typography>
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
