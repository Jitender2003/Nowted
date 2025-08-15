import { Box, Stack, Typography, useTheme } from "@mui/material";
import { addFolderIcon, folderIcon } from "../../assets";
import { StyledIconButton } from "../../uiComponents/StyledIconButton";
import { StyledStack } from "../../uiComponents/StyledStack";

export const Folders = () => {
  const theme = useTheme();
  return (
    <Stack
      spacing={theme.spacing(1)}
      width="100%"
      maxHeight={theme.spacing(31)}
      overflow="auto"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" color={theme.palette.text.secondary}>
          Folders
        </Typography>
        <StyledIconButton>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={addFolderIcon}
          />
        </StyledIconButton>
      </Stack>
      <Stack spacing={theme.spacing(0.6)}>
        <StyledStack direction="row" spacing={theme.spacing(2)}>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={folderIcon}
          />
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Slice of life
          </Typography>
        </StyledStack>
        <StyledStack direction="row" spacing={theme.spacing(2)}>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={folderIcon}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Intern
          </Typography>
        </StyledStack>
        <StyledStack direction="row" spacing={theme.spacing(2)}>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={folderIcon}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Personal
          </Typography>
        </StyledStack>
      </Stack>
    </Stack>
  );
};
