module.exports = {
    "out": "./docs",
    "module": "commonjs",
    // "theme": "minimal",
    "target": "es6",
    "includeDeclarations": true,
    "exclude": ["**/index.ts",'**/src/modules/index'],
    "experimentalDecorators": true,
    "excludeExternals": true,
    "external-modulemap": ".*\/src\/((?:modules|library)\/[\\w\\-_]+)\/"
}
