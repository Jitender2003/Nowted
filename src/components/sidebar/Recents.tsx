import { Box, Stack, Typography, useTheme, type Theme } from "@mui/material";
import { file } from "../../assets";
import styled from "@emotion/styled";

export const Recents = () => {
  const theme = useTheme();
  return (
    <Stack spacing={theme.spacing(1)} width="100%">
      <Typography variant="h5" color={theme.palette.text.secondary}>
        Recents
      </Typography>
      <Stack spacing={theme.spacing(0.6)}>
        <StyledStack direction="row" spacing={theme.spacing(2)}>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={file}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Day in a life
          </Typography>
        </StyledStack>

        <StyledStack direction="row" spacing={theme.spacing(2)}>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={file}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Day in a life
          </Typography>
        </StyledStack>
        <StyledStack direction="row" spacing={theme.spacing(2)}>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={file}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Day in a life
          </Typography>
        </StyledStack>
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
