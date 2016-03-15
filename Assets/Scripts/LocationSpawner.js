/*
LocationSpawner.js

Generates all of the location objects. The spawner makes locations, and then 
does nothing while the game runs.
*/

var locationPrefab : Location;

var numHomes      = 6;
var numWorks      = 3;
var numSchools    = 1;
var numHospitals  = 1;

private var locationCount;

// Awake() is like Start(), but it happens before all start functions. We make 
// all the locations in Awake() so that if a script's Start() function tries to
// find a location, that location will already exist.
function Awake () {
  // there are no locations yet
  locationCount = 0;
  // general locations
  makeLocations(numHomes, LocKind.Home, 5.7);
  makeLocations(numWorks, LocKind.Work, 2.5);
  makeLocations(numSchools, LocKind.School, -1);
  makeLocations(numHospitals, LocKind.Hospital, -4.1);

  // special sleep location
  var loc : Location;
  loc = Instantiate(locationPrefab);
  loc.name = "Sleep";
  loc.kind = LocKind.Sleep;
  loc.index = ++locationCount;
  loc.infectionCoefficient = 1000;
  loc.recoveryCoefficient = 2;
  loc.transform.parent = this.transform;  
  loc.transform.SetAsFirstSibling();

  // make the prefab the travel location
  locationPrefab.name = "Travel";
  locationPrefab.kind = LocKind.Travel;
  locationPrefab.index = ++locationCount;
  locationPrefab.infectionCoefficient = 5;
  locationPrefab.recoveryCoefficient = 2;
  locationPrefab.transform.parent = this.transform;
}

function makeLocations(num : int, kind : LocKind, ypos : int) {
  var i : int;
  var loc : Location;
  for (i = 1; i <= num; i++) {
    loc = Instantiate(locationPrefab, 
                      new Vector3(((i * 6.0F) - 15), ypos, 0), 
                      Quaternion.identity);
    loc.index = ++locationCount;
    loc.name = kind + " " + i;
    loc.transform.parent = this.transform;
    loc.kind = kind;
    switch (kind) {
      case LocKind.Home:
        loc.infectionCoefficient = 5;
   	  	loc.recoveryCoefficient = 2;
        break;
      case LocKind.Work:
        loc.infectionCoefficient = 5;
   	  	loc.recoveryCoefficient = 2;
        break;
      case LocKind.School:
        loc.infectionCoefficient = 5;
   		  loc.recoveryCoefficient = 2;
        break;
      case LocKind.Hospital:
        loc.infectionCoefficient = 1000;
   		  loc.recoveryCoefficient = 4; 
        break;
      default:
        Debug.LogError("Invalid location kind, can't finish instantiation");
        break;
    }
  }
}

