function generateCode(length) {
    var s = ""; do { s += Math.random().toString(36).substr(2).toUpperCase(); } while (s.length < length); return s = s.substr(0, length);
}

exports.generateCode = generateCode;