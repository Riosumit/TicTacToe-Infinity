let matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let list1 = []
let list2 = []
let turn = 0;
let player = 1;

// function check_win(player){
//     if(player == 1){
//         condition = (list1[0][0]==list1[1][0] && list1[0][0]==list1[2][0]) || (list1[0][1]==list1[1][1] && list1[0][1]==list1[2][1]) || (list1[0][0]==list1[0][1] && list1[1][0]==list1[1][1] &&list1[1][0]==list1[2][1])
//     }
// }

function restart(){
    matrix = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
    list1 = []
    list2 = []
    turn = 0;
    player = 1;
    document.getElementById("msg").style.zIndex = "-1";
    document.getElementById("msg").innerHTML = "";
    Array.from(document.getElementsByClassName('symbol')).forEach((item, index) => {
        item.style.display = "none";
    });
}

function checkWin(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0] == player && matrix[i][1] == player && matrix[i][2] == player) {
            return true; // Player wins
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (matrix[0][j] == player && matrix[1][j] == player && matrix[2][j] == player) {
            return true; // Player wins
        }
    }

    // Check diagonals
    if (matrix[0][0] == player && matrix[1][1] == player && matrix[2][2] == player) {
        return true; // Player wins (diagonal from top-left to bottom-right)
    }
    if (matrix[0][2] == player && matrix[1][1] == player && matrix[2][0] == player) {
        return true; // Player wins (diagonal from top-right to bottom-left)
    }

    return false; // No win condition met
}

function show(x, y){
    if(matrix[x][y]==0){
        matrix[x][y]=player
        if(player==1){
            if(list1.length>=3){
                let removedCell = list1.shift();
                let [removedX, removedY] = removedCell;
                matrix[removedX][removedY] = 0;
            }
            list1.push([x,y])
            symbol = document.getElementById("zero"+(Math.floor(turn / 2) % 3))
            if(checkWin(player)){
                document.getElementById("msg").style.zIndex = "10";
                document.getElementById("msg").innerHTML = "<h1>Player1 wins</h1>";
            }
            player=2
        }
        else if(player==2){
            if(list2.length>=3){
                let removedCell = list2.shift();
                let [removedX, removedY] = removedCell;
                matrix[removedX][removedY] = 0;
            }
            list2.push([x,y])
            symbol = document.getElementById("cross"+(Math.floor(turn / 2) % 3))
            if(checkWin(player)){
                document.getElementById("msg").style.zIndex = "10";
                document.getElementById("msg").innerHTML = "<h1>Player2 wins</h1>";
            }
            player=1
        }
        symbol.style.display="none";
        symbol.style.top=(x*32)+"%";
        symbol.style.left=(y*32)+"%";
        symbol.style.display="block";
        turn++;
    }
}