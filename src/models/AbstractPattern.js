export function createPattern(pattern) {
    const _pattern = new AbstractPattern();
    _pattern.systemId = pattern.systemId;
    _pattern.rhythm = pattern.rhythm;
    _pattern.pattern = pattern.pattern;
    _pattern.fillUpId = pattern.fillUpId;
    return _pattern;
}
export class AbstractPattern {
    constructor() {
        this._rhythm = 'MONTH';
        this._pattern = '';
        this._fillUpId = 3;
    }
    get systemId() {
        return this._systemId;
    }
    set systemId(value) {
        this._systemId = value;
    }
    get pattern() {
        return this._pattern;
    }
    set pattern(value) {
        this._pattern = value;
    }
    get fillUpId() {
        return this._fillUpId;
    }
    set fillUpId(value) {
        this._fillUpId = value;
    }
    get rhythm() {
        return this._rhythm;
    }
    set rhythm(value) {
        this._rhythm = value;
    }
    toJsonObject() {
        return {
            systemId: this.systemId,
            rhythm: this.rhythm,
            fillUpId: this.fillUpId,
            pattern: this.pattern,
        };
    }
}
