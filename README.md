# Pet Care Tracker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20Project-2ea44f?style=for-the-badge)](https://christianenogm.github.io/PetCareTracker/)

> **View the running application:** https://christianenogm.github.io/PetCareTracker/

A web application for pet registration and tracking, with care tasks and data persistence using Firebase Firestore.

## About the project

This project was developed for the INFO-5143 (JavaScript 4) course and allows users to:

- register new pets
- list and view each pet's details
- edit pet and owner information
- remove pets
- manage care tasks (feed, walk, vet appointment, bath, and custom tasks)
- navigate through tips, gallery, FAQ, and privacy policy pages

## Technologies used

- React
- React Router
- Sass
- Firebase (Cloud Firestore)

## Main structure

- `src/App.js`: routes and global pet state
- `src/components/Form/Form.js`: new pet registration form
- `src/components/Tasks/Tasks.js`: pet list page
- `src/components/PetDetails/PetDetails.js`: pet details and editing
- `src/firebaseConfig.js`: Firebase initialization

## How to run locally

### Prerequisites

- Node.js installed
- npm installed

### Steps

1. Install dependencies:

```bash
npm install
```

2. Start the project:

```bash
npm start
```

3. Open in your browser:

```txt
http://localhost:3000
```

## Firebase (Firestore)

This project uses the `pets` collection in Cloud Firestore.

If you see a permission error while saving ("Missing or insufficient permissions"), update your Firestore rules in Firebase Console.

Temporary rule example for testing:

```txt
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /pets/{petId} {
			allow read, write: if true;
		}
	}
}
```

## Screenshots

Project screenshots were added as PDF files in the `doc/` folder:

- [Home](doc/Pet%20Care%20Tracker%20-%20Home.pdf)
- [Pet](doc/Pet%20Care%20Tracker%20-%20Pet.pdf)
- [New Pet](doc/Pet%20Care%20Tracker%20-%20New%20Pet.pdf)
- [New Pet with vaccinated](doc/Pet%20Care%20Tracker%20-%20New%20Pet%20with%20vaccinated.pdf)
- [Tips](doc/Pet%20Care%20Tracker%20-%20Tips.pdf)
- [Gallery](doc/Pet%20Care%20Tracker%20-%20Gallery.pdf)
- [FAQ](doc/Pet%20Care%20Tracker%20-%20FAQ.pdf)

## Available scripts

- `npm start`: runs the app in development mode
- `npm run build`: creates a production build
- `npm test`: runs tests

## Author

Christiane
