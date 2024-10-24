import { test, expect } from '@playwright/test';

test.describe('Add a user', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('http://localhost:5173/');
  });

  test('should add a user successfully', async ({ page }) => {
    // Click on 'Add User' link
    await page.getByRole('link', { name: 'add user Add User' }).click();
    
    // Fill the form to add a new user
    await page.getByLabel('Gender').selectOption('male');
    await page.getByLabel('First Name').fill('Isaiah');
    await page.getByLabel('Last Name').fill('Le Maladroit');
    await page.getByLabel('Age').fill('33');
    
    // Submit the form
    await page.getByRole('button', { name: 'Add' }).click();

    // Expect the cell to contain the text "Isaiah"
    await expect(page.getByRole('cell', { name: 'Isaiah', exact: true })).toHaveText('Isaiah');
  });
});