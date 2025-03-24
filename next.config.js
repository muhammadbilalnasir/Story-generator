module.exports = {
  webpack: (config, { isServer }) => {
    // Add transpilation for the problematic modules
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/undici/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    });
    return config;
  }
};