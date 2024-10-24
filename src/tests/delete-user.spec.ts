import { test, expect } from '@playwright/test'

test.describe('Delete a user after cuser confirmation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application's homepage before each test
    await page.goto('http://localhost:5173/')
  })

  test('should display the user table', async ({ page }) => {
    // Wait until the table is visible on the page
    const tableLocator = page.locator('table')
    await expect(tableLocator).toBeVisible()

    // Expect the table to have 4 rows
    const initialRows = await page.locator('table tbody tr').count()
    expect(initialRows).toBe(4)
  })

  test('should cancel user deletion', async ({ page }) => {
    // Click the link to delete the user 'Naho'
    await page.getByRole('link', { name: 'delete Naho' }).click()

    // Expect the confirmation dialog's title to show up
    await expect(page.getByRole('heading', { name: 'Are you sure you want to' })).toBeVisible()

    // Expect the title to read "Are you sure you want to delete user Naho?"
    await expect(page.getByRole('heading', { name: /Are you sure you want to delete user Naho\?/ })).toBeVisible()

    // Click the 'Cancel' link to abort the delete operation
    await page.getByRole('link', { name: 'Cancel' }).click()

    // Expect to still have 4 rows after canceling deletion
    const rowsAfterCancel = await page.locator('table tbody tr').count()
    expect(rowsAfterCancel).toBe(4) // Verify that the number of rows remains the same

    // Expect the confirmation dialog's title to no longer be visible
    await expect(page.getByRole('heading', { name: /Are you sure you want to delete user Naho\?/ })).not.toBeVisible()
  })

  test('should delete a user', async ({ page }) => {
    // Click the link to delete the user 'Salim'
    await page.getByRole('link', { name: 'delete Salim' }).click()

    // Click the 'Delete' button to confirm the deletion of 'Salim'
    await page.getByRole('button', { name: 'Delete' }).click()

    // Expect the table to have 3 rows after deletion
    const finalRows = await page.locator('table tbody tr').count()
    expect(finalRows).toBe(3)
  })
})