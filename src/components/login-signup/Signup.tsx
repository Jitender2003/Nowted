import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, Typography, useTheme, alpha, Button } from "@mui/material";
import { BackgroundBeams } from "../ui/background-beams";
import { logo } from "../../assets";
import { StyledInput } from "./components/StyledTextField";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthApi } from "../../hooks/auth.api.hooks";

const signupSchema = z.object({
  username: z.string().min(3),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof signupSchema>;

export const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useAuthApi.useSignup({
    onSuccess: () => {
      navigate("/Nowted/login");
    },
    onError: (error) => {
      const data = error.response?.data;
      if (!data) {
        setError("root", { message: "Something went wrong" });
        return;
      }

      const errorType = data.errorType;
      const fieldMap: Record<string, keyof FormFields> = {
        username: "username",
        email: "email",
        password: "password",
      };

      if (errorType === "VALIDATION ERROR") {
        const field = fieldMap[data.error.field];
        if (field) {
          setError(field, { message: data.error.message });
        }
      } else if (data.error?.message) {
        setError("root", { message: data.error.message });
      }
    },
  });

  const handleSignup = async (data: FormFields) => {
    signupMutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Stack
      direction="row"
      sx={{
        width: "100vw",
        height: "100vh",
        padding: theme.spacing(1),
        bgcolor: theme.palette.primary.dark,
      }}
    >
      <Stack
        sx={{
          width: { xs: "0%", md: "50%" },
          position: "relative",
          overflow: "hidden",
          borderRadius: theme.spacing(2),
          background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            padding: 0,
            margin: 0,
            zIndex: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <BackgroundBeams />
        </Box>

        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: theme.spacing(1),
            width: "50%",
            height: "50%",
          }}
        >
          <Box component="img" src={logo} width={150}></Box>
          <Typography variant="body1" textAlign="justify">
            Sign up to create, manage, and access your notes seamlessly. Your
            workspace, your way — all in one place.
          </Typography>
        </Box>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        width="50%"
        spacing={1.5}
      >
        <Typography variant="h1">Sign Up</Typography>
        <Typography variant="h5">
          Enter your personal data to create an account
        </Typography>
        <Stack width="100%" maxWidth={400}>
          <form onSubmit={handleSubmit(handleSignup)}>
            <Stack spacing={3}>
              <StyledInput
                {...register("username")}
                label="Username"
                variant="outlined"
                fullWidth
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
              <StyledInput
                {...register("email")}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <StyledInput
                {...register("password")}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors?.password?.message}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              >
                <Typography variant="h5"> Sign Up</Typography>
              </Button>
              {errors.root?.message && (
                <Typography color="error">{errors.root.message}</Typography>
              )}
            </Stack>
          </form>
        </Stack>
        <Typography
          variant="h5"
          sx={{ color: alpha(theme.palette.text.primary, 0.4) }}
        >
          Already have an account?{" "}
          <Link
            to="/Nowted/login"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            log in
          </Link>
        </Typography>
      </Stack>
    </Stack>
  );
};
