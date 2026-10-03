// Trending — just a list of slugs pointing at products that already exist in
// products.js / luxuryFormals.js / culture.js / jewelry.js / accessories.js.
// Kept as slugs (not full duplicated objects) so there's only ONE source of
// truth per product — if you edit a product's price/image in its real file,
// the trending section updates automatically too.
//
// To change what's trending: just edit this list of slugs.

export const trendingSlugs = [
  "3-piece-embroidered-raw-silk-suit-1",       // luxuryPret
  "3-piece-embroidered-chiffon-suit-1",        // luxuryFormals
  "myelle-pendant",                            // jewelry
  "classic-quilted-handbag",                   // accessories
  "3-piece-printed-khaddar-suit-culture-1",    // culture
  "3-piece-embroidered-palachi-suit-1",        // luxuryPret
  "rhae-earrings",                             // jewelry
  "crystal-crescent-clutch",                   // accessories
  "3-piece-hand-embellished-raw-silk-suit-1",  // luxuryFormals
  "3-piece-embroidered-lawn-suit-culture-1",   // culture
];