module.exports = {
  apps: [
    {
      name: 'pagespeedy_api',
      script: './app.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'pagespeedy_api',
      script: './app.js',
      instances: 4,
      exec_mode: 'cluster',
    },
  ],
};
