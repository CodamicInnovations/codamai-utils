export interface AbstractPatternInterface {
  systemId?: String
  rhythm: 'MONTH' | 'YEAR'
  pattern: String
  fillUpId: Number
}

export function createPattern(pattern: AbstractPatternInterface) {
  const _pattern = new AbstractPattern()
  _pattern.systemId = pattern.systemId
  _pattern.rhythm = pattern.rhythm
  _pattern.pattern = pattern.pattern
  _pattern.fillUpId = pattern.fillUpId
  return _pattern
}

export class AbstractPattern implements AbstractPatternInterface {
  private _systemId?: String
  private _rhythm: 'MONTH' | 'YEAR' = 'MONTH'
  private _pattern: String = ''
  private _fillUpId: Number = 3

  get systemId(): String | undefined {
    return this._systemId
  }

  set systemId(value: String | undefined) {
    this._systemId = value
  }

  get pattern(): String {
    return this._pattern
  }

  set pattern(value: String) {
    this._pattern = value
  }
  get fillUpId(): Number {
    return this._fillUpId
  }

  set fillUpId(value: Number) {
    this._fillUpId = value
  }

  get rhythm(): 'MONTH' | 'YEAR' {
    return this._rhythm
  }

  set rhythm(value: 'MONTH' | 'YEAR') {
    this._rhythm = value
  }

  toJsonObject(): AbstractPatternInterface {
    return {
      systemId: this.systemId,
      rhythm: this.rhythm,
      fillUpId: this.fillUpId,
      pattern: this.pattern,
    }
  }
}
