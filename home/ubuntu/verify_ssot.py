import json
import os
from datetime import datetime

def verify_ssot_parameters(config_path="trinity_config.json", work_log_path="WORK_LOG.md"):
    try:
        with open(config_path, 'r') as f:
            config = json.load(f)

        # Extract relevant parameters for logging
        loaded_parameters = {
            "cpu_timeout_seconds": config.get("system_parameters", {}).get("cpu_timeout_seconds"),
            "oof_calibration_rule_threshold": config.get("validation_thresholds", {}).get("oof_calibration_rule", {}).get("threshold"),
            "baseline_oof_score": config.get("validation_thresholds", {}).get("baseline_oof_score")
        }

        log_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "event_type": "SSOT Parameter Load",
            "message": f"SSOT parametri uspešno učitani iz {config_path}.",
            "loaded_parameters": loaded_parameters
        }

        # Append to WORK_LOG.md
        with open(work_log_path, 'a') as f:
            f.write("\n```json\n")
            json.dump(log_entry, f, indent=2)
            f.write("\n```\n")

        print(f"SSOT parametri uspešno učitani i zabeleženi u {work_log_path}.")
        return config

    except FileNotFoundError:
        print(f"Greška: Konfiguracioni fajl '{config_path}' nije pronađen.")
        return None
    except json.JSONDecodeError:
        print(f"Greška: Neispravan JSON format u fajlu '{config_path}'.")
        return None

if __name__ == "__main__":
    # Example usage:
    print("Pokretanje SSOT verifikacije...")
    ssot_config = verify_ssot_parameters()

    if ssot_config:
        print("Agent sada može koristiti sledeće parametre:")
        print(f"  CPU Timeout: {ssot_config['system_parameters']['cpu_timeout_seconds']} sekundi")
        print(f"  OOF Kalibracioni Prag: {ssot_config['validation_thresholds']['oof_calibration_rule']['threshold']}")
        print(f"  Baseline OOF Skor: {ssot_config['validation_thresholds']['baseline_oof_score']}")

        # Simulate an agent action and log it
        task_log_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "event_type": "Task Execution",
            "task_id": "INITIAL_SETUP_001",
            "status": "Completed",
            "details": "Inicijalno podešavanje i verifikacija SSOT-a."
        }
        with open("WORK_LOG.md", 'a') as f:
            f.write("\n```json\n")
            json.dump(task_log_entry, f, indent=2)
            f.write("\n```\n")
        print("Simulirana aktivnost agenta zabeležena u WORK_LOG.md.")
