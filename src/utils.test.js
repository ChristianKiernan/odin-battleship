import { hit } from "./utils.js"

test('returns an input', () => {
    expect(hit(1)).toEqual(1);
});