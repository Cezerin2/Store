const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")

module.exports = {
  entry: {
    app: ["babel-polyfill", "./build/client/index.js"],
    theme: ["theme"],
  },

  performance: {
    hints: false,
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "theme"),
    filename: "assets/js/[name]-[chunkhash].js",
    chunkFilename: "assets/js/[name]-[chunkhash].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "theme",
          test: "theme",
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: [path.resolve("node_modules")],
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "theme/assets/js/app-*.js",
        "theme/assets/js/theme-*.js",
        "theme/assets/css/bundle-*.css",
        "theme/assets/sw.js",
        "theme/assets/precache-manifest.*.js",
      ],
      verbose: false,
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/bundle-[contenthash].css",
      chunkFilename: "assets/css/bundle-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "theme/index.html",
      inject: "body",
      filename: "assets/index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: "assets/sw.js",
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.html$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp("/(images|assets|admin-assets)/"),
          handler: "CacheFirst",
        },
        {
          urlPattern: new RegExp("/api/"),
          handler: "NetworkOnly",
        },
        {
          urlPattern: new RegExp("/ajax/payment_form_settings"),
          handler: "NetworkOnly",
        },
        {
          urlPattern: new RegExp("/"),
          handler: "NetworkFirst",
          options: {
            networkTimeoutSeconds: 10,
          },
        },
      ],
    }),
    new webpack.BannerPlugin({
      banner: `Created: ${new Date().toUTCString()}`,
      raw: false,
      entryOnly: false,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
      exclude: ["vendor.js"],
    }),
  ],

  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
}
