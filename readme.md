# everymini-frontend

A miniatures portfolio website

## To run project

```
npm run dev
```

## TODO:

- Errors and Validation
  - [ ] Make api errors consistent `({message: "text"})`
  - Show form errors
    - Validate fields on client
  - [ ] Make list of reserved usernames (such as `me`, `admin`, `evanparker`)
    - [ ] maybe have a min length of 3?
    - [ ] force lowercase
    - [ ] attatch to validation?
  - Sanatize text fields
  - Error pages (404, etc)
  - mongoose schema:
    - `timestamps: true`
    - immutable? (on things like username)
    - use joi?
- [ ] Validate email on signup (before allowing posting)
- [x] Use context to manage authentication state
- Design homepage
- Add blog/articles
- Favorites
- Moderation
- Reputation
- Tagging
- Style and write email templates
- Comments on entities (minis etc)
- Keyboard support
  - Arrow key to change images being viewed
- Figure out how to merge duplicate records
  - Find a way to search for likely duplicates
- Change api to use json:api format?
  - https://jsonapi.org/
  - https://www.npmjs.com/package/jsonapi-serializer#relationship-deserializer
  - https://jsonapi.org/implementations/#related-tools-playground
  - https://github.com/holidayextras/jsonapi-server?tab=readme-ov-file
  - https://github.com/holidayextras/jsonapi-store-mongodb
- Add alerts/toasts for
  - [x] Deleting
  - [x] Saving
  - [x] Logging out
  - [ ] Errors
- Scrape reaper/wizkids site for data
  - [x] Reach out to companies
    - [ ] Archon Studios
    - [ ] Steamforged
    - [ ] ... GW?
  - Reaper APIs: https://www.reapermini.com/retailsupport/resources
  - Wizkids unpainted essentials page: https://wizkids.com/upmessentials/
- Consolodate search pickers (figure, manufacturer)

### Bugs

- [x] When deleting an image from an entity that is set to be the thumbnail, the thumbnail doesn't update and remains the deleted image
- [x] Image cropper doesn't work on iOS.

### Migrations/DB Changes

- [ ] Rename `Figures` to `Models`?
- [ ] Rename instances of `userId` to `user`
- Add fields
  - [x] All:
    - [x] createdAt
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
  - [ ] Collection (of figures, like a boxed set or something)

## DONE:

- ~~Search~~
- ~~About page~~
- ~~Footer~~
- ~~Change Password~~
- ~~Forgot/Reset Password~~
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
- [x] ~~Pagination (using mongoose-paginate-v2)~~
  - [x] Figures
  - [x] Minis
  - [x] Manufacturers
  - [x] Users
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
- [x] Serve robots/rich links
  - [x] Explicitly serve `thumbnail` instead of `images[0]`
- [x] Migrate off cloudinary?
  - https://docs.imgproxy.net
- [x] Trim whitespace on signup inputs
- [x] In page profile pic cropping
  - Croppie? https://foliotek.github.io/Croppie/

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
