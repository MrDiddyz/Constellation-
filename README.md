#MURMUR Constitutional Arbiter (Mini / Free Tier

Truss 
murmur-constitutional-aca/
├─ README.md
├─ LICENSE
├─ .gitignore
├─ pyproject.toml
├─ requirements.txt
├─ .env.example
├─ scripts/
│  ├─ run_sim.sh
│  ├─ run_sim.ps1
│  └─ fmt.sh
├─ configs/
│  ├─ policy.prev.yaml
│  ├─ policy.yaml
│  ├─ policy.meta.json
│  └─ thresholds.yaml
├─ data/
│  ├─ golden_scenarios/
│  │  ├─ normal_day.jsonl
│  │  ├─ latency_spike.jsonl
│  │  ├─ byzantine_poison.jsonl
│  │  ├─ byzantine_flood.jsonl
│  │  └─ insider_policy_downgrade.jsonl
│  └─ outputs/
│     └─ .gitkeep
├─ src/
│  ├─ __init__.py
│  ├─ main.py
│  ├─ simulator/
│  │  ├─ __init__.py
│  │  ├─ event_generator.py
│  │  ├─ scenarios.py
│  │  └─ byzantine.py
│  ├─ policy/
│  │  ├─ __init__.py
│  │  ├─ loader.py
│  │  ├─ evaluator.py
│  │  ├─ semantic_diff.py
│  │  └─ non_escalation.py
│  ├─ slo/
│  │  ├─ __init__.py
│  │  ├─ metrics.py
│  │  └─ report.py
│  ├─ trust/
│  │  ├─ __init__.py
│  │  ├─ scoring.py
│  │  └─ reflector.py
│  ├─ aca/
│  │  ├─ __init__.py
│  │  ├─ invariants.py
│  │  └─ verifier.py
│  └─ utils/
│     ├─ __init__.py
│     ├─ hashing.py
│     └─ logging.py
└─ tests/
   ├─ test_policy_semantic_diff.py
   ├─ test_non_escalation.py
   ├─ test_trust_scoring.py
   ├─ test_byzantine_detection.py
   └─ test_invariants.py
   # MURMUR Constitutional Arbiter (Mini / Free Tier)

This repo is a **minimal, offline-first** prototype of the MURMUR governance core:
- Deterministic **Arbiter** (policy evaluation)
- Offline **Constitutional invariant checks**
- **Semantic policy diff** (power-balance diff, not text diff)
- **SLO attestation** (simulated evaluation report)
- **Non-escalation proof** (surface(new) ⊆ surface(old))
- Simulator for **Byzantine** + **Insider** scenarios

> Goal: Prove the safety architecture on a lightweight setup before upgrading to a full MVP (Pro phase).

---

## What this prototype does

### Simulates
- Normal mobile network behavior (cells, latency/loss/throughput)
- Byzantine nodes:
  - poison (subtle drift)
  - flood (alert storm)
  - silent (missing critical signals)
- Insider attacks:
  - threshold downgrade
  - rule shadowing / priority override
  - removal of human approval

### Enforces constitutional rules (hard checks)
- Default deny if uncertain
- No "execute" action ever
- Human approval cannot be removed for critical actions
- Trust-gated autonomy
- Policy changes must not increase autonomy surface

---

## Quick start

### 1) Setup (Python 3.11+ recommended)
```bash
python -m venv .venv
source .venv/bin/activate  # (Windows: .venv\\Scripts\\activate)
pip install -r requirements.txt
python -m src.main --scenario normal_day
python -m src.main --scenario byzantine_poison
python -m src.main --scenario insider_policy_downgrade
---

## 📌 Startkommandoer (kort)
- Kjør normal: `python -m src.main --scenario normal_day`
- Kjør byzantine: `python -m src.main --scenario byzantine_poison`
- Kjør insider: `python -m src.main --scenario insider_policy_downgrade`
- Kjør tester: `pytest -q`

Hvis du vil, kan jeg også gi deg:
- ferdige `requirements.txt` + `pyproject.toml`
- en minimal `src/main.py` som allerede kjører scenarioene
- eksempel `policy.yaml` + `policy.prev.yaml` som demonstrerer non-escalation

PapiiDLèon 🜚⚡A7  
25.02.2026  
Kl: 04.20
