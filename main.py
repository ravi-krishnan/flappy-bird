import pygame
from objects import Circle_Object
import random


pygame.init()

width, height = 640, 480
ball_pos = pygame.Vector2()
ball_pos.x, ball_pos.y = width/2, height/2
# ball_pos = pygame.Vector2(height/2, width/2)
clock = pygame.time.Clock()

screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("My first pygame window")

# run loop


balls = []
# colors = ['red', 'yellow', 'blue', 'orange', 'black', 'pink', 'brown', 'green', 'cyan']
ball_radius = 10
no_balls = 25
for i in range(no_balls):
    # random_color = random.randint(0, len(colors) - 1)
    x = random.randint(ball_radius, width - ball_radius)
    y = random.randint(ball_radius, height - ball_radius)
    ball = Circle_Object((width, height), x, y, ball_radius, 'red')
    balls.append(ball)


running = True
paused = False
blue_count = 0
while running:

    dt = clock.tick(60) / 1000 
    # event loop
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            print("close")
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_p:
                paused = not paused 


    # color counter
     # Reset blue count every frame
    if not paused:
        blue_count = 0
        for i in range(no_balls):
            if balls[i].color == 'blue':
                blue_count += 1

    # color checker
    print('red:', no_balls - blue_count, ' blue:', blue_count)
    if blue_count == 18: #If you need n blue balls, you need to put n - 1 here
        paused = True
        print('paused')
        
    # game code
    if not paused:
        screen.fill('white')
        for i in range(no_balls):
            balls[i].draw(screen)
            balls[i].bounce(dt)
            balls[i].border_collission()
            for j in range(i+1, no_balls):
                balls[i].collide_with(balls[j])

    else:

        font = pygame.font.SysFont(None, 74)
        text = font.render('Paused', True, (0, 0, 0))
        screen.blit(text, (width//2 - 100, height//2 - 50))

    pygame.display.flip()

    clock.tick(60)

print('Game end')
# pygame.quit()





