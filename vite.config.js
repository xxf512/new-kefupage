const { createVuePlugin } = require('vite-plugin-vue2')
import legacy from '@vitejs/plugin-legacy'
import babel from "@rollup/plugin-babel"
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

module.exports = {
  plugins: [
    createVuePlugin(),
    babel({
      plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
      ]
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
  ],
  build: {
    rollupOptions: {
      external: ["vue", "element-ui"],
      input: {
        setting: '/src/pages/setting/index.html',
        demo:'/src/pages/demo/index.html',
      },
      plugins: [
        commonjs(),
        externalGlobals({
          vue: 'Vue',
          "element-ui": 'ELEMENT'
        })
      ]
    },
    assetsDir: 'otherPageAssets'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/chat': 'http://testkefu.inke.cn/'
    }
  }
};
