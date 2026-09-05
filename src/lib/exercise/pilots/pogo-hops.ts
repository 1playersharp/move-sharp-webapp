import type { MotionSpec } from "../motion-spec";

// Stiff-ankle vertical bounces — the drive comes from the ankle, not the knee.
//
// Real pogos run at ~3 hops/sec, but at that tempo and a 10cm pop the demo
// reads as vibration rather than bouncing. Slowed and given a taller pop so
// the mechanism is legible; the viewer's speed control covers the rest.
export const pogoHops: MotionSpec = {
  slug: "pogo-hops",
  name: "Pogo Hops",
  loop: true,
  repDurationSec: 0.62,
  tracks: {
    pelvis: {
      position: [
        { t: 0, value: [0, 0, 0], ease: "smooth" },
        { t: 0.3, value: [0, -0.08, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0.24, 0], ease: "smooth" },
        { t: 0.7, value: [0, -0.08, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0], ease: "smooth" },
      ],
    },
    ankleL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [15, 0, 0], ease: "smooth" }, // dorsiflex on load
        { t: 0.5, value: [-42, 0, 0], ease: "smooth" }, // plantarflex on pop
        { t: 0.7, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    ankleR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [15, 0, 0], ease: "smooth" },
        { t: 0.5, value: [-42, 0, 0], ease: "smooth" },
        { t: 0.7, value: [15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    kneeL: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [-15, 0, 0], ease: "smooth" }, // slight bend on land
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    kneeR: {
      rotationDeg: [
        { t: 0, value: [0, 0, 0] },
        { t: 0.3, value: [-15, 0, 0], ease: "smooth" },
        { t: 0.5, value: [0, 0, 0], ease: "smooth" },
        { t: 0.7, value: [-15, 0, 0], ease: "smooth" },
        { t: 1, value: [0, 0, 0] },
      ],
    },
    // Arms carried in a fixed athletic position, counter-bouncing slightly
    // against the hops — dead arms make the whole thing look like a glitch.
    shoulderL: {
      rotationDeg: [
        { t: 0, value: [14, 0, -8], ease: "smooth" },
        { t: 0.3, value: [26, 0, -8], ease: "smooth" },
        { t: 0.5, value: [6, 0, -8], ease: "smooth" },
        { t: 0.7, value: [26, 0, -8], ease: "smooth" },
        { t: 1, value: [14, 0, -8], ease: "smooth" },
      ],
    },
    shoulderR: {
      rotationDeg: [
        { t: 0, value: [14, 0, 8], ease: "smooth" },
        { t: 0.3, value: [26, 0, 8], ease: "smooth" },
        { t: 0.5, value: [6, 0, 8], ease: "smooth" },
        { t: 0.7, value: [26, 0, 8], ease: "smooth" },
        { t: 1, value: [14, 0, 8], ease: "smooth" },
      ],
    },
    elbowL: { rotationDeg: [{ t: 0, value: [62, 0, 0] }] },
    elbowR: { rotationDeg: [{ t: 0, value: [62, 0, 0] }] },
  },
};
