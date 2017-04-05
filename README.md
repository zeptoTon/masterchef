# Objective

This application provide recipe and lookup feature for chef like you!

## Setup

`yarn install && cd masterchef-client && yarn install`

## Run

`yarn start`

## Test

`yarn test` for testing the serverside.
for clientside testing, we will use `yarn test` under `/masterchef-client`

## Input Recipe

Put your recipe under folder /data/recipes , each recipe must have a **Unique** recipe name as filename, the format must follow the standard:
```javascript
{
    "cookingTimeInMinutes": 60,
    "ImageUrl": "images/recipes/${your_png_filename}",
    "ingredients": [
        {
            "name": "Sugar",
            "quantity": "1 tsp"
        }
    ]
}
```

## Input Recipe Image

We will let webpack to optimise our resource of images, therefore images will follow under **TODO**

## Project Structure

This project structure is base on the idea from [here](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

In behind, we use create-react-app(webpack + babel + react) for frontend, express for backend.

[**Jest**](https://facebook.github.io/jest/) as the Test runner.