const webpack = require( 'webpack' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const UglifyJsPlugin = require( "uglifyjs-webpack-plugin" );
const OptimizeCSSAssetsPlugin = require( "optimize-css-assets-webpack-plugin" );

const entry = './src/js/app.js';
const includePath = path.join( __dirname, 'src/js' );
const nodeModulesPath = path.join( __dirname, 'node_modules' );

let outputPath = path.join( __dirname, 'src/public/js' );

module.exports = env => {
  // Dev environment
  let devtool = 'eval';
  let mode = 'development';
  let stats = 'minimal';
  let plugins = [
    new webpack.DefinePlugin( {
      __ENV__: JSON.stringify( env.NODE_ENV )
    } )
  ];
  
  
  if ( env.NODE_ENV === 'prod' ) {
    devtool = 'hidden-source-map';
    mode = 'production';
    stats = 'none';
    outputPath = `${__dirname}/build/js`;
  }
  
  console.log( 'Webpack build -' );
  console.log( `    - ENV: ${env.NODE_ENV}` );
  console.log( `    - outputPath  ${outputPath}` );
  console.log( `    - includePath ${includePath}` );
  console.log( `    - nodeModulesPath: ${nodeModulesPath}` );
  
  const config = {
    entry: [
      entry
    ],
    output: {
      path: outputPath,
      publicPath: 'js',
      filename: 'app.js'
    },
    mode,
    
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: {
            loader: 'babel-loader'
          },
          include: includePath,
          exclude: nodeModulesPath
        },
        {
          test: /\.(s*)css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: 'css'
              }
            },
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve( __dirname, 'src' )
      ],
      extensions: [ '.js', '.json' ]
    },
    
    performance: {
      hints: 'warning'
    },
    stats,
    devtool,
    
    devServer: {
      contentBase: 'src/public'
    },
    
    plugins: plugins.concat(
      new HtmlWebpackPlugin( {
        title: 'Three.js Webpack ES6',
        template: path.join( __dirname, 'src/html/index.html' ),
        filename: '../index.html',
        env: env.NODE_ENV
      } ),
      new MiniCssExtractPlugin( {
        filename: '../css/[name].css',
        chunkFilename: '../css/[id].css'
      } )
    ),
    optimization: {
      minimizer: [
        new UglifyJsPlugin( {
          cache: true,
          parallel: true,
          sourceMap: true
        } ),
        new OptimizeCSSAssetsPlugin( {} )
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\\/]node_modules[\\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  };
  if ( env.NODE_ENV === 'prod' ) {
    return Object.assign( config, {
      externals: {
        'three': 'THREE',
        'tween.js': 'TWEEN'
      }
    } );
  } else {
    return config;
  }
};
