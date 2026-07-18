import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert
/// PAV - Preparar, Agir, Verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
// Arrange
  await page.goto('http://localhost:5173/')  
  // Checkpoint 1: Verificar se o texto "Velô Sprint" está presente na página
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  //Checkpoint 2: Verificar se a página de consulta de pedido está presente
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  //Checkpoint 3: Preencher o campo de busca com o ID do pedido
  await page.getByTestId('search-order-id').fill('VLO-8AH4U5')
  await page.getByTestId('search-order-button').click()
  
  // Assert
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-8AH4U5')
  
  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})