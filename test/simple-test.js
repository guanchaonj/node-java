

var java = require("../");
java.classpath.push("test/commons-lang3-3.1.jar");

var nodeunit = require("nodeunit");
var util = require("util");

exports['Simple'] = nodeunit.testCase({
  "test classpath commons lang": function(test) {
    var result = java.callStaticMethodSync("org.apache.commons.lang3.ObjectUtils", "toString", "test");
    console.log("org.apache.commons.lang3.ObjectUtils.toString:", result);
    test.equal(result, "test");
    test.done();
  },

  "test static calls": function(test) {
    var result = java.callStaticMethodSync("java.lang.System", "currentTimeMillis");
    console.log("currentTimeMillis:", result);
    test.ok(result);
    test.done();
  },

  "test static calls single argument": function(test) {
    var result = java.callStaticMethodSync("java.lang.System", "getProperty", "os.version");
    console.log("os.version:", result);
    test.ok(result);
    test.done();
  },

  "create an instance of a class and call methods (getName) (async)": function(test) {
    java.newInstance("java.util.ArrayList", function(err, list) {
      if(err) { console.log(err); return; }
      test.ok(list);
      if(list) {
        list.getClass(function(err, result) {
          if(err) { console.log(err); return; }
          result.getName(function(err, result) {
            if(err) { console.log(err); return; }
            test.equal(result, "java.util.ArrayList");
            test.done();
          });
        });
      }
    });
  },

  "create an instance of a class and call methods (getName) (sync)": function(test) {
    var list = java.newInstanceSync("java.util.ArrayList");
    test.equal(list.sizeSync(), 0);
    list.addSync("hello");
    list.addSync("world");
    test.equal(list.sizeSync(), 2);
    list.clearSync();
    var clazz = list.getClassSync();
    var result = clazz.getNameSync();
    test.equal(result, "java.util.ArrayList");
    test.done();
  },

  "create an instance of a class and call methods (size) (async)": function(test) {
    java.newInstance("java.util.ArrayList", function(err, list) {
      if(err) { console.log(err); return; }
      test.ok(list);
      if(list) {
        list.size(function(err, result) {
          if(err) { console.log(err); return; }
          test.equal(result, 0);
          test.done();
        });
      }
    });
  }
});
