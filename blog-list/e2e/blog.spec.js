const { test, expect, beforeEach, describe } = require('@playwright/test');
const exp = require('constants');
const { name } = require('../playwright.config');
const { loginWith } = require('./e2ehelper');

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    test('Login form is shown', async ({ page }) => {
        // await page.goto('http://localhost:5173');
        await expect(page.getByText('Login to continue')).toBeVisible();
        await expect(page.getByLabel('Username')).toBeVisible();
        await expect(page.getByLabel('Password')).toBeVisible();
        await expect(page.getByRole('textbox').first()).toBeVisible();
    });

    test('login succeeds with correct credentials', async ({ page }) => { 
        await loginWith('tej', 'hello123', page);
        await expect((page).getByRole('button', {name: 'logout'})).toBeVisible();
    });

    test('login fails with wrong credentials', async ({ page }) => { 
        await loginWith('tej', 'wrong_password', page);
        await expect((page).getByText('Invalid Credentials')).toBeVisible();


    });


    test('logged in user can create a blog', async ({ page }) => {
        
     })


    test('a blog can be liked', async ({ page }) => { })

    test('user who added the blog can delete it', async ({ page }) => { })

    test('delete button is only shown to the user who created the blog', async ({ page }) => { })

    test('blogs are ordered according to likes with the blog with the most likes being first', async ({ page }) => { })
})

