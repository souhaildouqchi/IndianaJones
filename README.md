# IndianaJones
A solution to the indiana jones problem, using the dijikstra algorithm.


Travel by train 


List of travel times :start_time, start_city, finish_city, time_of_travel

using this we need to find out the best trajectory to reach the destination the fastesst 


### INPUT 
first line : start_time, start_city, finish_city (H, VD, VA)
second line : N : size of list of travel times 
start_time, start_city, finish_city, time_of_travel (HD,V1,V2,D)


## OUTPUT 

time our passenger arrives at his destination (9:5 no, 09:05)




## CONSTRAINTS
 a check must be done on start time, when filtering cities that start with same input_start_city we must compare time input_start_time <= start_time 

## ALGORITHM 

### First itteration : 


(should be a function check_cities)
check only cities that start with our : start_ctiy passed in input 

in the example : this leaves only two : 

09:20;Paris;Amsterdam;03:20 
08:30;Paris;Bruxelles;01:20


### Second itteration : 

the input will be both results from the first itteration 

start_time, start_city, finish_city (H, VD, VA)

start_time = start_time_itteration_1 + finish_time_itteration_1 
start_city = finish_city_itteration_1 
finish_city = call check_cities will return more then one ( pass as input start_city )


for example : 
amsterdam will ruled out ( must be the check on start time )
start_city  = Bruxelle 
start_time = 09:50
finish_city = list :  amsterdam, berlin ( distination reached mark time  = 19:10 )


### Third itteration 

start_city = amsterdam
start_time = start_time_itteration_2 + finish_time_itteration_2
finish_city  = list ( if list contains only one record stop )
finish_time = 18:40 ( compare to other one )
if less then return it



line 2 : 9.50, bruxelle 
line 3 : 12.10 amsterdam
line 4 : berlin : 18.40




### Dijksrta shortesst path algorithm 
Graph, and priority que 

What's the fastest way to get from point A to point B


Writing a weighted graph 


### The approach 

1. everytime we look to visit a new node, we pick the node with smallest known distance to vist first 
2. one we've moved to the node we're going to visit, we look at each of it's neighbors 
3. For each neighoring node, we calculate the distance by summing the total edges that lead to the node we're checking from the starting node.
4. if the new total distance to a node is less than the previous total, we store the new shorter distance of that node 

Always pick the smalesst, if two of the same value you can pick either one 


Pick the smaless distance from starting point that we have not visted 
Expose each of its neighbours 
We calculate the new shortesst distance to each neighbour ( if its smaller then what we stored, we update what we stored )



The priority que is the what will sort the values based on the priority, this being in this case smalesst arrival time for an eligibale start time 


there is a better way using binary heap

## Dijikstra pseudocode


1. function should accept a startting and ending vertex 

2. create an object called distances and set each key to be every vertex in the adjacency list with start value of infinity, except the starting vertex ( starting city ) should have 0 
3. After setting a value in the distances object, add all vertercies with a priority of infinity to proiority que except the starting vertex ( that has 0 ) priority queue will give us the shortesst vertex from our starting point.
4. Create an object called previous and set each key to be every vertex in the adjacency list with a value of null ( because we are still in the starting point )
5. Start looping as long as there is anything in the priority queue 
	1. dequeue a vertex from the priority queue 
	2. if that vertex is the same as the ending vertex, we finished.
	3. else loop each value in adjacency list at that vertex 
		1. calculate the distance to that vertex from the starting vertex 
		2. if the distance is less than what is stored in our distances object
			1. update the distances object with new lower distance
			2. update the previous object to contain that vertex
			3. enqueue the vertex with the total distance from satrt node 




