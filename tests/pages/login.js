const { clearField } = require('../utils');

export default () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      localStorage.removeItem('token');
    });
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.ant-btn-primary');
  });

  beforeEach(async () => {
    await clearField('#username');
    await clearField('#password');
  });

  it('should login with failure', async () => {
    await page.type('#username', 'wrong');
    await page.type('#password', 'wrong');
    await page.click('.ant-btn-primary');
    try {
      await page.waitForSelector('.ant-message-error', { timeout: 3000 });
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });

  it('should login with success', async () => {
    await page.type('#username', USERNAME);
    await page.type('#password', PASSWORD);
    try {
      await Promise.all([page.waitForNavigation(), page.click('.ant-btn-primary')]);
      await page.waitForSelector('aside');
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });
};
