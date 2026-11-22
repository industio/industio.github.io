---
displayed_sidebar: null
title: First boot
sidebar_label: 2. First boot
sidebar_position: 3
description: Serial console, first login, network setup and troubleshooting a board that will not boot.
---

# First boot

## Serial console {#serial-console}

The serial console is your only view of the board when the display does not come up. Set
it up **before** you need it.

| Setting | Value |
| --- | --- |
| Baud rate | 1500000 (RK35xx) / 115200 (others) |
| Data bits | 8 |
| Parity | None |
| Stop bits | 1 |
| Flow control | None |

```bash
# Linux / macOS
sudo picocom -b 1500000 /dev/ttyUSB0

# Windows: use MobaXterm or PuTTY with the settings above
```

You should see U-Boot output within 2 seconds of power-on.

## First login

| OS | Username | Password |
| --- | --- | --- |
| Debian / Ubuntu | `industio` | `industio` |
| Android | — | no login |

:::warning Change the password immediately
These are public default credentials. On any board that will be reachable from a network,
change them before connecting an Ethernet cable:

```bash
passwd
```
:::

## Network {#network}

### Ethernet

```bash
ip a                      # find the interface, usually end0 / eth0
sudo dhclient end0        # get an address over DHCP
ping -c 3 1.1.1.1
```

### Wi-Fi

```bash
nmcli device wifi list
nmcli device wifi connect "SSID" password "your-password"
```

### Update the system

```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Troubleshooting {#troubleshooting}

Work through this in order. Each step eliminates half the remaining possibilities.

| Symptom | Most likely cause | Check |
| --- | --- | --- |
| No LED at all | No power, or wrong adapter | Measure VCC_IN with a multimeter; check the adapter is 12 V not 5 V |
| LED on, nothing on serial | Wrong baud rate, or TX/RX swapped | Try 115200; swap TX and RX |
| U-Boot prints, then hangs | Bad image or bad SD card | Re-flash; try a different card |
| Boots, no HDMI output | Wrong resolution or cable | Try another cable/monitor; check `dmesg \| grep -i hdmi` |
| Boot loops every ~10 s | Undervoltage | Use a supply rated for the peak current |
| Kernel panic about rootfs | Card not fully written | Re-flash with `conv=fsync`, verify SHA256 |

Still stuck? Post the full serial log — from the first line to the last — in the
[community section](/support). A partial log is nearly useless.

## Next

→ [Software & BSP](/software)
