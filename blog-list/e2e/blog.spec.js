const { test, expect, beforeEach, describe } = require('@playwright/test');
const exp = require('constants');

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

    test('login succeeds with correct credentials', async ({ page }) => { });

    test('login fails with wrong credentials', async ({ page }) => { });


    test('logged in user can create a blog', async ({ page }) => { })


    test('a blog can be liked', async ({ page }) => { })

    test('user who added the blog can delete it', async ({ page }) => { })

    test('delete button is only shown to the user who created the blog', async ({ page }) => { })

    test('blogs are ordered according to likes with the blog with the most likes being first', async ({ page }) => { })
})

