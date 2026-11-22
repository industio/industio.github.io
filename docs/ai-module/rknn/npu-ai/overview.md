---
displayed_sidebar: ai-module_rknn
slug: /ai-module/rknn/npu-ai
title: NPU & AI SDK
sidebar_label: NPU & AI
sidebar_position: 3
description: Model conversion, inference runtime and performance expectations.
---

# NPU & AI SDK

:::warning Read this before you quote a TOPS number
NPU TOPS is a peak number for one datatype under ideal conditions. Real models get 20–60 %
of peak. Always benchmark **your** model before promising a frame rate to a customer.
:::

## Toolchain

| Step | Tool | Runs on |
| --- | --- | --- |
| Train / export | PyTorch, TensorFlow, ONNX | x86 host |
| Convert | RKNN-Toolkit2 | x86 Linux host |
| Run | `librknnrt` + Python/C API | the board |

## Convert a model

```python
from rknn.api import RKNN

rknn = RKNN(verbose=True)
rknn.config(
    mean_values=[[0, 0, 0]],
    std_values=[[255, 255, 255]],
    target_platform='rk3576',
    quantized_dtype='w8a8',
)
rknn.load_onnx(model='model.onnx')
rknn.build(do_quantization=True, dataset='./calib.txt')
rknn.export_rknn('model.rknn')
rknn.release()
```

`calib.txt` must list 100–300 images that look like real deployment data. Calibrating on
stock photos and deploying on industrial camera frames is the most common cause of a 20-point
accuracy drop.

## Run on the board

```bash
# Python
python3 rknn_demo.py --model model.rknn --image test.jpg

# Benchmark (use this, not the datasheet)
python3 benchmark.py --model model.rknn --repeat 200
```

## Performance expectations

| Model | Input | Expected | Note |
| --- | --- | --- | --- |
| YOLOv8n | 640 × 640 | TODO fps | INT8 |
| ResNet-50 | 224 × 224 | TODO fps | INT8 |
| MobileNetV2 | 224 × 224 | TODO fps | INT8 |

Conditions: TODO °C ambient, TODO W power cap, single-core CPU governor `performance`.
Publish the conditions with the number or the number is meaningless.

## Accuracy checklist

- [ ] Quantization calibration set matches the deployment domain
- [ ] Per-layer cosine similarity ≥ 0.98 between FP32 and INT8 (`accuracy_analysis`)
- [ ] Post-processing identical between host and board (same NMS thresholds, same letterbox)
- [ ] Colour order checked (RGB vs BGR) — this alone explains most "the model is broken" reports
