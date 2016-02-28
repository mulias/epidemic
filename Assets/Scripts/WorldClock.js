/*
The game clock runs at a multiple of real time. Because night time is boring,
the hours from 12am to 6am can be set to run faster than the rest of the day.

Let's say we want 24 game hours to pass in 1 minute. So we want 24*60=1440 game
minutes per minute. But we can make the day go a little slower, and the night
go a little faster.
18 hours, 18*60=1080 game min, in .9 real minute, 1080/.9=1200 game min per min
 6 hours,  6*60= 360 game min, in .1 real minute,  360/.1=3600 game min per min
It seems pretty reasonable to have the night go 3x faster than the day, so
we'll stick with that. We're actually going to count the day in seconds, so
remember that it's equivalent to say that there are 1200 game seconds per second
during the day. 
*/

// the number of seconds in a day, to avoid magic numbers
static var secsPerDay : int = 24*60*60;
static var dayStart   : int = 0;
static var nightStart : int = 18*60*60;

var daySpeed   : int = 1200;
var nightSpeed : int = daySpeed*3; 

// track the day, and the number of seconds that have passed for the current day
var day  : int;
var time : int;

function Start () {
  day  = 1;
  time = 0;
}

function Update () {
  nightSpeed = daySpeed*3;
  // get the real time that has passed, aplly multiple and add to decond count.
  // go at day speed
  if (time < nightStart) {
    time += Time.deltaTime*daySpeed;
  }
  // go at night speed
  else {
    time += Time.deltaTime*nightSpeed;
  }
  // if we have overflowed into a new day, increment the day counter
  if (time > secsPerDay) {
    day++;
    time = time % secsPerDay;
  }
}

function timeString () : String {
  var minute = Mathf.FloorToInt(time/60)   % 60;
  var hour   = Mathf.FloorToInt(time/3600) % 24;
  var minuteStr = minute.ToString();
  var hourStr = hour.ToString();
  if (minute < 10) { minuteStr = "0" + minuteStr; }
  if (hour   < 10) { hourStr   = "0" + hourStr; }
  return hourStr + ":" + minuteStr;
}

// input an hour (0-23) and a minute (0-59), return the corresponding frame
function timeInSeconds (hour : int, min : int) {
   return (hour*3600) + (min*60);
}
