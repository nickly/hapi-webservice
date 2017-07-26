'use strict';
module.exports = function (name, block) {
    if (!this._sections) this._sections = {};
    this._sections[name] = block.fn(this);
    return null;
};