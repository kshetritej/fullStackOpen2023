const loginWith =  async (username, password, page) => {
    await page.getByTestId('username').fill(username);
    await page.getByTestId('password').fill(password);
    await page.getByRole('button', { name: 'login' }).click();
}


export { loginWith };