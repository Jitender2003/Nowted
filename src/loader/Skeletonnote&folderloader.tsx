import { Stack, Skeleton, type Theme } from "@mui/material";
import { styled, useTheme } from "@mui/system";

// Skeleton Loader
export const NoteSkeleton = () => {
  const theme = useTheme();
  return (
    <Stack
      maxHeight={theme.spacing(20)}
      spacing={theme.spacing(0.8)}
      sx={{
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {[...Array(3)].map((_, i) => (
        <StyledStack direction="row" spacing={2} key={i}>
          <Skeleton
            variant="circular"
            width={theme.spacing(2.5)}
            height={theme.spacing(2.5)}
          />

          <Skeleton variant="text" width={150} height={theme.spacing(2.5)} />
        </StyledStack>
      ))}
    </Stack>
  );
};

const StyledStack = styled(Stack)<{ theme?: Theme }>(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  alignItems: "center",
}));
