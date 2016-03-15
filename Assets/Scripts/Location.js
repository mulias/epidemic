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
var kind : LocKind;
var population  : int;
var susceptible : int;
var infected    : int;
var recovered   : int;
var deltaArrive	: int;
var deltaLeave	: int;
var deltaInfected: int;
var deltaInfectedLeave: int;
var infectionCoefficient: float;
var recoveryCoefficient: float;
var ratioSick : float;
var probability: float;

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
  //alter location and global health variables
  if (health == Health.susceptible)    { susceptible++; }
  else if (health == Health.infected)  { deltaInfected++; }
  else if (health == Health.recovered) { recovered++; }
}

function checkOut (health : Health, ratioSick : float) {
  deltaLeave++;
  //alter location and global health variables
  if (health == Health.susceptible) 	  { susceptible--; }
  else if (health == Health.infected) 	{ deltaInfectedLeave++; }
  else if (health == Health.recovered) 	{ recovered--; }

  //get sickness coeffifient
  switch (this.kind) {
    case LocKind.Sleep:
      probability = sleepHealthPolicy(health, ratioSick); 
      break;
    case LocKind.Travel:
      probability = travelHealthPolicy(health, ratioSick); 
      break;
    case LocKind.Home:
      probability = homeHealthPolicy(health, ratioSick); 
      break;
    case LocKind.Work:
      probability = workHealthPolicy(health, ratioSick); 
      break;
    case LocKind.School:
      probability = schoolHealthPolicy(health, ratioSick); 
      break;
    case LocKind.Hospital:
      probability = hospitalHealthPolicy(health, ratioSick); 
      break;
    default:
      Debug.LogError("Invalid location kind, no health policy to apply.");
      break;
  }

  Debug.Log("Ratio = " + ratioSick + " Probability = " + probability + " Location " + this.name);

  if (health == Health.susceptible && Random.Range(0,100)<probability*100) { 
    return 1; 
  }
  else if (health == Health.infected && Random.Range(0,100)<probability*100) { 
    return 2; 
  }
  else { 
    return 0; 
  }
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

