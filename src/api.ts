import type { ApiQueryParameter, ApiQueryResponse, ApiResponse, ApiResponseFilter } from './interface'
import type { AbstractModel } from './AbstractModel'

export const api = {
  async create<T extends AbstractModel>(
    modelName: string,
    item: T,
    response: ApiResponseFilter<T> = ['id']
  ): Promise<ApiResponse<T>> {
    return await doCmsFetch(`/${modelName}/create`, { data: item, response }, { method: 'POST' })
  },

  async createAbstract<T extends AbstractModel>(
    modelName: string,
    item: T,
    modelTyp: string,
    response: ApiResponseFilter<T> = ['id']
  ): Promise<ApiResponse<T>> {
    return await doCmsFetch(`/${modelName}/create`, { '@type': modelTyp, data: item, response }, { method: 'POST' })
  },

  async read<T extends AbstractModel>(
    modelName: string,
    itemId: string,
    response: ApiResponseFilter<T> = ['id']
  ): Promise<ApiResponse<T>> {
    return await doCmsFetch(`/${modelName}/read/${itemId}`, { response }, { method: 'POST' })
  },

  async update<T extends AbstractModel>(
    modelName: string,
    item: T,
    response: ApiResponseFilter<T> = ['id']
  ): Promise<ApiResponse<T>> {
    return await doCmsFetch(`/${modelName}/update/${item.id}`, { data: item, response }, { method: 'PUT' })
  },

  async patch<T extends AbstractModel>(
    modelName: string,
    item: T,
    response: ApiResponseFilter<T> = ['id']
  ): Promise<ApiResponse<T>> {
    return await doCmsFetch(`/${modelName}/update/${item.id}`, { data: item, response }, { method: 'PATCH' })
  },

  async patchAbstract<T extends AbstractModel>(
    modelName: string,
    item: T,
    modelTyp: string,
    response: ApiResponseFilter<T> = ['id']
  ): Promise<ApiResponse<T>> {
    return await doCmsFetch(
      `/${modelName}/update/${item.id}`,
      { '@type': modelTyp, data: item, response },
      { method: 'PATCH' }
    )
  },

  async delete (modelName: string, itemId: string): Promise<boolean> {
    return await doCmsFetch(`/${modelName}/delete/${itemId}`, undefined, { method: 'DELETE' })
  },

  async query<T extends AbstractModel>(
    modelName: string,
    parameter: ApiQueryParameter,
    response: ApiResponseFilter<T>
  ): Promise<ApiQueryResponse<T>> {
    return await doCmsFetch(`/${modelName}/query`, { parameter, response }, { method: 'POST' })
  }
}

async function doCmsFetch<T> (url: string, response: any, opts?: RequestInit): Promise<T> {
  const options: RequestInit = {
    ...opts,
    // baseURL: nuxt2Context.$config.public.cmsUrl,
    headers: {
      // Authorization: (nuxt2Context.$auth.getStrategy() as TokenableScheme).token.get() as string,
    },
    body: response
  }
  return await fetch(url, options).then(async (response) => await response.json())
}
