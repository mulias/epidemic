/*
LocationAssigner.js

Tells each person where their typical home and work is. 

assignHome() Returns string corresponding to the name of a location object which
  is either a home that is empty (no owners), or a random home.

assignWork() Returns string corresponding to the name of a location object which
  is either a work that is empty (no workers), or a random work.
*/

var spawner : LocationSpawner;
private var randomHomesOrder;
private var randomWorksOrder;

// we want to assign each person a work and home in such a way that
// each work and home has at least one person. To do this, we make an array
// that contains one number for each location, then we shuffle the array.
// Each time a person asks for a location, we take one from the shuffled
// array, until the array is empty. Once the array is empty we have made sure
// that each location has a person, so we assign a random location to each
// following person.
function Awake () {
  spawner = this.GetComponent.<LocationSpawner>();
  randomHomesOrder = shuffle(intsRange(1, spawner.numHomes));
  randomWorksOrder = shuffle(intsRange(1, spawner.numWorks));
}

// make an array of ints [a, a+1, a+2 ... b]
private function intsRange (a : int, b : int) {
  var res : Array = [];
  for (var i = a; i <= b; i++) {
    res.Push(i);
  }
  return res;
}

// Durstenfeld shuffle 
private function shuffle (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Random.Range(0, i + 1);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function assignHome () : String {
  // there's an empty house
  if (randomHomesOrder.length != 0) {
    return "Home " + randomHomesOrder.Pop();
  }
  // no empty houses
  else {
    return "Home " + Random.Range(1, spawner.numHomes + 1);
  }
}

function assignWork () : String {
  // there's an empty work
  if (randomWorksOrder.length != 0) {
    return "Work " + randomWorksOrder.Pop();
  }
  // no empty work
  else {
    return "Work " + Random.Range(1, spawner.numWorks + 1);
  }
}
