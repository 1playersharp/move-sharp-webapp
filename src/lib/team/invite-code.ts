// Human-readable invite codes. Uppercase, no ambiguous characters
// (0/O, 1/I/L). Six characters is enough entropy for the low volume
// expected while keeping the string easy to say aloud or type by
// hand — a coach reads it out in a huddle, a player types it into
// /join/[code].

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // 31 chars
const CODE_LENGTH = 6;

export function generateInviteCode(): string {
  let out = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}
