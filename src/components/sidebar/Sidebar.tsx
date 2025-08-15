import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";
import { addIcon, logo, searchIcon } from "../../assets";
import { Recents } from "./Recents";
import { Folders } from "./Folders";
import { More } from "./More";
import styled from "@emotion/styled";
import type { Theme } from "@mui/material/styles";
import { useThemeStore } from "../../stores/themeStore/ThemeStore";
import { StyledIconButton } from "../../uiComponents/StyledIconButton";
import { useState } from "react";

export const Sidebar = () => {
  const theme = useTheme();

  const [isSearch, setIsSearch] = useState(false);

  const appTheme = useThemeStore((state) => state.theme);
  const updateThemeChange = useThemeStore((state) => state.setTheme);

  const handleAppThemeChange = (e: SelectChangeEvent) => {
    updateThemeChange(e.target.value);
    localStorage.setItem("appTheme", e.target.value);
  };

  const handleSearch = () => {
    setIsSearch((prev) => !prev);
  };

  return (
    <Stack
      width="20vw"
      gap={theme.spacing(3.6)}
      height="100vh"
      paddingX={theme.spacing(2.5)}
      paddingY={theme.spacing(3.6)}
      bgcolor={theme.palette.primary.dark}
    >
      {/* logo section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box component="img" src={logo}></Box>
        <StyledIconButton onClick={handleSearch}>
          <Box
            component="img"
            src={isSearch ? addIcon : searchIcon}
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            sx={{
              transition: "transform 0.8s ease, opacity 0.3s ease",
              transform: isSearch
                ? "rotate(180deg) scale(1.1)"
                : "rotate(0deg) scale(1)",
              opacity: isSearch ? 0.9 : 1,
            }}
          />
        </StyledIconButton>
      </Stack>

      <Stack spacing={theme.spacing(1.5)}>
        {isSearch ? (
          <StyledSearch placeholder="Search" />
        ) : (
          <StyledFilledButton
            startIcon={
              <Box
                component="img"
                src={addIcon}
                width={theme.spacing(2.5)}
                height={theme.spacing(2.5)}
              />
            }
          >
            <Typography variant="h6">New Note</Typography>
          </StyledFilledButton>
        )}

        {/* change theme */}
        <StyledSelect
          displayEmpty
          value={appTheme}
          onChange={handleAppThemeChange}
          MenuProps={{
            disableAutoFocusItem: true,
            PaperProps: {
              sx: {
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                borderRadius: theme.spacing(1.5),
                overflow: "hidden",
              },
            },
            MenuListProps: {
              sx: {
                padding: theme.spacing(1),
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(0.5),
              },
            },
          }}
        >
          {["Default", "Midnight", "Forest", "Coffee"].map((themeName) => (
            <MenuItem
              key={themeName}
              value={themeName.toLowerCase()}
              sx={{
                padding: theme.spacing(1.2),
                borderRadius: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",

                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  transform: "scale(1.02)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                },
                "&.Mui-focusVisible": {
                  backgroundColor: "none",
                  outline: "none",
                },
              }}
            >
              <Typography variant="h4">{themeName}</Typography>
            </MenuItem>
          ))}
        </StyledSelect>
      </Stack>
      <Recents />
      <Folders />
      <More />
    </Stack>
  );
};

const StyledSelect = styled(Select<string>)<{ theme?: Theme }>(({ theme }) => ({
  height: theme.spacing(5.5),
  borderRadius: theme.spacing(1),
  fontWeight: 600,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.light,
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "16px",
    letterSpacing: 0,
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.2),
  },
  "& svg": {
    color: theme.palette.primary.light,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },

  "& .MuiMenu-paper": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.spacing(1),
    boxShadow: `0 4px 20px ${theme.palette.primary.main}22`,
    padding: theme.spacing(1),
  },
}));

const StyledSearch = styled(TextField)<{ theme?: Theme }>(({ theme }) => ({
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
}));

const StyledFilledButton = styled(Button)<{ theme?: Theme }>(({ theme }) => ({
  height: theme.spacing(5),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  textTransform: "none",
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));
