# everymini-frontend

A miniatures portfolio website

## To run project

```
npm run dev
```

## TODO:

- Error pages (404, etc)
- About page
- Show form errors
  - Validate fields on client
- Moderation
- Search
- Pagination
- Figure out how to merge duplicate records
- Change api to use json:api format
  - https://jsonapi.org/
  - https://www.npmjs.com/package/jsonapi-serializer#relationship-deserializer
- Add alerts/toasts for
  - [x] Deleting
  - [x] Saving
  - [x] Logging out
  - [ ] Errors
- Change Password
- Reset Password
- Scrape reaper/wizkids site for data
  - [ ] Reach out to companies
  - Reaper APIs: https://www.reapermini.com/retailsupport/resources
  - Wizkids unpainted essentials page: https://wizkids.com/upmessentials/
- Serve robots/rich links
- Sanatize text fields
- Consolodate search pickers (figure, manufacturer)
- ~~User data/avatars~~
- ~~Purchase Domain and Deployment~~
- ~~Fix sort order for images by adding explicit order~~
  - ~~Perhaps a thumbnail field...~~
- ~~Improvements to miniEdit~~
  - ~~Deleting Images~~
  - ~~Deleting Mini~~
  - ~~Reordering Images~~
- ~~Manufacturers~~/~~Figures~~
- ~~Share forms between edit/create pages (still todo: figures forms, mini forms)~~
- ~~Add markdown component for descriptions/bios/etc~~
- Add new fields to forms and relevant views:
  - [x] Manufacturer
    - [x] `website`
    - [x] `description`
    - [x] `socials[]`
    - [x] `thumbnail`
  - [x] Figures
    - [x] `partNumber` - Model/part number
    - [x] `description`
    - [x] `website` - Link to manufactuerer's site's page for it
    - [x] `artist`
    - [x] `thumbnail`
  - [x] Mini
    - [x] `description`
    - [x] `thumbnail`
  - [x] User
    - [x] `website`
    - [x] `description`
    - [x] `socials[]`

### Migrations

- Rename `Figures` to `Models`?
- Rename instances of `userId` to `user`
- Add fields
  - [ ] All:
    - createdOn
    - updatedOn
    - etc...
  - [x] Manufacturer
    - `website`
    - `description`
    - `socials[]`
    - [x] `thumbnail`
  - [x] Figures
    - `partNumber` - Model/part number
    - `description`
    - `website` - Link to manufactuerer's site's page for it
    - [x] `artist`
    - [x] `thumbnail`
  - [x] Mini
    - `description`
    - [x] `thumbnail`
  - [x] User
    - `website`
    - `description`
    - `socials[]`
  - [ ] Images
    - `description`
- Add collections
  - [ ] Tags
    - Name/text

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
