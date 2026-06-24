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

This repo was forked from `chirpy-starter`. If pushes do not trigger deploys, open
[Actions](https://github.com/eSlider/eSlider.github.io/actions) once and click
**“I understand my workflows, go ahead and enable them”**.

A daily schedule (`06:00 UTC`) redeploys as a safety net.

## Local preview

```bash
bundle install
git submodule update --init --recursive
bundle exec jekyll s
```
