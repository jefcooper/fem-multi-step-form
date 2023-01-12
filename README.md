# Frontend Mentor - Challenge

[![Deploy Site to GitHub Pages](https://github.com/jefcooper/fem-multi-step-form/actions/workflows/static.yml/badge.svg)](https://github.com/jefcooper/fem-multi-step-form/actions/workflows/static.yml)

Live on Github Pages: https://jefcooper.github.io/fem-multi-step-form

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

### Screenshots

![Desktop Page 1](./screenshots/screenshot-desktop-page-1.webp)
![Desktop Page 2](./screenshots/screenshot-desktop-page-2.webp)
![Desktop Page 3](./screenshots/screenshot-desktop-page-3.webp)
![Desktop Page 4](./screenshots/screenshot-desktop-page-4.webp)
![Desktop Page 5](./screenshots/screenshot-desktop-page-5.webp)

![Mobile Page 1](./screenshots/screenshot-mobile.webp)


### Links

- Solution URL: [Github Repository](https://github.com/jefcooper/fem-multi-step-form)
- Live Site URL: [Github Pages](https://jefcooper.github.io/fem-multi-step-form)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Github Actions
- Github Pages
- npm / vite

### What I learned

- Can force native form validation through javascript using the reportValidity() method on the form DOM element.  This returns true/false, true if valid, false if invalid.  As well, the :invalid is set on the failing form elements and this can in turn be used for styling the failed element.
- Native form validation is preferred for accessibility and focusing on the failed input field is automatic.
- There is a drawback in that the invalid state is by default shown on initial form load for empty required fields.  This has been changed in my implementation by setting a data- element on the form to indicate if the validation passed/failed, but only after the next button is pressed.
- This challenge had a lot of individual pieces including custom styled components for input, radio, checkbox.
- The programmatic page navigation had a lot of edge cases, such as needing a dynamic callback when a tab is shown in order to register event handlers... you can't register an event handler on a hidden DOM element.

### Outline of Chosen Approach

1. Use a multiple tab approach where each tab is a <section> within a form
2. Use data- attributes to attach script to the form and buttons to manipulate state

### Bugs and Finishing Steps

### Design Alterations

- the original design specifies cursor: pointer when hovering on text input. This overrides the system i-beam cursor that is required for exact placement of cursor when editing... so I did not follow the design for this.

### Useful resources

- https://www.youtube.com/watch?v=FKIafz8qgpk
- https://www.youtube.com/watch?v=UldBI0fdMJw&t=0s
- https://www.w3schools.com/howto/howto_js_form_steps.asp
- https://www.w3.org/WAI/tutorials/forms/multi-page/
- https://a11y-guidelines.orange.com/en/articles/using-aria-current-attribute/
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
- https://www.w3docs.com/snippets/css/how-to-disable-zoom-on-a-mobile-web-page-using-html-and-css.html

#### Tooling

- https://www.joshwcomeau.com/css/custom-css-reset/
- https://svg-sprite-generator.vercel.app/
- https://medium.com/swlh/better-ways-to-organise-css-properties-9a066e7ded62

#### Unsplash

#### My Codepens

## Author

- Website - [Jeff Cooper](https://jefcooper.github.io)
- Frontend Mentor - [@jefcooper](https://www.frontendmentor.io/profile/jefcooper)

## Acknowledgments
