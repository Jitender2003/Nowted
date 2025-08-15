import styled from "@emotion/styled";
import { Box, Stack, Typography, useTheme, type Theme } from "@mui/material";
import { BackgroundBeams } from "../ui/background-beams";

export const Folder = () => {
  const theme = useTheme();

  return (
    <Stack
      width="25vw"
      height="100%"
      bgcolor={theme.palette.secondary.light}
      paddingX={theme.spacing(2.5)}
      paddingY={theme.spacing(3.6)}
      spacing={theme.spacing(3.6)}
      position="relative"
    >
      <Typography variant="h2">Personal</Typography>
      <Stack spacing={theme.spacing(3.6)} zIndex={1}>
        <StyledStack spacing={theme.spacing(1.5)}>
          <Typography variant="h3">My Goals for the Next Year</Typography>
          <Stack direction="row" spacing={theme.spacing(1.2)}>
            <Typography variant="h4" color={theme.palette.text.secondary}>
              21/06/2022{" "}
            </Typography>
            <Typography variant="h4" color={theme.palette.text.secondary}>
              It's hard to believe that ...
            </Typography>
          </Stack>
        </StyledStack>
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
