var clock : WorldClock;

function Start () {
  clock = this.GetComponent.<WorldClock>();
}

function OnGUI () {
  var timeText = String.Format("Day {0}\n{1}", clock.day, clock.clockStr);
  GUI.Label (Rect (25, 25, 100, 50), timeText);
}
