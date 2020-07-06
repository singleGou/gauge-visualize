const childProcess = require("child_process");
const {exec, spawn} = childProcess;
const rollup = require('rollup');


function getSize (data) {
    return (data.length / 1024).toFixed(2) + 'kb'
}
function color (str, style='34') {
    /**
     * 31  red
     * 32  green
     * 33  yellow
     * 34  blue
     * 35  magenta
     * 36  cyan
     */

    return '\x1b[' + style + 'm' + str +'\x1b[0m';
    // return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
function randomWord(randomFlag = true, min = 5, max = 15){
	var str = "",
		range = min,
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	// 随机产生
	if(randomFlag){
		range = Math.round(Math.random() * (max-min)) + min;
	}
	for(var i=0; i<range; i++){
		pos = Math.round(Math.random() * (arr.length-1));
		str += arr[pos];
	}
	return str;
}

function spawning(...args){
    // let spawned = spawn(args[0], args.splice(1, args.length-1));
    // 有问题通知我
    let spawned = spawn(process.platform === "win32"
    ? args[0] + '.cmd' : args[0], args[1]);
  
    spawned.stdout.on('data', (data) => {
        // console.log('stdout:data--------------:');
        console.log('stdout:    ' + color(randomWord()));
        console.log(data.toString());
    });
  
    spawned.stderr.on('data', (data) => {
        // console.log('stderr:data--------------:');
        console.log('stderr:    ' + color(randomWord()));
        console.log(data.toString());
    });
  
    spawned.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    return spawned;
}

const clearConsole = () => process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');

async function build(inputOptions, outputOptions) {
    const bundle = await rollup.rollup(inputOptions);
  
    await bundle.write(outputOptions);
}

module.exports = {
    getSize,
    color,
    randomWord,
    spawning,
    clearConsole,
    build,
}