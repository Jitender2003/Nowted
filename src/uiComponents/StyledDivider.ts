import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";

export const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
  borderBottomWidth: 1,
  borderColor: theme.palette.primary.light,
}));
