# epidemic
A game about managing an epidemic. Currently includes the general game model
for people, locations, and getting sick.

### Location.js
Each location is based off the general location object. A location keeps track
of the number of healthy and sick people that go to and from the location. 
Locations are distinguished from each other by their name, the policy used
to check if people get sick at that place, and (once we have a GUI) their
position on the map. Locations are passive objects -- they only collect the
information given to them.

### LocationSpawner.js
When the game starts, make all of the needed locations, and give them appropriate
names.

### Person.js
Each person is based off the general person object. A person has a schedule that
they run through each day, going to different locations. People are distinguished
from each other by their name, schedule, and current health status. People are
active objects -- they call methods to go places, update values, and make
decisions.

### PersonSpawner.js
When the game starts, make all of the needed people, and give them appropriate
names.

### WorldClock.js
The in game clock makes game time run at some multiple of real time. This way
the game can run very slow (1:1 speed, if you're crazy) to really fast (each
day happens in 20 second, for example). Each person stays on schedule by
checking the clock each update, and making sure they are in the right place.
