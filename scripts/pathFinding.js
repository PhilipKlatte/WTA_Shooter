class pathFinding{

    constructor(grid,start, end){

      this.grid = grid;
      this.start = start;
      this.end = end;



      /*
  const grid = [
    [new Cell(0, 0, false), new Cell(1, 0, false), new Cell(2, 0, false)],
    [new Cell(0, 1, true), new Cell(1, 1, true), new Cell(2, 1, false)],
    [new Cell(0, 2, false), new Cell(1, 2, false), new Cell(2, 2, false)]
  ];
  
  const start = { x: 0, y: 0 };
  const end = { x: 2, y: 2 };
  */
    }


 findeDenWeg(){

  
  const path = astar(grid, start, end);
  console.log(path); // Gib den gefundenen Pfad aus
}
//

// Hilfsfunktion, um eine Zelle im Gitter darzustellen
 Cell(x, y, isWall) {
    this.x = x;
    this.y = y;
    this.g = 0; // Entfernung vom Startpunkt
    this.h = 0; // Heuristische Entfernung zum Zielpunkt
    this.f = 0; // Gesamtkosten: f = g + h
    this.visited = false;
    this.closed = false;
    this.parent = null;
    this.isWall = isWall;
  }
  
  // A* Pfadfindungsalgorithmus
   astar(grid, start, end) {
    const openList = [];
    const closedList = [];
  
    console.log("Moin");

    // Initialisierung des Startpunkts
    const startCell = grid[start.x][start.y];
    startCell.visited = true;
    openList.push(startCell);
  
    while (openList.length > 0) {
      // Finde Zelle mit niedrigsten Gesamtkosten (f)
      let lowestCostIndex = 0;
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f < openList[lowestCostIndex].f) {
          lowestCostIndex = i;
        }
      }
  
      const currentCell = openList[lowestCostIndex];
  
      // Ziel erreicht
      if (currentCell === grid[end.x][end.y]) {
        const path = [];
        let temp = currentCell;
        while (temp.parent) {
          path.push(temp);
          temp = temp.parent;
        }
        return path.reverse();
      }
  
      // Aktuelle Zelle aus der Open-Liste entfernen und zur Closed-Liste hinzufügen
      openList.splice(lowestCostIndex, 1);
      closedList.push(currentCell);
      currentCell.closed = true;
  
      // Nachbarn der aktuellen Zelle überprüfen
      const neighbors = getNeighbors(grid, currentCell.x, currentCell.y);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
  
        if (neighbor.closed || neighbor.isWall) {
          continue;
        }
  
        const gScore = currentCell.g + 1; // Die Entfernung zum Nachbarn beträgt 1
  
        // Überprüfen, ob der Nachbar bereits in der Open-Liste ist
        const inOpenList = openList.includes(neighbor);
        if (!inOpenList || gScore < neighbor.g) {
          neighbor.g = gScore;
          neighbor.h = heuristic(neighbor, grid[end.x][end.y]);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentCell;
  
          if (!inOpenList) {
            openList.push(neighbor);
            neighbor.visited = true;
          }
        }
      }
    }
  
    // Kein Pfad gefunden
    return [];
  }
  
  // Hilfsfunktion, um die Nachbarn einer Zelle zu erhalten
   getNeighbors(grid, x, y) {
    const neighbors = [];
    const numRows = grid.length;
    const numCols = grid[0].length;
  
    if (x > 0) neighbors.push(grid[x - 1][y]); // Links
    if (x < numRows - 1) neighbors.push(grid[x + 1][y]); // Rechts
    if (y > 0) neighbors.push(grid[x][y - 1]); // Oben
    if (y < numCols - 1) neighbors.push(grid[x][y + 1]); // Unten
  
    return neighbors;
  }
  
  // Hilfsfunktion, um die heuristische Entfernung zwischen zwei Zellen zu berechnen
   heuristic(cellA, cellB) {
    const dx = Math.abs(cellA.x - cellB.x);
    const dy = Math.abs(cellA.y - cellB.y);
    return dx + dy; // Manhattan-Distanz
  }
  


//


}