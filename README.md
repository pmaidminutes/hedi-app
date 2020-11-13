# HEDI App

HEDI App web server and client

## Structure

### modules
functionality is split up into **modules** as far as possible, see `./modules`

code which is required by multiple modules should be refactored into `./common`

### routes / URLs

since `./pages` represents the public routing / url path segment, a human sensible naming and placement should be picked, even if it compromises module separation.

### imports 
in [`tsconfig.json`](./tsconfig.json) you can configure alias routes.
[Source](https://medium.com/@benjaminwfox/next-js-setup-config-for-testing-linting-and-absolute-imports-605959d7bd6f)

### api

`./pages/api/*` since this is not meant as an api for third party intergration but just as means of communication between HEDI client and server, the path segemnts can easily stick to module naming convention