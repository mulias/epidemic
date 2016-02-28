var personPrefab : Person;

var population = 20;

// Awake() is like Start(), but it happens before all start functions. We make 
// all the people in Awake() so that if a script's Start() function tries to
// find a person, that person exists.
function Awake() {
  var i : int;
  var person : Person;
  // make the first population-1 people
	for (i = 1; i < population; i++) {
		person = Instantiate(personPrefab);
    person.name = "Person " + i;
    person.transform.parent = this.transform;  
	}
  // the prefab person turns into the last person
  personPrefab.name = "Person " + population;
  personPrefab.transform.parent = this.transform;  
  personPrefab.transform.SetAsLastSibling();
}
