/*
Health.js
To share the Health enum between objects, we need to make sure it compiles
first. To do this we keep it in the special Plugins folder.
*/

// Person is in one of many health states at a time.
enum Health {susceptible, infected, recovered};
