const clearField = async (field) => {
  await page.focus(field);
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
};

const login = async (page) => {
  await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ant-btn-primary');
  const token = await page.evaluate(() => localStorage.getItem('token'));
  if (token) {
    return;
  }
  await clearField('#username');
  await clearField('#password');
  await page.type('#username', USERNAME);
  await page.type('#password', PASSWORD);
  await Promise.all([page.waitForNavigation(), page.click('.ant-btn-primary')]);
  await page.waitForSelector('aside');
};

module.exports = {
  clearField,
  login,
};
