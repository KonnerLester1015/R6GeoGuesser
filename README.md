# R6 GeoGuessr

A tactical web based guessing game where operators identify Rainbow Six Siege maps based on floor plan blueprints.

## Features

- **Two Operation Modes:**
  - **Operation: Casual** - Colored and detailed tactical blueprints
  - **Operation: Realism** - Blue and white simplified blueprints
- **Smart Autocomplete:** Type ahead suggestions for map names
- **Mission Tracking:** Real time score tracking and mission duration timer
- **Tactical UI:** Tom Clancy's Rainbow Six Siege inspired interface with Quantico font and animated smoke background

## How to Play

1. **Select Operation:** Choose Casual (colored) or Realism (blue/white) mode
2. **Identify the Map:** A random floor blueprint from a random map will be displayed
3. **Enter Your Intel:** Type the map name (autocomplete will help)
4. **Deploy Answer:** Submit your guess
   - **Correct:** Advance to next random map
   - **Incorrect:** See another random floor from the same map
5. **Extract if Needed:** Click EXTRACT to skip and reveal the answer
6. **Return to Base:** Click "R6 GeoGuessr" logo anytime to return to menu
7. **Mission Complete:** Finish all maps to see your final mission score

## Technical Details

### Project Structure

```
/
├── index.html              # Main HTML structure
├── /scripts/
│   └── game.js            # Core game logic with randomization
├── /styles/
│   └── style.css          # Tactical styling with animations
├── /data/
│   └── maps.json          # Map database (31 maps)
└── /blueprints/
    ├── /color/            # Colored tactical blueprints
    └── /bluewhite/        # Blue/white simplified blueprints
```

### Blueprint Images

Add your blueprint images to the appropriate folders:

- **Colored blueprints:** `/blueprints/color/`
- **Blue/white blueprints:** `/blueprints/bluewhite/`

**Image Naming Convention:**
- Use the exact names specified in `maps.json`
- Format: `MapName_#.jpg` (e.g., `Bank_1.jpg`, `Clubhouse_2.jpg`)
- Case-sensitive! Use capital first letters as shown in the JSON

**All 31 Supported Maps:**

- Bank / Bank Rework  
- Border  
- Chalet / Chalet Rework  
- Clubhouse  
- Coastline  
- Consulate / Consulate Rework  
- Emerald Plains  
- Favela  
- Fortress  
- Hereford Base  
- House  
- Kafe  
- Kanal  
- Lair  
- Nighthaven Labs  
- Oregon / Oregon Rework  
- Outback / Outback Rework  
- Presidential Plane  
- Skyscraper / Skyscraper Rework  
- Stadium Bravo / Stadium Alpha  
- Theme Park  
- Tower  
- Villa  
- Yacht

## Design Features

### Tactical Color Palette
- **Background:** Dark grays (#1a1a1a, #2c2c2c)
- **Accent:** Tactical gold (#d4af37)
- **Success:** Military green (#4a9d5f)
- **Alert:** Tactical red (#a83232)
- **Metallic tones** with subtle borders and carbon fiber textures

### Animated Elements
- **Smoke Background:** Slow moving tactical fog effect that loops seamlessly
- **Button Hover:** Metallic sweep animations
- **Feedback Animations:** Pulse effect for correct answers, shake for incorrect
- **Glow Effects:** Tactical lighting on key UI elements

### Typography
- **Primary Font:** Quantico (military-style tactical font)
- **All text:** Uppercase with increased letter spacing

---

**Enjoy the game and good luck, operator! 🎯**