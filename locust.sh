#Increasing users command
locust -f ./locustdir/locustfile.py --host http://localhost:8080 --users 2000 --spawn-rate 100