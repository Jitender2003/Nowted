import { Box, Stack, Typography, useTheme } from "@mui/material";
import { folderIcon } from "../../assets";

export const EmptyFolder = () => {
  const theme = useTheme();
  return (
    <Stack
      width="25vw"
      bgcolor={theme.palette.secondary.light}
      paddingX={theme.spacing(2.5)}
      paddingY={theme.spacing(3.6)}
      spacing={theme.spacing(0.6)}
      position="relative"
      height="100vh"
      overflow="auto"
      direction="row"
      justifyContent="space-between"
      //   alignItems="center"
    >
      <Box
        component="img"
        src={folderIcon}
        width={theme.spacing(2.5)}
        height={theme.spacing(2.5)}
      />
      <Typography variant="body1" color={theme.palette.text.secondary}>
        Select or create a folder to view
      </Typography>
    </Stack>
  );
};
