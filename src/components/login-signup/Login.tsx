import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Box, Stack, Typography, useTheme, alpha, Button } from "@mui/material";
import { BackgroundBeams } from "../ui/background-beams";
import { logo } from "../../assets";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledInput } from "./components/StyledTextField";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginSchema = z.object({
  emailOrUsername: z.union([z.string().min(3), z.string().email()]),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof loginSchema>;

export const Login = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: FormFields) => {
    try {
      await axios.post(
        "http://localhost:3000/auth/login",
        { usernameOrEmail: data.emailOrUsername, password: data.password },
        { withCredentials: true } // important for JWT cookie
      );

      await checkAuth(); // refresh auth context
      navigate("/Nowted"); // redirect after login
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError("root", { message: err.response.data.message });
      } else {
        setError("root", { message: "Login failed. Please try again." });
      }
    }
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
            width: "50%",
            height: "50%",
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
          }}
        >
          <Box component="img" src={logo} width={150}></Box>
          <Typography variant="body1" textAlign="justify">
            Yoo, great to see you again! Log in and get back to creating!
          </Typography>
        </Box>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        width="50%"
        spacing={1.5}
      >
        <Typography variant="h1">Log In</Typography>
        <Typography variant="h5">Log in to access your account</Typography>
        <Stack width="100%" maxWidth={400}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={3}>
              <StyledInput
                {...register("emailOrUsername")}
                label="Username or Email"
                variant="outlined"
                fullWidth
                error={!!errors.emailOrUsername}
                helperText={errors.emailOrUsername?.message}
              />
              <StyledInput
                {...register("password")}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
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
                <Typography variant="h5"> Log In</Typography>
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
          First time here?{" "}
          <Link
            to="/Nowted/signup"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            Sign up for free
          </Link>
        </Typography>
      </Stack>
    </Stack>
  );
};
