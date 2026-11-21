---
title: Android
sidebar_label: Android
sidebar_position: 4
description: Android build, customisation and certification notes.
---

# Android

## Versions

| Product | Android version | Kernel | Status |
| --- | --- | --- | --- |
| DEMO-BOARD | TODO | TODO | TODO |

## Build

```bash
source build/envsetup.sh
lunch <product>-userdebug
make -j$(nproc)          # or: ./build.sh -A
```

Output: `out/target/product/<product>/`

## Flash

```bash
adb reboot bootloader
fastboot flash boot out/target/product/<product>/boot.img
fastboot flash super out/target/product/<product>/super.img
fastboot reboot
```

## Common customisations

| Goal | Where |
| --- | --- |
| Change the boot logo | `device/industio/<product>/bootanimation.zip` |
| Hide the navigation bar | overlay: `config_showNavigationBar = false` |
| Set a fixed rotation | overlay: `config_initialRotation` |
| Preinstall an APK | `device/industio/<product>/preinstall/` |
| Enable ADB over Ethernet | `setprop service.adb.tcp.port 5555` |

## Notes

- Android images are built per product; there is no generic image.
- GMS (Google Mobile Services) is **not** included. Certification is the customer's
  responsibility unless agreed in the supply contract.
- For kiosk deployments, prefer a dedicated launcher over disabling the system UI.
