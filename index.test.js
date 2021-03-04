import source from "./";

describe("source.resolve function", () => {
  const key = {
    "arc-site": "test-site",
    feedSize: 5,
    feedPage: 1
  };

  const q = "";
  const body = "%7B%22query%22:%7B%22bool%22:%7B%22must_not%22:%5B%7B%22ids%22:%7B%22values%22:%5B%22default_true_%22%5D%7D%7D%5D,%22should%22:%5B%7B%22term%22:%7B%22type%22:%22story%22%7D%7D,%7B%22term%22:%7B%22type%22:%22video%22%7D%7D,%7B%22term%22:%7B%22type%22:%22gallery%22%7D%7D%5D%7D%7D%7D";

  it("Checks that source.resolve returns the right pattern from the key", () => {
    const { feedSize } = key;
    const website = key["arc-site"];
    const endpoint = `/content/v4/search/published?q=${q}&website=${website}&body=${body}&size=${feedSize}&from=0&sort=display_date:desc`;
    expect(source.resolve(key)).toBe(endpoint);
  });

  it('Checks that source.resolve returns "Arc Site is not defined', () => {
    const encodedString = "Arc Site is not defined";
    expect(source.resolve().includes(encodedString)).toBe(true);
  });
});
