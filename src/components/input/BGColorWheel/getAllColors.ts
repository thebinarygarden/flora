import {RGB} from "@components/input/BGColorWheel/types";

export const allColors: RGB[] = [];
// RED -> YELLOW
let alternator = 0;
while (alternator <= 255) {
    allColors.push({r: 255, g: alternator, b: 0});
    alternator += 1;
}

// YELLOW -> GREEN
alternator = 255;
while (alternator >= 0) {
    allColors.push({r: alternator, g: 255, b: 0});
    alternator -= 1;
}

// GREEN -> CYAN
alternator = 0;
while (alternator <= 255) {
    allColors.push({r: 0, g: 255, b: alternator});
    alternator += 1;
}

// CYAN -> BLUE
alternator = 255;
while (alternator >= 0) {
    allColors.push({r: 0, g: alternator, b: 255});
    alternator -= 1;
}

// BLUE -> MAGENTA
alternator = 0;
while (alternator <= 255) {
    allColors.push({r: alternator, g: 0, b: 255});
    alternator += 1;
}

// MAGENTA -> RED
alternator = 255;
while (alternator >= 0) {
    allColors.push({r: 255, g: 0, b: alternator});
    alternator -= 1;
}