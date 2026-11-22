---
title: Power & thermal
sidebar_label: Power & thermal
sidebar_position: 3
description: Power budgeting, thermal resistance and heatsink selection.
---

# Power & thermal

## Power budget worksheet

Fill this in before choosing a power supply. The peak column is what matters — a supply
that is fine at idle will brown out on a workload burst.

| Rail | Idle | Typical | Peak | Notes |
| --- | --- | --- | --- | --- |
| SoC core | TODO W | TODO W | TODO W | NPU load raises this sharply |
| DRAM | TODO W | TODO W | TODO W | |
| Peripherals | TODO W | TODO W | TODO W | Wi-Fi, NVMe, USB devices |
| **Total** | TODO W | TODO W | TODO W | Add 30 % headroom |

## Thermal model

```
T_junction = T_ambient + P × (R_th_jc + R_th_interface + R_th_heatsink)
```

| Term | Meaning | Typical |
| --- | --- | --- |
| `R_th_jc` | Junction to case, from the datasheet | TODO °C/W |
| `R_th_interface` | Thermal pad or paste | 0.5–2 °C/W |
| `R_th_heatsink` | Heatsink to ambient | Depends on airflow |
| `T_junction max` | Silicon limit | TODO °C |

:::warning Design for the enclosure, not the bench
A board that runs at 55 °C on an open desk will exceed its limit inside a sealed IP65 box.
Measure inside the real enclosure, at the real ambient, under the real workload.
:::

## Heatsink selection

| Scenario | Recommendation |
| --- | --- |
| Bench / evaluation | Aluminium heatsink, 20 × 20 × 10 mm, natural convection |
| Fanless enclosure, ≤ 45 °C ambient | Heatsink thermally bonded to the enclosure wall |
| Sealed box, > 45 °C ambient | Heat pipe to an external surface, or throttle the workload |
| High sustained NPU load | Active cooling is usually unavoidable |

## Throttling behaviour

At `T_junction` above the trip point the SoC reduces frequency. You can observe it:

```bash
cat /sys/class/thermal/thermal_zone*/temp
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq
```

A throttling board is not a defective board — it is a thermal design that has not been
finished. Say so in your documentation rather than hiding it.
