// Default values for the Core Component
const schemaName = "ans-feed";

const params = {
  feedSize: "number",
  feedPage: "number"
};

/**
 * @func pattern
 * @param {Object} key
 * @return {String} elastic search query for the feed sections
 */
const pattern = (key = {}) => {
  const website = key["arc-site"] || "Arc Site is not defined.";
  const { feedSize, feedPage = 1, excluded = "" } = key;
  const searchPath = "/content/v4/search/published";
  const allowedTypes = ["story", "video", "gallery"];

  const body = {
    query: {
      bool: {
        must_not: [],
        should: allowedTypes.map(item => {
          return {
            term: {
              type: item
            }
          };
        })
      }
    }
  };
  body.query.bool.must_not.push({
    ids: {
      values: [`default_true_${excluded}`]
    }
  });

  const query = [
    `q=`,
    `website=${website}`,
    `body=${encodeURI(JSON.stringify(body))}`,
    `size=${feedSize}`,
    `from=${(feedPage - 1) * feedSize}`
  ].join("&");

  return `${searchPath}?${query}&sort=display_date:desc`;
};

/**
 * @func resolve
 * @param {Object} key - the value to get the feed info from
 * @return {String} the content api search url for these sections and feed
 *                  offset
 */
const resolve = key => {
  return pattern(key);
};

const source = {
  resolve,
  schemaName,
  params
};

export default source;

