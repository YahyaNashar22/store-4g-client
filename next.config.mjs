/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
          },
        ],
      },
      webpack: (config, { isServer }) => {
        // File loader for mp4 files
        config.module.rules.push({
          test: /\.(mp4)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              outputPath: 'static/videos/',
              name: '[name].[ext]',
              esModule: false,
            },
          },
        });
    
        return config;
      },
};


export default nextConfig;
