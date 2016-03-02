var index : int; // each location has an index between 1 and number of locations
var population  : int;
var susceptible : int;
var infected   : int;
var recovered   : int;
var deltaArrive	: int;
var deltaLeave	: int;
var deltaInfected: int;
var deltaInfectedLeave: int;

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
