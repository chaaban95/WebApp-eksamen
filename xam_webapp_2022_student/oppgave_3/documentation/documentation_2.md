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

