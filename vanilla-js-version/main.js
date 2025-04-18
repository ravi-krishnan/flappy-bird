

function main(){
    function flappy_falling(){
        const flappy_bird = document.getElementById('flappy-bird');
        var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
        flappy_bird.style.gridRowStart = flappy_bird_row + 1;
        if (flappy_bird.style.gridRowStart == rows){
            game_over()
        }
        // console.log(flappy_bird.style.gridRowStart);
    }
    
    function detect_change(rows, columns){
        document.addEventListener('keydown', (event)=>{
            console.log(event.key)
    
            var key = event.key;
            const flappy_bird = document.getElementById('flappy-bird');
            var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
            var flappy_bird_col = parseInt(getComputedStyle(flappy_bird).gridColumnStart);    
    
    
            switch(key){
                case 'ArrowUp':
                    flappy_bird.style.gridRowStart = Math.min(flappy_bird_row + 1, rows);
                    if (flappy_bird.style.gridRowStart == rows){
                        console.log('end');
                        
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
    
            })
    }

    function game_over(){
        // current score , high score check
        // play sound
        // show  over
        // freeze frame
        const game_over_overlay = document.getElementById('game-over')
        game_over_overlay.style.display = 'block'
        clearInterval(game_loop)
        console.log('overß');
        
    }

    const board = document.getElementById("game-board");
    const columns = getComputedStyle(board).getPropertyValue("grid-template-columns").split(" ").length;
    const rows = getComputedStyle(board).getPropertyValue("grid-template-rows").split(" ").length;

    console.log("Columns:", columns);
    console.log("Rows:", rows);  

    detect_change(rows, columns)
    let game_loop = setInterval(()=>{
        // console.log('falling')
        flappy_falling()
    }, 300)
}

main()