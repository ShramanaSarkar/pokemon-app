# Assignment 1 : Interactive Data Explorer

## Overview:-  
Build a React application that fetches data from the PokeAPI (https://pokeapi.co/) and allows users to search and filter through Pokémon. This application should display a list of Pokémon with basic information and allow users to filter them based on search terms.

## Requirements:-  
1. Data Fetching
- Fetch the first 150 Pokémon from the PokeAPI
- Display each Pokémon in a card layout showing:
   - Name
   - Image (sprite)
   - Type(s)
   - ID number

2. Search Functionality  
- Implement a search input that filters Pokémon by name in real-time
- Add a filter dropdown to filter Pokémon by type (Fire, Water, Grass, etc.)
- Show appropriate loading and empty states

3. UI/UX  
- Create a responsive design that works on both desktop and mobile devices
- Include a simple header with the application name
- Style the application with CSS (or a CSS framework of your choice)


## Technical Requirements:  
- Use functional components with React Hooks
- Implement proper loading and error states
- Structure your code with reusable components
- Handle edge cases (no results, API errors, etc.)


# Assignment 2 : Advanced Data Explorer

## Overview
Building on Round 1, create an enhanced Pokémon explorer application with more advanced features including pagination, detailed views, favorites functionality, and improved state management.

## Requirements
Enhanced List View
Implement pagination with configurable items per page (10, 20, 50)
Add sorting options (by ID, name, alphabetically)
Include filtering by multiple types simultaneously


## Detailed View
Create a detailed view for each Pokémon showing:
All stats (HP, Attack, Defense, etc.)
Abilities
Moves
Evolution chain
Implement routing to navigate between list and detail views


## Favorites System
Allow users to mark Pokémon as favorites
Create a separate view to display favorite Pokémon
Persist favorites in localStorage so they remain after page refresh


## Advanced Features
Implement a comparison tool to compare stats of two Pokémon
Add a "random Pokémon" button that loads a random entry
Include error boundaries to prevent the entire app from crashing

## Technical Requirements
Use React Context API for state management
Implement performance optimizations (useMemo, useCallback)
Create custom hooks for reusable logic
Structure your project into logical folders (components, hooks, contexts, etc.)
Use React Router for navigation
