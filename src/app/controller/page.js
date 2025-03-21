"use client";
import { Button, Container, Typography, Box } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import useLanternWallSocket from "@/hooks/useLanternWallSocket";

export default function Control() {
  const { triggerLantern } = useLanternWallSocket();

  const handleTrigger = () => {
    triggerLantern({ triggeredAt: Date.now() }); // optional payload
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundAttachment: "fixed",
        px: 2,
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
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Box>
          <Button
            variant="contained"
            color="warning"
            startIcon={<LightbulbIcon />}
            onClick={handleTrigger}
            size="large"
            sx={{
              width: "300px",
              height: "100px",
            }}
          >
            Spark the Lantern
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
