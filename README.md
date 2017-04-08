# Objective

This application provide recipe and lookup feature for chef like you!

## Setup

`yarn install && cd masterchef-client && yarn install`

## Run

`yarn run preprocess && yarn start`

## Test

`yarn test` for testing the serverside.
for clientside testing, we will use `yarn test` under `/masterchef-client`

## Deploy

First you have to build the clientside code:
`cd masterchef-client && yarn build`

Then you can start your server in server directory:
`NODE_ENV=production npm run server`

After that, you need to setup reverse proxy to serve on 80 port from 3001.


## Input Recipe

Put your recipe under folder /data/recipes , each recipe must have a **Unique** recipe name as filename, the format must follow the standard:
```javascript
{
    "cookingTimeInMinutes": 60,
    "imageUrl": "/images/recipe/${your_png_filename}",
    "ingredients": [
        {
            "name": "Sugar",
            "quantity": "1 tsp"
        },
        {
            "name":  "chicken",
            "quantity": 2
        }
    ]
}
```

## Input Recipe Image

Put image file under `./images/recipe/`

## Project Structure

This project structure is base on the idea from [here](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

In behind, we use create-react-app(webpack + babel + react) for frontend, express for backend.

[**Jest**](https://facebook.github.io/jest/) as the Test runner.

For details, please read **diary.md**


