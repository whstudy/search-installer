// hygon build scripts
const fs = require('fs').promises;
const path = require('path');

console.log('build hg');
console.log('__dirname: ', __dirname);
const sourceFolderPath = path.join(process.cwd(), 'hgbuild/files');
const targetPlubicPath = path.join(process.cwd(), 'public');
const targetDocPath = path.join(process.cwd(), 'public/doc');

const fileList = [
  {
    filename: 'privacyPolicy.pdf',
    sourceFolder: sourceFolderPath + '/public/agreement',
    targetFolder: path.join(process.cwd(), '/public/agreement'),
  },
  {
    filename: 'Third party license.pdf',
    sourceFolder: sourceFolderPath + '/public/agreement',
    targetFolder: path.join(process.cwd(), '/public/agreement'),
  },
  {
    filename: 'logo-font-block.svg',
    sourceFolder: sourceFolderPath + '/public',
    targetFolder: path.join(process.cwd(), '/public'),
  },
  {
    filename: 'logo-font.svg',
    sourceFolder: sourceFolderPath + '/public',
    targetFolder: path.join(process.cwd(), '/public'),
  },
  {
    filename: 'logo-white.svg',
    sourceFolder: sourceFolderPath + '/public',
    targetFolder: path.join(process.cwd(), '/public'),
  },
  {
    filename: 'index.tsx',
    sourceFolder: sourceFolderPath + '/src/components/Footer',
    targetFolder: path.join(process.cwd(), '/src/components/Footer'),
  },
  {
    filename: 'index.tsx',
    sourceFolder: sourceFolderPath + '/src/components/RightContent',
    targetFolder: path.join(process.cwd(), '/src/components/RightContent'),
  },
  {
    filename: 'index.tsx',
    sourceFolder: sourceFolderPath + '/src/components/WizardHeader',
    targetFolder: path.join(process.cwd(), '/src/components/WizardHeader'),
  },
  {
    filename: 'unioncommon.ts',
    sourceFolder: sourceFolderPath + '/src/locales/zh-CN',
    targetFolder: path.join(process.cwd(), '/src/locales/zh-CN'),
  },
  {
    filename: 'unioncommon.ts',
    sourceFolder: sourceFolderPath + '/src/locales/en-US',
    targetFolder: path.join(process.cwd(), '/src/locales/en-US'),
  },
  {
    filename: 'document.ejs',
    sourceFolder: sourceFolderPath + '/src/pages',
    targetFolder: path.join(process.cwd() + '/src/pages'),
  },
];

const migrateFile = async () => {
  try {
    for (const fileData of fileList) {
      const sourceFilePath = path.join(fileData.sourceFolder, fileData.filename);
      const targetFilePath = path.join(fileData.targetFolder, fileData.filename);

      // 判断目标文件夹中是否已存在同名文件
      const targetFileExists = await fs
        .access(targetFilePath)
        .then(() => true)
        .catch(() => false);

      // 如果目标文件存在，先删除它
      if (targetFileExists) {
        await fs.unlink(targetFilePath);
        console.log(`Deleted existing file: ${targetFilePath}`);
      }

      // 移动文件到目标文件夹
      // await fs.rename(sourceFilePath, targetFilePath);
      // console.log(`Moved file: ${sourceFilePath} -> ${targetFilePath}`);

      // 复制文件到目标文件夹
      await fs.copyFile(sourceFilePath, targetFilePath);
      console.log(`Copied file: ${sourceFilePath} -> ${targetFilePath}`);
    }

    console.log('All files processed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

migrateFile(fileList);
