"use client";
import { Box, Button, Typography, Stack } from "@mui/material";
import LanIcon from "@mui/icons-material/Lightbulb";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import WallIcon from "@mui/icons-material/Wallpaper";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      {/* Background Video */}
      <video
        src="/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          filter: "brightness(0.8) blur(2px)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          zIndex: 1,
          backdropFilter: "blur(4px)",
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(0,0,0,0.4)",
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
          <LanIcon sx={{ fontSize: 48 }} color="warning" />
          <Typography variant="h3" fontWeight="bold" color="white">
            Lantern Wall
          </Typography>
        </Box>

        <Typography variant="h6" color="white" gutterBottom>
          Choose a mode to begin
        </Typography>

        <Stack spacing={2} direction="column" alignItems="center" mt={4}>
          <Button
            variant="contained"
            color="warning"
            startIcon={<SettingsRemoteIcon />}
            size="large"
            sx={{
              width: 260,
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
            onClick={() => router.push("/controller")}
          >
            Go to Controller
          </Button>

          <Button
            variant="contained"
            color="info"
            startIcon={<WallIcon />}
            size="large"
            sx={{
              width: 260,
              fontWeight: 600,
              fontSize: "1.1rem",
              borderWidth: 2,
              color: "#fff",
              borderColor: "#fff",
            }}
            onClick={() => router.push("/display")}
          >
            Go to Wall Display
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
