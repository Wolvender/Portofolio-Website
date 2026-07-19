# Add "Mutants of Agyr" project to portfolio

Design approved in chat 2026-07-19. Sources: two OBS recordings + user quest screenshot + itch.io screenshots/trailer.

## Plan

- [ ] Cut clips from recordings with ffmpeg (strip audio, faststart, h264):
  - [ ] `mutants-header.mp4` — video1 0–64s (full run, OBS tail trimmed)
  - [ ] `mutants-gunfeel.mp4` — video1 11–17s (mutant kills, recoil/tracers)
  - [ ] `mutants-quest.mp4` — video1 31–39s (2 kills + 2 QUEST COMPLETE banners)
  - [ ] `mutants-reload.mp4` — video1 17–20.5s (reload, ammo 4/12 → 12/4)
  - [ ] `mutants-ads.mp4` — video2 2.4–4.9s (hip → ADS)
- [ ] Copy media into `public/`:
  - Videos above → `public/Videos/`
  - `Downloads/quest screen.png` → `public/Imgs/mutants-quest-hud.png`
  - itch shots → `mutants-corridor.png`, `mutants-questcomplete.png`, `mutants-radiation.png`
- [ ] Patch `MechanicCard` (ProjectMechanics.jsx): hide the "Visual Code" image panel when
  `mechanic.image` is empty so video-only previews don't show ASSET_NOT_FOUND
- [ ] Add project entry (first position) to `src/data/projectdata.json`:
  - Role: Gameplay, Quest & Combat Programmer · 6 weeks · tags Unity/C#/FPS/3D/Team Project
  - headerVideo + youtube trailer (https://www.youtube.com/embed/JCDUD_LdGnM) + 4 screenshots
  - Mechanics: Gun Feel, ADS, Ammo & Reload, Quest System, Editor Tooling (code from P8Publish scripts)
  - git: https://github.com/mmispot/P8Publish · itch: https://mmispot.itch.io/mutants-of-agyr
- [ ] Verify: `npm run build` passes; check clips visually (contact sheet per clip)
- [ ] Still waiting on user: Unity `Tools > Senna` menu screenshot for the Editor Tooling section

## Review (2026-07-19)

Done:
- 5 clips cut and verified frame-by-frame (ADS/reload cut points corrected after
  first pass — the "vertical gun" pose at v2 t≈3.5s was the reload anim, real ADS
  zoom is at v2 t≈10.7s). Header compressed 22.6 MB → 11.9 MB, audio stripped.
- 4 screenshots staged (user quest HUD + 3 itch.io shots).
- MechanicCard: image panel now conditional — video-only previews span full width.
- projectdata.json: mutants-of-agyr added at position 1 (featured card), youtube
  trailer embed + git/itch links included.
- Verified: JSON parses, `npm run build` passes, all 9 media URLs + page return 200
  via `npm run preview`.

Open:
- Editor Tooling section has code but no media yet — waiting on user's screenshot of
  the Unity `Tools > Senna` menu. Drop into `public/Imgs/` and set it as that
  mechanic's `image`.
