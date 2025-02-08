import {RGB} from "@components/input/BGColorWheel/types";

export const allColors: RGB[] = [];

// CYAN -> GREEN
let alternator = 255;
while (alternator >= 0) {
    allColors.push({r: 0, g: 255, b: alternator});
    alternator -= 1;
}

// GREEN -> YELLOW
alternator = 0;
while (alternator <= 255) {
    allColors.push({r: alternator, g: 255, b: 0});
    alternator += 1;
}

// YELLOW -> RED
alternator = 255;
while (alternator >= 0) {
    allColors.push({r: 255, g: alternator, b: 0});
    alternator -= 1;
}

// RED -> MAGENTA
alternator = 0;
while (alternator <= 255) {
    allColors.push({r: 255, g: 0, b: alternator});
    alternator += 1;
}

// MAGENTA -> BLUE
alternator = 255;
while (alternator >= 0) {
    allColors.push({r: alternator, g: 0, b: 255});
    alternator -= 1;
}

// BLUE -> CYAN
alternator = 0;
while (alternator <= 255) {
    allColors.push({r: 0, g: alternator, b: 255});
    alternator += 1;
}
