export default () => {
  it('render with img', async () => {
    await page.goto(`${BASE_URL}/welcome`, { waitUntil: 'networkidle0' });
    try {
      await page.waitForSelector('img');
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });
};
