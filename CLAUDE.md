# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio website for Gopika P (Backend Developer). The entire site lives in a single `index.html` file with embedded CSS and JavaScript. No build tools, no dependencies to install, no package manager.

## Viewing the Site

Open `index.html` directly in a browser. No server or build step required.

## Architecture

Single-page site with six sections: Hero, About, Skills, Experience, Projects, Contact.

- **Styling**: All CSS is in a single `<style>` tag (lines 15–1291). Design system uses CSS custom properties (`:root` for dark theme, `[data-theme="light"]` for light theme). Key variables: `--bg`, `--fg`, `--accent-gold`, `--accent-cyan`, `--card`, `--border`.
- **Scripting**: All JavaScript is in a single `<script>` tag (lines 1778–2094). Uses vanilla JS with IntersectionObserver for scroll animations, localStorage for theme persistence, and requestAnimationFrame for custom cursor tracking.
- **External resources**: Google Fonts (Bebas Neue, JetBrains Mono, Syne, Inter), Font Awesome 6.5.1, devicons via jsdelivr CDN.

## Key Features to Preserve

- **Theme toggle**: Switches between dark (default) and light modes via `data-theme` attribute on `document.documentElement`. State persisted in `localStorage`.
- **Custom cursor**: Two-layer dot + ring cursor that follows mouse with different lag rates. Adds hover/click classes on interactive elements.
- **Scroll animations**: Sections fade in via `.visible` class using IntersectionObserver. Counters animate when scrolled into view. Timeline line expands as items appear.
- **Typewriter**: Rotates through three taglines in the hero section.
- **Contact form**: Frontend-only with terminal-style UI. Submit handler shows success state but does not send data (no backend configured).

## Editing Guidelines

- All changes go into `index.html` — there are no other source files.
- Maintain the existing design system when adding/modifying styles. Use the CSS variables defined in `:root` rather than hard-coded colors.
- The HTML uses specific class naming conventions (e.g., `metric-item`, `tech-tag`, `project-card`). Follow these patterns for consistency.
- Responsive breakpoints are at 1024px, 768px, and 480px.

## Permissions

The `.claude/settings.local.json` file grants permissions for specific Bash commands used during development.
