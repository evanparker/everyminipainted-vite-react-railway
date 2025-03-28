# everymini-frontend

A miniatures portfolio website


## TODO:
* ~~User data/avatars~~
* ~~Purchase Domain and Deployment~~
* Add createdOn/updatedOn/etc.
* Error pages (404, etc)
* Fix sort order for images by adding explicit order
* ~~Improvements to miniEdit~~
  * ~~Deleting Images~~
  * ~~Deleting Mini~~
  * ~~Reordering Images~~
* Manufacturers/~~Figures~~
* Moderation
* Search
* Change api to use json:api format 
  * https://jsonapi.org/ 
  * https://www.npmjs.com/package/jsonapi-serializer#relationship-deserializer
* Tags
* Add alerts/toasts for
  * Deleting
  * Saving
  * Logging out
* Scrape reaper site for data
* Serve robots/rich links
* Share forms between edit/create pages (still todo: ~~figures forms~~, mini forms)


---
title: Vite + React
description: The default Vite + React starter, utilizing `Caddy` to serve the built app
tags:
  - node
  - vite
  - react
---

# Vite + React + Caddy

This is a [Vite + React](https://vitejs.dev/guide/#trying-vite-online) starter that uses [Caddy](https://caddyserver.com/).

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/NeiLty?referralCode=ySCnWl)

## ✨ Features

- Vite + React
- [Caddy](https://caddyserver.com/)

## 💁‍♀️ How to use

- Install required dependencies with `npm install`
- Start the server for local development `npm run dev`

## ❓ Why use `Caddy` when deploying to Railway?

Caddy is a powerful, enterprise-ready, open source web server, and therefore Caddy is far better suited to serve websites than Vite is, using Caddy will result in much less memory and cpu usage compared to serving with Vite (much lower running costs too)

To see how this is achieved with nixpacks, check out the fully documented nixpacks.toml file in this repository

The configuration for Caddy is called a Caddyfile, and you can edit that file to further suite your needs, by default it comes configured to serve a single page app for React, and to also gzip the responses

**Relevant Caddy documentation:**

- [The Caddyfile](https://caddyserver.com/docs/caddyfile)
- [Caddyfile Directives](https://caddyserver.com/docs/caddyfile/directives)
- [root](https://caddyserver.com/docs/caddyfile/directives/root)
- [encode](https://caddyserver.com/docs/caddyfile/directives/encode)
- [file_server](https://caddyserver.com/docs/caddyfile/directives/file_server)
- [try_files](https://caddyserver.com/docs/caddyfile/directives/try_files)