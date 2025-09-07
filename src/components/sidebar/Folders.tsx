import { Box, Stack, Typography, useTheme } from "@mui/material";
import { addFolderIcon, folderIcon } from "../../assets";
import { StyledIconButton } from "../../uiComponents/StyledIconButton";
import { StyledStack } from "../../uiComponents/StyledStack";
import { useGetFolders } from "../../hooks/api.hooks";
import { useNavigate } from "react-router-dom";

export const Folders = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: folderList } = useGetFolders();
  console.log(folderList);

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
      <Stack
        spacing={theme.spacing(0.6)}
        sx={{
          overflow: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {folderList &&
          folderList.map((folder) => (
            <StyledStack
              direction="row"
              spacing={theme.spacing(2)}
              key={folder.id}
              onClick={() => navigate(`folders/${folder.id}`)}
            >
              <Box
                component="img"
                width={theme.spacing(2.5)}
                height={theme.spacing(2.5)}
                src={folderIcon}
              />
              <Typography variant="h6" color={theme.palette.text.secondary}>
                {folder.name}
              </Typography>
            </StyledStack>
          ))}
      </Stack>
    </Stack>
  );
};
