function flappy_falling(){
    const flappy_bird = document.getElementById('flappy-bird');
    var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
    flappy_bird.style.gridRowStart = flappy_bird_row + 1;
    // console.log(flappy_bird.style.gridRowStart);
}

function detect_change(){
    document.addEventListener('keydown', (event)=>{
        console.log(event.key)

        var key = event.key;
        const flappy_bird = document.getElementById('flappy-bird');
        var flappy_bird_row = parseInt(getComputedStyle(flappy_bird).gridRowStart);
        var flappy_bird_col = parseInt(getComputedStyle(flappy_bird).gridColumnStart);
        switch(key){
            case 'ArrowUp':
                console.log(key)

                break;
            case 'ArrowDown':
                flappy_bird.style.gridRowStart = flappy_bird_row - 1

                break;
            case 'ArrowLeft':
                flappy_bird.style.gridColumnStart = flappy_bird_col - 1
                break;
            case 'ArrowRight':
                flappy_bird.style.gridColumnStart = flappy_bird_col + 1
            
                break;
            default:
                console.log('some other key')
            

        }

        })
}


function main(){
    console.log('running...')
    detect_change()
    setInterval(()=>{
        // console.log('falling')
        flappy_falling()
    }, 300)
}

main()