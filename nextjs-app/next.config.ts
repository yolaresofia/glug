import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: "false",
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default withNextIntl(nextConfig);
