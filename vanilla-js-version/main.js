
function main(){


    function collission(hole_rows){
        const flappy = document.getElementById('flappy-bird');
        const obstacle = document.getElementById('obstacle');
        const hole = document.getElementById('hole')
        const score = document.getElementById('current-score')

        let flappy_row = parseInt(getComputedStyle(flappy).gridRowStart);
        let flappy_column = parseInt(getComputedStyle(flappy).gridColumnStart);

        let obstacle_column = parseInt(getComputedStyle(obstacle).gridColumnStart);

        // console.log('flappy', flappy_row, flappy_column)
        // console.log('obstacle', obstacle_column)
        // console.log('holes', hole_rows)    

        if(flappy_column === obstacle_column){
            console.log('same col');
            console.log(hole_rows, flappy_row);
            
            if(hole_rows.includes(flappy_row)){ // flappy in hole > safe
                // hard code
                console.log('safe');
                score.innerHTML = parseInt(score.innerHTML) + 1;
                
            }else{
                console.log('hit');
                game_over()
                
            }
        }

    }

    function flappy_falling(){
        const flappy_bird = document.getElementById('flappy-bird');
        var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
        flappy_bird.style.gridRowStart = flappy_bird_row + 1;
        if (flappy_bird.style.gridRowStart == rows){
            game_over()
        }
        // console.log(flappy_bird.style.gridRowStart);
    }
    function move_obstacles(){
        // for each obstacle in obstacles, move left (gridColumnStart - 1, gridRowStart)
        // console.log('should move -1 to left');
        
        
        
        let obstacle = document.getElementById('obstacle');
        let hole = document.getElementById('hole');
        // move obstacle
        let obstacle_column = parseInt(getComputedStyle(obstacle).gridColumnStart);
        obstacle.style.gridColumnStart = obstacle_column - 1;
        // move holes
        let hole_column = parseInt(getComputedStyle(hole).gridColumnStart);
        hole.style.gridColumnStart = hole_column - 1;

    }
    
    function show_obstacles(rows, columns, hole_size){
        let obstacle = document.getElementById('obstacle');
        let hole = document.getElementById('hole');
        let hole_center = 15
        // obstacle movement
        obstacle.style.gridRowStart = 1;
        obstacle.style.gridRowEnd = rows+1;
        obstacle.style.gridColumnStart = 20;
        //  hole movement
        hole.style.gridRowStart = hole_center - hole_size/2;
        hole.style.gridRowEnd = hole_center + hole_size/2 + 1;
        hole.style.gridColumnStart = obstacle.style.gridColumnStart;

        // hole rows store
        let hole_rows = [hole_center - 2, hole_center -1 , hole_center, hole_center + 1, hole_center+2];
        console.log(hole_rows);
        return hole_rows;


    }
    function detect_change(rows, columns, hole_rows){
        document.addEventListener('keydown', (event)=>{
            // console.log(event.key)
            var key = event.key;
            const flappy_bird = document.getElementById('flappy-bird');
            var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
            var flappy_bird_col = parseInt(getComputedStyle(flappy_bird).gridColumnStart);    
            // collission(hole_rows)
            if(is_game_over == false){
                switch(key){
                    case 'ArrowUp':
                        flappy_bird.style.gridRowStart = Math.min(flappy_bird_row + 1, rows);
                        if (flappy_bird.style.gridRowStart == rows){
                            game_over()
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

    function game_over(){
        // current score , high score check
        // play sound
        // show  over
        // freeze frame
        const game_over_overlay = document.getElementById('game-over')
        const score  = document.getElementById('current-score');
        const high_score  = document.getElementById('high-score');

        game_over_overlay.style.display = 'block';
        clearInterval(game_loop)
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


    var hole_rows = show_obstacles(rows, columns, hole_size);

    detect_change(rows, columns, hole_rows);
    let game_loop = setInterval(()=>{
        flappy_falling();
        move_obstacles();
        collission(hole_rows);
    }, 300)
}

main()