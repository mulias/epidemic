/*
Location.js

A specific location.

name – The name string for the location, like “School 2”.

checkIn(health) – Person calls when they arrive at the location. Lets the 
  location know that a new person has arrived, and if that person is healthy or 
  not.

checkOut() – Person calls when they leave the location. First lets the location 
  know that a person has left. Then checks to see if time at that location has 
  made the person more or less sick.
*/

var index : int; // each location has an index between 1 and number of locations
var population  : int;
var susceptible : int;
var infected   : int;
var recovered   : int;
var deltaArrive	: int;
var deltaLeave	: int;
var deltaInfected: int;
var deltaInfectedLeave: int;
var infectionCoefficient: float;
var recoveryCoefficient: float;

function Awake () {
  population  = 0;
  susceptible = 0;
  infected    = 0;
  recovered   = 0;
  deltaArrive = 0;
  deltaLeave  = 0;
  deltaInfected = 0;
  deltaInfectedLeave = 0;
}

function LateUpdate () {
  population += deltaArrive;
  population -= deltaLeave;
  infected += deltaInfected;
  infected -= deltaInfectedLeave;
  deltaArrive =0;
  deltaLeave=0;
  deltaInfected=0;
  deltaInfectedLeave=0;
}

function checkIn (health : Health) {
  deltaArrive++;
  if (health == Health.susceptible) { susceptible++; }
  else if (health == Health.infected) { deltaInfected++; }
  else if (health == Health.recovered) { recovered++; }
}

function checkOut (health : Health) {
  deltaLeave++;
  if (health == Health.susceptible) { susceptible--; }
  else if (health == Health.infected) { deltaInfectedLeave++; }
  else if (health == Health.recovered) { recovered--; }
}
