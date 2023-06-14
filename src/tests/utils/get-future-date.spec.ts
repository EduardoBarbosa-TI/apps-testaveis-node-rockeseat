import { expect, it } from "vitest";
import { getFutureDate } from "./get-future-date";

it('increases date with one year', () => {
    const year = new Date().getFullYear()
    expect(getFutureDate(`${year}-06-14`).getFullYear()).toEqual(2024)
})