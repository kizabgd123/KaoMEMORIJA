# AI Workflow Orchestrator - AntiGravity IDE Prompt

Ovaj fajl služi kao inicijalni alat/prompt za AntiGravity IDE (Google AI Studio Build) kako bi automatski konfigurisao, povezao i testirao celokupan sistem pri povlačenju koda sa GitHub-a.

## 🚀 AntiGravity IDE - Instrukcija za pokretanje (Setup Prompt)

**Kopiraj tekst ispod linije i pošalji ga AntiGravity agentu kao prvi unos (prompt) u novom razgovoru nakon importovanja repozitorijuma:**

---

Pozdrav AntiGravity! Upravo je importovan ovaj repozitorijum. Tvoj zadatak je da inicijalizuješ projekat, instaliraš sve potrebne komponente, uveriš se da su svi sistemi povezani i izvršiš osnovne testove.

Molim te, prati sledeće korake sekvencijalno:

### 1. Instalacija i priprava zavisnosti
*   Pozovi alat `install_applet_dependencies` kako bi se instalirali svi NPM paketi iz `package.json` (uključujući Tailwind CSS, lucide-react i motion biblioteke za frontend).

### 2. Provera integriteta fajlova ekosistema i memorije
*   Verifikuj (pozovi `list_dir` ili koristi shell liste) da li fajlovi ekosistema postoje: `trinity_config.json`, `heart_disease_tactics.json`, konfiguracije u `.gemini` folderu, kao i centralni fajlovi memorije `WORK_LOG.md` i `GUARD_LOG.md`.
*   Pročitaj `AGENTS.md` i `GEMINI.md` kako bi učitao glavni ustav i svoja uputstva o ponašanju, orchestrator procesima i bezbednosnim guard railovima.

### 3. Povezivanje i startovanje pozadinskih procesa (Python & Legacy integracija)
*   Izvrši skriptu `verify_ssot.py` pozivom shell komande: `python verify_ssot.py`.
    *   *Proveri da li je izlaz uspešno zabeležen u `WORK_LOG.md` konfirmacijom da taj fajl sada sadrži "SSOT Parameter Load" događaj.*
*   Dalje, proveri rad legacy integracije izvršavanjem: `python legacy_integration_script.py`. Skripta će demonstrirati mehanizam generisanja manifest fajlova.

### 4. Build, Linting i Front-End Testing
*   Pokreni validaciju koda pozivom alata `lint_applet` kako bi osigurao da `src/App.tsx` i React komponente ne sadrže sintaksne i TypeScript greške nakon uvoza.
*   Zatim izvrši komplaciju aplikacije pozivom alata `compile_applet`.

### 5. Finalni izveštaj i Server Start
*   Ako neki korak padne, pokušaj da debaguješ problem pre nego što nastaviš.
*   Na kraju, ukoliko dev server nije u aktivnom stanju (ili ukoliko treba da primeniš izmene), pozovi alat `restart_dev_server`.
*   Kreiraj mi kratak, strukturiran izveštaj o statusu (da li su SSOT parametri logovani ispravno, da li je build prošao i da li je orkestratorski dashboard spreman za rad).
