---
title: Design guide
sidebar_label: Design guide
sidebar_position: 2
description: Designing a carrier board for an INDUSTIO system-on-module.
---

# Design guide

## 1. Start from the EVB schematic, not from zero

The EVB is a working reference. Copy its power tree, its reset circuit and its connector
placement, then delete what you do not need. Redesigning the power tree from scratch is how
first prototypes die.

## 2. Power tree

| Stage | Requirement | Common mistake |
| --- | --- | --- |
| Input protection | Reverse polarity + TVS + fuse | Fuse rated below inrush current → nuisance trips |
| Bulk capacitance | ≥ TODO µF near the module connector | Capacitors placed far from the load |
| Sequencing | VCC_IN → TODO → TODO | Rails coming up out of order → latch-up |
| Decoupling | Per-rail, close to the pins | Sharing one capacitor across rails |

## 3. High-speed interfaces

| Interface | Impedance | Length matching | Note |
| --- | --- | --- | --- |
| USB 3.0 | 90 Ω differential | ±5 mil intra-pair | No stubs |
| PCIe | 85 Ω differential | ±5 mil intra-pair | AC coupling caps on TX |
| MIPI D-PHY | 100 Ω differential | ±5 mil intra-pair | Keep away from switching regulators |
| RGMII | 50 Ω single-ended | ±50 mil bus skew | Series termination at the source |
| HDMI | 100 Ω differential | ±5 mil intra-pair | ESD diode capacitance < 0.5 pF |

## 4. ESD and EMI

- TVS on every connector that leaves the enclosure.
- Common-mode chokes on Ethernet and USB, placed at the connector.
- Keep the switching regulator's hot loop as small as physically possible.
- Do not route high-speed pairs across a plane split.

## 5. Bring-up order

1. Power only. Measure every rail with no module fitted (or with current limit set low).
2. Fit the module, check the serial console prints U-Boot.
3. Confirm the device tree matches your board (`cat /proc/device-tree/model`).
4. Bring up interfaces one at a time: Ethernet → USB → display → camera → PCIe.
5. Only then run a thermal soak at maximum load for 2 hours.

## 6. Checklist before fab

- [ ] Pinout reviewed against the latest datasheet revision
- [ ] Every unused pin has a defined state
- [ ] Power sequencing verified on paper and with an oscilloscope
- [ ] Impedance targets confirmed with the PCB house
- [ ] Thermal path dimensioned for worst-case ambient
- [ ] Test points on every rail and on the serial console
- [ ] Silkscreen shows the board revision and the date code
