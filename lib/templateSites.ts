import {
  gasket, spark, gloaming, ridgeline, glyph, wavelet, mortise, karst,
  hilbert, linocut, cascade, crescendo, perforate, bothways, torsion,
  taper, windowpane, epicentre, halftone, staple, maelstrom, caltrop,
  tailoff, tinting, ring, quire, ribline, stitch, damier, plait, chase,
  tidering, radiance, grainfield, metro, rungs,
  pivot, raking, gutter, swapcut, annulus, sail, reeding, miura, lintel,
  dipole,
  cupola, battlement, clipcorner, birdsmouth, rolloff, prismfold,
  bracket, moleskin, disque, spectrum, ninon, bauhaus, capstan, raku,
  combed, shatter, grosgrain, wale, spit, gesso, bowsprit, mirrorblack,
  sound, cornerbite, fractal, pinwheel,
  midnightblossoms, goldencoil, wovenkhaki, softbubbles, diagonalweave,
  cornernotch, isometricblocks, marbledarcs, tidewashbands, spiralrosette,
  quarterburst, truchetrings, teardropleaves, tealboomerang,
  quartercirclequilt, randomrings, midnightconfetti, patternsampler,
  sunsetrings, warpribbon, contourlines, dashfield, paintscribble,
  spinningrings, horizonbands, crosslattice, meridianhatch, diamondember,
  concentricrings, rabbet,
} from 'tabbied/patterns';
import type { PatternDefinition } from 'tabbied';

export type NewTemplateSite = {
  slug: string;
  name: string;
  topic: string;
  /** Preset slug, for display labels. */
  patternSlug: string;
  pattern: PatternDefinition;
  paletteName: string;
  /** Background color first - the same hexes the site itself uses. */
  palette: string[];
  seed: string;
};

/**
 * The second template collection: single-page brand sites under
 * /templates/<slug>/site/, each designed around one Tabbied pattern (imagery:
 * docs/image-pipeline.md). Palettes here mirror each page's own constants.
 */
