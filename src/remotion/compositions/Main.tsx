import { Artifact, useCurrentFrame } from "remotion";
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

export const Main: React.FC = () => {
  const { fontFamily } = loadFont();
  const frame = useCurrentFrame();

  return (
    <div style={{ fontFamily }}>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

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
