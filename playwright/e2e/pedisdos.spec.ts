import { test, expect } from '@playwright/test'
import { gerarCodigoPedido } from '../suppport/helpers'
/// AAA - Arrange, Act, Assert
/// PAV - Preparar, Agir, Verificar 

test.describe('Consulta de Pedido', () => {

  // test.beforeAll(async () => {
  //   console.log('beforeAll: roda uma vez antes de todos os testes.')
  // })

  // test.beforeEach(async () => {
  //   console.log('beforeEach: roda antes de cada teste.')
  // }) 

  // test.afterAll(async () => {
  //   console.log('afterAll: roda uma vez depois de todos os testes.')
  // })

  // test.afterEach(async () => {
  //   console.log('afterEach: roda depois de cada teste.')
  // })

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    // Checkpoint 1: Verificar se o texto "Velô Sprint" está presente na página
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    //Checkpoint 2: Verificar se a página de consulta de pedido está presente
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })


  test('deve consultar um pedido aprovado', async ({ page }) => {

    //const order = 'VLO-8AH4U5'

    const order = {
      number: 'VLO-8AH4U5',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'Bruno Araujo',
        email: 'brunosisag@gmail.com'
      },
      payment: 'À Vista',
      status: 'APROVADO'
    }

    // Act
    //Checkpoint 3: Preencher o campo de busca com o ID do pedido
    //await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-8AH4U5')
    //await page.getByLabel('Número do Pedido').fill('VLO-8AH4U5')
    await page.getByPlaceholder('Ex: VLO-ABC123').fill(order.number)
    //await page.getByTestId('search-order-button').click()
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 })
    // await expect(page.getByTestId('order-result-id')).toContainText('VLO-8AH4U5')
    // await expect(page.getByText('VLO-8AH4U5')).toBeVisible({ timeout: 10_000 })
    // await expect(page.getByTestId('order-result-VLO-8AH4U5')).toContainText('VLO-8AH4U5')

    // xpath puro
    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-8AH4U5"]')

    // await expect(page.getByText(order)).toBeVisible({ timeout: 10_000 })
    // await expect(orderCode).toBeVisible({ timeout: 10_000 })
    // await expect(page.locator('#root')).toContainText(order)

    // const containerPedido = page.getByRole('paragraph')
    //   // Expressão regular para pegar iniciando com pedido e terminando com pedido  
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..')

    // await expect(containerPedido).toContainText(order, { timeout: 10_000 })


    // // await expect(page.getByTestId('order-result-status')).toBeVisible()
    // // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')  
    // // await expect(page.getByText('APROVADO')).toBeVisible();
    // // await expect(page.getByTestId('order-result-VLO-8AH4U5')).toContainText('APROVADO');

    // await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 10_000 })
    // await expect(page.locator('#root')).toContainText('APROVADO')

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    // const order = 'VLO-5E12TG'

    const order = {
      number: 'VLO-5E12TG',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista',
      status: 'REPROVADO'
    }

    await page.getByPlaceholder('Ex: VLO-ABC123').fill(order.number)
    //await page.getByTestId('search-order-button').click()
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)
  })

  test('deve exibir mensagem quando o pedido não é encontrato', async ({ page }) => {

    const order = gerarCodigoPedido()

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // await expect(page.locator('#root')).toContainText('Pedido não encontrado')
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')

    // const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
    // await expect(title).toBeVisible()

    // //const message = page.getByText('Verifique o número do pedido e tente novamente')
    // //const message = page.locator('//p[text()= "Verifique o número do pedido e tente novamente"]')
    // const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
    // await expect(message).toBeVisible()

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })
})

