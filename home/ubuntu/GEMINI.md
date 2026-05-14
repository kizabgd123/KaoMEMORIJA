# Trinity Protocol Ecosystem: Project Constitution

**[!IMPORTANT] META KOMANDA:** U slučaju bilo kakvog konflikta između tekstualnih instrukcija u ovom Ustavu i centralizovanog JSON konfiguracionog fajla (`trinity_config.json`), JSON konfiguracija uvek ima apsolutni prioritet. JSON je jedini izvor istine (Single Source of Truth - SSOT). Time se eliminiše kognitivna disonanca kod AI agenata prilikom tumačenja pravila.

## DEO I: Opšti Principi i Arhitektura

### 1. Šta je Trinity Protocol Ecosystem i na šta je fokusiran?
Trinity Protocol Ecosystem je napredna metodologija za takmičarsko mašinsko učenje usmerena na iterativni razvoj, ansambl modele i integraciju autonomnih AI agenata kroz Anti-Gravity OS.

### 2. Unifikacija Mehanizma za Pokretanje
**Problem:** Fragmentacija u egzekuciji koda i nejasne instrukcije za pokretanje različitih repozitorijuma otežavaju automatizaciju i predstavljaju rizik za autonomne AI agente. Agent može pogrešno pokrenuti skripte, izmišljati komande ili pokretati fajlove u pogrešnom redosledu, što dovodi do grešaka i haosa u radu sa virtualnim okruženjima.

**Rešenje:** Uvođenje centralizovanog CLI alata (poput Trinity CLI) koji apstrahuje sve zavisnosti i omogućava agentu da jednostavno prosledi ciljni zadatak bez nagađanja. Univerzalni `Makefile` i `manifest.json` fajl sa metapodacima definišu redosled pokretanja skripti, čineći egzekuciju deklarativnom i smanjujući prostor za greške agenta.

### 3. Strukturno Razdvajanje Univerzalnih Pravila i Domenskih Taktika
**Problem:** Trenutni Ustav meša univerzalna pravila jezgra sistema sa taktikama specifičnim za domen (npr. kardiologija), što stvara kognitivno zagušenje za autonomne agente.

**Rešenje:** Fizički razdvojiti univerzalna pravila u primarni operativni tekst, a sve domenske taktike (kao što su one iz DEO III) izdvojiti u sekundarne, isključivo referentne arhitekture (npr. `heart_disease_tactics.json`). Agent treba da uči mehanizam učitavanja domenskog znanja bez obrade irelevantnih varijabli.

### 4. Fleksibilni Numerički Pragovi i Resursni Limiti
**Problem:** Fiksni numerički pragovi i resursni limiti direktno u glavnom operativnom ustavu ograničavaju univerzalnu primenljivost sistema i mogu nepotrebno prekinuti uspešno izvršavanje.

**Rešenje:** Numeričke pragove i resursne limite izmestiti iz glavnog teksta ustava u `trinity_config.json`. U ustavu se zadržava samo princip obaveze provere (npr. "obavezna provera korelacije"), dok `trinity_config.json` definiše konkretne vrednosti (npr. `"ensemble_correlation_threshold": 0.95`). Ovo omogućava dinamičko prilagođavanje bez promene prompta, gde agent automatski prilagođava svoje odluke na osnovu promena u `trinity_config.json`.

## DEO II: Validacija, Učenje i Rešavanje Konflikata

### 5. Protokol za Usklađivanje (Reconciliation Protocol)
**Problem:** Iako `trinity_config.json` ima apsolutni prioritet, nedostatak definisanog operativnog toka rada za trenutak kada agent aktivno detektuje diskrepancu između tekstualnog ustava i JSON konfiguracije dovodi do toga da tekstualni ustav postaje zastareo i obmanjujući (document drift).

**Rešenje:** Implementirati konkretan protokol za usklađivanje koji nalaže agentu da, prilikom nailaska na tekstualno-JSON konflikt, izvrši sledeće korake:
    *   Automatski emituje specifičan `Constitution Drift Alert` log u `GUARD_LOG.md` fajl, beležeći vremensku oznaku, opis problema i rešenje (npr. primenjeno JSON pravilo prioriteta).
    *   Opciono, koristi alat za dodavanje Markdown upozorenja direktno u konfliktnu tekstualnu sekciju, označavajući je za ljudsku reviziju ili autonomnu korekciju u kasnijoj fazi sinteze, dok bezbedno nastavlja sa JSON parametrima.

### 6. ProcessGuard i Dijalektička Petlja Učenja
**Problem:** Prethodni `JudgeGuard` se aktivirao prekasno. Trenutni `ProcessGuard` sistem omogućava agentu da izbegava greške u realnom vremenu, ali ne uči iz njih. Agent može ponavljati istu pogrešnu logiku jer deluje refleksivno, a ne reflektivno.

**Rešenje:** Proširiti `ProcessGuard` arhitekturu tako da uključuje formalizovanu meta-analitičku petlju. Agent je obavezan da periodično pregleda svoju istoriju `guardalert.json` upozorenja (iz `GUARD_LOG.md`) kako bi informisao i prilagodio svoju sveobuhvatnu tezu. Ovo se može postići:
    *   Zahtevanjem od agenta da pokrene interni skript za refleksiju na kraju faze antithesis, koji sumira sve emitovane `guardalert.json` fajlove radi identifikacije sistemskih grešaka pre nego što nastavi.
    *   Dodavanjem obaveznog polja u finalnoj fazi sinteze gde agent mora eksplicitno navesti akcione fallback-ove koje je koristio tokom treninga, omogućavajući da prošle greške direktno matematički informišu konačno rangiranje ili selekciju ansambla.

