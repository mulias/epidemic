var person : Person;

function Start () {
  person = this.GetComponent.<Person>();
}

function OnGUI () {
  var statusText = String.Format ("{0}: {1}", person.name, person.schedule.loc.name);
  var health = String.Format("{0}: {1}", person.name, person.health);
  GUI.Label (Rect (350, (person.index * 25), 1000, 300), statusText);
  GUI.Label (Rect (550, (person.index * 25), 1000, 300), health);
}