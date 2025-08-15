import styled from "@emotion/styled";
import { Stack, type Theme } from "@mui/material";

export const StyledStack = styled(Stack)<{ theme?: Theme }>(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  alignItems: "center",

  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    cursor: "pointer",
  },
}));
