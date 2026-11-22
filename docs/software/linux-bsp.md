---
displayed_sidebar: docsSidebar
title: Linux BSP
sidebar_label: Linux BSP
sidebar_position: 2
description: Kernel, U-Boot, device tree and the build system.
---

# Linux BSP

## Repository layout

```
industio-bsp/
├── kernel/               # Linux kernel + INDUSTIO defconfigs
├── u-boot/               # bootloader
├── buildroot/            # rootfs recipes
├── device/industio/      # device tree, HAL, camera tuning
└── tools/                # flashing, packaging, signing
```

## Get the source

```bash
mkdir industio && cd industio
repo init -u https://github.com/industio/manifest.git -b main
repo sync -j$(nproc)
```

## Build

```bash
./build.sh lunch          # interactive board selection
./build.sh kernel         # kernel only
./build.sh all            # full image
./build.sh otapackage     # OTA update package
```

Output lands in `output/<board>/images/`.

## Device tree

Board-specific device trees live in `kernel/arch/arm64/boot/dts/rockchip/`. INDUSTIO boards
use the naming convention:

```
id-<product>-<variant>.dts
```

To add a peripheral, edit the `.dts`, not the common `.dtsi`. Anything you put in the
`.dtsi` affects every board in the family and will eventually break one of them.

```dts
/* Example: enable I2C4 and attach an RTC */
&i2c4 {
    status = "okay";
    clock-frequency = <400000>;

    rtc@51 {
        compatible = "nxp,pcf8563";
        reg = <0x51>;
    };
};
```

## Rebuild only the kernel

```bash
./build.sh kernel
# then push just the new Image + dtb, fastest loop during driver work
adb push output/<board>/kernel/Image /boot/
adb push output/<board>/kernel/*.dtb /boot/
adb reboot
```

## Common tasks

| Task | Command |
| --- | --- |
| Change the default hostname | `/etc/hostname`, then `hostnamectl set-hostname` |
| Enable a UART | add `&uartN { status = "okay"; };` to the board `.dts` |
| Set a static IP | `nmcli con mod ...` — see [first boot](/getting-started/first-boot#network) |
| Read kernel log from the last boot | `journalctl -k -b -1` |

## Debugging

```bash
dmesg -w                       # follow kernel messages
cat /proc/device-tree/model    # confirm which DT actually booted
i2cdetect -y 4                 # scan I2C bus 4 for devices
```

If a peripheral "does not exist", check `/proc/device-tree/model` first: a mismatched
device tree is a more common cause than broken hardware.
