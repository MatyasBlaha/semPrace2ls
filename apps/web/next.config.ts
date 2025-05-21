/**
 * @type {import('next').NextConfig}
 */
import * as path from "path";

import createNextIntlPlugin from "next-intl/plugin";
import * as process from "process";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    future: {
        webpack5: true,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src'),
        }
        return config
    },
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    env: {
        JWT_SECRET:process.env.JWT_SECRET
    }
}

export default withNextIntl(nextConfig)