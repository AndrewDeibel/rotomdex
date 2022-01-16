// String extentions
interface String {
    trimEnds(): string;
    parseNewLine(): string;
}

// Parse new line
String.prototype.parseNewLine = function(): string {
    return this.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

// Trim first and last character ("")
String.prototype.trimEnds = function(): string {
    return this.substr(1).slice(0, -1);
}