const withTM = require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk'])

module.exports = withTM({
    reactStrictMode: false,
    experimental: {
        esmExternals: 'loose'
    }
})