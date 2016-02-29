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
var health     : Health;
var schedule   : EventList;
var clock      : WorldClock;
var interactionCount : int;
var infectedCount	   : int;

// initial status: the object starts as a clone of the person prefab, so we
// need to change it to have a more useful object name, and unique
// characteristics.
function Start () {
  // set status and go to first location
  health   = Health.susceptible;
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

/*
Let's talk about time. There are 24 hours in a day, but we don't want to watch
the part where everyone is sleeping, so let's make the game run from 6am to
midnight. That means 18 hours per game day, 6 hours that magically aren't there.
To start everyone at the right place at the beginning of the game, we use a 
special start event.
*/

function generateSchedule () : EventList {
  // Alias because lazy. The clock runs off game frames, so we want to convert
  // more readable time to the corresponding frame.
  var tis = clock.timeInSeconds;
  // we build a circular list. We can't add the last line, which ties the end 
  // back to the beginning, until after eventCycle is defined, so it's null.
  var eventCycle = new EventList(tis( 7,20), getLocation("Home 1"), 
                   new EventList(tis( 8, 0), getLocation("Travel"),
                   new EventList(tis( 8,20), getLocation("Work 1"),
                   new EventList(tis(16, 0), getLocation("Travel"),
                   new EventList(tis(16,14), getLocation("Home 1"),
                   new EventList(tis(22,00), getLocation("Sleep"), null))))));
  // link the last event (going to sleep) to the first event (waking up)
  eventCycle.next.next.next.next.next.next = eventCycle;
  // Special start point so everyone starts at 6am on the first day. We use this
  // event once on the first frame to get into the event cycle, then never again.
  return new EventList(tis( 6, 0), getLocation("Sleep"),  eventCycle);
}

// helper function to look up a location object from its name
function getLocation(loc : String) {
  return GameObject.Find("/Locations/"+loc).GetComponent(Location); 
}

function leaveScheduledLocation() {
  schedule.loc.checkOut(health); 
  if(health == Health.susceptible && Random.Range(0,interactionCount) < infectedCount){
  	  health = Health.infected;
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
}

function checkHealth () {
  interactionCount += schedule.loc.deltaArrive;
  infectedCount += schedule.loc.deltaInfected;
}
