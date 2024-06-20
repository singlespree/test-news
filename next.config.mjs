/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {overrides: {removeViewBox: false, cleanupIds: false,}}
                                },
                            ],
                        },
                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;