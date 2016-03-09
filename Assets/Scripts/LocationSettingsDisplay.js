﻿var loc : Location;

function Start () {
  loc = this.GetComponent.<Location>();
}

function OnGUI () {
  var localStyle = new GUIStyle(GUI.skin.label);
  localStyle.normal.textColor = Color.black;
  var statusText = String.Format ("{0}: {1}", loc.name, loc.population);
  GUI.Label (Rect (150, (loc.index * 25), 100, 30), statusText, localStyle);
}