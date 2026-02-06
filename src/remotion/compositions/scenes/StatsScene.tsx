import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
  spring,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 240909, suffix: "+", label: "Videos Created", color: "#4BDE81" },
  { value: 14258, suffix: "+", label: "Active Creators", color: "#6366f1" },
  { value: 400, suffix: "+", label: "Reached 100K+ Views", color: "#f59e0b" },
  { value: 32, suffix: "", label: "Languages Supported", color: "#ec4899" },
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Background gradient shift
  const bgAngle = 220 + frame * 0.2;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgAngle}deg, #0a0a0f 0%, #0d1420 40%, #0f0a1a 70%, #0a0a0f 100%)`,
      }}
    >
      {/* Subtle radial accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(75, 222, 129, 0.06) 0%, transparent 60%)",
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame / 40) * 0.05})`,
          filter: "blur(60px)",
        }}
      />

      {/* Section heading */}
      <div
        style={{
          position: "absolute",
          top: height * 0.14,
          width: "100%",
          textAlign: "center",
        }}
      >
        <TextAnimation
          className="text-lg font-semibold tracking-[0.3em] uppercase"
          style={{ color: "#4BDE81" }}
          startFrom={0}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, y: 15, scale: 0.6 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.03,
                ease: "back.out(1.7)",
              },
            );
            return tl;
          }}
        >
          Impact
        </TextAnimation>
      </div>

      <div
        style={{
          position: "absolute",
          top: height * 0.22,
          width: "100%",
          textAlign: "center",
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        <TextAnimation
          className="text-5xl font-extrabold text-white text-balance text-center"
          startFrom={8}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.fromTo(
              split.words,
              { opacity: 0, y: 40, filter: "blur(6px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.6,
                stagger: 0.07,
                ease: "power3.out",
              },
            );
            return tl;
          }}
        >
          Trusted by Thousands of Creators Worldwide
        </TextAnimation>
      </div>

      {/* Stats grid */}
      <div
        style={{
          position: "absolute",
          top: height * 0.42,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 40,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 15 + i * 6;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 100, mass: 0.6 },
            durationInFrames: 30,
          });
          const cardOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Subtle hover float
          const floatY = Math.sin((frame + i * 15) / 25) * 4;

          return (
            <div
              key={i}
              style={{
                width: 240,
                padding: "36px 24px",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                borderRadius: 20,
                border: `1px solid rgba(255,255,255,0.08)`,
                textAlign: "center",
                opacity: cardOpacity,
                transform: `scale(${cardScale}) translateY(${floatY}px)`,
              }}
            >
              {/* Color accent dot */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: stat.color,
                  margin: "0 auto 16px",
                  boxShadow: `0 0 12px ${stat.color}80`,
                }}
              />

              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <Counter
                  from={0}
                  to={stat.value}
                  duration={1.8}
                  delay={delay / fps}
                  separator=","
                  abbreviate={stat.value > 10000}
                  decimals={stat.value > 10000 ? 1 : 0}
                  ease="smooth"
                />
                <span style={{ color: stat.color }}>{stat.suffix}</span>
              </div>

              <div
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.02em",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom decorative line */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [50, 80], [0, 400], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(75,222,129,0.3), transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
