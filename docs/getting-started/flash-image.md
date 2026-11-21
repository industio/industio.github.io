---
title: Flash an image
sidebar_label: 1. Flash an image
sidebar_position: 2
description: Write an OS image to microSD or eMMC on Windows, Linux and macOS.
---

# Flash an image

You need an image file (`.img.xz`) from the [downloads page](/downloads) and one of the
methods below. Flash to **microSD** first — it is reversible. Only move to eMMC once the
board boots reliably.

## Method A — microSD + balenaEtcher (easiest)

1. Download the `.img.xz` file. Do **not** unzip it.
2. Install [balenaEtcher](https://etcher.balena.io/).
3. Select the image → select the SD card → **Flash**.
4. Wait for "Flash Complete". Eject the card, insert it into the board, power on.

:::danger Make sure you picked the right drive
Etcher overwrites the entire target disk. If you are on Linux, double check with `lsblk`
that you selected `/dev/sdX` (the card) and not `/dev/sda` (your system disk).
:::

## Method B — Linux command line

```bash
# 1. Identify the card (check the SIZE — this is your safety net)
lsblk

# 2. Unmount any auto-mounted partitions
sudo umount /dev/sdX* 2>/dev/null || true

# 3. Write the image (choose ONE)
xzcat image.img.xz | sudo dd of=/dev/sdX bs=4M status=progress conv=fsync

# 4. Flush and eject
sync
sudo eject /dev/sdX
```

## Method C — flash to eMMC over USB (Linux)

```bash
# Put the board into Maskrom mode: hold the MASKROM button, plug in USB, release
sudo rkdeveloptool ld                 # should list the device
sudo rkdeveloptool db  MiniLoaderAll.bin
sudo rkdeveloptool ul  MiniLoaderAll.bin
sudo rkdeveloptool wl 0 image.img     # write from offset 0
sudo rkdeveloptool rd                 # reset
```

## Method D — flash to eMMC over USB (Windows)

Use the **INDUSTIO Flash Tool** (in [Tools](/downloads)): load the image, press *Upgrade*.
It is a GUI wrapper around the same protocol as Method C.

## Verify the write

After the first boot, confirm you are running the image you think you are:

```bash
cat /etc/industio-release
# INDUSTIO Debian 12 — v1.0_20260115 — demo-board
```

If the version string does not match the download page, the write failed or the board
booted from a different medium (eMMC vs SD). This is the single most common support ticket.

## Next

→ [First boot](/getting-started/first-boot)
