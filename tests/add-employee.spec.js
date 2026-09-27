const {test,expect} = require('@playwright/test');

test('Add employee', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name : 'Login'}).click();
    await expect(page).toHaveURL(/dashboard/);

    await page.getByRole('link',{name : 'PIM'}).click();
    await expect(page).toHaveURL(/pim/);
    await page.getByRole('button',{name:'Add'}).click();
    await expect(page.getByRole('heading',{name:'Add Employee'})).toBeVisible();
});