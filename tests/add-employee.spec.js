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

    const firstName = 'Test'+Date.now();
    const lastName = 'Automation';
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    const employeeId = Date.now().toString().slice(-6);
    const idField = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).getByRole('textbox');
    await idField.fill(employeeId);
    await expect(idField).toHaveValue(employeeId);
    await page.getByRole('button',{name:'Save'}).click();
    await expect(page).toHaveURL(/viewPersonalDetails/);

    await page.getByRole('link',{name : 'PIM'}).click();
    await expect(page).toHaveURL(/pim/);

    const empSearchTerm = firstName;
    const empInputValue = firstName + lastName;
    const empGridName = firstName+'  '+lastName;
    const nameField = page.getByPlaceholder('Type for hints...').first();
    await nameField.pressSequentially(empSearchTerm);
    await page.getByRole('option',{name: empSearchTerm}).click();

    await expect(nameField).toHaveValue(new RegExp(firstName));

    await page.getByRole('button',{name:'Search'}).click();

    await expect(nameField).toHaveValue(new RegExp(firstName));
});