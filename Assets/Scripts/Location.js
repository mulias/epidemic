// health status
//enum Health {susceptible, infected, recovered};

var index : int; // each location has an index between 1 and number of locations
var population  : int;
var susceptible : int;
var infected   : int;
var recovered   : int;
var deltaArrive	: int;
var deltaLeave	: int;
var deltaInfected: int;
var deltaInfectedLeave: int;
var loc : Location;
var infectionCoefficient: float;
var recoveryCoefficient: float;
var ratioSick : float;
var probability: float;

function Start () {
	loc = this.GetComponent.<Location>();
}

function Awake () {
  population  = 0;
  susceptible = 0;
  infected    = 0;
  recovered   = 0;
  deltaArrive = 0;
  deltaLeave  = 0;
  deltaInfected = 0;
  deltaInfectedLeave = 0;
  //infectionCoefficient = 2;
  //recoveryCoefficient = 3;
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
   //alter location and global health variables
  if (health == Health.susceptible) { susceptible++; }
  else if (health == Health.infected) { deltaInfected++; }
  else if (health == Health.recovered) { recovered++; }
}

function checkOut (health : Health, ratioSick : float) {
  deltaLeave++;
  //alter location and global health variables
  if (health == Health.susceptible) 	{ susceptible--; }
  else if (health == Health.infected) 	{ deltaInfectedLeave++; }
  else if (health == Health.recovered) 	{ recovered--; }

  //get sickness coeffifient
  if (loc.name == "Sleep") 			{ probability = sleepHealthPolicy(health, ratioSick); }
  else if (loc.name == "Travel") 	{ probability = travelHealthPolicy(health, ratioSick); }
  //else if (loc.name == "Home") 		{ probability = homeHealthPolicy(health, ratioSick); }
  else if (loc.name.StartsWith("Home")) 		{ probability = homeHealthPolicy(health, ratioSick); }
  else if (loc.name.StartsWith("Work")) 		{ probability = workHealthPolicy(health, ratioSick); }
  else if (loc.name.StartsWith("School"))	 	{ probability = schoolHealthPolicy(health, ratioSick); }
  else if (loc.name.StartsWith("Hospital")) 	{ probability = hospitalHealthPolicy(health, ratioSick); }

  Debug.Log("Ratio = " + ratioSick + " Probability = " + probability + " Location " + loc.name);

  if (health == Health.susceptible && Random.Range(0,100)<probability*100) 	{ return 1; }
  else if (health == Health.infected && Random.Range(0,100)<probability*100) { return 2; }
  else 																		{ return 0; }

}

function sleepHealthPolicy(health : Health, ratioSick : float){
	infectionCoefficient = 0.01;
	recoveryCoefficient = 0.05;
	if (health == Health.susceptible)	{ return infectionCoefficient; }	
	else if (health == Health.infected) { return recoveryCoefficient; }
	else								{ return 1;}
}

function travelHealthPolicy(health : Health, ratioSick : float){
	infectionCoefficient = 0.01;
	recoveryCoefficient = 0.01;
	if (health == Health.susceptible)	{ return infectionCoefficient; }	
	else if (health == Health.infected) { return recoveryCoefficient; }
	else								{ return 1;}
}

function homeHealthPolicy(health : Health, ratioSick : float){
	infectionCoefficient = .6;
	recoveryCoefficient = 0.01;
	if (health == Health.susceptible)	{ return infectionCoefficient*ratioSick; }	
	else if (health == Health.infected) { return recoveryCoefficient; }
	else								{ return 1;}
}

function workHealthPolicy(health : Health, ratioSick : float){
	infectionCoefficient = .75;
	recoveryCoefficient = 0.01;
	if (health == Health.susceptible)	{ return infectionCoefficient*ratioSick; }	
	else if (health == Health.infected) { return recoveryCoefficient; }
	else								{ return 1;}
}

function schoolHealthPolicy(health : Health, ratioSick : float){
	infectionCoefficient = .75;
	recoveryCoefficient = 0.01;
	if (health == Health.susceptible)	{ return infectionCoefficient*ratioSick; }	
	else if (health == Health.infected) { return recoveryCoefficient; }
	else								{ return 1;}
}

function hospitalHealthPolicy(health : Health, ratioSick : float){
	infectionCoefficient = 0.1;
	recoveryCoefficient = 0.75;
	if (health == Health.susceptible)	{ return infectionCoefficient*ratioSick; }	
	else if (health == Health.infected) { return recoveryCoefficient; }
	else								{ return 1;}
}

