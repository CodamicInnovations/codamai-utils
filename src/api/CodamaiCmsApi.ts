import { Logic } from './query/Logic'
import { Filter } from './query/Filter'
import { AbstractModel } from '../models/AbstractModel'

/** Abstract Service for CRUD-Methods. */
export class CodamaiCmsApi {
  private readonly baseUrl: string
  private readonly modelPrototype: any
  private readonly fetchBearer: Function

  /**
   * Create Frontend-API for CRUD Backend.
   *
   * @param baseUrl url of codamai cms
   * @param group group of model
   * @param model model name
   * @param modelPrototype prototype to transform data to models.
   * @param fetchBearer get the bearer token for cms with this function
   */
  constructor(baseUrl: string, group: string | null, model: string, modelPrototype: any, fetchBearer: Function) {
    let baseUrlTemp = baseUrl
    if (baseUrl.slice(-1) !== '/') {
      baseUrlTemp += '/'
    }
    if (group) {
      baseUrlTemp += group
    }
    baseUrlTemp += model + '/'
    this.baseUrl = baseUrlTemp
    this.modelPrototype = modelPrototype
    this.fetchBearer = fetchBearer
  }

  /**
   * Abstract Service Call with plain JS Ajax Query, to avoid third party library conflicts.
   *
   * @param url Url to Codamai CMS Endpoint.
   * @param method http method
   * @param {Object|null} data data to transfer.
   * @return {Promise} returns service
   */
  callService(url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data: Object | null): Promise<any> {
    const vm = this
    // @ts-ignore
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open(method, vm.baseUrl + url)
      xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
      if (vm.fetchBearer != null) {
        xhr.setRequestHeader('Authorization', vm.fetchBearer())
      }
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          if (xhr.response && xhr.response.trim() !== '') {
            resolve(JSON.parse(xhr.response))
          } else {
            resolve(null)
          }
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          })
        }
      }
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        })
      }
      if (!data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }

  /**
   * Create REST Endpoint for defined Service, Model.
   *
   * @param {AbstractModel} initial (optional) initial value.
   * @param {Object} response return data of objects.
   * @return {Promise}
   */
  async create(initial: AbstractModel, response) {
    const item: any = await this.callService('create', 'POST', { data: initial, response: response })
    const obj = Object.create(this.modelPrototype)
    return {
      ...obj,
      ...item,
    }
  }

  /**
   * Replace REST Endpoint for defined Service, Model.
   *
   * @param {Object} object Data to Update
   * @param {Object} response return data of objects.
   * @return {Promise}
   */
  async update(object: AbstractModel, response) {
    const item: any = await this.callService('update', 'POST', { data: object, response: response })
    const obj = Object.create(this.modelPrototype)
    return {
      ...obj,
      ...item,
    }
  }

  /**
   * Patch REST Endpoint for defined Service, Model.
   *
   * @param {Object} object Data to Update
   * @param {Object} response return data of objects.
   * @return {Promise}
   */
  async patch(object: AbstractModel, response) {
    const item: any = await this.callService('update', 'PATCH', { data: object, response: response })
    const obj = Object.create(this.modelPrototype)
    return {
      ...obj,
      ...item,
    }
  }

  /**
   * Get by id REST Endpoint for defined Service, Model.
   *
   * @param {string} id for object
   * @param {Object} response return data of objects.
   * @return {Promise}
   */
  async read(id, response) {
    const item: any = await this.callService('get/' + id, 'POST', { response: response })
    const obj = Object.create(this.modelPrototype)
    return {
      ...obj,
      ...item,
    }
  }

  /**
   * List REST Endpoint for defined Service, Model.
   *
   * @param {Number} currentPage get from page
   * @param {Number} numberOfEntries number of entry's on page
   * @param {Logic|null} searchValue search by
   * @param {string} sortBy sort by field-key
   * @param {string} sortOrder sort order (DESC,ASC)
   * @param {Object} responseMap return data of objects.
   * @return {Promise}
   */
  async list(
    currentPage: number,
    numberOfEntries: number,
    searchValue: Logic | Filter | null,
    sortBy: String,
    sortOrder: 'DESC' | 'ASC',
    responseMap: Object
  ): Promise<{ _data: any[]; _meta: Object }> {
    const postParam = {
      page: currentPage,
      count: numberOfEntries,
      sort: null,
      logic: null,
    }
    if (sortBy && sortOrder) {
      postParam.sort = []
      const sort = { field: sortBy, order: sortOrder }
      postParam.sort.push(sort)
    }
    if (searchValue && (searchValue instanceof Logic || searchValue instanceof Filter)) {
      postParam.logic = searchValue
    }
    return await this.callService('list', 'POST', {
      parameter: postParam,
      response: responseMap,
    })
  }

  /**
   * Delete REST Endpoint for defined Service, Model.
   *
   * @param {string} id id for model to be deleted.
   * @return {Promise} returns no response
   */
  async delete(id) {
    return await this.callService('delete/' + id, 'DELETE', {})
  }
}
