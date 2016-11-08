YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Accessory",
        "ExternalAccessoriesModule",
        "Session"
    ],
    "modules": [
        "Readme"
    ],
    "allModules": [
        {
            "displayName": "Readme",
            "name": "Readme",
            "description": "This module makes the iOS External Accessory framework available to Titanium developers.\n\nTo access this module from JavaScript, you would do the following:\n\nvar EAModule = require(\"com.logicallabs.externalaccessories\");\n\nThe EAModule variable is a reference to the Module object.\n\n## Usage\n\nThe following code segments are not complete; they only demonstrate the\nessentials of using the module. See the example app acompanying the module\nfor a complete example.\n\nUse the \n{{#crossLink \"ExternalAccessoriesModule/connectedAccessories:property\"}}\n{{/crossLink}}\nproperty to get access to already connected accessories:\n\n\tEAModule.connectedAccessories.forEach(function(accessory) {\n\t\t...\n\nUse the \n{{#crossLink \"ExternalAccessoriesModule/showPicker:method\"}}\n{{/crossLink}}\nfunction to allow the user to connect a new accessory:\n\n\tEAModule.showPicker({\n\t\t\tfilterCallback: function(accessoryName) {\n\t\t\t\t...\n\nUse the \n{{#crossLink \"Accessory/openSession:method\"}}\n{{/crossLink}}\nfunction to create a new communication session to an accessory:\n\n\tsession = accessory.openSession({\n\t\t\tprotocol: '...'\n\t\t});\n\nUse the\n{{#crossLink \"Session/write:method\"}}\n{{/crossLink}}\nfunction to send data to the device:\n\n\tsession.write({\n\t\tdata: buffer\n\t});\n\t\nUse the\n{{#crossLink \"Session/receivedData:event\"}}\n{{/crossLink}}\nevent to consume data received from the accessory:\n\n\tsession.addEventListener('receivedData', function(e) {\n\t\t// e.data is a TiBuffer object holding the received data\n\t});\n\n## Issues and Limitations\n\nNone.\n\n## Change Log\n\n### Version 1.0.0\n\n* Initial release\n\n### Version 1.0.1\n\n* Added 64-bit support\n* Updated license\n\n## Author\n\nZsombor Papp, Logical Labs\n\ntitanium@logicallabs.com\n\n## License\n\nSee LICENSE file included with the module for all terms and conditions specific to this module.\n\nGeneral terms and conditions for all Logical Labs Titanium Modules can be found here: http://www.logicallabs.com/logical-labs-titanium-module-terms-conditions\n\n## Copyright\n\nCopyright (c) 2014 by Logical Labs, LLC"
        }
    ]
} };
});