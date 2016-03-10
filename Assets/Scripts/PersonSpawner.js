var personPrefab : Person;

var population = 18;
var initialInfected =2;

// Awake() is like Start(), but it happens before all start functions. We make 
// all the people in Awake() so that if a script's Start() function tries to
// find a person, that person exists.
function Awake() {
  var i : int;
  var j : int;
  var person : Person;
  // make the first population-1 people who are initially susceptible
	for (i = 1; i <= (population-initialInfected); i++) {
		person = Instantiate(personPrefab);
    	person.name = "Person " + i;
    	person.index = i;
    	person.health = Health.susceptible;
    	person.transform.parent = this.transform;  
	}

// make the first population-1 people who are initially infected
  for (j = 1; j < initialInfected; j++) {
		person = Instantiate(personPrefab);
    	person.name = "Person " + (i+j-1);
    	person.index = (i+j-1);
    	person.health = Health.infected;
    	person.transform.parent = this.transform;  
	}

// the prefab person turns into the last person

  personPrefab.name = "Person " + (population);
  personPrefab.index = population;
  personPrefab.health = Health.infected;
  personPrefab.transform.parent = this.transform;  
  personPrefab.transform.SetAsLastSibling();

}