#!/bin/sh
# PostToolUse (Edit|Write) reminder for the paths that sit outside every static
# gate, as documented in CLAUDE.md:
#   .storybook/     - in no tsc project and ESLint-ignored wholesale, so neither
#                     `pnpm test` nor `pnpm lint` can see a mistake anywhere in
#                     it; only a real `pnpm build-storybook` verifies it. main.ts
#                     is the sharpest case (the createRequire line, issue #34),
#                     but preview.tsx is where issue #36 measured a type error,
#                     so the whole directory is watched.
#   tailwind.config.js - outside tsconfig.json's include and ESLint-ignored, so
#                     `pnpm preset` is its only guard.
#
# Reads the tool call as JSON on stdin and matches only the file_path value,
# never the payload as a whole - file content routinely mentions these paths
# (CLAUDE.md discusses both), which would fire on every such edit.
#
# Extraction: flatten to one line, break it before each "file_path" key, then
# read the value off the first such line. Anchoring beats a greedy `.*"file_path"`
# prefix, which would pick the LAST occurrence - i.e. one inside edited content.
#
# LC_ALL=C must be exported, not just assigned: macOS `tr` aborts with "Illegal
# byte sequence" on invalid UTF-8 under a UTF-8 locale, which empties the
# extraction and makes the hook fail *open* - editing a watched file while the
# payload carries a stray byte would silently skip the reminder.
#
# Known gap: the matcher is Edit|Write, so a write performed through Bash
# (heredoc, `sed -i`, `cp`) bypasses this entirely. Treat the reminder as a
# convenience, not a guarantee.
export LC_ALL=C

file_path=$(cat | tr '\n' ' ' |
  sed 's/"file_path"[[:space:]]*:/\
&/g' |
  sed -n 's/^"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' |
  head -n 1)

case "$file_path" in
  */.storybook/* | .storybook/*)
    echo "Reminder: .storybook/ is in no tsc project and is ESLint-ignored, so neither \`pnpm test\` nor \`pnpm lint\` will catch a mistake there. Verify this change with a real \`pnpm build-storybook\`. See CLAUDE.md (Commands)." >&2
    exit 2
    ;;
  */tailwind.config.js | tailwind.config.js)
    echo "Reminder: tailwind.config.js is outside tsconfig's include and is ESLint-ignored, so it gets no static check. Verify this change with \`pnpm preset\`. See CLAUDE.md (Theming)." >&2
    exit 2
    ;;
esac

exit 0
