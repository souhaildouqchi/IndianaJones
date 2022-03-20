// vertex : Paris, Berlin, Amsterdam, Bruxelles
// Edge : what connects two vertecies [startTime,Duration]
// weight must be list of size 1 [startTime,Duration]
// priority : [startTime,Duration]
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    // if the vertex is not in the adjacency list, add it and set it's value to an empty array
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    // add the edge to the adjacency list
    this.adjacencyList[vertex1].push({ node: vertex2, weight: weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight: weight });
  }
  Dijkstra(startTime, start, finish) {
    const nodes = new PriorityQueue();
    const distances = {}; // shortest distance from start to each node
    const previous = {}; // previous vertex for each node
    let smallest; // keep track of the smallest distance in the priority queue
    let path = []; // keep track of the path from start to finish
    let candidate;
    let nextNode;
    // build initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0); // adding priority 0 to start node
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity); // adding priority Infinity to all other nodes
      }
      previous[vertex] = null; // all previous vertices start with null since we have not visited anything yet
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().value; // dequeue the smallest distance
      if (distances[smallest] !== Infinity && distances[smallest] !== 0) {
        startTime = distances[smallest]; // set the startTime to the smallest distance
      }
      if (smallest === finish) {
        // We are finished
        // return sum of priority of smallest node
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        // if the smallest is not infinity, we can visit it
        // get the neighbors of the smallest
        for (let neighbor in this.adjacencyList[smallest]) {
          // each neighbor node for each node
          nextNode = this.adjacencyList[smallest][neighbor];
          // calculate new distance to neighbor node
          // only consider the neighbor if startTime < start time of train

          if (
            new Date("1/1/1999 " + startTime) <
            new Date("1/1/1999 " + nextNode.weight[0])
          ) {
            candidate = sumTime(nextNode.weight[0], nextNode.weight[1]);
          }

          let nextNeighbor = nextNode.node;
          // if distance is infinity or 0 then candidtate is always greater
          if (
            distances[nextNeighbor] === Infinity ||
            new Date("1/1/1999 " + candidate) <
              new Date("1/1/1999 " + distances[nextNeighbor])
          ) {
            // updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous node
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, [
              nextNode.weight[0],
              nextNode.weight[1],
            ]);
          }
        }
      }
    }
    // return path.concat(smallest).reverse();  ( we can check this one if we want to see if the path is correct )
    return candidate;
  }
}

// The priority que is the what will sort the values based on the priority,
// this being in this case smalesst arrival time for an eligibale start time
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    this.values.push({ value: value, priority: priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift(); // returns first element of the sorted array
  }
  // function that sorts the values based on the priority
  // we are sorting each time not the best complexity O(N* log N)
  sort() {
    // removing Infinity values because they were messing up the sorting
    let InfinityValues = this.values.filter((val) => val.priority === Infinity);
    this.values = this.values.filter((val) => val.priority !== Infinity);
    this.values.sort((a, b) =>
      sumTime(a.priority[0], a.priority[1]).localeCompare(
        sumTime(b.priority[0], b.priority[1])
      )
    );
    // adding Infinity values back to the values array
    this.values.push(...InfinityValues);
  }
}
/***********  MAIN FUNCTION !! *******************/
const IndianaJones = (indianaJonesInput) => {
  const graph = new WeightedGraph();
  const lines = indianaJonesInput.split("\n");
  const firstLine = lines[0].split(";");
  const startTime = firstLine[0];
  const startCity = firstLine[1];
  const finishCity = firstLine[2];
  const numberOfStations = parseInt(lines[1]);
  let i = 2; // first two lines are already read
  while (i < numberOfStations + 2) {
    const line = lines[i].split(";");
    const time = line[0];
    const station = line[1];
    const nextStation = line[2];
    const weight = line[3];
    graph.addVertex(station);
    graph.addVertex(nextStation);
    graph.addEdge(station, nextStation, [time, weight]);
    i++;
  }
  return graph.Dijkstra(startTime, startCity, finishCity);
};

// function that calculate the sum of two time values
const sumTime = (time1, time2) => {
  var times = [0, 0, 0];
  var max = times.length;

  var a = (time1 || "").split(":");
  var b = (time2 || "").split(":");

  // normalize time values
  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
  }

  // store time values
  for (var i = 0; i < max; i++) {
    times[i] = a[i] + b[i];
  }

  var hours = times[0];
  var minutes = times[1];

  if (minutes >= 60) {
    var h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h;
  }

  return ("0" + (hours % 24)).slice(-2) + ":" + ("0" + minutes).slice(-2);
};

// Dijkstra's algorithm

/***  TESTS ****/

/***********  MAIN FUNCTION TEST !! *******************/

const indianaJonesTestInput = `08:20;Paris;Berlin
5
09:20;Paris;Amsterdam;03:20
08:30;Paris;Bruxelles;01:20
10:00;Bruxelles;Amsterdam;02:10
12:30;Amsterdam;Berlin;06:10
11:30;Bruxelles;Berlin;09:20`;

console.log("BEST ARRIVAL TIME : " + IndianaJones(indianaJonesTestInput));

// test weighted graph

const graph = new WeightedGraph();
// adding vertices
graph.addVertex("Paris");
graph.addVertex("Berlin");
graph.addVertex("Amsterdam");
graph.addVertex("Bruxelles");
// adding edges
graph.addEdge("Paris", "Amsterdam", ["09:20", "03:20"]);
graph.addEdge("Paris", "Bruxelles", ["08:30", "01:20"]);
graph.addEdge("Bruxelles", "Amsterdam", ["10:00", "02:10"]);
graph.addEdge("Amsterdam", "Berlin", ["12:30", "06:10"]);
graph.addEdge("Bruxelles", "Berlin", ["12:30", "09:10"]);

//console.log(graph.adjacencyList);

// test priority queue
const pq = new PriorityQueue();
pq.enqueue("Paris", ["09:20", "03:20"]);
pq.enqueue("Amsterdam", ["12:30", "06:10"]);
pq.enqueue("Bruxelles", ["10:00", "02:10"]);
pq.enqueue("Casablanca", Infinity);
pq.enqueue("Merrakesh", 0);
// console.log(pq.values);
// console.log(pq.dequeue());

// test Dijiksra
//console.log(graph.Dijkstra("08:20", "Paris", "Berlin"));
