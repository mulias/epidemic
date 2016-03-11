// the location object to be cloned
var locationPrefab : Location;

// all possible kinds of locations 
enum LocKind {H, Home, Work, School, Hospital, Sleep, Travel};

var numHomes      = 6;
var numWorks      = 3;
var numSchools    = 1;
var numHospitals  = 1;

private var locationCount;

// Awake() is like Start(), but it happens before all start functions. We make 
// all the locations in Awake() so that if a script's Start() function tries to
// find a location, that location will already exist.
function Awake () {
  locationCount = 0;
  // general locations
  makeLocations(numHomes, LocKind.Home);
  makeLocations(numWorks, LocKind.Work);
  makeLocations(numSchools, LocKind.School);
  makeLocations(numHospitals, LocKind.Hospital);
  // special locations
  var loc : Location;
  loc = Instantiate(locationPrefab);
  loc.name = "Sleep";
  loc.index = ++locationCount;
  loc.infectionCoefficient = 1000;
  loc.recoveryCoefficient = 2;
  loc.transform.parent = this.transform;  
  loc.transform.SetAsFirstSibling();
  // make the prefab the travel location
  locationPrefab.name = "Travel";
  locationPrefab.index = ++locationCount;
  locationPrefab.infectionCoefficient = 5;
  locationPrefab.recoveryCoefficient = 2;
  locationPrefab.transform.parent = this.transform;
}

function makeLocations(num : int, kind : LocKind) {
  var i : int;
  var loc : Location;
  for (i = 1; i <= num; i++) {
    loc = Instantiate(locationPrefab);
    loc.name = kind + " " + i;
    loc.index = ++locationCount;
    loc.transform.parent = this.transform;
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

