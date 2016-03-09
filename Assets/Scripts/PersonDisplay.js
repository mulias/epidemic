var person : Person;

function Start () {
  person = this.GetComponent.<Person>();
}

function OnGUI () {
  var localStyle = new GUIStyle(GUI.skin.label);
  localStyle.normal.textColor = Color.black;
  var statusText = String.Format ("{0}: {1}", person.name, person.schedule.loc.name);
  GUI.Label (Rect (500, (person.index * 20), 1000, 300), statusText, localStyle);
}