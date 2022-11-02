const webpack = require('webpack'); 
module.exports = function override(config) { 
  const fallback = config.resolve.fallback || {}; 

  Object.assign(fallback, { 
    "timers": require.resolve("timers"),
    "timers-browserify": require.resolve("timers-browserify")
  });

  config.resolve.fallback = fallback; 
  config.plugins = (config.plugins || []).concat([ 
    new webpack.ProvidePlugin({ 
      process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    })
  ]);

  return config;
}