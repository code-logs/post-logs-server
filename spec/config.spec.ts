import { ConfigController } from '../src/controllers/config-controller'

test('Config parsing test', async () => {
  const { CATEGORIES } = await ConfigController.getPostConfig()
  const categories = Object.keys(CATEGORIES).map(
    (categoryKey) => CATEGORIES[categoryKey]
  )

  expect(categories.includes('UI and UX')).toBeTruthy()
})
