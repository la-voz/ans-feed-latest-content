// Default values for the Core Component
const schemaName = "ans-feed";

const params = {
    authorId: "text",
    feedPage: "number",
    feedSize: "number"
};

/**
 * @func pattern
 * @param {Object} key
 * @return {String} elastic search query for the feed sections
 */
const pattern = (key = {}) => {
    const website = key["arc-site"] || "Arc Site is not defined.";
    const { authorId, feedPage = 1, feedSize } = key;

    const searchPath = "/content/v4/search/published";

    const query = [
        `q=credits.by._id:${encodeURI(authorId)}`,
        `website=${website}`,
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