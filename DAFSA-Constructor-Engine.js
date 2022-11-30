class Node {
    constructor(nodeIndex, nodeChildren, isEndOfWord) {
      this.nodeIndex = nodeIndex;
      this.nodeChildren = nodeChildren;
      this.isEndOfWord = false;
    }
  }
  
  class Transition {
    constructor(transitionCurrent, transitionNext, transitionCharacter) {  
      this.transitionCurrent = transitionCurrent;
      this.transitionNext = transitionNext;
      this.transitionCharacter = transitionCharacter;
    }
  }
  
  class Graph {
    constructor(trieRoot, trieNodes, trieFinalNodes, trieTransitions) {
      this.trieRoot = new Node("trieRoot", [], false);
      this.trieNodes = [];
      this.trieFinalNodes = [];
      this.trieTransitions = [];
    }
  }
  
  let graph = new Graph();
  
  function constructDafsa(userLanguage) {
    userLanguage = userLanguage.split(","); // split the input into an array on each comma
    console.log(userLanguage);
    let nodeCount = 0; // keep track of the count of nodes
    //for every word in userLanguage
    for (let iterator = 0; iterator < userLanguage.length; iterator++) {
      let currentState = graph.trieRoot;
      userLanguage[iterator] = userLanguage[iterator].replaceAll(" ", "");
  
      userLanguage[iterator].split("").forEach((currentChar) => {
        let previousState = currentState;
        //if character does not exist in nodeChildren of currentState node
        if (!currentState.nodeChildren[currentChar]) {
          //add character to nodeChildren of currentState node
          nodeCount++; // increment nodeCount

          currentState.nodeChildren[currentChar] = new Node(nodeCount, [], false); // create a new node with the current character as the nodeIndex

          graph.trieNodes.push(currentState.nodeChildren[currentChar].nodeIndex); // add the nodeIndex to the trieNodes array
          
          let transition = new Transition(previousState.nodeIndex, currentState. nodeChildren[currentChar].nodeIndex,currentChar); // create a new transition with the current character as the transitionCharacter

          graph.trieTransitions.push(transition); // add the transition to the trieTransitions array

          console.log("trieTransitions", graph.trieTransitions);
          console.log("transition", transition);
        }      
        console.log(`State ${currentState.nodeIndex} has children: ${currentState.nodeChildren[currentChar].nodeIndex}`);
        //move to next node
        currentState = currentState.nodeChildren[currentChar]; // set the currentState to the nodeChildren of the current node (as in move to the next node)
      });
  
      nodeCount = currentState.nodeIndex; // set the nodeCount to the nodeIndex of the current node
      graph.trieFinalNodes.push(currentState.nodeIndex); // add the nodeIndex of the current node to the trieFinalNodes array     
      currentState.isEndOfWord = true; //mark currentState node as end of word
    }
    console.log("graph", graph);
    // toDotString(graph);
    return graph;
  }
  
  function toDotString(graph) {
    let dotString = "digraph userDafsa {\n";
    // dotString += 'size="8,5";\n';
    dotString += "node [shape = point]; INITIAL_STATE\n";
    dotString += "node [shape = doublecircle]; " + graph.trieFinalNodes.join(",") + ";\n";
    dotString += "node [shape = circle];\n";
    dotString += "INITIAL_STATE -> " + "trieRoot" + ";\n";
  
    for (let i = 0; i < graph.trieTransitions?.length; i++) {
      let currentTransition = graph.trieTransitions[i];  
      dotString += `${currentTransition.transitionCurrent} -> ${currentTransition.transitionNext} [ label = "${currentTransition.transitionCharacter}" ];\n`;
    }
  
    dotString += "}";
    return dotString;
  }
  