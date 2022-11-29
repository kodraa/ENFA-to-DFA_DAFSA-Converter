class Node {
    constructor(name, children, isEnd) {
      let obj = {};
      children = obj;
  
      this.name = name;
      this.children = children;
      this.isEnd = false;
    }
  }
  
  class Transition {
    constructor(currentNode, nextNodes, character) {
      if (!(typeof character === "string" || character instanceof String))
        throw new Error("Expected a string symbol");
  
      this.currentNode = currentNode;
      this.nextNodes = nextNodes;
      this.character = character;
    }
  }
  
  class Trie {
    constructor(root, nodes, finalNodes, transitions) {
      this.root = new Node("root", [], false);
      this.transitions = [];
      this.finalNodes = [];
      this.nodes = [];
    }
  }
  
  // form dotString
  let trie = new Trie();
  
  function constructDafsa(userLanguage) {
    userLanguage = userLanguage.split(","); // split the string into an array of characters
    console.log(userLanguage);
    let i = 0;
    //for every word in userLanguage
    for (let j = 0; j < userLanguage.length; j++) {
      let currentState = trie.root;
      userLanguage[j] = userLanguage[j].replaceAll(" ", "");
  
      userLanguage[j].split("").forEach((character) => {
        let prev = currentState;
        //if character does not exist in children of currentState node
        if (!currentState.children[character]) {
          //add character to children of currentState node
          i += 1;
          currentState.children[character] = new Node(i, [], false);
          trie.nodes.push(currentState.children[character].name);
          let transition = new Transition(
            prev.name,
            currentState.children[character].name,
            character
          );
          trie.transitions.push(transition);
          console.log(trie.transitions);
          console.log("transition", transition);
        }
        console.log(
          "children of",
          currentState.name,
          "are",
          currentState.children[character].name
        );        
        //move to next node
        currentState = currentState.children[character];
      });
  
      i = currentState.name;
      trie.finalNodes.push(currentState.name);
      //mark currentState node as end of word
      currentState.isEnd = true;
    }
    console.log("trie", trie);
    toDotString(trie);
  }
  
  function toDotString(trie) {
    let dotStr = "digraph fsm {\n";
    // dotStr += 'size="8,5";\n';
    dotStr += "node [shape = point]; INITIAL_STATE\n";
    dotStr += "node [shape = doublecircle]; " + trie.finalNodes.join(",") + ";\n";
    dotStr += "node [shape = circle];\n";
    dotStr += "INITIAL_STATE -> " + "root" + ";\n";
  
    for (let i = 0; i < trie.transitions?.length; i++) {
      let t = trie.transitions[i];
  
      dotStr +=
        "" +
        t.currentNode +
        " -> " +
        t.nextNodes +
        " [label=" +
        t.character +
        "];\n";
    }
  
    dotStr += "}";
  
    d3.select("#dafsa-result").graphviz().renderDot(dotStr);
    return dotStr;
  }
  