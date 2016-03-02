var clock : WorldClock;

function Start () {
  clock = this.GetComponent.<WorldClock>();
}

function OnGUI () {
  GUI.Label (Rect (25, 25, 100, 30), clock.clockStr);
}