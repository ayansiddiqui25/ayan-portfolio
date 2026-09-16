# Penalty artwork

Generated with the built-in ImageGen tool. Transparent sprite alpha is preserved. All final assets are in `public/game-assets/`.

## stadium-field-v2.png

Final prompt: Use this stadium artwork as the style and geometry reference. Make a WIDE 2:1 website hero background 2048x1024 with the entire depicted penalty setup scaled down and moved into the RIGHT two thirds. Goal center at x=73%, goal front feet y=43%, crossbar y=25%, goal mouth x=61% to85%. Penalty spot x=73% y=72%. Penalty box front corners x=46%,100% at y=86%, six yard box front at y=55%. Camera still looks straight at goal, clean connected symmetric trapezoidal penalty box aligned with goal. Extend uninterrupted grass and distant stands to LEFT, left 40% mostly deep shaded forest green field for readable cream website heading overlay. Keep field and stadium continuous across full image, no panels or dividing seam. Pixel-art night stadium, stationary subtle crowd, small floodlight lamp heads ONLY peeking above stadium roof with support poles entirely occluded. No players, no balls, no words, no logos, no UI. Maintain straight connected white box markings and centered spot in right penalty box. No lines in leftmost 35% foreground. Restrained green palette with warm ivory lights. Keep lines thin, no gradients painted as separate blocks.

The returned artwork is 1774×887. Animation anchors use the actual artwork (goal center 71.55%, goal line 41.3%, spot 71.6%/63.9%), not the requested coordinates.

## siddiqui-kick-sheet.png

Final prompt: Edit target: this existing 2x2 football player sprite sheet. Preserve EXACT same four poses, exact sprite positions and scale, same 2x2 equal cells, brown hair, blue kit, white socks, black boots, pixel art and transparent alpha background. Change ONLY shirt back typography in EACH of the four frames: add clearly legible white uppercase surname "SIDDIQUI" (S I D D I Q U I) horizontally across upper back, with slightly smaller white number "10" underneath. Make enough room above 10 for the surname while preserving jersey silhouette. No ball, no shadows, no backgrounds, no framing or cell borders. True transparency. This is a production game sprite sheet; matching each existing limb position is essential.

Actual sheet: 1230×1278, four equal cells. Contact uses bottom-left pose; toe alignment is calibrated in `penalty-motion.mjs`.

## keeper-landed.png

Final prompt: Edit target: same purple pixel art goalkeeper on true transparent background. Generate the LANDING pose at the end of this goalkeeper's diving movement, same character face, brown hair, purple long sleeves, black shorts, white gloves, purple socks and black boots. Keep facing to the RIGHT with gloves reaching right, legs trailing left, we will mirror in code. He has landed on his right side on the ground, torso almost horizontal, one forearm braced on the turf (but no turf drawn), knees slightly bent, low resting pose. Entire body silhouette from x=6% to94%, y=58% to88% on a square transparent canvas, no clipping. Same pixel resolution and character scale as input. No ball, no background, no ground, no shadow, no text. Preserve actual transparent alpha.

Actual ground contact occurs at approximately 75.5% of the returned square sprite height. This pose completes the existing ready, launch, airborne, and stretch sequence.
