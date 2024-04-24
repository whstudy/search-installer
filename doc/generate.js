const { join } = require('path');
const camelcase = require('camelcase');
const { generateService } = require('openapi-ln');
const { existsSync, mkdirSync } = require('fs');

const pwd = process.cwd();
const pageConfig = require(join(pwd, 'package.json'));
const serversFolder = join(pwd, 'src', 'services');
const openAPIConfig = {
  schemaPath: join(__dirname, './swagger.json'),
  projectName: 'dsm',
  mock: false,
  hook: {
    customFunctionName: (api) => {
      console.log(api.path, api.method);
      let url = api.path.replace(/(^\/|\/$)/g, '').replace(/\//g, '-');
      if ('get' === api.method) {
        url += '-get';
      }
      return camelcase(url);
    },
  },
};

if (serversFolder && !existsSync(serversFolder)) {
  mkdirSync(serversFolder);
}
generateService({
  projectName: pageConfig.name.split('/').pop(),
  serversPath: serversFolder,
  ...openAPIConfig,
});
