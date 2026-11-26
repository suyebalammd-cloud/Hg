# Happy Chick Gaming Hub – Mobile starter

This is a responsive installable web app (PWA) starter designed for Android phones. It shares the futuristic gaming-hub visual style with the Windows project.

## Run / install
1. Host this folder on an HTTPS static host (for example GitHub Pages or another HTTPS web host).
2. Open the hosted URL in Chrome on Android.
3. Open Chrome menu (⋮) and choose **Install app** or **Add to Home screen**.

A service worker enables basic offline loading after the first successful visit.

## Current features
- Mobile-first gaming dashboard
- PC / Retro / Favorites filters
- Search
- Add game entries, saved locally in browser storage
- Optional web link launch for compatible web games/apps

## Limitations
This is a PWA starter, not a native APK. Android does not let a generic web app launch arbitrary installed games reliably. PC games cannot run natively on Android. Retro emulation requires a compatible emulator app and legally obtained game files; deeper emulator integration would need a native Android app and explicit app-specific launch support.
