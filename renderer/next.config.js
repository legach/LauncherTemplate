module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    config.module.rules.push(
    {
      test: /\.ts$/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript'
        ]
      },
      exclude: /node_modules/
    });

    return config;
  },
  images: {
    loader: 'imgix',
    path: 'https://<SiteDomain>/'
  }
};
