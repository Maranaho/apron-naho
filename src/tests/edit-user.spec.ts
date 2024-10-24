import { test, expect } from '@playwright/test';

test.describe('Edit a user', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application's homepage before each test
    await page.goto('http://localhost:5173/');
  });

  test('should edit user first name and verify update', async ({ page }) => {
    // Expect the second cell from the second row to have the text "Naho"
    const secondRowSecondCell = page.locator('table tbody tr:nth-child(2) td:nth-child(2)');
    await expect(secondRowSecondCell).toHaveText('Naho');

    // Click the second "Edit" link in the list of users
    await page.getByRole('link', { name: 'Edit' }).nth(1).click();

    // Click on the "First Name" input field
    await page.getByLabel('First Name').click();

    // Fill the "First Name" input field with the value "Maranaho"
    await page.getByLabel('First Name').fill('Maranaho');

    // Click the "Save" button to save the updated user information
    await page.getByRole('button', { name: 'Save' }).click();

    // Expect the second cell from the second row to be updated to "Maranaho"
    await expect(secondRowSecondCell).toHaveText('Maranaho');
  });
});