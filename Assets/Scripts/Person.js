// health status
enum Health {susceptible, infected, recovered};

// schedule for each part of the day
// Sorry this turned out goofy. The schedule is a linked list, where the last
// element connects back to the first. We keep track of the current schedule
// event with the schedule var, and when it's time to move on to the next
// event we use the field schedule.next.
class EventList {
  var start : int;
  var loc   : Location;
  var next  : EventList;
  function EventList(start, loc, next) {
    this.start = start;
    this.loc   = loc;
    this.next  = next;
  }
}

// everyone has a health status, a current event schedule, and a link to the
// single wold clock that syncs everyone together.
var index : int; // each person has an index between 1 and number of people
var health     : Health;
var schedule   : EventList;
var clock      : WorldClock;
var homeStr    : String;
var workStr    : String;
var interactionCount : int;
var infectedCount	   : int;

var infectionCoeff : float;
var recoveryCoeff : float;

// initial status: the object starts as a clone of the person prefab, so we
// need to change it to have a unique schedule, home, and work.
function Start () {
  // set starting health -- now done within PersonSpawner

  // set home, work, and schedule
  var locManager = GameObject.Find("Locations").GetComponent(LocationSpawner); 
  homeStr  = locManager.assignHome();
  workStr  = locManager.assignWork();
  schedule = generateSchedule();
  clock    = GameObject.Find("World Clock").GetComponent(WorldClock);
  interactionCount = 0;
  infectedCount = 0;
  goToScheduledLocation();
}

// Each update, compare the game time to the person's schedule. If the current 
// time is within the window for the next event, go to the next event. Otherwise
// stay in the current location and update health.
function Update () {
  // we want to check if we are in the time window for the next event
  var windowStart = schedule.next.start;
  var windowEnd   = schedule.next.next.start;
  // move on to next event
  // this happens when the time is between the window start and end
  // or if the window has started and ends some time on the next day
  if(clock.time >= windowStart && 
     (clock.time <= windowEnd || windowStart >= windowEnd)) {
    leaveScheduledLocation();
    schedule = schedule.next;
    goToScheduledLocation();
  }
  // stay and update health
  else {
    checkHealth();
  }
}

// Each person should have a semi-random schedule. Right now that means everyone
// goes between work and home, but they leave/arrive at different times and
// go to different houses and work places. 
function generateSchedule () : EventList {
  // Alias because lazy. The clock runs off game frames, so we want to convert
  // more readable time to the corresponding frame.
  var tis = clock.timeInSeconds;
  var range = Random.Range;
  // we build a circular list. We can't add the last line, which ties the end 
  // back to the beginning, until after eventCycle is defined, so it's null.
  var wakeTime       = clock.timeInSeconds(range(6,9),range(0,59));   // 6 to 9:59
  var leaveHomeTime  = wakeTime + range(30,91)*60;                    // 6:30 to 11:30
  var travelTime     = range(15,45)*60;                               // 15 to 45 min
  var arriveWorkTime = leaveHomeTime + travelTime;                    // 6:45 to 12:15
  var leaveWorkTime  = clock.timeInSeconds(range(15,18),range(0,30)); // 3 to 6:30
  var arriveHomeTime = leaveWorkTime + travelTime;                    // 3:15 to 7:15
  var sleepTime      = clock.timeInSeconds(range(20,23),range(0,59)); // 8 to 11:59
  var eventCycle = 
    new EventList(wakeTime,       getLocation(homeStr), 
    new EventList(leaveHomeTime,  getLocation("Travel"),
    new EventList(arriveWorkTime, getLocation(workStr),
    new EventList(leaveWorkTime,  getLocation("Travel"),
    new EventList(arriveHomeTime, getLocation(homeStr),
    new EventList(sleepTime,      getLocation("Sleep"), null))))));
  // link the last event (going to sleep) to the first event (waking up)
  eventCycle.next.next.next.next.next.next = eventCycle;
  // Special start point so everyone starts at 6am on the first day. We use this
  // event once on the first frame to get into the event cycle, then never again.
  return new EventList(tis(6,0), getLocation("Sleep"),  eventCycle);
}

// helper function to look up a location object from its name
function getLocation(loc : String) {
  return GameObject.Find("/Locations/"+loc).GetComponent(Location); 
}

function leaveScheduledLocation() {
  schedule.loc.checkOut(health); 
  if(health == Health.susceptible && (Random.Range(0,infectionCoeff*interactionCount)) < infectedCount){
  	  health = Health.infected;
  	  Debug.Log(this.name + " is sick!");
  	  }
  if(health == Health.infected && Random.Range(0,100) < recoveryCoeff){
  	  health = Health.recovered;
  	  Debug.Log(this.name + " is sick!");
  	  }
  interactionCount = 0;
  infectedCount = 0;
}

function goToScheduledLocation() {
  schedule.loc.checkIn(health);
  Debug.Log(this.name+" travels to "+schedule.loc.name+" at time "+clock.clockStr);
  interactionCount += schedule.loc.population;
  infectedCount += schedule.loc.infected;
  infectionCoeff = schedule.loc.infectionCoefficient;
  recoveryCoeff = schedule.loc.recoveryCoefficient;
}

function checkHealth () {
  interactionCount += schedule.loc.deltaArrive;
  infectedCount += schedule.loc.deltaInfected;
}
