import styled from "@emotion/styled";
import { IconButton, type Theme } from "@mui/material";

export const StyledIconButton = styled(IconButton)<{ theme?: Theme }>(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));
