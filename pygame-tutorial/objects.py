import pygame
import math
import random

class Circle_Object:
    def __init__(self, size, x, y, radius = 30, color = 'red', ):
        self.rect = pygame.Rect((x-radius), (y+radius), 2*radius, 2*radius)
        self.color = color
        self.color_checker = 0
        self.x, self.y = x, y
        self.radius = radius
        self.w, self.h = size
        self.y_change_direction = 1
        self.x_change_direction = -1
        self.min_pace, self.max_pace = 100, 350
        self.pace = random.randint(self.min_pace, self.max_pace)
    
    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (self.x, self.y), self.radius)
    
    def bounce(self, dt):
        self.y += self.y_change_direction*self.pace*dt
        self.x += self.x_change_direction*self.pace*dt

    def color_change(self):
        if self.color_checker % 2 == 0:
            self.color = 'red'
        else:
            self.color = 'blue'

    def change_pace(self):
        self.pace = random.randint(self.min_pace, self.max_pace)

    def border_collission(self):
        # border collission
        if self.y >= self.h - self.radius:
            self.y_change_direction = -1
            self.color_checker +=1
            self.color_change()
            self.change_pace()
        elif self.y <= 0 + self.radius:
            self.y_change_direction = 1
            self.color_checker +=1
            self.color_change()
            self.change_pace()
        elif self.x <= 0 + self.radius:
            self.x_change_direction = 1
            self.color_checker +=1
            self.color_change()
            self.change_pace()
        elif self.x >= self.w - self.radius:
            self.x_change_direction = -1
            self.color_checker +=1
            self.color_change()
            self.change_pace()

    def collide_with(self, other):
        # hypot technique
        distance = math.hypot(abs(self.x - other.x), abs(self.y - other.y))
        if distance <= self.radius + other.radius:
            # collission
            self.y_change_direction = -self.y_change_direction
            self.x_change_direction = -self.x_change_direction
            # to stop glitch
            self.x += self.x_change_direction * self.radius
            self.y += self.y_change_direction * self.radius
            self.color_checker +=1
            self.color_change()
            other.y_change_direction = -other.y_change_direction
            other.x_change_direction = -other.x_change_direction
            other.x += other.x_change_direction * other.radius
            other.y += other.y_change_direction * other.radius
            other.color_checker +=1
            other.color_change()
