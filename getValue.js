module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function getValueNode(config) {
        RED.nodes.createNode(this, config);
        this.serial = config.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);
        this.mapeamento = config.mapeamento;
        this.gpio_number = config.gpio_number;
        this.gpio_value = config.gpio_value;
        var node = this;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);

        node.on('input', function(msg, send, done) {
            // var _compare = {};

            // if (node.gpio_value == "true") {
            //     _compare = {
            //         GPIO_value: {"==": true}
            //     };
            // }
            // if (node.gpio_value == "false") {
            //     _compare = {
            //         GPIO_value: {"==": false}
            //     };
            // }
            // if (node.compare_select == "none") {
            //     _compare = {
            //         GPIO_value: {}
            //     };
            // }

            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "GPIO_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                compare: node.gpio_value === "none" ? {} : {"GPIO_value": {"==": node.gpio_value === "true" ? true : false}},
                method: "get_value",
                GPIO_number: parseInt(node.gpio_number),
                get_output: {},
                // compare: _compare
            }
            var file = globalContext.get("exportFile");
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    // file.begin.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    // file.end.push(command);
                }
            }
            globalContext.set("exportFile", file);
            send(msg);
            console.log(command);
        });
    }

    RED.nodes.registerType("getValue", getValueNode);

    // RED.httpAdmin.get("/getValue",function(req,res) {
    //     console.log(mapeamentoNode);
    //     if(mapeamentoNode){
    //         res.json([
    //             {value:mapeamentoNode.valuePort1, label: "GPA0_CN - " + mapeamentoNode.labelPort1, hasValue:false},
    //             {value:mapeamentoNode.valuePort2, label: "GPA1_CN - " + mapeamentoNode.labelPort2, hasValue:false},
    //             {value:mapeamentoNode.valuePort3, label: "GPA2_CN - " + mapeamentoNode.labelPort3, hasValue:false},
    //             {value:mapeamentoNode.valuePort4, label: "GPA3_CN - " + mapeamentoNode.labelPort4, hasValue:false},
    //             {value:mapeamentoNode.valuePort5, label: "GPA4_CN - " + mapeamentoNode.labelPort5, hasValue:false},
    //             {value:mapeamentoNode.valuePort6, label: "GPA5_CN - " + mapeamentoNode.labelPort6, hasValue:false},
    //             {value:mapeamentoNode.valuePort7, label: "GPA6_CN - " + mapeamentoNode.labelPort7, hasValue:false},
    //             {value:mapeamentoNode.valuePort8, label: "GPA7_CN - " + mapeamentoNode.labelPort8, hasValue:false},
    //             {value:mapeamentoNode.valuePort9, label: "GPA8_CN - " + mapeamentoNode.labelPort9, hasValue:false},
    //             {value:mapeamentoNode.valuePort10, label: "GPA9_CN - " + mapeamentoNode.labelPort10, hasValue:false},
    //             {value:mapeamentoNode.valuePort11, label: "GPA10_CN - " + mapeamentoNode.labelPort11, hasValue:false},
    //             {value:mapeamentoNode.valuePort12, label: "GPA11_CN - " + mapeamentoNode.labelPort12, hasValue:false},
    //             {value:mapeamentoNode.valuePort13, label: "GPB0_CN - " + mapeamentoNode.labelPort13, hasValue:false},
    //             {value:mapeamentoNode.valuePort14, label: "GPB1_CN - " + mapeamentoNode.labelPort14, hasValue:false},
    //             {value:mapeamentoNode.valuePort15, label: "GPB2_CN - " + mapeamentoNode.labelPort15, hasValue:false},
    //             {value:mapeamentoNode.valuePort16, label: "GPB3_CN - " + mapeamentoNode.labelPort16, hasValue:false},
    //             {value:mapeamentoNode.valuePort17, label: "GPB4_CN - " + mapeamentoNode.labelPort17, hasValue:false},
    //             {value:mapeamentoNode.valuePort18, label: "GPB5_CN - " + mapeamentoNode.labelPort18, hasValue:false},
    //             {value:mapeamentoNode.valuePort19, label: "GPB6_CN - " + mapeamentoNode.labelPort19, hasValue:false},
    //             {value:mapeamentoNode.valuePort20, label: "GPB7_CN - " + mapeamentoNode.labelPort20, hasValue:false},
    //             {value:mapeamentoNode.valuePort21, label: "GPB8_CN - " + mapeamentoNode.labelPort21, hasValue:false},
    //             {value:mapeamentoNode.valuePort22, label: "GPB9_CN - " + mapeamentoNode.labelPort22, hasValue:false},
    //             {value:mapeamentoNode.valuePort23, label: "GPB10_CN - " + mapeamentoNode.labelPort23, hasValue:false},
    //             {value:mapeamentoNode.valuePort24, label: "GPB11_CN - " + mapeamentoNode.labelPort24, hasValue:false},
    //         ]);
    //     }
    //     else{
    //         res.json([
    //             {label:"GPA0_CN", value: "0", hasValue:false},
    //             {label:"GPA1_CN", value: "1", hasValue:false},
    //             {label:"GPA2_CN", value: "2", hasValue:false},
    //             {label:"GPA3_CN", value: "3", hasValue:false},
    //             {label:"GPA4_CN", value: "4", hasValue:false},
    //             {label:"GPA5_CN", value: "5", hasValue:false},
    //             {label:"GPA6_CN", value: "6", hasValue:false},
    //             {label:"GPA7_CN", value: "7", hasValue:false},
    //             {label:"GPA8_CN", value: "8", hasValue:false},
    //             {label:"GPA9_CN", value: "9", hasValue:false},
    //             {label:"GPA10_CN", value: "10", hasValue:false},
    //             {label:"GPA11_CN", value: "11", hasValue:false},
    //             {label:"GPB0_CN", value: "12", hasValue:false},
    //             {label:"GPB1_CN", value: "13", hasValue:false},
    //             {label:"GPB2_CN", value: "14", hasValue:false},
    //             {label:"GPB3_CN", value: "15", hasValue:false},
    //             {label:"GPB4_CN", value: "16", hasValue:false},
    //             {label:"GPB5_CN", value: "17", hasValue:false},
    //             {label:"GPB6_CN", value: "18", hasValue:false},
    //             {label:"GPB7_CN", value: "19", hasValue:false},
    //             {label:"GPB8_CN", value: "20", hasValue:false},
    //             {label:"GPB9_CN", value: "21", hasValue:false},
    //             {label:"GPB10_CN", value: "22", hasValue:false},
    //             {label:"GPB11_CN", value: "23", hasValue:false},
    //         ]);
    //     }
    // });
};