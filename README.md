# eSlider.github.io

Personal site for **Andriy Oblivantsev** — [https://eslider.github.io/](https://eslider.github.io/)

Built with [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) (Jekyll).

## Deploy

GitHub Pages uses the **Build and Deploy** workflow (Actions → Pages).

```bash
# Manual redeploy
gh workflow run "Build and Deploy" -R eSlider/eSlider.github.io
gh run watch -R eSlider/eSlider.github.io
```

### Fork note

This repo was forked from `chirpy-starter`. **Push to `main` often does not
start Actions** (fork policy) — after merging content, redeploy manually:

```bash
gh workflow run "Build and Deploy" -R eSlider/eSlider.github.io --ref main
gh run watch -R eSlider/eSlider.github.io
```

If Actions were never enabled, open
[Actions](https://github.com/eSlider/eSlider.github.io/actions) once and click
**“I understand my workflows, go ahead and enable them”**.

A daily schedule (`06:00 UTC`) redeploys as a safety net.

Archives / tags / categories are **generated from post front matter** (Chirpy
`jekyll-archives`). Engagement posts use category `Clients` and org tags
(`WhereGroup`, `Dyvenia`, …) so those indexes stay aligned with `/clients/`.

## Local preview

```bash
bundle install
git submodule update --init --recursive
bundle exec jekyll s
```
