import { Filter } from './Filter'

/**
 * Use for list / search in services.
 *
 * Example:
 * Logic.AND(
 *   Filter.equals("city", "Wiesbaden"),
 *   Logic.OR(
 *     Filter.like("prename", "Dan"),
 *     Filter.like("lastname", "Dan")
 *   )
 * )
 */
export class Logic {
  private type: any
  private filter: Filter[]
  private logic: Logic[]

  /**
   * Use AND / OR / ... instead of constructor.
   * @param {String} type
   * @private
   */
  constructor(type) {
    this.type = type
    this.filter = []
    this.logic = []
  }

  /**
   * Creates AND Logic for WHERE.
   *
   * @param {*} params
   * @constructor
   */
  static AND(...params) {
    return Logic.parseLogic('AND', params)
  }

  /**
   * Creates OR Logic for WHERE.
   *
   * @param {*} params
   * @constructor
   */
  static OR(...params) {
    return Logic.parseLogic('OR', params)
  }

  /**
   * parse logic with different params (filter, logic)
   * @param {String} type
   * @param {*} params
   * @return {Logic}
   * @private
   */
  static parseLogic(type, ...params) {
    const logic = new Logic(type)
    if (params.length === 1 && Array.isArray(params[0])) {
      params = params[0]
    }
    params.forEach((item) => {
      // add filter
      if (item instanceof Filter) {
        logic.filter.push(item)
      }
      // add logic
      if (item instanceof Logic) {
        logic.logic.push(item)
      }
    })
    return logic
  }
}
