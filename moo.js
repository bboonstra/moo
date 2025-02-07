// ----- Configuration ----- //
// Expanded glyph set to include both uppercase and lowercase variations.
const glyphs = [
    "O",
    "o",
    "Ò",
    "ò",
    "Ó",
    "ó",
    "Ô",
    "ô",
    "Ö",
    "ö",
    "Õ",
    "õ",
    "Ō",
    "ō",
    "Ø",
    "ø",
];

// ----- Helper Functions ----- //

/**
 * Converts a number into a string using the glyph mapping.
 * (e.g., converts 65 into a base-16 number represented by our glyphs)
 * @param {number} num - The number to convert.
 * @returns {string} The encoded string using the glyphs.
 */
function numberToGlyphs(num) {
    let base = glyphs.length;
    if (num === 0) {
        return glyphs[0];
    }
    let digits = [];
    while (num > 0) {
        let remainder = num % base;
        digits.unshift(glyphs[remainder]);
        num = Math.floor(num / base);
    }
    return digits.join("");
}

/**
 * Converts a string of glyphs (digits) back into a number.
 * @param {string} glyphString - The string of glyphs to convert.
 * @returns {number} The numeric value represented by the glyph string.
 */
function glyphsToNumber(glyphString) {
    let base = glyphs.length;
    let num = 0;
    for (let glyph of glyphString) {
        let digit = glyphs.indexOf(glyph);
        if (digit === -1) {
            throw new Error(`Invalid glyph encountered: ${glyph}`);
        }
        num = num * base + digit;
    }
    return num;
}

// ----- Encoder ----- //

/**
 * Encodes a string into the .MOO format.
 * Each character is turned into a token that:
 *   - Begins with "M" for single characters
 *   - "m" for combined characters (with metadata for how they are combined)
 *   - Utilizes punctuation for special metadata
 *
 * @param {string} text - The input text to encode.
 * @returns {string} The encoded .MOO formatted string.
 */
function encode(text) {
    let encoded = [];
    let combined = [];

    for (let i = 0; i < text.length; i++) {
        let charCode = text.codePointAt(i);
        combined.push(charCode);

        // If we have two characters, encode them as a combined token.
        if (combined.length === 2) {
            encoded.push(
                "m" + numberToGlyphs(combined[0]) + numberToGlyphs(combined[1])
            );
            combined = []; // Reset the array
        }
    }

    // If there is a leftover character, encode it as a single character.
    if (combined.length === 1) {
        encoded.push("M" + numberToGlyphs(combined[0]));
    }

    return encoded.join(" ");
}

// ----- Decoder ----- //

/**
 * Decodes a .MOO formatted string back into plain text.
 * @param {string} mooText - The encoded .MOO text.
 * @returns {string} The decoded plain text.
 */
function decode(mooText) {
    // Check for empty input and return an empty string immediately
    if (mooText.trim() === "") {
        return "";
    }

    let decoded = [];
    let tokens = mooText.split(/\s+/);

    for (let token of tokens) {
        if (token.startsWith("M")) {
            // Single character
            decoded.push(String.fromCodePoint(glyphsToNumber(token.slice(1))));
        } else if (token.startsWith("m")) {
            // Combined characters (e.g., multi-char tokens)
            let glyphString = token.slice(1);
            let midIndex = Math.floor(glyphString.length / 2);
            let firstCharCode = glyphsToNumber(glyphString.slice(0, midIndex));
            let secondCharCode = glyphsToNumber(glyphString.slice(midIndex));
            decoded.push(String.fromCodePoint(firstCharCode));
            decoded.push(String.fromCodePoint(secondCharCode));
        } else {
            throw new Error(`Invalid token format: ${token}`);
        }
    }

    return decoded.join("");
}

// Export the encode and decode functions using ESM syntax
export { encode, decode };
