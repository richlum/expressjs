
/*
	async call
	usage var shellcmd = require('./shellcmd.js');
			var cmd = {cmd:'oscmd',args:['arg1',...]};
			shell(cmd,function(err,data){
				if (err) return handleerr(err);
				dostuffwithresult(data);
			});
*/


// async shell execution
module.exports = function(cmd,cb){
	const spawn = require('child_process').spawn;
	const proc = spawn(cmd.cmd,cmd.args);
	
	proc.stdout.on('data',function(data){
		console.log(`stdout: ${data}`);
		cb(undefined, data);
	});
	
	proc.stderr.on('data',function(data){
		console.log(`stderr:${data}`);
		cb(data,undefined);
	});
	
	proc.on('close',function(code){
		console.log(`child process exited with code ${code}`);
		cb( `child process exited with code ${code}`,undefined);
	});
};


