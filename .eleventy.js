module.exports = function (eleventyConfig) {
  // Copy static asset folders straight through, untouched.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // All published (non-draft) blog posts, newest first.
  eleventyConfig.addCollection("posts", function (api) {
    return api
      .getFilteredByGlob("src/content/blog/*.md")
      .filter((p) => p.data.draft !== true)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Pick the post flagged "featured" in the dashboard, else the newest.
  eleventyConfig.addFilter("pickFeatured", function (posts) {
    if (!posts || !posts.length) return null;
    return posts.find((p) => p.data.featured) || posts[0];
  });

  // "Branding" -> branding, "Social Media" -> social, etc. (matches filter chips)
  eleventyConfig.addFilter("catSlug", function (s) {
    var k = String(s || "").toLowerCase().trim();
    var map = { "social media": "social", social: "social" };
    return map[k] || k.split(" ")[0];
  });

  // Human-friendly date, e.g. "06 Jun 2026".
  eleventyConfig.addFilter("readableDate", function (d) {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    // Plain .html pages are copied verbatim (no templating) so the existing
    // hand-built pages are never altered. Only .njk and .md are processed.
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
  };
};
