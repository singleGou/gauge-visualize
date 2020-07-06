const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify");
const CopyRight = require("./banner");

module.exports = {
    input: 'src/client/index.js',
    output: {
        format: 'iife',
        file: 'project/client/js/index.js',
        name: 'chint_yibiao',
    },
    plugins: [
        babel(),
        uglify.uglify({
            output: {
                preamble: CopyRight
            }
        }),
    ],
    watch: {
        chokidar: true,
        clearScreen: true,
    }
};