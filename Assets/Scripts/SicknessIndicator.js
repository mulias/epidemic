#pragma strict

var sickness = 0.0;

function Start () {
}

function Update () {
  var person = GetComponent(SpriteRenderer);
  person.color = Color.Lerp(Color.white, Color.green, sickness);
}