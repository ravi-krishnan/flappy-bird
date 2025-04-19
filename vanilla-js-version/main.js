
function main(){
    // ✅
    function collission(hole_rows){
        const flappy = document.getElementById('flappy-bird');
        const obstacles = document.getElementsByClassName('obstacle');

        const score = document.getElementById('current-score')

        let flappy_row = parseInt(getComputedStyle(flappy).gridRowStart);
        let flappy_column = parseInt(getComputedStyle(flappy).gridColumnStart);

        for(let i = 0; i < obstacles.length; i++){
            let obstacle_column = parseInt(getComputedStyle(obstacles[i]).gridColumnStart);  
    
            if(flappy_column === obstacle_column){
                // console.log('same col');
                // console.log(hole_rows[i], flappy_row);
                
                if(hole_rows[i].includes(flappy_row)){ // flappy in hole > safe
                    // hard code
                    console.log('safe');
                    score.innerHTML = parseInt(score.innerHTML) + 1;
                    
                }else{
                    console.log('hit');
                    gameOver()
                    
                }
            }
        }

    }
    // ✅
    function flappyFalling(){
        const flappy_bird = document.getElementById('flappy-bird');
        var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
        flappy_bird.style.gridRowStart = flappy_bird_row + 1;
        if (flappy_bird.style.gridRowStart == rows){
            gameOver()
        }
    }

    // ✅
    function moveObstacles(){
        // for each obstacle in obstacles, move left (gridColumnStart - 1, gridRowStart)
        // console.log('should move -1 to left');

        let obstacles= document.getElementsByClassName('obstacle');
        let holes = document.getElementsByClassName('hole');
        
        for(let i = 0; i < obstacles.length; i++){
            // move obstacle
            let obstacle_column = parseInt(getComputedStyle(obstacles[i]).gridColumnStart);
            obstacles[i].style.gridColumnStart = obstacle_column - 1;

            // move holes
            let hole_column = parseInt(getComputedStyle(holes[i]).gridColumnStart);
            holes[i].style.gridColumnStart = hole_column - 1;
        }

   

    }
    // ✅   
    function createObstacles(rows, columns, hole_size, hole_rows){
        console.log(hole_rows);
        
        const game_board = document.getElementById('game-board');
        // obstacle and hole creation
        const new_obstacle =document.createElement('div');
        new_obstacle.className = 'obstacle';
        const new_hole = document.createElement('div');
        new_hole.className = 'hole';

        let hole_center = Math.floor(Math.random() * ((rows - 2) - 2) + 2)

        // obstacle style
        new_obstacle.style.gridColumnStart = columns;
        new_obstacle.style.gridRowStart = 1;
        new_obstacle.style.gridRowEnd = rows + 1;

        // hole style
        new_hole.style.gridColumnStart = new_obstacle.style.gridColumnStart;
        new_hole.style.gridRowStart = hole_center - hole_size/2;
        new_hole.style.gridRowEnd = hole_center + hole_size/2 + 1;

        game_board.appendChild(new_obstacle);
        game_board.appendChild(new_hole);

        let new_hole_row = []
        for(let i = -hole_size/2; i < hole_size/2 + 1; i++){
            new_hole_row.push(hole_center + i);
        }

        hole_rows.push(new_hole_row);
        
    }
    // ✅  
    function clearObstacles(rows, columns, hole_rows){
        const game_board = document.getElementById('game-board');
        const column_threshold = 1;
        const obstacles = document.getElementsByClassName('obstacle');
        const holes = document.getElementsByClassName('hole');

        for(let i = 0; i < obstacles.length; i++){
            if(obstacles[i].style.gridColumnStart <= column_threshold){
                game_board.removeChild(obstacles[i])
                game_board.removeChild(holes[i])
                hole_rows.shift();
            }
        }
    }

    function detectChange(rows, columns, hole_rows){
        document.addEventListener('keydown', (event)=>{
            // console.log(event.key)
            var key = event.key;
            const flappy_bird = document.getElementById('flappy-bird');
            var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
            var flappy_bird_col = parseInt(getComputedStyle(flappy_bird).gridColumnStart);    
            // console.log(hole_rows);
            
            if(is_game_over == false){
                switch(key){
                    case 'ArrowUp':
                        flappy_bird.style.gridRowStart = Math.min(flappy_bird_row + 1, rows);
                        if (flappy_bird.style.gridRowStart == rows){
                            gameOver()
                        }
                        break;
                    case 'ArrowDown':
                        flappy_bird.style.gridRowStart = Math.max(flappy_bird_row - 1, 0);
                        break;
                    case 'ArrowLeft':
                        flappy_bird.style.gridColumnStart = Math.max(flappy_bird_col - 1, 0);
                        break;
                    case 'ArrowRight':
                        flappy_bird.style.gridColumnStart = Math.min(flappy_bird_col + 1, columns);
                    
                        break;
                    default:
                        console.log('some other key')
                    
        
                }
                collission(hole_rows)
            }else{
                console.log('game is currently on pause, press Space to restart')
            }
            
            
    
            })
    }
    // ✅
    function gameOver(){
        // current score , high score check
        // play sound
        // show  over
        // freeze frame
        const game_over_overlay = document.getElementById('game-over')
        const score  = document.getElementById('current-score');
        const high_score  = document.getElementById('high-score');

        game_over_overlay.style.display = 'block';
        clearInterval(game_loop);
        clearInterval(object_creation_loop);
        console.log('overß');
        is_game_over = true;
        if(score.innerHTML > high_score.innerHTML){
            high_score.innerHTML = score.innerHTML;
        }
    }

    const board = document.getElementById("game-board");
    const columns = getComputedStyle(board).getPropertyValue("grid-template-columns").split(" ").length;
    const rows = getComputedStyle(board).getPropertyValue("grid-template-rows").split(" ").length;

    let is_game_over = false;
    const hole_size = 4; // only even values

    console.log("Columns:", columns);
    console.log("Rows:", rows);  
    let hole_rows = []
    // var hole_rows = showObstacles(rows, columns, hole_size);
    detectChange(rows, columns, hole_rows);

    // game run loop
    let game_loop = setInterval(()=>{
        
        flappyFalling();
        moveObstacles();
        collission(hole_rows);
        clearObstacles(rows, columns, hole_rows);
    }, 300)

    // object creation loop
    let object_creation_loop = setInterval(()=>{
        createObstacles(rows, columns, hole_size, hole_rows);
    }, 5000)
}

main()