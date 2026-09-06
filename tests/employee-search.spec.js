const {test,expect} = require('@playwright/test');

test('Search returns the matching employee',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name : 'Login'}).click();

    await expect(page).toHaveURL(/dashboard/);

    await page.getByRole('link',{name:'PIM'}).click();

    await expect(page).toHaveURL(/pim/);
    
    const empSearchTerm = 'Sharath';
    const empInputValue = 'Sharath V Thampi';
    const empGridName = 'Sharath VThampi';
    const namefield = page.locator('.oxd-input-group').filter({hasText:'Employee Name'}).getByPlaceholder('Type for hints...');
    await namefield.pressSequentially(empSearchTerm);
    await page.getByRole('option',{name: empSearchTerm}).click();

    await expect(namefield).toHaveValue(empInputValue);

    await page.getByRole('button',{name:'Search'}).click();

    await expect(page.getByRole('row').filter({ hasText: empGridName })).toHaveCount(1);
});