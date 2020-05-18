import source from "./";

describe("source.resolve function", () => {
  const key = {
    "arc-site": "test-site",
    feedSize: 5,
    feedPage: 1
  };

  const q = "";

  it("Checks that source.resolve returns the right pattern from the key", () => {
    const { feedSize } = key;
    const website = key["arc-site"];
    const endpoint = `/content/v4/search/published?q=${q}&website=${website}&size=${feedSize}&from=0&sort=display_date:desc`;
    expect(source.resolve(key)).toBe(endpoint);
  });

  it('Checks that source.resolve returns "Arc Site is not defined', () => {
    const encodedString = "Arc Site is not defined";
    expect(source.resolve().includes(encodedString)).toBe(true);
  });
});
