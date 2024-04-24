// const target = 'http://10.128.136.41/';
// const target = 'http://10.128.136.133/';
// const target = 'http://10.128.136.35'; // wenzheng(目录)
// const target = 'http://10.128.134.17'; // wenzheng(目录)
// const target = 'http://10.128.129.191'; //zhanglong
// const target = 'http://10.128.129.103',    // zhuohang
// const target = 'http://10.128.129.201'; // daijun(节点)
// const target = 'http://10.128.130.186/'; // linlin
// const target = 'http://10.128.137.89/'; // fox
// const target = 'http://10.128.136.15'; // renying
// const target = 'http://10.128.129.55/'; // xinkui
// const target = 'http://10.128.130.121'; //zhaozhao
// const target = 'http://10.128.138.65'; //weichao
// const target = 'http://10.128.136.49'; //weichao
// const target = 'http://10.128.19.67/'; // stage BVT
// const target = 'http://10.128.134.17/'; // product BVT
// const target = 'http://10.128.132.169/'; // product BVT
// const target = 'http://10.128.131.80/'; // product BVT

// const target = 'https://10.128.134.71/'; // 4.0 stage BVT
// const target = 'https://10.128.134.25/'; // 4.0 product BVT

const target = 'https://mock.apifox.com/m1/1459334-0-default/'; // product BVT
// const target = 'http://192.168.71.43:8080/'; // product BVT
// const target = 'http://10.128.101.104:5001/'; // 4.0 product BVT
// const target = 'http://10.128.131.78:5001/'; // 4.0 product BVT
// const target = 'https://10.128.131.28/'; // 4.0 product BVT

// const target = 'http://10.128.101.104:8901/'; // product BVT

// const target = 'https://10.128.133.56/'; // product BVT

// const target = 'http://10.128.101.104:8901/'; // product BVT

// const target = 'https://10.128.137.248/'; // product BVT

// const target = 'http://10.128.15.104:8080/'; // product BVT

// const target = 'https://10.128.134.60/'; // product BVT

// const target = 'http://gitlab.ln.ad/'; // product BVT

// const target = 'https://10.128.134.107/'; // product BVT

// const target = 'http://10.128.101.104:8901/'; // product BVT

// const target = 'https://10.128.138.107/'; // product BVT

// const target = 'https://10.128.134.230/'; // product BVT

// const target = 'https://10.128.128.247/'; // product BVT

// const target = 'https://10.128.131.25/'; // product BVT

// const target = 'https://10.128.138.107/'; // product BVT

// const target = 'https://10.128.134.95/'; // product BVT

// const target = 'https://10.128.19.88/'; // product BVT

// const target = 'https://10.128.138.135/'; // product BVT

export default {
  dev: {
    '/dsm/': {
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
    },
    '/portal/': {
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
    },
    '/ui/': {
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
    },
  },
  test: {
    '/dsm/': {
      target: 'http://10.128.129.201',
      changeOrigin: true,
      pathRewrite: { '^dsm': '' },
    },
  },
};
