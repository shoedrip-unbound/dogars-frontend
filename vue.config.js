let path = require('path');
let webpack = require('webpack');
let cp = require('child_process');

let latestcommit = cp.spawnSync('git', ['rev-list', '--max-count=1', 'master']).stdout.toString().trim();
latestcommit = latestcommit.substr(0, 6);
let commitCount = cp.spawnSync('git', ['rev-list', '--count', 'master']).stdout.toString().trim();

let commitstr = cp.spawnSync('git', ['log', `--pretty=format:%h%x00%ad%x00%s%x00%b%x00`]).stdout.toString();
let grouped = commitstr.split('\x00\n').map(s => s.split('\x00'));

let commits = grouped.map(g => {
  return {
    hash: g[0],
    date: g[1],
    subject: g[2],
    message: g[3]
  };
}).filter(m => !m.subject.toLowerCase().includes('merge'));

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,

  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: {
    resolve: {
      modules: [__dirname + '/node_modules/vue-awesome']
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.DefinePlugin({
        COMMITS: JSON.stringify(commits),
        COMMIT: JSON.stringify(latestcommit),
        VERSION: JSON.stringify(commitCount),
        PROD: '' + process.env.NODE_ENV == 'production',
        REMOTE: JSON.stringify(process.env.NODE_ENV == 'production' ? 'https://dogars.ml' : 'http://127.0.0.1:1234')
      })
    ]
  }
}
