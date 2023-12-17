
const expressServer = require("express")();

expressServer.listen(env_infos.LISTENPORT, () => {
    console.log("Start to running...")
});

