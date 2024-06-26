const { join } = require('path');
const camelcase = require('camelcase');
const { generateService } = require('openapi-ln');
const { existsSync, mkdirSync } = require('fs');

const { execSync } = require('child_process');

function getGitBranchName() {
  try {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    return branchName;
  } catch (e) {
    console.error('无法获取 Git 分支名:', e);
    return null;
  }
}

const branchName = getGitBranchName();
console.log('本地当前分支名:', branchName);

// const swaggerUrl = `http://10.128.134.127:8000/swagger/dsm-swagger/-/raw/${process.argv[2]||branchName}/main.yaml`
const swaggerUrl = `doc/swagger.yaml`
console.log(`swagger地址`, swaggerUrl)

try {
  const stdout = execSync(`swagger-cli bundle -o doc/swagger.json ${swaggerUrl}`).toString().trim();
  console.log(`执行成功`, stdout)
} catch (e) {
  console.log(`执行失败`)
  return;
}

const pwd = process.cwd();
const pageConfig = require(join(pwd, 'package.json'));
const serversFolder = join(pwd, 'src', 'services');
const openAPIConfig = {
  schemaPath: join(__dirname, './swagger.json'),
  projectName: 'dsm',
  mock: false,
  hook: {
    customFunctionName: (api) => {
      // console.log(api.path, api.method);
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
