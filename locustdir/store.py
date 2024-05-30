from locust import HttpUser, task, between
from config import base_url

class StorePerformance(HttpUser):
    host = base_url

    @task
    def getStoreInvetory(self):
        self.client.get(url="/api/v3/store/inventory")

class StoreUser(HttpUser):
    tasks = [StorePerformance]
    wait_time = between(1, 2)