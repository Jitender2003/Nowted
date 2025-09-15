import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import { addFolderIcon, folderIcon } from "../../assets";
import { StyledIconButton } from "../../uiComponents/StyledIconButton";
import { StyledStack } from "../../uiComponents/StyledStack";
import {
  useCreateNewFolder,
  useGetFolders,
  usePatchFolder,
} from "../../hooks/api.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { NoteSkeleton } from "../../loader/Skeletonnote&folderloader";
import { useEffect, useState, type ChangeEvent } from "react";

export const Folders = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoading: folderListLoading, data: folderList } = useGetFolders();
  const { folderid } = useParams<{ folderid: string }>();

  const [isCreatNewFolder, setIsCreateNewFolder] = useState<boolean>(false);
  const [foldertitle, setFolderTitle] = useState<string>("");
  const [editFolderId, setEditFolderId] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");

  const { mutate: createNewFolder } = useCreateNewFolder();
  const { mutate: updateFolder } = usePatchFolder();

  const isFavoriteRoute = location.pathname.includes("/favorite");
  const isTrashRoute = location.pathname.includes("/trash");
  const isArchivedRoute = location.pathname.includes("/archived");

  const handleCreateNewFolder = () => {
    setIsCreateNewFolder(!isCreatNewFolder);
  };

  const handleFoldertitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFolderTitle(e.target.value);
  };

  const handleSaveNewFolder = () => {
    createNewFolder(
      { name: foldertitle },
      {
        onSuccess: (data) => {
          navigate(`folders/${data.folder.id}`);
          handleCreateNewFolder();
        },
      }
    );
  };

  useEffect(() => {
    if (isArchivedRoute || isFavoriteRoute || isTrashRoute) return;
    if (
      !folderListLoading &&
      folderList &&
      folderList.length > 0 &&
      !folderid
    ) {
      navigate(`folders/${folderList[0].id}`, { replace: true });
    }
  }, [
    folderListLoading,
    folderList,
    folderid,
    navigate,
    isArchivedRoute,
    isTrashRoute,
    isFavoriteRoute,
  ]);

  const handleFolderTitleEdit = (folderid: string, foldername: string) => {
    setEditFolderId(folderid);
    setFolderName(foldername);
  };

  const handleSaveFolder = (folderid: string, foldername: string) => {
    updateFolder({ name: foldername, id: folderid });
    setEditFolderId("");
  };

  return (
    <Stack spacing={theme.spacing(1)} width="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {isCreatNewFolder ? (
          <TextField
            autoFocus
            variant="standard"
            value={foldertitle}
            placeholder="Hit enter to save"
            onChange={(e) => handleFoldertitleChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSaveNewFolder();
              }
            }}
            inputProps={{
              sx: {
                "&::placeholder": {
                  fontStyle: "italic",
                  opacity: 0.5,
                },
              },
            }}
            fullWidth
          />
        ) : (
          <Typography variant="h5" color={theme.palette.text.secondary}>
            Folders
          </Typography>
        )}

        <StyledIconButton>
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={addFolderIcon}
            onClick={handleCreateNewFolder}
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
              {folder.id === editFolderId ? (
                <TextField
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  onBlur={() => handleSaveFolder(folder.id, folderName)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSaveFolder(folder.id, folderName);
                    }
                  }}
                  autoFocus
                  size="small"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,

                    style: {
                      ...theme.typography.h6,
                      padding: 0,
                      margin: 0,
                      height: "auto",
                      minHeight: 0,
                      lineHeight: theme.typography.h6.lineHeight,
                    },
                  }}
                  inputProps={{
                    style: {
                      padding: 0,
                      margin: 0,
                      height: "auto",
                      lineHeight: theme.typography.h6.lineHeight,
                    },
                  }}
                />
              ) : (
                <Typography
                  variant="h6"
                  color={theme.palette.text.secondary}
                  onDoubleClick={() =>
                    handleFolderTitleEdit(folder.id, folder.name)
                  }
                >
                  {folder.name}
                </Typography>
              )}
            </StyledStack>
          ))
        )}
      </Stack>
    </Stack>
  );
};
