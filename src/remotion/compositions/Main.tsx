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
const SFX_UI_POP =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770392611595_ly67w335g3m_sfx_soft_digital_UI_pop_click__sub.mp3";
const SFX_SUCCESS_CHIME =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770392142554_ki1pscl28zq_sfx_bright_success_chime__upliftin.mp3";
const SFX_AMBIENT =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770392614807_hbqdxyxgsm_sfx_soft_ambient_dark_electronic_p.mp3";

/*
 * Transition start frames (within the total timeline):
 * After Hero (150 frames): frame 140 (transition starts 10 frames before scene ends)
 * Actually, TransitionSeries handles overlap automatically.
 * We calculate the absolute start frame of each scene:
 *   Hero:     0
 *   Stats:    150 - 20 = 130
 *   Features: 130 + 150 - 20 = 260
 *   Steps:    260 + 150 - 20 = 390
 *   CTA:      390 + 150 - 20 = 520
 */
const SCENE_STARTS = {
  hero: 0,
  stats: 130,
  features: 260,
  steps: 390,
  cta: 520,
};

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

      {/* Ambient background pad — loops, low volume with fade in/out */}
      <Audio
        src={SFX_AMBIENT}
        loop
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 30], [0, 0.15], {
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(f, [660, 700], [0.15, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return Math.min(fadeIn, fadeOut);
        }}
      />

      {/* Logo reveal SFX — Hero scene (frame 0) */}
      <Audio src={SFX_LOGO_REVEAL} volume={0.6} />

      {/* Whoosh on each transition */}
      <Sequence from={SCENE_STARTS.stats - 5}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>
      <Sequence from={SCENE_STARTS.features - 5}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>
      <Sequence from={SCENE_STARTS.steps - 5}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>
      <Sequence from={SCENE_STARTS.cta - 5}>
        <Audio src={SFX_WHOOSH} volume={0.35} />
      </Sequence>

      {/* UI pop on Stats cards appearing (staggered) */}
      <Sequence from={SCENE_STARTS.stats + 15}>
        <Audio src={SFX_UI_POP} volume={0.25} />
      </Sequence>
      <Sequence from={SCENE_STARTS.stats + 27}>
        <Audio src={SFX_UI_POP} volume={0.2} />
      </Sequence>
      <Sequence from={SCENE_STARTS.stats + 39}>
        <Audio src={SFX_UI_POP} volume={0.2} />
      </Sequence>

      {/* UI pop on Features cards */}
      <Sequence from={SCENE_STARTS.features + 18}>
        <Audio src={SFX_UI_POP} volume={0.2} />
      </Sequence>
      <Sequence from={SCENE_STARTS.features + 33}>
        <Audio src={SFX_UI_POP} volume={0.18} />
      </Sequence>

      {/* Success chime on CTA scene */}
      <Sequence from={SCENE_STARTS.cta + 40}>
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