### 7. Hendlovanje Izuzetaka i Strukturirane Povratne Informacije
**Problem:** Trenutni sistem prekida proces bez povratne informacije kada agent naiđe na grešku, što onemogućava autonomnom agentu da nauči iz greške i prilagodi svoju strategiju.

**Rešenje:** Implementacija strukturiranih povratnih informacija u JSON formatu i graciozna degradacija sistema. JSON izveštaji o greškama omogućavaju agentu da razume uzrok greške i pronađe alternativna rešenja, čime se održava autonomija i kontinuitet rada bez potrebe za ljudskim nadzorom.

### 8. Optimizacija Beleženja Memorije i Heširanja
**Problem:** Kriptografsko heširanje svakog bloka evidentiranog u memorijskom fajlu stvara ogromno operativno opterećenje i usporava brzinu iteracija.

**Rešenje:** Generisanje integrity hash-a vršiti samo prilikom komitovanja rezultata na kraju glavnih faza (thesis, antithesis, synthesis) ili prilikom značajnih modifikacija. Za mikroakcije tokom istraživanja dozvoliti jednostavno tekstualno beleženje bez heširanja. Predlaže se razdvajanje čuvanja sirovih podataka od metapodataka i korišćenje optimizovanog binarnog formata (npr. parket) za skladištenje podataka na disku.

### 9. Legacy Integration Protocol
**Problem:** Dokument ne pruža jasne logičke korake niti instrukcije agentu kako da generiše potrebne fajlove kao što su `manifest.json` ili `Makefile` za postojeće, starije projekte, što može dovesti do beskonačne petlje grešaka.

**Rešenje:** Uvesti novu podsekciju `Legacy Integration Protocol` koja jasno definiše da agent mora pokušati da generiše osnovni `manifest.json` i `Makefile` koristeći analizu ekstenzija fajlova i Python import komandi, pre nego što izvrši halt ili constitutional reboot.

## DEO III: Registar Taktika (Kardiologija - Primer)

**[!NOTE]** Ova sekcija sadrži domensko znanje specifično za analizu bolesti srca. U budućim domenima (npr. finansije), ova sekcija se menja bez uticaja na jezgro sistema. Detaljne taktike su izdvojene u `heart_disease_tactics.json` ili sličan referentni fajl. Agent će učitavati ove taktike dinamički na osnovu domena zadatka.

### 10. Ključne Lekcije i Optimalne Prakse (Primeri iz S6E2 Heart Disease takmičenja)

*   **Tanaka Formula za HRmax:** Agent MORA koristiti Tanaka formulu (HRmax = 208 − 0.7 × Age) za izračunavanje maksimalnog srčanog ritma, jer je fiziološki ispravnija i obezbeđuje bolju generalizaciju od tradicionalne Fox formule (220 - Age). Konkretna implementacija i status aktivacije se kontrolišu putem `trinity_config.json`.
*   **OOF Kalibracioni Prag:** Ako OOF skor prelazi vrednost definisanu u `trinity_config.json` (npr. 0.960) na sintetičkom datasetu, to je SIGNAL OVERFITTING-a. Agent MORA zaustaviti treniranje ako OOF prelazi ovaj prag i primeniti fallback na jednostavniji pristup. Optimalni OOF opseg je takođe definisan u `trinity_config.json`.
*   **Multi-seed Averaging:** Pravilna implementacija uključuje treniranje istog modela sa brojem random seed-ova definisanim u domenskim taktikama (npr. 5) i usrednjavanje svih OOF vektora za robustniju predikciju sa nižom varijansom.
*   **ProcessGuard u Ansamblu:** `ProcessGuard` se koristi pre treniranja (učitava pragove iz `trinity_config.json`), posle treniranja (proverava korelaciju između modela < vrednost definisana u `trinity_config.json`) i posle blendinga (proverava da li je finalni OOF bolji od baseline-a definisanog u `trinity_config.json`). Svaki incident se beleži u `GUARD_LOG.md`.
*   **Oldpeak Normalizacija:** Preporučene transformacije uključuju Log1p transformaciju, Z-score standardizaciju i outlier clipping. Za ensemble pristup koristiti obe verzije (raw i normalized) kao feature-e. Detalji su u `heart_disease_tactics.json`.
*   **Ischemic Burden Clinical Concept:** Klinički koncept `ischemic burden` (dubina ST depresije × trajanje epizode) se može aproksimirati formulom `Oldpeak × Exercise_Angina`. Interakcije `Age × Ischemic_Burden` i `BP × Age` su podržane. Detalji su u `heart_disease_tactics.json`.
*   **Klastering Meta-Features:** Unsupervised k-means klastering na EMR podacima može poboljšati ensemble diversitet. Klaster ID ili distanca do centroida kao feature-i imaju nisku korelaciju sa GBDT predikcijama. Klastering trenirati SAMO na train fold-u. Detalji su u `heart_disease_tactics.json`.
*   **UCI Dataset:** Originalni UCI dataset je mali i stariji. NIKADA ga ne spajati direktno sa sintetičkim podacima zbog distribution shift-a. Ova direktiva je deo domenskih taktika.
*   **Prestanak Iteracije:** Agent treba da prestane sa iteracijom kada su ispunjeni kriterijumi definisani u domenskim taktikama (npr. poslednje 3 submisije ne donose poboljšanje > 0.001, OOF-LB gap počinje da raste, itd.).
