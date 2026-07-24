import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../suppport/helpers'

import { Navbar } from '../suppport/components/Navbar'

import { LandingPage } from '../suppport/pages/LandingPage'
import { OrderLockupPage, OrderDetails } from '../suppport/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    // Arrange
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)

    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-8AH4U5',
      status: 'APROVADO' as const,
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'Bruno Araujo',
        email: 'brunosisag@gmail.com'
      },
      payment: 'À Vista'
    }

    // Act
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-5E12TG',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    // Act
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-1YC8B7',
      status: 'EM_ANALISE' as const,
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Joao Velo',
        email: 'joao@velo.com.br'
      },
      payment: 'À Vista'
    }

    // Act
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    // Act
    await orderLockupPage.searchOrder(order)

    // Assert
    await orderLockupPage.validateOrderNotFound()
   })

   test('deve exibir mensagem quando o c[odigo do édido está fora do padrão', async ({ page }) => {

    const order = generateOrderCode()

    // Act
    await orderLockupPage.searchOrder(order)

    // Assert
    await orderLockupPage.validateOrderNotFound()
   })
})
