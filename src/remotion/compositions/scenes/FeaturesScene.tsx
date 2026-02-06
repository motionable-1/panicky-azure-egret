import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  spring,
  Img,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: "https://api.iconify.design/heroicons/sparkles-solid.svg?color=%234BDE81&width=36",
    title: "AI Script Generator",
    description: "Automatic viral script writing powered by AI",
    color: "#4BDE81",
  },
  {
    icon: "https://api.iconify.design/heroicons/microphone-solid.svg?color=%236366f1&width=36",
    title: "50+ Unique Voices",
    description: "Male and female voices that resonate",
    color: "#6366f1",
  },
  {
    icon: "https://api.iconify.design/heroicons/film-solid.svg?color=%23f59e0b&width=36",
    title: "Video Styles & Templates",
    description: "TikTok, YouTube, avatars — one click away",
    color: "#f59e0b",
  },
  {
    icon: "https://api.iconify.design/heroicons/pencil-square-solid.svg?color=%23ec4899&width=36",
    title: "Super-Simple Editor",
    description: "Intuitive editing — no complex tools needed",
    color: "#ec4899",
  },
  {
    icon: "https://api.iconify.design/heroicons/arrow-up-on-square-stack-solid.svg?color=%2322d3ee&width=36",
    title: "One-Click Publish",
    description: "Share instantly across all platforms",
    color: "#22d3ee",
  },
  {
    icon: "https://api.iconify.design/heroicons/shield-check-solid.svg?color=%23a855f7&width=36",
    title: "100% Yours Forever",
    description: "Crisp exports you own — no strings attached",
    color: "#a855f7",
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const bgAngle = 310 + frame * 0.15;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgAngle}deg, #0a0a0f 0%, #101020 40%, #0d1117 100%)`,
      }}
    >
      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
          transform: `translate(${Math.cos(frame / 35) * 15}px, ${Math.sin(frame / 30) * 15}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "10%",
          bottom: "10%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(75,222,129,0.06) 0%, transparent 60%)",
          filter: "blur(50px)",
          transform: `translate(${Math.sin(frame / 40) * 12}px, ${Math.cos(frame / 25) * 12}px)`,
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
          style={{ color: "#6366f1" }}
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
          Features
        </TextAnimation>
      </div>

      <div
        style={{
          position: "absolute",
          top: height * 0.15,
          width: "100%",
          textAlign: "center",
          paddingLeft: 120,
          paddingRight: 120,
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
          Everything You Need to Create Amazing Videos
        </TextAnimation>
      </div>

      {/* Feature cards grid — 3x2 */}
      <div
        style={{
          position: "absolute",
          top: height * 0.34,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          width: 1060,
          justifyContent: "center",
        }}
      >
        {features.map((feature, i) => {
          const delay = 18 + i * 5;

          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 90, mass: 0.7 },
            durationInFrames: 30,
          });
          const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const floatY = Math.sin((frame + i * 20) / 28) * 3;

          return (
            <div
              key={i}
              style={{
                width: 330,
                padding: "28px 24px",
                background: "rgba(255,255,255,0.035)",
                backdropFilter: "blur(10px)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: cardOpacity,
                transform: `scale(${cardScale}) translateY(${floatY}px)`,
              }}
            >
              {/* Icon with glow dot */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${feature.color}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  border: `1px solid ${feature.color}25`,
                }}
              >
                <Img src={feature.icon} style={{ width: 28, height: 28 }} />
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 6,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5,
                }}
              >
                {feature.description}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
