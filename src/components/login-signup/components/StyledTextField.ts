import { TextField, type Theme, styled } from "@mui/material";

export const StyledInput = styled(TextField)<{ theme?: Theme }>(
  ({ theme }) => ({
    height: theme.spacing(5),

    "& .MuiOutlinedInput-root": {
      height: "100%",
      borderRadius: theme.spacing(1),
      paddingRight: theme.spacing(1),

      "& fieldset": {
        borderColor: theme.palette.primary.light,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },

    "& input": {
      fontWeight: 400,
      fontSize: theme.spacing(2),
      letterSpacing: 0,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
    },
    "& .MuiFormHelperText-root": {
      fontSize: theme.spacing(1.5),
      color: theme.palette.error.main,
      marginLeft: 1,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontSize: theme.spacing(1.75),
      fontWeight: 400,
      top: "50%",
      transform: "translate(14px, -50%) scale(1)",
      pointerEvents: "none",
      transition: "all 0.2s ease",
    },
    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
      top: 0,
      transform: "translate(14px, -8px) scale(0.75)",
      color: theme.palette.text.secondary,
      fontWeight: 400,
    },
  })
);
