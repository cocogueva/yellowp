from locust import HttpUser, task, between
from config import base_url

class PetPerformance(HttpUser):
    host = base_url
    
    @task
    def getPetByStatus(self):
        self.client.get(url="/api/v3/pet/findByStatus?status=available")
    
    @task
    def getPetByTag(self):
        self.client.get(url="/api/v3/pet/findByTags?tags=tag2")

class PetUser(HttpUser):
    tasks = [PetPerformance]
    wait_time = between(1, 2)
