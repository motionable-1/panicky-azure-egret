import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
  spring,
  Img,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/revid/1770390996954_jvrsd2m94sc_revid_logo_square.png";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const bgAngle = 160 + frame * 0.3;

  // Button entrance
  const btnScale = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 80, mass: 0.8 },
    durationInFrames: 35,
  });
  const btnOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo entrance
  const logoScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 90, mass: 0.7 },
    durationInFrames: 35,
  });
  const logoOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = 0.6 + Math.sin(frame / 18) * 0.4;

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (i * 83 + 17) % 100,
    y: (i * 61 + 23) % 100,
    size: 1.5 + (i % 4),
    speed: 0.2 + (i % 6) * 0.1,
    delay: i * 2,
  }));

  // Radial rings
  const ring1Scale = interpolate(frame, [10, 60], [0.5, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ring1Opacity = interpolate(frame, [10, 40, 70], [0, 0.15, 0.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgAngle}deg, #060810 0%, #0a1018 30%, #0d0a1a 60%, #060810 100%)`,
      }}
    >
      {/* Radial rings */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid rgba(75,222,129,0.15)",
          transform: `translate(-50%, -50%) scale(${ring1Scale})`,
          opacity: ring1Opacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(99,102,241,0.12)",
          transform: `translate(-50%, -50%) scale(${ring1Scale * 0.85})`,
          opacity: ring1Opacity * 0.8,
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(75,222,129,${0.08 * glowPulse}) 0%, transparent 60%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => {
        const pOpacity = interpolate(
          frame,
          [p.delay, p.delay + 15],
          [0, 0.3 + (i % 3) * 0.15],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const pY = p.y - frame * p.speed * 0.25;
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
              background:
                i % 3 === 0 ? "#4BDE81" : i % 3 === 1 ? "#6366f1" : "#22d3ee",
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
            top: height * 0.2,
            left: "50%",
            transform: `translateX(-50%) scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <Glow
            color="#4BDE81"
            intensity={18 * glowPulse}
            layers={2}
            decay={1.5}
          >
            <Img
              src={LOGO_URL}
              style={{ width: 100, height: 100, borderRadius: 22 }}
            />
          </Glow>
        </div>

        {/* Main CTA text */}
        <div
          style={{
            position: "absolute",
            top: height * 0.38,
            width: "100%",
            textAlign: "center",
            paddingLeft: 120,
            paddingRight: 120,
          }}
        >
          <TextAnimation
            className="text-6xl font-extrabold text-white text-balance text-center"
            startFrom={12}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 50, scale: 0.85, filter: "blur(8px)" },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.65,
                  stagger: 0.07,
                  ease: "back.out(1.3)",
                },
              );
              return tl;
            }}
          >
            Your Stories Deserve More Views
          </TextAnimation>
        </div>

        {/* Subtext */}
        <div
          style={{
            position: "absolute",
            top: height * 0.54,
            width: "100%",
            textAlign: "center",
            paddingLeft: 200,
            paddingRight: 200,
          }}
        >
          <TextAnimation
            className="text-xl font-normal text-center"
            style={{ color: "rgba(255,255,255,0.5)" }}
            startFrom={30}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 15 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  stagger: 0.035,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            Join 14,000+ creators turning ideas into videos that get noticed
          </TextAnimation>
        </div>

        {/* CTA Button */}
        <div
          style={{
            position: "absolute",
            top: height * 0.66,
            left: "50%",
            transform: `translateX(-50%) scale(${btnScale})`,
            opacity: btnOpacity,
          }}
        >
          <div
            style={{
              padding: "18px 48px",
              background: "#4BDE81",
              borderRadius: 14,
              fontSize: 20,
              fontWeight: 700,
              color: "#0a0a0f",
              letterSpacing: "0.01em",
              boxShadow: `0 0 30px rgba(75,222,129,${0.3 * glowPulse}), 0 4px 20px rgba(0,0,0,0.3)`,
            }}
          >
            Start Creating — Free
          </div>
        </div>

        {/* No credit card text */}
        <div
          style={{
            position: "absolute",
            top: height * 0.76,
            width: "100%",
            textAlign: "center",
          }}
        >
          <TextAnimation
            className="text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.35)" }}
            startFrom={55}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.04,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            No credit card required
          </TextAnimation>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            top: height * 0.85,
            width: "100%",
            textAlign: "center",
          }}
        >
          <TextAnimation
            className="text-2xl font-bold"
            style={{ color: "#4BDE81" }}
            startFrom={60}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, scale: 0.5, y: 20 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.03,
                  ease: "back.out(1.7)",
                },
              );
              return tl;
            }}
          >
            revid.ai
          </TextAnimation>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
