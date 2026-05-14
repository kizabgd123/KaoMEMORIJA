import os
import json

def generate_manifest_and_makefile(project_path):
    manifest_data = {
        "project_name": os.path.basename(project_path),
        "description": "Manifest fajl generisan automatski za legacy projekat.",
        "entry_point": "",
        "scripts": {},
        "dependencies": [],
        "file_types_to_analyze": [".py", ".sh", ".ipynb", ".js", ".java", ".c", ".cpp"]
    }

    makefile_content = ""
    python_files = []
    shell_scripts = []
    requirements_found = False

    for root, _, files in os.walk(project_path):
        for file in files:
            file_path = os.path.join(root, file)
            if file.endswith(".py"):
                python_files.append(file_path)
                if "main.py" in file.lower():
                    manifest_data["entry_point"] = file
                    manifest_data["scripts"]["run"] = f"python {file}"
            elif file.endswith(".sh"):
                shell_scripts.append(file_path)
            elif file == "requirements.txt":
                requirements_found = True
                manifest_data["dependencies"].append("requirements.txt")

    if requirements_found:
        manifest_data["scripts"]["install"] = "pip install -r requirements.txt"
        makefile_content += "install:\n\tpip install -r requirements.txt\n\n"

    if not manifest_data["entry_point"] and python_files:
        manifest_data["entry_point"] = os.path.basename(python_files[0])
        manifest_data["scripts"]["run"] = f"python {os.path.basename(python_files[0])}"

    if "run" in manifest_data["scripts"]:
        makefile_content += f"run:\n\t{manifest_data['scripts']['run']}\n\n"

    if shell_scripts:
        # Simple example: add first shell script as a 'start' command
        manifest_data["scripts"]["start_sh"] = f"bash {os.path.basename(shell_scripts[0])}"
        makefile_content += f"start_sh:\n\tbash {os.path.basename(shell_scripts[0])}\n\n"

    makefile_content += ".PHONY: " + " ".join(manifest_data["scripts"].keys())

    with open(os.path.join(project_path, "manifest.json"), "w") as f:
        json.dump(manifest_data, f, indent=2)

    with open(os.path.join(project_path, "Makefile"), "w") as f:
        f.write(makefile_content)

    print(f"Generated manifest.json and Makefile in {project_path}")

if __name__ == "__main__":
    # This script would typically be called by the agent with the project path
    # For demonstration, let's assume a dummy project path
    dummy_project_path = "/home/ubuntu/legacy_project_example"
    os.makedirs(dummy_project_path, exist_ok=True)
    with open(os.path.join(dummy_project_path, "main.py"), "w") as f:
        f.write("print('Hello from legacy project!')")
    with open(os.path.join(dummy_project_path, "requirements.txt"), "w") as f:
        f.write("numpy\npandas")

    generate_manifest_and_makefile(dummy_project_path)
