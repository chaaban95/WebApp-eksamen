<h1>Dokumentasjon</h1>

<h2>Endepunktene</h2>

<h3>For demo:</h3>

/api/demo // POST - Legger til data til databasen fra json.lunch og employees.ts filene.
Statuskoder:
201 hvis det gikk greit og beskjed om at dataen har blitt lagt til databasen , 405 hvis ikke og svar at requesten ikke er tillat.


<h3>For uker:</h3>

/api/weeks // GET - Henter alle ukene
Statuskoder: 200, 405

/api/weeks/[id] // GET - Henter en spesifikk uke og alle dagene som tilhører uka.
Statuskoder: 200, 405

/api/weeks/filter/[...period] // GET - Henter en periode fra uke til uke.
Statuskoder: 200, 405


<h3>For ansatte:</h3>

api/employees // GET - Henter alle ansatte. Følger med lagdeling på dette endepunktet med errorhåndtering og noe validering.
Statuskoder: 200, 405

/api/employees/[id] // GET - Henter en spesifikk ansatt
Statuskoder: 200, 405

/api/employees/create // POST - Legger til en ny ansatt. Følger med lagdeling her også med errorhåndtering og validering.
Statuskoder: 201, 400, 500, 405

/api/employees/search // GET - Søke etter en ansatt. Kan søk med med delvis. Feks tru kan hente trude og truls.
Statuskoder: 200, 405

/api/employees/[id]/update // PUT - Oppdaterer navnet til en spesifikk ansatt. Følger med lagdeling her med errorhåndtering og validering.
Statuskoder: 200, 405, 500, 400

<h2>Sidene</h2>
1. pages/employees/[id]/index:
   Henter en spesifikk ansatt med id fra apiet via fetch.

2. pages/employees/[id]/update:
   Her forandres navnet til en ansatt ved å sende navnet (via body) med fetch med en PUT request til API'et.

3. pages/employees/create:
   Her lages en ny ansatt ved å sende navnet (via body) med fetch med en POST request til API'et. 

4. pages/employees/index:
   På denne siden kalles det 2 API endepunkter:
   Det første kallet henter alle ansatte.
   Det andre fetcher ansatte som inneholder bokstavene på starten av navnet
   fra søk som er lagret til state etter at man trykker på knappen søk.

5. pages/weeks/[id]/index
   Her fetches en spesifikk uke basert på id.

6. pages/weeks/index
   Her hentes alle ukene ved å kalle getWeeks.

7. pages/index [root]
   Her kalles getWeeks for å få alle ukene med all data,
   også fetches de ukene som brukeren velger (via filter) etter
   å ha trykket på en knapp ved å bruke 2 states som lagrer 2 dynamiske tall.

Alle API kall har GET som default.
