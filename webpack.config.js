'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  // devtool: 'eval-source-map',
  devtool: 'source-map',

  // build의 대상이 될 파일
  entry: {
    /*vendor : [
      //'react',
      //'react-dom'
      //'react-router-dom'
      //'./src/lib/jquery-1.11.1.min.js',
      //'./src/lib/jquery.mobile-1.4.5.min.js',
      //'./src/lib/jquery.timelineMe.js'
    ],*/
    app: [
      //'./src/entry.ts'
      './src/entry.js'
    ]
  },

  // build 결과를 저장할 경로
  output: {
    filename: '[name].bundle.js',
    //chunkFilename : '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build/js')
    //publicPath: '/'
  },

  /*externals: {
    'jquery': 'jQuery',
    'jquery-mobile': 'jQuery.mobile'
  },*/

  // 개발 서버
  devServer: {
    host : '127.0.0.1', // 사용될 호스트 지정 | webpack-dev-server –host 127.0.0.1
    contentBase: path.resolve(__dirname, 'build'), // 콘텐츠를 제공할 경로지정(정적파일을 제공하려는 경우에만 필요) | webpack-dev-server –content-base /path/to/content/dir
    //compress: true, // 모든 항목에(새로고침 없이 필요한 부분만 갱신) 대해 gzip압축 사용 | webpack-dev-server –compress
    hot : true, // webpack의 HMR(새로고침 없이 필요한 부분만 갱신) 기능 활성화
    inline: true, // inline 모드 활성화 | webpack-dev-server –inline=true
    port: 8080 // 접속 포트 설정 | webpack-dev-server –port 9000
    //open : true // dev server 구동 후 브라우저 열기 | webpack-dev-server –open
  },

  // 모듈로더
  module: {
    rules: [
      {
        test: /\.css$/,
        //use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        /*use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]*/
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        })
      },
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options : {
              cacheDirectory: true,
              presets : [
                ['env', {
                    loose: true, // IE8 에러 방지 https://github.com/ediblecode/webpack3-ie8
                    targets: {
                        // node: 'current', // 노드일 경우만
                        browsers : ['last 2 versions', 'ie >= 8'],
                        modules: false
                    }
                    // browsers : ['last 2 versions', '> 10%', 'ie 9'],
                }]
                //'react'
              ],
              plugins: [
                'transform-es3-property-literals', // 키워드를 접근자로 쓸 때 콤마로 감싼다.
                'transform-es3-member-expression-literals' // 키워드로 프로퍼티명을 쓸 때 콤마로 감싼다.
              ]
            }
          }
        ],
        exclude: ['/node_modules']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // 시스템에 존재하는 파일. 즉 이미지와 같은 자산들을 하나로 통합
      /*{
      	test: /\.(png|svg|jpe?g|gif)$/,
      	loader:'file-loader',
        options: {
          //publicPath: 'img/',
          name: 'img/[name].[ext]?[hash]'
        }
    	},*/

      // 시스템에 존재하는 파일. 즉 폰트와 같은 자산들을 하나로 통합
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader:'file-loader',
        options: {
          //publicPath: 'font/',
          name: 'font/[name].[ext]?[hash]'
        }
      },

      // 작은 이미지나 글꼴 파일은 복사하지 않고 base64 문자열 형태로 변환
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          //publicPath: 'assets/',
          name: 'img/[name].[ext]?[hash]',
          // limit는 파일의 크기를 말하는데 현재 10KB 미만은 url-loader로 처리가 되고 그 이상의 파일은 file-loder와 같이 처리가 된다.
          limit: 10000 //10kb
        }
      }
    ]
  },

  // 플러그인
  plugins: [
    // template 에 저장되어 있는 src/index.html 을 배포 폴더로 복사
    new HtmlWebpackPlugin({
      title: 'Javascript Core Module',
      //hash : true,
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      // minify: {
      //   collapseWhitespace: true,
      //   keepClosingSlash: true,
      //   removeComments: true
      // },
      inject: true,
      xhtml: false
    }),

    // 외부 스타일 시트 생성 플러그인
    new ExtractTextPlugin({
      filename: 'css/app.css',
      disable : false,
      allChunks : true
    }),

    // 로더들에게 옵션을 넣어주는 플러그인
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // (웹팩3 신규) 웹팩이 변환하는 자바스크립트 코드를 조금이나마 더 줄여주는 플러그인
    new webpack.optimize.ModuleConcatenationPlugin(),

    // 코드 압축, console 제거, 소스맵 보존 등을 하는 플러그인
    // UglifyJsPlugin으로 압축을 하면 IE8에서는 에러가 남
    /*new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
        //warnings: false, // 콘솔 창에 출력되는 게 보기 귀찮다면 요 놈을 주석 제거하면 된다.
        unused: true // 요놈이 핵심
      },
      mangle: false,    // DEMO ONLY: Don't change variable names.(난독화)
      beautify: true,   // DEMO ONLY: Preserve whitespace (가독성 좋게 함)
      output: {
        comments: true  // DEMO ONLY: Helpful comments (주석 삭제 안 함)
      }
    }),*/
    // https://closure-compiler.appspot.com/hom
    // http://javascriptcompressor.com/
    // https://www.strictly-software.com/unpack-javascript
    // new webpack.optimize.UglifyJsPlugin({ //33.7kb
    //   sourceMap: false,
    //   compress: {
    //     warnings: true,
    //     unused: true
    //   },
    //   mangle: true,
    //   beautify: false,
    //   output: {
    //     comments: false
    //   }
    // }),

    // 등록된 모듈을 자동으로 로드한다. 모듈에서 임의의 변수로 식별될 때마다 모듈이 자동으로 로드되며, 이 모듈은 로드된 모듈의 내보내기 모듈로 채워진다.
    /*new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),*/

    // 개별 파일 또는 전체 디렉토리를 빌드 디렉터리에 복사(from은 개발파일 to는 빌드파일 경로로 설정)
    /*new CopyWebpackPlugin([
      {from:'./src/img/**', to:'./img', flatten:true}
      //{from:'./src/css/fonts', to:'./css/fonts', flatten:true}
    ])*/

    // 여러 청크들 간에 공통적으로 사용되는 모듈들을 따로 하나로 모아두는 역할
    /*new webpack.optimize.CommonsChunkPlugin({
      name : 'vendor',
      //minChunks: function (module) {
      //  return module.context && module.context.indexOf('node_modules') !== -1;
      //},
      //fileName: '[name].[chunkhash]'
    }),*/

    // JS 변수를 치환해주는 플러그인
    /*new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // 아래 EnvironmentPlugin처럼 할 수도 있다.
    }),*/
    //new webpack.EnvironmentPlugin(['NODE_ENV']) // 요즘은 위의 DefinePlugin보다 이렇게 하는 추세이다.
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.tsx', '.ts', '.css']
  }

};
