// the location object to be cloned
var locationPrefab : Location;

var numHomes      = 6;
var numWorks      = 1;
var numSchools    = 1;
var numHospitals  = 1;

private var locationCount;

private var assignedHomes = 0;
private var assignedWorks = 0;

// Awake() is like Start(), but it happens before all start functions. We make 
// all the locations in Awake() so that if a script's Start() function tries to
// find a location, that location will already exist.
function Awake () {
  locationCount = 1;
  // general locations
  makeLocations(numHomes, "Home", 5.7);
  makeLocations(numWorks, "Work", 2.5);
  makeLocations(numSchools, "School", -1);
  makeLocations(numHospitals, "Hospital", -4.1);
  // special locations
  var loc : Location;
  loc = Instantiate(locationPrefab);

  loc.name = "Sleep";
  loc.index = locationCount++;
  loc.infectionCoefficient = 1000;
  loc.recoveryCoefficient = 2;
  loc.transform.parent = this.transform;  
  loc.transform.SetAsFirstSibling();

  // make the prefab the travel location
  locationPrefab.name = "Travel";
  locationPrefab.index = locationCount++;
  locationPrefab.infectionCoefficient = 5;
  locationPrefab.recoveryCoefficient = 2;
  locationPrefab.transform.parent = this.transform;
}

function makeLocations(num : int, name : String, ypos : int) {
  var i : int;
  var loc : Location;
  for (i = 1; i <= num; i++) {
    loc = Instantiate(locationPrefab, new Vector3(((i * 6.0F) - 15), ypos, 0), Quaternion.identity);
    loc.name = name + " " + i;
    loc.index = locationCount++;

    if(name == "Home"){
   		loc.infectionCoefficient = 5;
   		loc.recoveryCoefficient = 2;}
   	else if (name == "Work"){
   		loc.infectionCoefficient = 5;
   		loc.recoveryCoefficient = 2;}
   	else if (name == "School"){
   		loc.infectionCoefficient = 5;
   		loc.recoveryCoefficient = 2;}
   	else if (name == "Hospital"){
   		loc.infectionCoefficient = 1000;
   		loc.recoveryCoefficient = 4;}

    loc.transform.parent = this.transform;
  }
}

function assignHome () : String {
  // there's an empty house
  if (assignedHomes < numHomes) {
    assignedHomes++;
    return "Home " + assignedHomes;
  }
  // no empty houses
  else {
    return "Home " + Random.Range(1,numHomes);
  }
}

function assignWork () : String {
  // there's an empty work
  if (assignedWorks < numWorks) {
    assignedWorks++;
    return "Work " + assignedWorks;
  }
  // no empty work
  else {
    return "Work " + Random.Range(1,numWorks);
  }
}

