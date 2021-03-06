﻿/*
PersonDisplay.js

Displays people like the debug version. Will be replaced by sprites.
*/

var person : Person;

function Start () {
  person = this.GetComponent.<Person>();
}

function OnGUI () {
  var localStyle = new GUIStyle(GUI.skin.label);
  localStyle.normal.textColor = Color.black;
  var statusText = String.Format ("{0} \t\t at {1,-20} \t feeling {2}", 
                                  person.name, person.schedule.loc.name, person.health);
  GUI.Label (Rect (300, (person.index * 20), 1000, 300), statusText, localStyle);
}
