const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const IS_DEV = require("./src/plugins/cfg.js").isdev;
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const proxy = require('http-proxy-middleware');
// const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  //部署应用包时的基本 URL， 用法和 webpack 本身的 output.publicPath 一致。
  publicPath: IS_DEV ? "/" : "./",
  transpileDependencies: ["vuetify"],
  //输出文件目录，当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的目录。
  assetsDir: "public/control",
  //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: "panel.html",
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  filenameHashing: true,
  //是否在保存的时候使用 `eslint-loader` 进行检查。 有效的值：`ture` | `false` | `"error"`  当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: false,
  //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: IS_DEV ? "public/index.dev.html" : "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: "src/main.js",
  },
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  crossorigin: undefined,
  css: {
    //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    sourceMap: IS_DEV,
    //是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: true,
    //默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: false,
    //向 CSS 相关的 loader 传递选项。
    // loaderOptions:{}
  },
  chainWebpack: (config) => {
    config.resolve.alias // 添加别名
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@store", resolve("src/store"))
      .set("@api", resolve("src/plugins/api.js"));
    // 分析
    if (process.env.NODE_ENV === "production") {
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
        config.plugins.delete("prefetch");
      }
    }
  },
  devServer: {
    host: 'localhost',//target host
    port: 8080,
    proxy: {
      '/api': {
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': '/'
          }
      }
    }
  },
  configureWebpack: {
    optimization: {
      minimize: process.env.NODE_ENV === "production",
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: false,
              drop_debugger: true,
              pure_funcs: ["console.log"], // 移除console
            },
          },
        }),
      ],
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gzip[query]", // 提示compression-webpack-plugin@2.0.0的话filename改为asset
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240, //内容超过10KB进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
      // new VuetifyLoaderPlugin(),
    ],
    externals: IS_DEV
      ? {}
      : {
          vue: "Vue",
          "vue-router": "VueRouter",
          vuex: "Vuex",
          axios: "axios",
          vuetify: "Vuetify",
          "@ckeditor/ckeditor5-build-classic": "ClassicEditor",
        },
  },
};
