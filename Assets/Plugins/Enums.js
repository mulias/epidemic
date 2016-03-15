/*
Enums.js
This file contains global enums, values that are used to communicate between
objects. To make sure these values can be used by all objects, we have to
make sure they get compiled first. To do this we use the special Plugins folder.
*/

// Person is in one of many health states at a time.
enum Health {
  susceptible, 
  infected, 
  recovered
};

enum LocKind {
  Home, 
  Work, 
  School, 
  Hospital, 
  Sleep, 
  Travel
};
