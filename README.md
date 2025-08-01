# Portfolio of Patrick Petrushonis

## Table of Contents
- Description
- Installation
- Development

## Description
Modern React-based personal portfolio website, migrated from a Gulp/Nunjucks static site to provide better performance, maintainability, and development experience.

### Technology Stack:
React 18 - Component-based UI framework
React Router - Client-side routing
Sass - CSS preprocessing
Vite/Create React App - Modern build tooling
ES6 Modules - Modern JavaScript

## Installation
### Prerequisites
Node.js (v16+) - JavaScript runtime
npm - Package manager (included with Node.js)
Git - Version control

### Setup

Clone the repository:
```
git clone https://github.com/patrickpetrushonis/patrickpetrushonis.github.io.git
cd patrickpetrushonis.github.io
```

### Install dependencies:
```
npm install
```

### Verify installation:
```
npm start
```
The development server should start at http://localhost:3000

## Development
### Commands
Start development server:
```
npm start
```
- Launches the app in development mode
- Automatic browser refresh on file changes
- Error overlay for debugging
- Accessible at http://localhost:3000

Build for production:
```
npm run build
```
- Creates optimized production build in build/ folder
- Minifies and optimizes all assets
- Ready for deployment

Build and deploy to production:
```
npm run deploy
```

### Project Structure
```
src/
├── components/
│   └── Layout/
│       ├── Layout.jsx          # Main layout wrapper
│       ├── Header.jsx          # Navigation header
│       ├── Footer.jsx          # Site footer
│       └── ScrollToTop.jsx     # Scroll-to-top button
├── pages/
│   └── Home.jsx                # Home page component
├── utils/
│   ├── scroll.js               # Scroll utilities & hooks
│   ├── layout.js               # Layout helper hooks
│   └── pre.js                  # Code formatting utilities
├── styles/
│   └── [SCSS files]            # Sass stylesheets
├── data/
│   └── data.json               # Site content data
├── App.js                      # Root application component
└── index.js                    # Application entry point

public/
├── app/
│   ├── css/                    # Compiled stylesheets
│   ├── img/                    # Images and icons
│   ├── js/                     # JavaScript assets
│   └── pdfs/                   # PDF documents
└── index.html                  # HTML template
```

### Additional Information

Notice the use of %PUBLIC_URL% in the tags of index.html within the `public` folder.
These will be replaced with the URL of the `public` folder during the build.
Only files inside the `public` folder can be referenced from the HTML.
Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will work correctly both with client-side routing and a non-root public URL.
Learn how to configure a non-root public URL by running `npm run build`.

`manifest.json` provides metadata used when your web app is installed on a user's mobile device or desktop. 
See [developers.google.com](https://developers.google.com/web/fundamentals/web-app-manifest/)
