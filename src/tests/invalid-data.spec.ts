import { test, expect } from '@playwright/test';

test.describe('User Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application's homepage before each test
    await page.goto('http://localhost:5173/');
  });

  test("should not submit the form if the first name is too short", async ({ page }) => {
    // Click the link to edit the 3rd user
    await page.getByRole('link', { name: 'Edit' }).nth(2).click();

    // Expect the "First Name" field to initially have the text "Salim"
    const firstNameField = await page.getByLabel('First Name');
    await expect(firstNameField).toHaveValue('Salim');

    // Click on the "First Name" input field and fill it with an invalid name
    await firstNameField.click();
    await firstNameField.fill('Sa'); // Filling with an invalid short name

    // Click the "Save" button to attempt to submit the form
    await page.getByRole('button', { name: 'Save' }).click();

    // Expect the modal to still be there despite clicking save
    await expect(page.getByText('Edit userGenderSelect')).toBeVisible();

    // Expect the firstNameField to have a red border indicating an error
    await expect(firstNameField).toHaveCSS("border", "2px solid rgb(229, 113, 113)"); // Adjust the color if necessary
  });
});