---
title: Hardware
sidebar_label: Hardware
sidebar_position: 3
description: Pinout, power sequencing, mechanical dimensions and thermal design notes.
---

# Hardware

This page is what a carrier-board designer reads before drawing a schematic. It must be
complete enough that they do not have to email us.

## Mechanical

| Item | Value |
| --- | --- |
| Module dimensions | TODO × TODO mm |
| Board thickness | TODO mm |
| Connector type | TODO (e.g. 2 × 100-pin board-to-board, 0.4 mm pitch) |
| Mating height | TODO mm |
| Mounting holes | TODO × M2.5 |

![Mechanical drawing placeholder](/img/logo.svg)

## Pinout

Provide the pinout as a **downloadable table**, not only as an image. People search it.

| Pin | Name | Type | Default function | Alternate | Voltage domain |
| --- | --- | --- | --- | --- | --- |
| 1 | TODO | PWR | VCC_IN | — | TODO |
| 2 | TODO | IO | UART2_TX | GPIO | 3.3 V |
| 3 | TODO | IO | I2C4_SCL | GPIO | 1.8 V |

## Power

### Input requirements

| Rail | Min | Typ | Max | Ripple |
| --- | --- | --- | --- | --- |
| VCC_IN | TODO | TODO | TODO | TODO mV |

### Power-up sequence

1. Apply VCC_IN.
2. Wait for `PWR_ON` to be asserted high (TODO ms).
3. Release `RESET_N` at least TODO ms after all rails are stable.

:::danger Do not back-feed
Driving any IO pin before VCC_IN is applied will damage the SoC. Use a level shifter or a
series resistor on all externally driven pins during bring-up.
:::

## Interfaces

### MIPI CSI

| Port | Lanes | Max clock | Notes |
| --- | --- | --- | --- |
| CSI0 | 4 | TODO MHz | TODO |

### Ethernet

TODO — magnetics, PHY strapping, LED behaviour.

### PCIe

TODO — lane count, reference clock, reset timing.

## Thermal

| Condition | Junction temp | Notes |
| --- | --- | --- |
| Idle, 25 °C ambient, no heatsink | TODO °C | |
| Full CPU load, 25 °C ambient, no heatsink | TODO °C | Throttles after TODO s |
| Full CPU load, 25 °C ambient, with heatsink | TODO °C | |

Recommended heatsink: TODO. Recommended TIM thickness: TODO mm.

## Design checklist

Before you send a carrier board to fab:

- [ ] All unused IO pins have a defined state (pull-up / pull-down / not connected)
- [ ] VCC_IN bulk capacitance ≥ TODO µF
- [ ] Reset and power-on timing verified against the sequence above
- [ ] Thermal path designed for the worst-case ambient, not the datasheet ambient
- [ ] Impedance controlled on USB / PCIe / MIPI / Ethernet pairs
- [ ] ESD protection on all external connectors
