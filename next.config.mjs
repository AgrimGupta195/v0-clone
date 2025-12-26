/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],
  webpack: (config, { isServer }) => {
    // Suppress warnings from dependencies
    config.ignoreWarnings = [
      {
        module: /node_modules\/vscode-languageserver-types/,
        message: /Critical dependency/,
      },
      {
        module: /node_modules\/dockerfile-ast/,
        message: /Critical dependency/,
      },
    ];

    // Handle require() in dependencies
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "vscode-languageserver-types": "commonjs vscode-languageserver-types",
      });
    }

    return config;
  },
};

export default nextConfig;
