from locust import HttpUser, task, between
from config import base_url
import random

class PetIdPerformance(HttpUser):
    host = base_url
    
    @task
    def getPetById(self):
        pet_id = str(random.randint(6,13))
        self.client.get(url="/api/v3/pet/"+pet_id,name="getPetById")

class PetIdUser(HttpUser):
    tasks = [PetIdPerformance]
    wait_time = between(1, 2)
