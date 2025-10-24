# Rainbow Six Siege – Map Guesser

A web based guessing game where players identify **Tom Clancy’s Rainbow Six Siege** maps based on their floor plan blueprints.

---

## Features

- **Two Game Modes**
  - **Easy Mode:** Colored and detailed blueprints  
  - **Hard Mode:** Blue and white simplified blueprints  
- **Smart Autocomplete:** Type ahead suggestions for map names  
- **Multiple Floor Plans:** Wrong guesses show additional floors from the same map  
- **Score Tracking:** Displays correct guesses and remaining maps  
- **Timer:** Tracks your total playtime  

---

## Project Structure

```text
/
├── index.html              # Main HTML file
├── /scripts/
│   └── game.js             # Game logic and functionality
├── /styles/
│   └── style.css           # All styling
├── /data/
│   └── maps.json           # Map database with image filenames
└── /blueprints/
    ├── /color/             # Colored blueprint images
    └── /bluewhite/         # Blue/white blueprint images
```

---

## Setup Instructions

### 1. Clone or Download

Download all project files and maintain the folder structure shown above.

### 2. Add Blueprint Images

Add your blueprint images to the appropriate folders:

- `/blueprints/color/` – colored blueprints  
- `/blueprints/bluewhite/` – blue/white blueprints  

**Image Naming Convention:**

Use lowercase names with underscores.  
Format: `mapname_floornumber.jpg`

**Examples:**
clubhouse_1.jpg
bank_2.jpg
oregon_rework_1.jpg

**Supported Maps (31 total some Reworks):**


- Clubhouse  
- Bank / Bank Rework  
- Kafe  
- Chalet / Chalet Rework  
- Border  
- Stadium Bravo / Stadium Alpha  
- Lair  
- Nighthaven Labs  
- Emerald Plains  
- Coastline  
- Consulate / Consulate Rework  
- Favela  
- Fortress  
- Hereford Base  
- House  
- Kanal  
- Oregon / Oregon Rework  
- Outback / Outback Rework  
- Presidential Plane  
- Skyscraper / Skyscraper Rework  
- Theme Park  
- Tower  
- Villa  
- Yacht

---

### 3. Update `maps.json`

If your image filenames differ or you want to add/remove floors, edit `/data/maps.json`:

```json
{
  "name": "CLUBHOUSE",
  "color": ["clubhouse_1.jpg", "clubhouse_2.jpg"],
  "bluewhite": ["clubhouse_1.jpg", "clubhouse_2.jpg"]
}