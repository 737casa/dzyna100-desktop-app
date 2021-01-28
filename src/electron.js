require('ts-node').register({
    compilerOptions:{
        module:"commonjs",
        "paths": {
            "window" : ["./window.d.ts"]
        },
        "typeRoots": ["./window.d.ts"],
    }
});
require("./electron.ts")
