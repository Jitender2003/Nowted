import { Skeleton, Stack, useTheme } from "@mui/material";

export const NoteListSkeleton = () => {
  const theme = useTheme();

  // Render 3 skeleton items
  return (
    <Stack spacing={theme.spacing(3.6)} zIndex={1}>
      {[...Array(3)].map((_, i) => (
        <Stack
          key={i}
          spacing={theme.spacing(1.5)}
          sx={{
            padding: theme.spacing(1.5),
            borderRadius: theme.spacing(1),
            bgcolor: theme.palette.primary.main,
          }}
        >
          {/* Title skeleton */}
          <Skeleton variant="text" width="40%" height={32} />

          {/* Row with date + preview */}
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width="20%" height={24} />
            <Skeleton variant="text" width="50%" height={24} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
