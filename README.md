# BLNK Studio — Website

A static website built with [Eleventy](https://www.11ty.dev/) and a [Sveltia CMS](https://github.com/sveltia/sveltia-cms) blog dashboard. Hosted free on Netlify.

## How it works

```
src/            ← everything that makes the site (EDIT HERE, not the root)
  *.html        ← the main pages (Home, About, Services, Contact, Free Audit)
  blog.njk      ← the blog index (auto-lists posts)
  content/blog/ ← one Markdown file per blog post
  _includes/    ← article.njk = the layout each blog post renders into
  css/ js/ assets/  ← styles, scripts, images
  admin/        ← the Sveltia CMS dashboard (config.yml = settings)
.eleventy.js    ← build config
netlify.toml    ← tells Netlify how to build
```

Running `npm run build` turns `src/` into the finished `_site/` folder, which is what Netlify publishes. **You never edit `_site/` by hand** — it's regenerated every build.

## Editing the site locally

```bash
npm install      # first time only
npm start        # live preview at http://localhost:8080
npm run build    # produce the final _site/ folder
```

## Publishing changes

The site is connected to GitHub. **Any change pushed to GitHub auto-publishes** via Netlify — no dragging folders. Edit a file, commit, push, done.

## Adding a blog post (no code)

Go to **https://theblnkstudio.com/admin/**, log in with GitHub, click **New Blog Post**, write it, and hit **Publish**. Sveltia saves it to `src/content/blog/`, GitHub receives it, and Netlify rebuilds the site automatically — the new article appears in a minute or two.

## One-time setup checklist

1. Push this folder to a GitHub repo.
2. In `src/admin/config.yml`, set the `repo:` line to your `username/repo`.
3. In Netlify, connect the site to that GitHub repo (build command `npm run build`, publish dir `_site`).
4. Enable GitHub login for the dashboard (see notes shared during setup).
