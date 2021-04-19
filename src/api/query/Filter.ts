/**
 * Filter for where clause in list services.
 */
export class Filter {
  private param: any
  private key: any
  private value: any
  /**
   * Use static functions instead of constructor.
   *
   * @param {String} param LIKE/EQ/etc
   * @param {String} key key from object
   * @param {String} value value to search
   */
  constructor(param, key: String, value: String) {
    this.param = param
    this.key = key
    this.value = value
  }

  /**
   * get a like filter.
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static like(field, value) {
    return new Filter('LIKE', field, value)
  }

  /**
   * get an equals filter.
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static equals(field, value) {
    return new Filter('EQ', field, value)
  }

  /**
   * not equals.
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static notEquals(field, value) {
    return new Filter('NEQ', field, value)
  }

  /**
   * is Same of before (only date or number).
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static sameOrBefore(field, value) {
    return new Filter('SAMEORBEFORE', field, value)
  }

  /**
   * is Same of after (only date or number).
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static sameOrAfter(field, value) {
    return new Filter('SAMEORAFTER', field, value)
  }

  /**
   * is before (only date or number).
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static before(field, value) {
    return new Filter('BEFORE', field, value)
  }

  /**
   * is after (date or number)
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static after(field, value) {
    return new Filter('AFTER', field, value)
  }

  /**
   * where field value is in an parameter given array.
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static in(field, value) {
    return new Filter('IN', field, value)
  }

  /**
   * is parameter given object in jpa - collection.
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static memberOf(field, value) {
    return new Filter('MEMBEROF', field, value)
  }

  /**
   * where data field is NULL.
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static isNull(field, value) {
    return new Filter('ISNULL', field, value)
  }

  /**
   * where data field is NOT NULL.
   *
   * @param {String} field
   * @param {String} value
   * @return {Filter}
   */
  static isNotNull(field, value) {
    return new Filter('ISNOTNULL', field, value)
  }
}
