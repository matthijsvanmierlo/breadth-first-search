let grid = [];
const rows = 10;
const cols = 10;
let xDim = -1;
let yDim = -1;
let gridMap = new Map();
let startPoint = {
    x : 0,
    y : 0
}
let endPoint = {
    x : cols - 1,
    y : rows - 1
}
// Path from search algorithms to highlight as solution
let parents = new Map();

function setup()
{
    createCanvas(window.innerWidth, window.innerHeight);
    background(100);
    xDim = Math.floor(width / cols);
    yDim = Math.floor(height / rows);
    for(let row = 0; row < rows; row++)
    {
        let tempRow = []
        for(let col = 0; col < cols; col++)
        {
            tempRow.push(false)
        }
        grid.push(tempRow)
    }

    for(let row = 0; row < rows; row++)
    {
        for(let col = 0; col < cols; col++)
        {
            rect(col * xDim, row * yDim, xDim, yDim);
        }
    }
}

function keyPressed()
{
    if(keyCode === ENTER)
    {
        parents = new Map();
        // BFS Search...
        // https://www.techgeekbuzz.com/breadth-first-search-graph-dsa/#:~:text=BFS%20Pseudocode:%20procedure%20BFS%20(G,start_v):%20let%20Q%20be,w%20as%20discovered%20w.parent%20=%20v%20Q.enqueue%20(w)
        let discovered = new Set();
        // Row Column Representation
        discovered.add(locToString(startPoint.y, startPoint.x));
        let queue = [];
        // Row Column Representation
        queue.push({row : startPoint.y, col : startPoint.x});
        // While the queue is not empty
        while(queue.length > 0)
        {
            let v = queue.shift();
            if(v.row == endPoint.y && v.col == endPoint.x)
            {
                console.log("FOUND ROUTE!");
                let stopGeneratingPath = false;
                let parent = parents.get(locToString(endPoint.y, endPoint.x));
                console.log(parent);
                while(stopGeneratingPath == false)
                {
                    if(parent.row == startPoint.y && parent.col == startPoint.x)
                    {
                        stopGeneratingPath = true;
                        break;
                    }
                    fill(0, 0, 255);
                    rect(parent.col * xDim, parent.row * yDim, xDim, yDim);
                    // console.log(parent);
                    parent = parents.get(locToString(parent.row, parent.col));
                }
                return v;
            }
            else
            {
                let currRow = v.row;
                let currCol = v.col;
                // UP
                if(currRow - 1 >= 0 && currRow - 1 < rows && currCol >= 0 && currCol < cols)
                {
                    // If this point has not been discovered yet...
                    if(discovered.has(locToString(currRow - 1, currCol)) == false && grid[currRow - 1][currCol] == false)
                    {
                        discovered.add(locToString(currRow - 1, currCol));
                        queue.push({row : currRow - 1, col : currCol});
                        // Set this node's parent to v to remember the path
                        parents.set(locToString(currRow - 1, currCol), v);
                        
                    }
                }
                // DOWN
                if(currRow + 1 >= 0 && currRow + 1 < rows && currCol >= 0 && currCol < cols)
                {
                    // If this point has not been discovered yet...
                    if(discovered.has(locToString(currRow + 1, currCol)) == false && grid[currRow + 1][currCol] == false)
                    {
                        discovered.add(locToString(currRow + 1, currCol));
                        queue.push({row : currRow + 1, col : currCol});
                        // Set this node's parent to v to remember the path
                        parents.set(locToString(currRow + 1, currCol), v);
                    }
                }
                // LEFT
                if(currRow >= 0 && currRow < rows && currCol - 1 >= 0 && currCol - 1 < cols)
                {
                    // If this point has not been discovered yet...
                    if(discovered.has(locToString(currRow, currCol - 1)) == false && grid[currRow][currCol - 1] == false)
                    {
                        discovered.add(locToString(currRow, currCol - 1));
                        queue.push({row : currRow, col : currCol - 1});
                        // Set this node's parent to v to remember the path
                        parents.set(locToString(currRow, currCol - 1), v);
                    }
                }
                // RIGHT
                if(currRow >= 0 && currRow < rows && currCol + 1 >= 0 && currCol + 1 < cols)
                {
                    // If this point has not been discovered yet...
                    if(discovered.has(locToString(currRow, currCol + 1)) == false && grid[currRow][currCol + 1] == false)
                    {
                        discovered.add(locToString(currRow, currCol + 1));
                        queue.push({row : currRow, col : currCol + 1});
                        // Set this node's parent to v to remember the path
                        parents.set(locToString(currRow, currCol + 1), v);
                    }
                }
            }
        }
    }

}

function mouseClicked()
{
    let row = Math.floor(mouseY / yDim);
    let col = Math.floor(mouseX / xDim);
    console.log(row, col)
    if(grid[row][col] == true)
    {
        grid[row][col] = false;
    }
    else
    {
        grid[row][col] = true;
    }
    draw();
}

function locToString(row, col)
{
    return "(" + row + ", " + col + ")";
}

function draw()
{
    background(255);
    for(let row = 0; row < rows; row++)
    {
        for(let col = 0; col < cols; col++)
        {
            if(grid[row][col] == false)
            {
                // Unoccupied space
                fill(255);
            }
            else
            {
                fill(0);
            }
            rect(col * xDim, row * yDim, xDim, yDim);
        }
    }
    fill(255, 0, 0);
    rect(startPoint.x * xDim, startPoint.y * yDim, xDim, yDim);
    fill(0, 255, 0);
    rect(endPoint.x * xDim, endPoint.y * yDim, xDim, yDim);
    noLoop();
}