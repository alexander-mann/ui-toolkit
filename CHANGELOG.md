# Changelog

All notable changes to `@alexandermann/ui-toolkit` are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While the package is pre-1.0, breaking changes ship in a minor bump (`0.x.0`)
rather than a major, and every one is marked **Breaking** below.

This file starts at `0.0.16`. Releases before it were published without a
changelog; see the [commit history](https://github.com/alexander-mann/ui-toolkit/commits/main)
for those.

## [Unreleased]

Convention drift cleanup (#60). Four of these are breaking — see the
before/after on each entry.

### Added

- `Select` takes a `placeholder` prop for the leading empty option (#60)
- `ToastVariantValue`, `ToastPositionValue`, and `SortDirectionValue` value
  types, matching the existing `PopoverPositionValue` (#60)
- Every component's `cva` variants are now exported, not just
  `popoverVariants`/`popoverPlacementVariants`/`tooltipVariants`. Adds
  `badgeVariants`, `buttonVariants`, `cardVariants`, `checkboxVariants`,
  `dialogVariants`, `dividerVariants`, `inputVariants`, `labelVariants`,
  `radioGroupVariants`, `selectVariants`, `switchVariants`, and `toastVariants`
  (#60)

### Changed

- **Breaking** `ToastPosition` values are kebab-case:
  `position="BottomRight"` → `position="bottom-right"`. Keys are camelCase —
  `ToastPosition.BottomRight` → `ToastPosition.bottomRight` (#60)
- **Breaking** `ToastVariant` keys are lowercase: `ToastVariant.Success` →
  `ToastVariant.success`. Values are unchanged (#60)
- **Breaking** `SortDirection` is an `as const` object instead of a TypeScript
  `enum`. `SortDirection.Asc` still works; annotations typed `SortDirection`
  become `SortDirectionValue` (#60)
- **Breaking** `Select` no longer renders a hardcoded English
  `"Select an option"` placeholder. Pass `placeholder` to restore it — the
  string is user-facing copy, so the component can't supply one (#60)

### Fixed

- `colorMix('primary', 0)` returned the `<alpha-value>` form instead of a fully
  transparent color, because `opacity || …` falls through on `0` (#60)
- `Select` rendered an `<hr>` inside `<select>`, which only Chromium's
  customizable-select work supports and which contributed nothing to the
  default rendering (#60)

## [0.0.16]

Released without a changelog entry.

[unreleased]: https://github.com/alexander-mann/ui-toolkit/compare/main...HEAD
