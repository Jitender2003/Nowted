import { Box, Stack, Typography, useTheme } from "@mui/material";
import { archivedIcon, favoriteIcon, trashIcon } from "../../assets";
import { StyledStack } from "../../uiComponents/StyledStack";
import { useNavigate } from "react-router-dom";

export const More = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack spacing={theme.spacing(1)} width="100%">
      <Typography variant="h5" color={theme.palette.text.secondary}>
        More
      </Typography>
      <Stack spacing={theme.spacing(0.6)}>
        <StyledStack
          direction="row"
          spacing={theme.spacing(2)}
          onClick={() => {
            navigate(`/Nowted/favorite`);
          }}
        >
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={favoriteIcon}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Favorites
          </Typography>
        </StyledStack>
        <StyledStack
          direction="row"
          spacing={theme.spacing(2)}
          onClick={() => {
            navigate(`/Nowted/trash`);
          }}
        >
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={trashIcon}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Trash
          </Typography>
        </StyledStack>
        <StyledStack
          direction="row"
          spacing={theme.spacing(2)}
          onClick={() => {
            navigate(`/Nowted/archived`);
          }}
        >
          <Box
            component="img"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
            src={archivedIcon}
          ></Box>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            Archived
          </Typography>
        </StyledStack>
      </Stack>
    </Stack>
  );
};
