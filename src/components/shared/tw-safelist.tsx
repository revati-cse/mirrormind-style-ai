// Tailwind v4 source scanner only picks up literal class names.
// This unused literal pool keeps dynamic color variants in the bundle.
export const _TW_SAFELIST = `
  text-cyan text-magenta text-purple
  bg-cyan bg-magenta bg-purple
  bg-cyan/10 bg-magenta/10 bg-purple/10
  bg-cyan/20 bg-magenta/20 bg-purple/20
  ring-cyan/30 ring-magenta/30 ring-purple/30
  border-cyan/40 border-magenta/40 border-purple/40
  hover:text-cyan hover:text-magenta hover:text-purple
  hover:bg-cyan hover:bg-magenta hover:bg-purple
  from-cyan from-magenta from-purple to-cyan to-magenta to-purple via-cyan via-magenta via-purple
`;
