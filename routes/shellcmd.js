
/*
	uses async calls
	usage var shellcmd = require('./shellcmd.js');
			var cmd = {cmd:'oscmd',args:['arg1',...]};
			shell(cmd,function(err,data){
				if (err) return handleerr(err);
				dostuffwithresult(data);
			});

	todo: this really should be moved into a common resources directory
		as it is not specific to routes
*/


// async shell execution
module.exports = function(cmd,cb){
	const spawn = require('child_process').spawn; 
	const proc = spawn(cmd.cmd,cmd.args);  // async vs spawnSync
	// piped stdin/stdout = streams
	// child_process.exec(cmd[,opts][,cb]) = buffers - default 200k max
	// child_process.execFile(file[,args][,opts][,cb])
	// child_process.fork(modulePath[,args][,opts])  new nodejs process, see child.send()
	//
	
	proc.stdout.on('data',function(data){
		console.log(`stdout: ${data}`);  // backticks for eval of var inside str
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


