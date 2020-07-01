module.exports = function(RED) {

    "use strict";
    // var serialPool = require("../../serial-template/serial")
    var mapeamentoNode;

    function getValueNode(config) {
        RED.nodes.createNode(this, config);
        var node = this
        this.serial = config.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);
        this.mapeamento = config.mapeamento
        node.gpio_number = config.gpio_number
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);

        // if (this.serialConfig) {
        //     node.port = serialPool.get(this.serialConfig);
            node.on('input', function(msg, send, done) {
                var globalContext = node.context().global;
                var exportMode = globalContext.get("exportMode");
                var currentMode = globalContext.get("currentMode");
                var command = {
                    type: "GPIO_modular_V1.0",
                    slot: 1,
                    method: "get_value",
                    GPIO_number: parseInt(node.gpio_number),
                    // GPIO_output: node.output === "true" ? true : false
                }
                // if(exportMode){
                    var file = globalContext.get("exportFile")
                    
                    if(currentMode == "test"){file.jig_test.push(command)}
                    else{file.jig_error.push(command)}
                    globalContext.set("exportFile", file);
                    node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
                    send(msg)
                //}
        //         else{
        //             node.status({fill:"yellow", shape:"dot", text:"waiting"}); // seta o status pra waiting
    
        //             node.port.enqueue(msg, node,function(err,res) { // empilha a informacao a ser passada via serial
        //                 if (err) {
        //                     var errmsg = err.toString().replace("Serialport","Serialport " + node.port.serial.path);
        //                     node.error(errmsg,msg);
        //                 }
        //             });
        //         }
             });
 

        //     // nao mexa em nada daqui pra baixo
        //     this.port.on('data', function(msgout, sender) {
        //         if (sender !== node) { return; }
        //         node.status({fill:"green",shape:"dot",text:"ok"});
        //         msgout.status = "OK";
        //         node.send(msgout);
        //     });
        //     this.port.on('timeout', function(msgout, sender) {
        //         if (sender !== node) { return; }
        //         msgout.status = "ERR_TIMEOUT";
        //         node.status({fill:"red",shape:"ring",text:"timeout"});
        //         node.send(msgout);
        //     });
        //     node.port.on('ready', function() {
        //         node.status({fill:"green",shape:"dot",text:"connected"});
        //     });
        //     node.port.on('closed', function() {
        //         node.status({fill:"red",shape:"ring",text:"not-connected"});
        //     });
        // }
        // else {
        //     this.error(RED._("serial.errors.missing-conf"));
        // }
        // this.on("close", function(done) {
        //     if (this.serialConfig) {
        //         serialPool.close(this.serialConfig.serialport,done);
        //     }
        //     else {
        //         done();
        //     }
        // });
    }

    // nome do modulo
    RED.nodes.registerType("getValue", getValueNode);

    RED.httpAdmin.get("/getValue",function(req,res) {
        console.log(mapeamentoNode)
        if(mapeamentoNode){
            res.json([
                {value:mapeamentoNode.valuePort1, label: mapeamentoNode.labelPort1, hasValue:false},
                {value:mapeamentoNode.valuePort2, label: mapeamentoNode.labelPort2, hasValue:false},
                {value:mapeamentoNode.valuePort3, label: mapeamentoNode.labelPort3, hasValue:false},
                {value:mapeamentoNode.valuePort4, label: mapeamentoNode.labelPort4, hasValue:false},
                {value:mapeamentoNode.valuePort5, label: mapeamentoNode.labelPort5, hasValue:false},
                {value:mapeamentoNode.valuePort6, label: mapeamentoNode.labelPort6, hasValue:false},
                {value:mapeamentoNode.valuePort7, label: mapeamentoNode.labelPort7, hasValue:false},
                {value:mapeamentoNode.valuePort8, label: mapeamentoNode.labelPort8, hasValue:false},
                {value:mapeamentoNode.valuePort9, label: mapeamentoNode.labelPort9, hasValue:false},
                {value:mapeamentoNode.valuePort10, label: mapeamentoNode.labelPort10, hasValue:false},
                {value:mapeamentoNode.valuePort11, label: mapeamentoNode.labelPort11, hasValue:false},
                {value:mapeamentoNode.valuePort12, label: mapeamentoNode.labelPort12, hasValue:false},
            ])
        }
        else{
            res.json([
                {label:"GPA0_CN", value: "0", hasValue:false},
                {label:"GPA1_CN", value: "1", hasValue:false},
                {label:"GPA2_CN", value: "2", hasValue:false},
                {label:"GPA3_CN", value: "3", hasValue:false},
                {label:"GPA4_CN", value: "4", hasValue:false},
                {label:"GPA5_CN", value: "5", hasValue:false},
                {label:"GPA6_CN", value: "6", hasValue:false},
                {label:"GPA7_CN", value: "7", hasValue:false},
                {label:"GPA8_CN", value: "8", hasValue:false},
                {label:"GPA9_CN", value: "9", hasValue:false},
                {label:"GPA10_CN", value: "10", hasValue:false},
                {label:"GPA11_CN", value: "11", hasValue:false},
            ])
        }
    });
}