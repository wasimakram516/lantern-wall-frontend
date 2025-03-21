"use client";
import { useEffect, useRef, useState } from "react";
import useLanternWallSocket from "@/hooks/useLanternWallSocket";
import { Box } from "@mui/material";

export default function Display() {
  const { lanternData } = useLanternWallSocket();
  const [lanterns, setLanterns] = useState([]);
  const audioRef = useRef(null);
  const lastSoundIndexRef = useRef(-1);

  const sounds = ["/1.mp3", "/2.mp3", "/3.mp3"];

  useEffect(() => {
    sounds.forEach((src) => {
      const a = new Audio(src);
      a.load();
    });
  }, []);

  useEffect(() => {
  if (lanternData) {
    setLanterns((prev) => [...prev, { id: Date.now() }]);

    // Stop previous audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Select a truly random sound (no immediate repeats)
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * sounds.length);
    } while (newIndex === lastSoundIndexRef.current && sounds.length > 1);

    lastSoundIndexRef.current = newIndex;

    const randomSound = sounds[newIndex];
    const audio = new Audio(randomSound);
    audioRef.current = audio;
    audio.play();
  }
}, [lanternData]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
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

      {/* Lanterns */}
      <Box
        sx={{
          display: "flex",
          flexWrap:"wrap",
          gap: 2,
          padding: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        {lanterns.map((lantern) => (
          <Box
          component="img"
          key={lantern.id}
          src="/lantern.png"
          alt="Lantern"
          sx={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
            animation: "breathing 3s ease-in-out infinite",
          }}
        />        
        ))}
      </Box>
    </Box>
  );
}
