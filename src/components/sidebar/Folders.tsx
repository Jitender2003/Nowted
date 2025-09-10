import { Box, Stack, Typography, useTheme } from "@mui/material";
import { addFolderIcon, folderIcon } from "../../assets";
import { StyledIconButton } from "../../uiComponents/StyledIconButton";
import { StyledStack } from "../../uiComponents/StyledStack";
import { useGetFolders } from "../../hooks/api.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { NoteSkeleton } from "../../loader/Skeletonnote&folderloader";

export const Folders = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoading: folderListLoading, data: folderList } = useGetFolders();
  const { folderid } = useParams<{ folderid: string }>();

  return (
    <Stack spacing={theme.spacing(1)} width="100%">
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
        maxHeight={theme.spacing(15)}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {folderListLoading ? (
          <NoteSkeleton />
        ) : (
          folderList?.map((folder) => (
            <StyledStack
              direction="row"
              spacing={theme.spacing(2)}
              key={folder.id}
              onClick={() => navigate(`folders/${folder.id}`)}
              sx={{
                bgcolor:
                  folder.id === folderid
                    ? theme.palette.primary.light
                    : "transparent",
              }}
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
          ))
        )}
      </Stack>
    </Stack>
  );
};
