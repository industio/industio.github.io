---
displayed_sidebar: null
title: Tools
sidebar_label: Tools
sidebar_position: 2
description: Flashing and packaging tools for Windows, Linux and macOS.
---

# Tools

| Tool | Platform | Purpose | Source |
| --- | --- | --- | --- |
| INDUSTIO Flash Tool | Windows 10+ | GUI flashing over USB | [Download](#) |
| `rkdeveloptool` | Linux / macOS | CLI flashing over USB | `github.com/rockchip-linux/rkdeveloptool` |
| balenaEtcher | All | Write image to SD card | [etcher.balena.io](https://etcher.balena.io/) |
| `upgrade_tool` | Linux | Legacy CLI flashing | [Download](#) |

## Install rkdeveloptool (Linux)

```bash
sudo apt install build-essential libusb-1.0-0-dev pkg-config libudev-dev
git clone https://github.com/rockchip-linux/rkdeveloptool
cd rkdeveloptool
autoreconf -i && ./configure && make -j$(nproc)
sudo make install
```

## udev rule (Linux, without sudo)

```bash
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="2207", MODE="0666"' \
  | sudo tee /etc/udev/rules.d/51-industio.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
```

## Serial console

Any USB-UART adapter works. Baud rate depends on the SoC — see
[first boot](/getting-started/first-boot#serial-console).

| Tool | Platform |
| --- | --- |
| `picocom` / `minicom` | Linux / macOS |
| MobaXterm / PuTTY | Windows |
