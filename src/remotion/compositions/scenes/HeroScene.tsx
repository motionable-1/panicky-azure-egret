import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  AbsoluteFill,
  spring,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid/1770390996954_jvrsd2m94sc_revid_logo_square.png";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Logo spring entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
    durationInFrames: 40,
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Logo glow pulse
  const glowIntensity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating orbs
  const orb1Y = Math.sin(frame / 30) * 15;
  const orb1X = Math.cos(frame / 40) * 20;
  const orb2Y = Math.sin(frame / 25 + 1) * 20;
  const orb2X = Math.cos(frame / 35 + 2) * 25;
  const orb3Y = Math.sin(frame / 20 + 3) * 12;
  const orb3X = Math.cos(frame / 30 + 1) * 18;

  // Background gradient rotation
  const gradientAngle = 135 + frame * 0.3;

  // Subtle grid lines opacity
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.06], {
    extrapolateRight: "clamp",
  });

  // Particle field
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 97 + 13) % 100,
    y: (i * 67 + 29) % 100,
    size: 2 + (i % 3),
    speed: 0.3 + (i % 5) * 0.15,
    delay: i * 3,
  }));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #0a0a0f 0%, #0d1117 30%, #101820 60%, #0a0f18 100%)`,
      }}
    >
      {/* Ambient grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(75, 222, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 222, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div
        style={{
          position: "absolute",
          left: "15%",
          top: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(75, 222, 129, 0.15) 0%, transparent 70%)",
          transform: `translate(${orb1X}px, ${orb1Y}px)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "40%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
          transform: `translate(${orb2X}px, ${orb2Y}px)`,
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "15%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(75, 222, 129, 0.1) 0%, transparent 70%)",
          transform: `translate(${orb3X}px, ${orb3Y}px)`,
          filter: "blur(35px)",
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => {
        const pOpacity = interpolate(
          frame,
          [p.delay, p.delay + 20],
          [0, 0.4 + (i % 3) * 0.2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const pY = p.y - frame * p.speed * 0.3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${((pY % 100) + 100) % 100}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#4BDE81" : "#6366f1",
              opacity: pOpacity,
            }}
          />
        );
      })}

      {/* Center content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: height * 0.28,
            left: "50%",
            transform: `translateX(-50%) scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <Glow
            color="#4BDE81"
            intensity={20 * glowIntensity}
            layers={3}
            decay={1.5}
          >
            <Img
              src={LOGO_URL}
              style={{
                width: 140,
                height: 140,
                borderRadius: 28,
              }}
            />
          </Glow>
        </div>

        {/* Tagline */}
        <div
          style={{
            position: "absolute",
            top: height * 0.52,
            width: "100%",
            textAlign: "center",
          }}
        >
          <TextAnimation
            className="text-6xl font-extrabold text-white text-center"      
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 60, scale: 0.8, filter: "blur(8px)" },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.7,
                  stagger: 0.08,
                  ease: "back.out(1.4)",
                },
              );
              return tl;
            }}
          >
            Create <span style={{ color: "#4BDE81" }}>Viral Videos</span> in
            Minutes
          </TextAnimation>
        </div>

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            top: height * 0.66,
            width: "100%",
            textAlign: "center",
            paddingLeft: 160,
            paddingRight: 160,
          }}
        >
          <TextAnimation
            className="text-2xl font-normal text-center"
            style={{ color: "rgba(255,255,255,0.55)" }}
            startFrom={38}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.04,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            Turn ideas into attention-grabbing TikTok, Instagram, and YouTube
            stories with AI
          </TextAnimation>
        </div>
      </AbsoluteFill>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, #4BDE81, transparent)`,
          opacity: interpolate(frame, [30, 50], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
