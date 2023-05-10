module.exports = {
  apps: [
    {
      name: "file-proxy",
      script: "npm",
      args: "start",
      autorestart: true,
      env: {
        NODE_ENV: "production",
        PORT: 8443,
      },
    },
  ],
};
