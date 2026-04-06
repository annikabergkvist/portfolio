/**
 * Hero top padding: below `xl`, layout already offsets the header (`pt-16`) — only a small
 * extra gap here. Desktop (`xl+`) keeps the large top band beside the sidebar.
 */
export const HERO_SECTION_TOP_CLASS = "max-xl:pt-6 xl:pt-72";

/**
 * Below `xl`: main copy is vertically centered in the hero (min-height = first viewport), shifted
 * slightly upward so it sits a bit above the true middle. `xl+`: normal block flow + `xl:pt-72`.
 */
export const HERO_MAIN_BLOCK_LAYOUT_CLASS =
  "max-xl:flex max-xl:min-h-0 max-xl:flex-1 max-xl:flex-col max-xl:items-start max-xl:justify-center max-xl:-translate-y-[min(5dvh,2rem)] xl:block xl:flex-none xl:translate-y-0";

/**
 * Below `xl`, layout keeps `pt-16` for the mobile header — min-height subtracts 4rem so
 * the hero (and chevron) fits the first viewport. `xl+`: no header offset, tall hero.
 */
export const HERO_SECTION_MIN_HEIGHT_CLASS =
  "min-h-[calc(100svh-4rem)] xl:min-h-[140dvh]";

/** Fixed sidebar nav (xl+). */
export const SIDEBAR_NAV_TOP_CLASS = "pt-44";
