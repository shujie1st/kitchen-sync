# KitchenSync

Kitchen Sync as a versatile web application that empowers users to reduce food waste and enjoy fantastic meals.

- A user can select ingredient and preference filters to search for from a recipe database.
- A user can input their own keywords in the searchbar to look up recipes in the database.
- A registered user can like and save recipes to their user profile.
- A registered user can save their prefences

## Contributors

[Shujie Ma](https://github.com/shujie1st)

- Styling
- Footer component
- Login component
- Navigation component
- Profile component
- Recipe component
- SavedRecipeCard componet
- ScrollButton component
- Signup component
- UserReceipes component

[Elia Chow](https://github.com/eliachow)

- Styling
- Filter component
- FilterControls component
- Ingredient component
- Preference component
- Profile component
- UserPreferences component

## Tech Stack

- **React** for the frontend user interface.
- **Node.js** for the server-side JavaScript runtime.
- **Express.js** as the web application framework for the backend.
- **PostgreSQL** as the relational database

## API

This project utilizes the [Recipe Search API](https://developer.edamam.com/edamam-recipe-api) provided by [Edamam API](https://www.edamam.com/). Edamam's Recipe Search API lets you integrate a recipe database and faceted recipe search into your websites or mobile applications.

## Setup

### Terminals

Two terminals are required to run this application.

#### Backend Terminal

- `cd kitchen-sync/backend`
- Run `npm install` to install the dependencies
- Run `npm start` to launch the server (base URL is localhost:3001).

#### Backend .env

To use custom port, e.g. 3001, please create .env file in backend folder: PORT=3001

```
DB_HOST=localhost
DB_USER=labber
DB_PASS=labber
DB_NAME=kitchensync
DB_PORT=5432
PORT=3001
CORS_PORT=3002
API_KEY=
```

#### Client Terminal

- `cd kitchen-sync/client`
- Run `npm install` to install the dependencies
- Run `npm start` to launch localhost:3000 in your browser

#### Client .env

```
REACT_APP_API=https://api.edamam.com/api/recipes/v2?type=public
REACT_APP_API_ID=
REACT_APP_API_KEYS=
PORT=3002
REACT_APP_BACKEND_PORT=3001
```

### Database

The database uses PostgreSQL. Ingredients, preferences, and user information are stored in the database.

- `cd backend`
- Run `startpostgres`
- Run `psql`
- Create the database `CREATE DATABASE database_name;`
- Run `\c kitchensync` to connect to the database
- Run `\i db/schema/database.sql` to import the tables nto the database.
- Run each file in the db/seeds folder,
  e.g. `\i db/seeds/01_users.sql`
