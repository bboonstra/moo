// test/moo.test.js
import { expect } from "chai";
import { encode, decode } from "../moo.js"; // Adjust the path as necessary

describe("MOO Encoding and Decoding", () => {
    it("should encode and decode an empty string", () => {
        const original = "";
        const encoded = encode(original);
        const decoded = decode(encoded);
        expect(decoded).to.equal(original);
    });

    it("should encode and decode a single character", () => {
        const original = "A";
        const encoded = encode(original);
        const decoded = decode(encoded);
        expect(decoded).to.equal(original);
    });

    it("should encode and decode a string with multiple characters", () => {
        const original = "Hello, World!";
        const encoded = encode(original);
        const decoded = decode(encoded);
        expect(decoded).to.equal(original);
    });

    it("should handle non-ASCII characters", () => {
        const original = "こんにちは";
        const encoded = encode(original);
        const decoded = decode(encoded);
        expect(decoded).to.equal(original);
    });

    it("should throw an error for invalid glyphs in decoding", () => {
        const invalidEncoded = "Mx";
        expect(() => decode(invalidEncoded)).to.throw(
            Error,
            "Invalid glyph encountered"
        );
    });

    it("should handle random ASCII strings", () => {
        const randomAscii = () => {
            let result = "";
            for (let i = 0; i < 100; i++) {
                result += String.fromCharCode(
                    Math.floor(Math.random() * 95) + 32
                );
            }
            return result;
        };

        for (let i = 0; i < 10; i++) {
            const original = randomAscii();
            const encoded = encode(original);
            const decoded = decode(encoded);
            expect(decoded).to.equal(original);
        }
    });

    it("should encode and decode a long string", () => {
        const original = "A".repeat(1000); // 1000 'A's
        const encoded = encode(original);
        const decoded = decode(encoded);
        expect(decoded).to.equal(original);
    });

    it("should encode and decode special characters", () => {
        const original = "!@#$%^&*()_+[]{}|;':,./<>?";
        const encoded = encode(original);
        const decoded = decode(encoded);
        expect(decoded).to.equal(original);
    });

    it("should throw an error for invalid encoded strings", () => {
        const invalidEncoded = "M123 m456";
        expect(() => decode(invalidEncoded)).to.throw(
            Error,
            "Invalid glyph encountered: 1"
        );
    });
});
