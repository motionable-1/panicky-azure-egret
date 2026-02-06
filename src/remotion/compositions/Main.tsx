import {
  Artifact,
  Sequence,
  useCurrentFrame,
  interpolate,
  Audio,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { loadFont } from "@remotion/google-fonts/Inter";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";

import { HeroScene } from "./scenes/HeroScene";
import { StatsScene } from "./scenes/StatsScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { StepsScene } from "./scenes/StepsScene";
import { CTAScene } from "./scenes/CTAScene";

/*
 * Scene durations:
 * Hero: 150 frames (5s)
 * Stats: 150 frames (5s)
 * Features: 150 frames (5s)
 * Steps: 150 frames (5s)
 * CTA: 150 frames (5s) + 30 frames buffer
 *
 * Transitions: 4 × 20 frames = 80 frames
 * Total: 150×5 + 30 - 80 = 700 frames
 */

const TRANSITION_DURATION = 20;

// SFX URLs
const SFX_LOGO_REVEAL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770391688706_91k2tf6ne1h_sfx_bright_digital_logo_reveal_sou.mp3";
const SFX_WHOOSH =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770392207161_tbw6sjpam78_sfx_smooth_cinematic_whoosh_transi.mp3";
const SFX_SUCCESS_CHIME =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770392142554_ki1pscl28zq_sfx_bright_success_chime__upliftin.mp3";
const MUSIC_BG =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1770394144166_b29jg9knn3t_music_Modern_upbeat_electr.mp3";

/*
 * Scene absolute start frames:
 *   Hero:     0
 *   Stats:    130
 *   Features: 260
 *   Steps:    390
 *   CTA:      520
 */

export const Main: React.FC = () => {
  const { fontFamily } = loadFont();
  const frame = useCurrentFrame();

  return (
    <div style={{ fontFamily }}>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* ═══════ AUDIO LAYER ═══════ */}
      {/* Only 4 Audio tags max mounted at any time to prevent browser overload */}

      {/* Background music — fades in gently, fades out at end */}
      <Audio
        src={MUSIC_BG}
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 45], [0, 0.3], {
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(f, [650, 700], [0.3, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return Math.min(fadeIn, fadeOut);
        }}
      />

      {/* Logo reveal SFX — Hero scene only */}
      <Sequence from={0} durationInFrames={90}>
        <Audio src={SFX_LOGO_REVEAL} volume={0.6} />
      </Sequence>

      {/* Whoosh on transition to Stats */}
      <Sequence from={125} durationInFrames={40}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>

      {/* Whoosh on transition to Features */}
      <Sequence from={255} durationInFrames={40}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>

      {/* Whoosh on transition to Steps */}
      <Sequence from={385} durationInFrames={40}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>

      {/* Whoosh on transition to CTA + success chime */}
      <Sequence from={515} durationInFrames={40}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>

      <Sequence from={560} durationInFrames={80}>
        <Audio src={SFX_SUCCESS_CHIME} volume={0.45} />
      </Sequence>

      {/* ═══════ VIDEO LAYER ═══════ */}

      <TransitionSeries>
        {/* Scene 1: Hero */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <HeroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Stats */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Features */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Steps */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <StepsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={blurDissolve()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: CTA */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  );
};
