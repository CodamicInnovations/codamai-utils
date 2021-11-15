/**
 * Simple interface for abstract models.
 */
export interface AbstractModelInterface {
  id?: string
  createdOn?: string
  updatedOn?: string
}

/**
 * Abstract class for POJO Models from backend with default values, each object need to have.
 */
export class AbstractModel implements AbstractModelInterface {
  id?: string
  createdOn?: string
  updatedOn?: string
}
