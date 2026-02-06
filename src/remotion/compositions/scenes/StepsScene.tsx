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

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Get Inspired",
    description: "Find trending content and viral ideas",
    icon: "https://api.iconify.design/heroicons/light-bulb-solid.svg?color=%234BDE81&width=32",
    color: "#4BDE81",
  },
  {
    number: "02",
    title: "Write Your Script",
    description: "AI crafts scripts that hook audiences",
    icon: "https://api.iconify.design/heroicons/document-text-solid.svg?color=%236366f1&width=32",
    color: "#6366f1",
  },
  {
    number: "03",
    title: "Generate Video",
    description: "Watch words become professional video",
    icon: "https://api.iconify.design/heroicons/play-circle-solid.svg?color=%23f59e0b&width=32",
    color: "#f59e0b",
  },
  {
    number: "04",
    title: "Publish Everywhere",
    description: "Share on TikTok, YouTube, Instagram",
    icon: "https://api.iconify.design/heroicons/share-solid.svg?color=%23ec4899&width=32",
    color: "#ec4899",
  },
];

export const StepsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const bgAngle = 180 + frame * 0.2;

  // Connecting line progress
  const lineProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgAngle}deg, #0a0a0f 0%, #0a1018 50%, #0d0a18 100%)`,
      }}
    >
      {/* Ambient accent */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(75,222,129,0.04) 0%, transparent 60%)",
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame / 35) * 0.04})`,
          filter: "blur(80px)",
        }}
      />

      {/* Section heading */}
      <div
        style={{
          position: "absolute",
          top: height * 0.08,
          width: "100%",
          textAlign: "center",
        }}
      >
        <TextAnimation
          className="text-lg font-semibold tracking-[0.3em] uppercase"
          style={{ color: "#f59e0b" }}
          startFrom={0}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                stagger: 0.025,
                ease: "power2.out",
              },
            );
            return tl;
          }}
        >
          How It Works
        </TextAnimation>
      </div>

      <div
        style={{
          position: "absolute",
          top: height * 0.15,
          width: "100%",
          textAlign: "center",
          paddingLeft: 140,
          paddingRight: 140,
        }}
      >
        <TextAnimation
          className="text-5xl font-extrabold text-white text-balance text-center"
          startFrom={6}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.fromTo(
              split.words,
              { opacity: 0, y: 35, filter: "blur(5px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.55,
                stagger: 0.06,
                ease: "power3.out",
              },
            );
            return tl;
          }}
        >
          Four Easy Steps to Your Story
        </TextAnimation>
      </div>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: height * 0.38,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
        }}
      >
        {steps.map((step, i) => {
          const delay = 18 + i * 10;

          const cardY = spring({
            frame: frame - delay,
            fps,
            config: { damping: 13, stiffness: 85, mass: 0.7 },
            durationInFrames: 35,
          });
          const cardOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const floatY = Math.sin((frame + i * 18) / 30) * 4;

          // Number pulse
          const numberScale = 1 + Math.sin((frame + i * 10) / 20) * 0.03;

          return (
            <div
              key={i}
              style={{
                width: 250,
                textAlign: "center",
                opacity: cardOpacity,
                transform: `translateY(${(1 - cardY) * 50 + floatY}px)`,
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: `${step.color}15`,
                  border: `2px solid ${step.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  transform: `scale(${numberScale})`,
                  boxShadow: `0 0 20px ${step.color}20`,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: step.color,
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img src={step.icon} style={{ width: 32, height: 32 }} />
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 6,
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5,
                }}
              >
                {step.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connecting line between steps */}
      <div
        style={{
          position: "absolute",
          top: height * 0.38 + 32,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 2,
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: `${lineProgress * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, #4BDE81, #6366f1, #f59e0b, #ec4899)`,
            opacity: 0.25,
            borderRadius: 1,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
