# Playwright API testing framework

Framework to test API examples in the swagger petstore https://petstore3.swagger.io, project baseURL is http://localhost:8080 petstore need to be ran locally. `npx` commands are run from the [root](../../) of the api repo.

To start local enviroment Swagger petsore follow the instructions in the following repo: https://github.com/swagger-api/swagger-petstore

## Prerequisites
Pre requisites necesary to run framework nodeJS, Python and npm

### Prepare dependencies 

    npm install
    pip3 install locust

## API tests Execution

To execute the test suite:

    npx playwright test

## Vscode Execution
Recomendation: run the tests using the Vscode extension https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright.

## Performance tests Execution

Execute command:

    locust ./<dir>/<file>