export const NEW_TEMPLATE_SITES: NewTemplateSite[] = [
  { slug: 'mistral-cycles', name: 'Mistral Cycles', topic: 'Handbuilt bicycle frames', patternSlug: 'gasket', pattern: gasket, paletteName: 'Blueprint navy', palette: ['#0D1B2A', '#1B98E0', '#E0FBFC', '#FF7B00', '#FFD23F', '#EAEAEA'], seed: 'dir-mc' },
  { slug: 'zenith-observatory', name: 'Zenith', topic: 'Observatory & planetarium', patternSlug: 'spark', pattern: spark, paletteName: 'Nebula violet', palette: ['#10002B', '#5A189A', '#9D4EDD', '#C77DFF', '#E0AAFF', '#FFD6FF'], seed: 'dir-ze' },
  { slug: 'maison-ambre', name: 'Maison Ambre', topic: 'Perfume house', patternSlug: 'gloaming', pattern: gloaming, paletteName: 'Amber noir', palette: ['#141210', '#C9A227', '#E8D9B0', '#8C6A2F', '#FBF6EA', '#5A4632'], seed: 'dir-ma' },
  { slug: 'cairn-expeditions', name: 'Cairn', topic: 'Alpine guiding service', patternSlug: 'ridgeline', pattern: ridgeline, paletteName: 'Glacier ember', palette: ['#10222E', '#A8CEDE', '#F2F7F9', '#E8734A', '#4E7A8C', '#D8E8EF'], seed: 'dir-ca' },
  { slug: 'hopscotch-museum', name: 'Hopscotch', topic: "Children's discovery museum", patternSlug: 'glyph', pattern: glyph, paletteName: 'Crayon primaries', palette: ['#FFF9EF', '#2B2B33', '#FF5C4D', '#2E86DE', '#27C093', '#FFC53D'], seed: 'dir-ho' },
  { slug: 'cerulean-swim', name: 'Cerulean', topic: 'Swimwear label', patternSlug: 'wavelet', pattern: wavelet, paletteName: 'Lagoon', palette: ['#F2FBFC', '#0FA3B1', '#B5E2E8', '#FF8266', '#FFD97D', '#134D57'], seed: 'dir-ce' },
  { slug: 'oxbow-workshop', name: 'Oxbow', topic: 'Furniture workshop', patternSlug: 'mortise', pattern: mortise, paletteName: 'Oiled oak', palette: ['#F5F1E8', '#2E2A25', '#A9713C', '#6B4F35', '#9AA69B', '#C7BBA5'], seed: 'dir-ox' },
  { slug: 'piquant-provisions', name: 'Piquant Provisions', topic: 'Small-batch hot sauce', patternSlug: 'karst', pattern: karst, paletteName: 'Scoville', palette: ['#0F1A20', '#F4D35E', '#EE964B', '#F95738', '#EFE6DD', '#4C8FBD'], seed: 'dir-pi' },
  { slug: 'quanta-robotics', name: 'Quanta', topic: 'Robotics laboratory', patternSlug: 'hilbert', pattern: hilbert, paletteName: 'Phosphor', palette: ['#0B0E14', '#25E0C8', '#4A5568', '#E8ECF1', '#7A88FF', '#1A2230'], seed: 'dir-qu' },
  { slug: 'madrigal-strings', name: 'Madrigal', topic: 'Violin atelier', patternSlug: 'linocut', pattern: linocut, paletteName: 'Varnish', palette: ['#2D132C', '#801336', '#C72C41', '#EE4540', '#F0C419', '#FFE9C7'], seed: 'dir-md' },
  { slug: 'caldera-rail', name: 'Caldera', topic: 'Scenic railway journeys', patternSlug: 'cascade', pattern: cascade, paletteName: 'Gouache travel', palette: ['#F0EAD6', '#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'], seed: 'dir-cl' },

  // Swiss-minimal set: one design language, five grids. Inter throughout.
  { slug: 'konzerthaus-halden', name: 'Konzerthaus Halden', topic: 'Concert hall', patternSlug: 'crescendo', pattern: crescendo, paletteName: 'Program red', palette: ['#F2F1EE', '#E1261C'], seed: 'dir-kh' },
  { slug: 'institut-vollmer', name: 'Institut Vollmer', topic: 'Materials research', patternSlug: 'perforate', pattern: perforate, paletteName: 'Signal blue', palette: ['#FFFFFF', '#1A1A1A', '#0B4EE0', '#9AA0A6', '#E9EBEE', '#4A4F55'], seed: 'dir-iv' },
  { slug: 'linie-nord', name: 'Linie Nord', topic: 'Regional transit', patternSlug: 'bothways', pattern: bothways, paletteName: 'Signal yellow', palette: ['#F1F1EF', '#17181A', '#FFD400', '#7E858C', '#DCDEDE', '#2A2E33'], seed: 'dir-ln' },
  { slug: 'chronometrie-bex', name: 'Chronométrie Bex', topic: 'Watch manufacture', patternSlug: 'torsion', pattern: torsion, paletteName: 'Bone and steel', palette: ['#EDEDEB', '#0E0E0E', '#FF5A1F', '#9C9C98', '#DAD9D5', '#3A3A38'], seed: 'dir-cb' },
  { slug: 'bogen-papier', name: 'Bogen Papier', topic: 'Paper merchant', patternSlug: 'taper', pattern: taper, paletteName: 'Stock green', palette: ['#FAFAF7', '#14150F', '#2E7D4F', '#C9C4B4', '#E7E5DC', '#6B6656'], seed: 'dir-bp' },

  // Pattern-forward Swiss set: full-bleed pattern fields with a transparent
  // background slot, redrawn on a timer so each page keeps moving.
  { slug: 'werkraum', name: 'Werkraum', topic: 'Architecture practice', patternSlug: 'windowpane', pattern: windowpane, paletteName: 'Basel red', palette: ['#F4F3EF', '#16161A', '#D6001C', '#8E8E88', '#C9C8C1'], seed: 'dir-wr' },
  { slug: 'nordlicht', name: 'Nordlicht', topic: 'Cartography & survey', patternSlug: 'epicentre', pattern: epicentre, paletteName: 'Chart blue', palette: ['#FCFCFA', '#0E1116', '#1B4DFF', '#8A9098', '#C3CBD4'], seed: 'dir-nl' },
  { slug: 'halbfett', name: 'Halbfett', topic: 'Type foundry', patternSlug: 'halftone', pattern: halftone, paletteName: 'Proof vermilion', palette: ['#FFFFFF', '#000000', '#FF3B14', '#9A9A9A', '#DCDCDC'], seed: 'dir-hb' },
  { slug: 'hafen-sechs', name: 'Hafen Sechs', topic: 'Container terminal', patternSlug: 'staple', pattern: staple, paletteName: 'Signal yellow, night', palette: ['#101215', '#F0EFEA', '#FFD400', '#6E747C', '#1C2026'], seed: 'dir-h6' },
  { slug: 'klangwerk', name: 'Klangwerk', topic: 'Electroacoustic studio', patternSlug: 'maelstrom', pattern: maelstrom, paletteName: 'Signal green, dark', palette: ['#08090B', '#E9E9E4', '#00E58A', '#5A6068', '#14161A'], seed: 'dir-kl' },
  { slug: 'mesura', name: 'Mesura', topic: 'Structural engineering', patternSlug: 'caltrop', pattern: caltrop, paletteName: 'Primer orange', palette: ['#F2F1ED', '#15171A', '#FF6A00', '#8C9096', '#D9D8D2'], seed: 'dir-me' },
  { slug: 'seconde', name: 'Seconde', topic: 'Sports timing', patternSlug: 'tailoff', pattern: tailoff, paletteName: 'Finish magenta', palette: ['#F7F7F5', '#101010', '#FF0059', '#8E8E8E', '#D6D6D2'], seed: 'dir-se' },
  { slug: 'cobalt-works', name: 'Cobalt Works', topic: 'Dry pigment mill', patternSlug: 'tinting', pattern: tinting, paletteName: 'Cobalt', palette: ['#F6F4EE', '#14161C', '#0033CC', '#7E8494', '#DEDBD0'], seed: 'dir-co' },
  { slug: 'nullpunkt', name: 'Nullpunkt', topic: 'Calibration laboratory', patternSlug: 'ring', pattern: ring, paletteName: 'One red, four times', palette: ['#FFFFFF', '#0A0A0A', '#E10600', '#9EA2A6', '#DBDBD9'], seed: 'dir-np' },
  { slug: 'sammlung-weiss', name: 'Sammlung Weiss', topic: 'Private art collection', patternSlug: 'quire', pattern: quire, paletteName: 'Achromatic bone', palette: ['#EFEDE6', '#111111', '#6E6A60', '#CFCBBF', '#EAE7DD'], seed: 'dir-sw' },
  { slug: 'frequenz', name: 'Frequenz 94,6', topic: 'Free radio station', patternSlug: 'ribline', pattern: ribline, paletteName: 'On-air amber', palette: ['#121014', '#F2EFE6', '#FFA200', '#6B6560', '#1D1A20'], seed: 'dir-fq' },
  { slug: 'fonds-aubert', name: 'Fonds Aubert', topic: 'Private records archive', patternSlug: 'stitch', pattern: stitch, paletteName: 'Archive olive', palette: ['#F0F0E8', '#1A1C18', '#4C6B2F', '#8C8F84', '#DEDAD4'], seed: 'dir-fa' },
  { slug: 'passform', name: 'Passform', topic: 'Bespoke tailoring', patternSlug: 'damier', pattern: damier, paletteName: 'Thread rust', palette: ['#F5F1EA', '#191512', '#C1440E', '#9A9086', '#E5DFD4'], seed: 'dir-pf' },
  { slug: 'meterware', name: 'Meterware', topic: 'Weaving mill', patternSlug: 'plait', pattern: plait, paletteName: 'Yarn indigo', palette: ['#EFEBE1', '#14161F', '#2B3FAE', '#8E8A7E', '#DCD7C9'], seed: 'dir-mw' },
  { slug: 'sichtbeton', name: 'Sichtbeton', topic: 'Fair-faced concrete', patternSlug: 'chase', pattern: chase, paletteName: 'Safety orange', palette: ['#E9E9E6', '#131313', '#FF5A00', '#8B8B87', '#D3D3CE'], seed: 'dir-sb' },
  { slug: 'kaella', name: 'Källa', topic: 'Municipal water utility', patternSlug: 'tidering', pattern: tidering, paletteName: 'Still water', palette: ['#F2F6F6', '#0F1A1D', '#00A6A6', '#7E9296', '#DCE7E7'], seed: 'dir-ka' },
  { slug: 'nachtzug', name: 'Nachtzug', topic: 'Sleeper trains', patternSlug: 'rungs', pattern: rungs, paletteName: 'Lamplight gold', palette: ['#0B0E1A', '#EDE8DA', '#E0A83C', '#545C74', '#141827'], seed: 'dir-nz' },
  { slug: 'lichtfeld', name: 'Lichtfeld', topic: 'Lighting design', patternSlug: 'radiance', pattern: radiance, paletteName: 'Warm white', palette: ['#0A0A0A', '#FAFAF5', '#F5E663', '#6A6A64', '#151515'], seed: 'dir-lf' },
  { slug: 'silbersalz', name: 'Silbersalz', topic: 'Photographic laboratory', patternSlug: 'grainfield', pattern: grainfield, paletteName: 'Safelight red', palette: ['#EDEBE4', '#101010', '#C8102E', '#8A8880', '#D9D6CC'], seed: 'dir-ss' },
  { slug: 'kryss', name: 'Kryss', topic: 'Wayfinding studio', patternSlug: 'metro', pattern: metro, paletteName: 'Directional green', palette: ['#F4F4F1', '#131416', '#00843D', '#8E9094', '#E2E2DE'], seed: 'dir-ky' },

  // Swiss-bold set: poster-size display type, the full viewport as the
  // measure, no photography and no rules (sections divide by a change of
  // ground or a full-bleed pattern field).
  { slug: 'salzhaus', name: 'Salzhaus', topic: 'Contemporary dance company', patternSlug: 'pivot', pattern: pivot, paletteName: 'Basel scarlet', palette: ['#F3F1EC', '#101014', '#FF2D00', '#8B8B85', '#DEDCD4'], seed: 'bold-sz' },
  { slug: 'zwoelfton', name: 'Zwölfton', topic: 'New-music ensemble', patternSlug: 'raking', pattern: raking, paletteName: 'Acid yellow, night', palette: ['#0B0B0F', '#EFEEE7', '#E8FF00', '#6D6D66', '#22222A'], seed: 'bold-zt' },
  { slug: 'bureau-vektor', name: 'Bureau Vektor', topic: 'Public statistics office', patternSlug: 'gutter', pattern: gutter, paletteName: 'Ultramarine', palette: ['#FFFFFF', '#0C0D10', '#1F3CFF', '#8A8F99', '#E8EAF0'], seed: 'bold-bv' },
  { slug: 'presse-neun', name: 'Presse Neun', topic: 'Screenprint workshop', patternSlug: 'swapcut', pattern: swapcut, paletteName: 'Fluoro pink', palette: ['#F4F2EA', '#141210', '#FF2D78', '#8C8A82', '#E2DFD4'], seed: 'bold-p9' },
  { slug: 'isobar', name: 'Isobar', topic: 'Meteorological service', patternSlug: 'annulus', pattern: annulus, paletteName: 'Storm violet', palette: ['#E9EDF0', '#0D1418', '#6B2BE0', '#7C8792', '#D3DAE1'], seed: 'bold-ib' },
  { slug: 'beaufort', name: 'Ateliers Beaufort', topic: 'Sail loft', patternSlug: 'sail', pattern: sail, paletteName: 'Sea green, navy', palette: ['#0B1B2B', '#EFEAE0', '#00B37A', '#6E808F', '#14293D'], seed: 'bold-bf' },
  { slug: 'grafit', name: 'Grafit', topic: 'Pencil works', patternSlug: 'reeding', pattern: reeding, paletteName: 'Pencil ochre', palette: ['#EEEDE7', '#131313', '#E5A000', '#8A887F', '#DCDAD0'], seed: 'bold-gf' },
  { slug: 'falzbogen', name: 'Falzbogen', topic: 'Trade bookbindery', patternSlug: 'miura', pattern: miura, paletteName: 'Bookcloth crimson', palette: ['#F2EEE4', '#171310', '#B0003A', '#8B857A', '#E0DACB'], seed: 'bold-fb' },
  { slug: 'kubus', name: 'Kubus', topic: 'Kunsthalle', patternSlug: 'lintel', pattern: lintel, paletteName: 'Achromatic', palette: ['#080808', '#FAFAF8', '#8A8A86', '#1C1C1C'], seed: 'bold-kb' },
  { slug: 'tiefsee', name: 'Tiefsee', topic: 'Deep-sea research program', patternSlug: 'dipole', pattern: dipole, paletteName: 'Bioluminescent cyan', palette: ['#04121A', '#E6EEF0', '#00D2E0', '#5D7480', '#0A1F2B'], seed: 'bold-ts' },

  // Swiss-bold with generated imagery: scenes run full-bleed beside the
  // pattern bands; cut-out objects are composited onto a pattern plate drawn
  // on a transparent ground. Palettes match data/image-prompts.json.
  { slug: 'glockenhof', name: 'Glockenhof', topic: 'Bell foundry', patternSlug: 'cupola', pattern: cupola, paletteName: 'Bronze, night', palette: ['#141210', '#F0EAD8', '#C89B3C', '#7C736A', '#221D18'], seed: 'img-gh' },
  { slug: 'orgelwerk', name: 'Orgelwerk', topic: 'Pipe organ builders', patternSlug: 'battlement', pattern: battlement, paletteName: 'Organ pine', palette: ['#F1EFE7', '#141614', '#1D6F5C', '#87887F', '#DFDCD0'], seed: 'img-ow' },
  { slug: 'marais-blanc', name: 'Marais Blanc', topic: 'Sea salt works', patternSlug: 'clipcorner', pattern: clipcorner, paletteName: 'Salt-pan rose', palette: ['#FBFAF7', '#171519', '#C2456B', '#8C8A90', '#E4E1DC'], seed: 'img-mb' },
  { slug: 'ringmark', name: 'Ringmark', topic: 'Bird observatory', patternSlug: 'birdsmouth', pattern: birdsmouth, paletteName: 'Dune lichen', palette: ['#EFEDE3', '#16180F', '#6B7F1E', '#8C8B7C', '#DEDCCE'], seed: 'img-rm' },
  { slug: 'kupferwalz', name: 'Kupferwalz', topic: 'Copper rolling mill', patternSlug: 'rolloff', pattern: rolloff, paletteName: 'Copper, mill night', palette: ['#15100E', '#EFE7DE', '#B4552D', '#7A736D', '#231A16'], seed: 'img-kw' },
  { slug: 'purpurhaus', name: 'Purpurhaus', topic: 'Natural dye works', patternSlug: 'prismfold', pattern: prismfold, paletteName: 'Cochineal plum', palette: ['#F4F0E6', '#191317', '#5E2750', '#8B8279', '#E2DBCB'], seed: 'img-ph' },

  // The idioms set: one visual language per site, none of them Swiss, and no
  // photographs: the patterns are the imagery, each a design no earlier site
  // used.
  { slug: 'betonpark', name: 'Betonpark', topic: 'Indoor skatepark', patternSlug: 'bracket', pattern: bracket, paletteName: 'Concrete and safety green', palette: ['#EDEDEA', '#0B0B0B', '#2BD32B', '#7A7A76', '#D2D2CC'], seed: 'set-bp' },
  { slug: 'revue-marges', name: 'Revue Marges', topic: 'Literary quarterly', patternSlug: 'moleskin', pattern: moleskin, paletteName: 'Cream and oxblood', palette: ['#F6F1E7', '#1E1A17', '#7A1F2B', '#8A8177', '#DED4C3'], seed: 'set-rm' },
  { slug: 'orbital-lounge', name: 'Orbital', topic: 'Listening bar', patternSlug: 'disque', pattern: disque, paletteName: 'Space-age orange', palette: ['#FFF4E3', '#1D1B2B', '#FF6B2C', '#0FA3B1', '#8B8478'], seed: 'set-ol' },
  { slug: 'pixelmelt', name: 'Pixelmelt', topic: 'Independent game studio', patternSlug: 'spectrum', pattern: spectrum, paletteName: 'Vapor pink and cyan', palette: ['#12081F', '#F4EEFF', '#FF5FD2', '#38E0FF', '#7C6F94'], seed: 'set-pm' },
  { slug: 'birk-mobler', name: 'Birk Mobler', topic: 'Furniture maker', patternSlug: 'ninon', pattern: ninon, paletteName: 'Oak on white', palette: ['#FAFAF8', '#1F1F1D', '#B8895A', '#9A9994', '#E6E4DF'], seed: 'set-bm' },
  { slug: 'werkstatt-neun', name: 'Werkstatt Neun', topic: 'Design school workshop', patternSlug: 'bauhaus', pattern: bauhaus, paletteName: 'Three primaries', palette: ['#F2EFE6', '#141414', '#D7263D', '#1F5FBF', '#F2C230'], seed: 'set-wn' },
  { slug: 'hotel-meridien', name: 'Hotel Meridien', topic: 'Grand hotel', patternSlug: 'capstan', pattern: capstan, paletteName: 'Deco gold on green', palette: ['#0E1F1B', '#F3EBD9', '#C9A24B', '#7E8A82', '#1B2F2A'], seed: 'set-hm' },
  { slug: 'kiln-aoi', name: 'Kiln Aoi', topic: 'Ceramics studio', patternSlug: 'raku', pattern: raku, paletteName: 'Clay and moss', palette: ['#EFEAE2', '#2B2926', '#9C6B4E', '#6F7A5C', '#A19C93'], seed: 'set-ka' },
  { slug: 'nullsec', name: 'Nullsec', topic: 'Security research collective', patternSlug: 'combed', pattern: combed, paletteName: 'Terminal green', palette: ['#050807', '#D9F5E3', '#2CFF7A', '#5C7365', '#0E1713'], seed: 'set-ns' },
  { slug: 'bonbon-club', name: 'Bonbon Club', topic: 'After-school club', patternSlug: 'shatter', pattern: shatter, paletteName: 'Memphis sweets', palette: ['#FFF8E7', '#1B1B1F', '#FF4F7B', '#2FC4B2', '#FFC53D', '#6C5CE7'], seed: 'set-bc' },
  { slug: 'sable-and-pine', name: 'Sable and Pine', topic: 'Interiors atelier', patternSlug: 'grosgrain', pattern: grosgrain, paletteName: 'Mustard, olive, terracotta', palette: ['#F3EBDD', '#2A241E', '#D9A428', '#5F6B3A', '#C6633B', '#8F8577'], seed: 'set-sp' },
  { slug: 'harbour-ledger', name: 'The Harbour Ledger', topic: 'Local newspaper', patternSlug: 'wale', pattern: wale, paletteName: 'Newsprint', palette: ['#F7F5EE', '#111111', '#B3261E', '#6B6B66', '#DCD9CF'], seed: 'set-hl' },
  { slug: 'fennel-and-thyme', name: 'Fennel and Thyme', topic: 'Herbal apothecary', patternSlug: 'spit', pattern: spit, paletteName: 'Sage and honey', palette: ['#F4F1E8', '#22302A', '#5F8063', '#C9A16F', '#8E9689', '#DDE3D8'], seed: 'set-ft' },
  { slug: 'norrbolt', name: 'Norrbolt', topic: 'Fastener wholesaler', patternSlug: 'gesso', pattern: gesso, paletteName: 'Safety yellow, steel', palette: ['#F1F1EE', '#15171A', '#FFC300', '#6F7378', '#A9AEB4'], seed: 'set-nb' },
  { slug: 'lantern-rock', name: 'Lantern Rock', topic: 'Lighthouse inn', patternSlug: 'bowsprit', pattern: bowsprit, paletteName: 'Navy and signal red', palette: ['#F5F3EC', '#0F2440', '#C8102E', '#7B8794', '#D9DFE5'], seed: 'set-lr' },
  { slug: 'xerox-riot', name: 'Xerox Riot', topic: 'Zine fair', patternSlug: 'mirrorblack', pattern: mirrorblack, paletteName: 'Photocopy red', palette: ['#F4F4F0', '#0A0A0A', '#FF1E1E', '#6B6B6B', '#CFCFC8'], seed: 'set-xr' },
  { slug: 'tidy-ledger', name: 'Tidy Ledger', topic: 'Bookkeeping app', patternSlug: 'sound', pattern: sound, paletteName: 'Violet and mint', palette: ['#FBFAFF', '#1B1A2E', '#6D5DF5', '#2ED3A5', '#7D7A94', '#ECEAFB'], seed: 'set-tl' },
  { slug: 'atelier-vane', name: 'Atelier Vane', topic: 'Fashion label', patternSlug: 'cornerbite', pattern: cornerbite, paletteName: 'Black on white', palette: ['#FFFFFF', '#000000', '#8C8C8C', '#E4E4E4'], seed: 'set-av' },
  { slug: 'mesa-outfitters', name: 'Mesa Outfitters', topic: 'Desert trail guides', patternSlug: 'fractal', pattern: fractal, paletteName: 'Terracotta and sky', palette: ['#F7EEDF', '#2B1F16', '#C75B2A', '#3B8EA5', '#8C7E6E', '#E4D5BE'], seed: 'set-mo' },
  { slug: 'velo-criterium', name: 'Velo Criterium', topic: 'City-center cycling race', patternSlug: 'pinwheel', pattern: pinwheel, paletteName: 'Lime and electric blue', palette: ['#0B1220', '#F2F5FF', '#C6FF3D', '#2F6BFF', '#6C7590'], seed: 'set-vc' },

  // The minimal set: sites for the businesses that most often need one (a
  // restaurant, a dentist, a plumber), each on its own layout, with the
  // pattern as the only ornament. Seven carry one or two cut-outs generated
  // on gpt-image-2.5-flare; the rest have no pictures at all.
  { slug: 'osteria-lume', name: 'Osteria Lume', topic: 'Neighborhood Italian restaurant', patternSlug: 'midnightblossoms', pattern: midnightblossoms, paletteName: 'Linen and tomato', palette: ['#F7F2E9', '#1E1B18', '#C8402B', '#8A8275', '#E7DFD1', '#6B7A3A'], seed: 'min-ol' },
  { slug: 'morrow-coffee', name: 'Morrow Coffee', topic: 'Coffee shop and roastery', patternSlug: 'goldencoil', pattern: goldencoil, paletteName: 'Oat milk and espresso', palette: ['#F3EEE6', '#231A14', '#B06A3B', '#8D8177', '#E3DACD'], seed: 'min-mc' },
  { slug: 'crumb-bakehouse', name: 'Crumb Bakehouse', topic: 'Neighborhood bakery', patternSlug: 'wovenkhaki', pattern: wovenkhaki, paletteName: 'Flour and crust', palette: ['#FBF7EF', '#2A2118', '#C98B3A', '#9A8F80', '#EDE3D1'], seed: 'min-cb' },
  { slug: 'clearwater-dental', name: 'Clearwater Dental', topic: 'Family dental practice', patternSlug: 'softbubbles', pattern: softbubbles, paletteName: 'Mint and slate', palette: ['#F6FAF9', '#14232B', '#2BA59A', '#7F9096', '#DDEBE8'], seed: 'min-cd' },
  { slug: 'whitlock-ames', name: 'Whitlock & Ames', topic: 'Employment and family law firm', patternSlug: 'diagonalweave', pattern: diagonalweave, paletteName: 'Parchment and oxford', palette: ['#F4F2EC', '#141B26', '#2F4B7C', '#8B8A85', '#DEDBD2'], seed: 'min-wa' },
  { slug: 'tally-and-co', name: 'Tally & Co.', topic: 'Bookkeeping and tax accountants', patternSlug: 'cornernotch', pattern: cornernotch, paletteName: 'Ledger green', palette: ['#FAFAF7', '#151A16', '#1F7A4D', '#8E948F', '#E4E9E4'], seed: 'min-tc' },
  { slug: 'northgate-homes', name: 'Northgate Homes', topic: 'Independent real estate agent', patternSlug: 'isometricblocks', pattern: isometricblocks, paletteName: 'Brick and slate', palette: ['#F6F4F1', '#1B1D22', '#B5523B', '#858A92', '#E3E1DC'], seed: 'min-nh' },
  { slug: 'fringe-salon', name: 'Fringe', topic: 'Hair salon', patternSlug: 'marbledarcs', pattern: marbledarcs, paletteName: 'Blush and charcoal', palette: ['#FAF5F2', '#1F1A1C', '#D96C7B', '#968A8E', '#EFE3E0'], seed: 'min-fs' },
  { slug: 'stropline-barbers', name: 'Stropline Barbers', topic: 'Barbershop', patternSlug: 'tidewashbands', pattern: tidewashbands, paletteName: 'Barber night', palette: ['#121417', '#F1EDE4', '#D63A2F', '#6F737A', '#1D2126'], seed: 'min-sb' },
  { slug: 'stillpoint-yoga', name: 'Stillpoint Yoga', topic: 'Yoga studio', patternSlug: 'spiralrosette', pattern: spiralrosette, paletteName: 'Clay and sage', palette: ['#F5F1EA', '#2A2A26', '#7C8C6E', '#A39C92', '#E6E0D5', '#C0795A'], seed: 'min-sy' },
  { slug: 'forge-strength', name: 'Forge Strength', topic: 'Strength and conditioning gym', patternSlug: 'quarterburst', pattern: quarterburst, paletteName: 'Chalk and ember', palette: ['#F0F0ED', '#121212', '#FF5A1F', '#8C8C88', '#DADAD5'], seed: 'min-fg' },
  { slug: 'northside-plumbing', name: 'Northside Plumbing', topic: 'Plumbing and heating contractor', patternSlug: 'truchetrings', pattern: truchetrings, paletteName: 'Pipe blue and copper', palette: ['#F5F7F9', '#0D1B2A', '#1565C0', '#C46B2E', '#8A96A3', '#E1E7ED'], seed: 'min-np' },
  { slug: 'fernhill-gardens', name: 'Fernhill Gardens', topic: 'Landscaping and garden design', patternSlug: 'teardropleaves', pattern: teardropleaves, paletteName: 'Moss and loam', palette: ['#F3F2EB', '#1E2419', '#4E7A3A', '#9A9A8A', '#E1E3D6'], seed: 'min-fh' },
  { slug: 'maple-street-vets', name: 'Maple Street Vets', topic: 'Veterinary clinic', patternSlug: 'tealboomerang', pattern: tealboomerang, paletteName: 'Teal and apricot', palette: ['#FBF8F3', '#1D2A30', '#1B8A8F', '#F29E6D', '#8C979B', '#E8EFEE'], seed: 'min-ms' },
  { slug: 'little-acorns', name: 'Little Acorns', topic: 'Nursery and daycare', patternSlug: 'quartercirclequilt', pattern: quartercirclequilt, paletteName: 'Crayon soft', palette: ['#FFF9F0', '#2B2A33', '#F28C6B', '#6CB8A8', '#F5C85B', '#A9A2B0'], seed: 'min-la' },
  { slug: 'the-glasshouse', name: 'The Glasshouse', topic: 'Wedding and event venue', patternSlug: 'randomrings', pattern: randomrings, paletteName: 'Champagne and evergreen', palette: ['#F8F5EF', '#1B2420', '#2F5D4E', '#B89B6A', '#E8E2D6'], seed: 'min-gh' },
  { slug: 'wild-stem', name: 'Wild Stem', topic: 'Florist', patternSlug: 'midnightconfetti', pattern: midnightconfetti, paletteName: 'Peony and stem', palette: ['#FBF7F4', '#22261E', '#C94F6D', '#5E7B4C', '#9C958F', '#EFE6E2'], seed: 'min-ws' },
  { slug: 'dog-eared-books', name: 'Dog-Eared Books', topic: 'Independent bookshop', patternSlug: 'patternsampler', pattern: patternsampler, paletteName: 'Paperback', palette: ['#F6F1E7', '#1C1A17', '#2B59A3', '#8C857A', '#E4DCCB', '#D9A43B'], seed: 'min-db' },
  { slug: 'copperline-brewing', name: 'Copperline Brewing', topic: 'Brewery and taproom', patternSlug: 'sunsetrings', pattern: sunsetrings, paletteName: 'Hops and amber', palette: ['#161A17', '#EFE8D8', '#E0A33B', '#8DB255', '#6D706A', '#232924'], seed: 'min-cl' },
  { slug: 'align-physio', name: 'Align Physio', topic: 'Physiotherapy clinic', patternSlug: 'warpribbon', pattern: warpribbon, paletteName: 'Clinic blue and coral', palette: ['#F7F9FB', '#13202E', '#2F6FDE', '#F2765C', '#8795A5', '#E3EAF2'], seed: 'min-ap' },
  { slug: 'quiet-harbor', name: 'Quiet Harbor Counseling', topic: 'Private therapy practice', patternSlug: 'contourlines', pattern: contourlines, paletteName: 'Fog', palette: ['#F4F3F0', '#2C2E33', '#5C7A8C', '#9EA1A6', '#E6E5E0'], seed: 'min-qh' },
  { slug: 'maren-holt', name: 'Maren Holt', topic: 'Independent brand strategist', patternSlug: 'dashfield', pattern: dashfield, paletteName: 'Ink and signal', palette: ['#FFFFFF', '#111111', '#3B5BDB', '#8C8C8C', '#EDEDED'], seed: 'min-mh' },
  { slug: 'parallel-studio', name: 'Parallel Studio', topic: 'Design and marketing agency', patternSlug: 'paintscribble', pattern: paintscribble, paletteName: 'Studio violet', palette: ['#EDEBE6', '#151515', '#6246EA', '#8A8780', '#D8D5CD'], seed: 'min-ps' },
  { slug: 'relay', name: 'Relay', topic: 'Booking software for small businesses', patternSlug: 'spinningrings', pattern: spinningrings, paletteName: 'Indigo and peach', palette: ['#FCFCFE', '#161A33', '#4F46E5', '#FF9B71', '#7C8094', '#EEF0FA'], seed: 'min-re' },
  { slug: 'common-table', name: 'Common Table', topic: 'Community food bank', patternSlug: 'horizonbands', pattern: horizonbands, paletteName: 'Harvest', palette: ['#FFF8EC', '#22201C', '#E0642E', '#3E7C59', '#9A9285', '#F1E6D2'], seed: 'min-ct' },
  { slug: 'spruce-cleaning', name: 'Spruce', topic: 'Home cleaning service', patternSlug: 'crosslattice', pattern: crosslattice, paletteName: 'Fresh', palette: ['#F9FAF7', '#1A2322', '#5BAF7A', '#F2C94C', '#8E9894', '#E6ECE7'], seed: 'min-sc' },
  { slug: 'kessler-auto', name: 'Kessler Auto', topic: 'Independent auto repair garage', patternSlug: 'meridianhatch', pattern: meridianhatch, paletteName: 'Shop floor', palette: ['#EDECE8', '#16181B', '#D7372B', '#75797F', '#D5D3CE'], seed: 'min-ka' },
  { slug: 'linden-guesthouse', name: 'The Linden Guesthouse', topic: 'Bed and breakfast', patternSlug: 'diamondember', pattern: diamondember, paletteName: 'Linden and terracotta', palette: ['#F5F2EA', '#25271F', '#A45A3C', '#6F7D5C', '#9C978C', '#E7E1D3'], seed: 'min-lg' },
  { slug: 'cadence-music', name: 'Cadence Music School', topic: 'Music lessons for all ages', patternSlug: 'concentricrings', pattern: concentricrings, paletteName: 'Keys and vermilion', palette: ['#FAF8F3', '#1B1A24', '#E0533C', '#8D8A93', '#E9E6DF'], seed: 'min-cm' },
  { slug: 'commons-cowork', name: 'Commons', topic: 'Coworking space', patternSlug: 'rabbet', pattern: rabbet, paletteName: 'Ochre desk', palette: ['#F1F0EC', '#1B1B1D', '#D9A21B', '#8A8A85', '#DCDAD2'], seed: 'min-cw' },
];
