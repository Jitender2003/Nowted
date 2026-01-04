import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { alpha } from "@mui/material/styles";
import { addIcon, logo, searchIcon } from "../../assets";
import { Recents } from "./Recents";
import { Folders } from "./Folders";
import { More } from "./More";
import styled from "@emotion/styled";
import type { Theme } from "@mui/material/styles";
import { useThemeStore } from "../../stores/themeStore/ThemeStore";
import { StyledIconButton } from "../../uiComponents/StyledIconButton";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateNewNote, useGetNote } from "../../hooks/api.hooks";

export const Sidebar = () => {
  const theme = useTheme();

  const [isSearch, setIsSearch] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { folderid } = useParams<{ folderid: string }>();
  const [searchText, setSearchText] = useState<string>("");
  const { noteid } = useParams<{ noteid: string }>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const appTheme = useThemeStore((state) => state.theme);
  const updateThemeChange = useThemeStore((state) => state.setTheme);

  const { data: noteData, refetch } = useGetNote({
    searchstring: searchText,
    archived: false,
    deleted: false,
    enabled: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText) refetch();
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText, refetch]);

  const { mutate: createNote } = useCreateNewNote();
  const navigate = useNavigate();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    // Add your edit profile logic here
    console.log("Edit profile clicked");
    handleProfileClose();
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    handleProfileClose();
  };

  const handleAppThemeChange = (e: SelectChangeEvent) => {
    updateThemeChange(e.target.value);
    localStorage.setItem("appTheme", e.target.value);
  };

  const handleSearch = () => {
    setIsSearch((prev) => !prev);
  };

  const handleCreateNewNote = () => {
    if (!folderid) return;
    createNote(
      {
        folderid,
        name: "Title ...",
        content: "Edit your note content ...",
      },
      {
        onSuccess: (data) => {
          navigate(`folders/${folderid}/notes/${data.noteId}`);
        },
      }
    );
  };

  const handleSearchNote = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchText(e.target.value);
  };

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchText && noteData && noteData.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [noteData, searchText]);

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  return (
    <Stack
      width="20vw"
      gap={theme.spacing(3.6)}
      height="100vh"
      paddingX={theme.spacing(2.5)}
      paddingY={theme.spacing(3.6)}
      bgcolor={theme.palette.primary.dark}
      overflow="auto"
    >
      {/* logo section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack spacing={1} direction="row">
          <Box
            component={StyledIconButton}
            onClick={handleProfileClick}
            aria-describedby={id}
            sx={{
              p: 0,
              bgcolor: "transparent",
              borderRadius: "50%",
              minWidth: 0,
            }}
          >
            <AccountCircleIcon
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.6),
                color: theme.palette.text.primary,
                borderRadius: "50%",
                height: theme.spacing(3.5),
                width: theme.spacing(3.5),
                border: `${theme.spacing(0.1)} solid ${
                  theme.palette.secondary.main
                }`,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.3),
                  opacity: 0.9,
                },
              }}
            />
          </Box>

          <Box component="img" src={logo} height={theme.spacing(3.5)}></Box>
        </Stack>
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

      {/* Profile Menu Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: theme.spacing(1.5),
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            marginTop: theme.spacing(1),
            minWidth: theme.spacing(20),
          },
        }}
      >
        <List
          sx={{
            padding: theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(0.5),
          }}
        >
          <ListItem
            disablePadding
            sx={{
              borderRadius: theme.spacing(1),
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                transform: "scale(1.02)",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "none",
                outline: "none",
              },
            }}
          >
            <ListItemButton
              onClick={handleEditProfile}
              sx={{
                padding: theme.spacing(1.2),
                borderRadius: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",
              }}
            >
              <EditIcon
                sx={{
                  marginRight: theme.spacing(1.5),
                  fontSize: theme.spacing(2.5),
                  color: theme.palette.text.secondary,
                }}
              />
              <ListItemText
                primary={
                  <Typography variant="h4" color={theme.palette.text.primary}>
                    Edit Profile
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              borderRadius: theme.spacing(1),
              transition: "all 0.3s ease",

              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                transform: "scale(1.02)",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "none",
                outline: "none",
              },
            }}
          >
            <ListItemButton
              onClick={handleLogout}
              sx={{
                padding: theme.spacing(1.2),
                borderRadius: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",
              }}
            >
              <LogoutIcon
                sx={{
                  marginRight: theme.spacing(1.5),
                  fontSize: theme.spacing(2.5),
                  color: theme.palette.text.secondary,
                }}
              />
              <ListItemText
                primary={
                  <Typography variant="h4" color={theme.palette.text.primary}>
                    Log Out
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      <Stack spacing={theme.spacing(1.5)} position="relative">
        {isSearch ? (
          <Stack
            spacing={theme.spacing(1.5)}
            position="relative"
            ref={searchRef}
          >
            <StyledSearch
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                handleSearchNote(e);
              }}
            />
            {showResults && noteData && noteData.length > 0 && (
              <StyledNoteResult>
                <List>
                  {noteData.map((note) => (
                    <ListItem
                      key={note.id}
                      disablePadding
                      sx={{
                        borderRadius: theme.spacing(1),
                        fontWeight: 500,
                        padding: 0,
                        paddingY: 0,
                        paddingX: 0,
                        color: theme.palette.text.primary,
                        transition: "all 0.3s ease",
                        backgroundColor:
                          note.id === noteid
                            ? "rgba(255, 255, 255, 0.12)"
                            : "transparent",

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
                        "&:not(:last-child)": {
                          marginBottom: theme.spacing(1),
                        },
                        ".MuiButtonBase-root": {
                          paddingX: theme.spacing(1),
                          paddingY: theme.spacing(0.5),
                        },
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          navigate(
                            `folders/${note.folder_id}/notes/${note.id}`
                          );
                        }}
                      >
                        <ListItemText primary={note.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </StyledNoteResult>
            )}
          </Stack>
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
            onClick={handleCreateNewNote}
            disabled={
              location.pathname.includes("trash") ||
              location.pathname.includes("archived") ||
              location.pathname.includes("favorite") ||
              !folderid
            }
            sx={{
              "&.Mui-disabled": {
                bgcolor: theme.palette.primary.main,
                opacity: 0.5,
                color: theme.palette.common.white,
              },
            }}
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

const StyledNoteResult = styled(Paper)<{ theme?: Theme }>(({ theme }) => ({
  position: "absolute",
  maxHeight: theme.spacing(27),
  overflowY: "auto",
  top: theme.spacing(4),
  left: 0,
  right: 0,
  backgroundColor: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: theme.spacing(1.5),
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  overflow: "auto",
  zIndex: 1200,
  scrollbarWidth: "none",
  padding: theme.spacing(1),
}));
