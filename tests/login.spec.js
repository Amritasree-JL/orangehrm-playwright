const {test,expect} = require('@playwright/test');

test('User login with valid credentials',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name : 'Login'}).click();

    await expect(page).toHaveURL(/dashboard/);

});

test('Invalid password shpws error message',async({page}) =>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button',{name : 'Login'}).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('User can logout',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name:'Login'}).click();
    await expect(page).toHaveURL(/dashboard/);
    await page.getByAltText('profile picture').click();
    await page.getByRole('menuitem',{name:'Logout'}).click();

    await expect(page).toHaveURL(/auth\/login/);
});