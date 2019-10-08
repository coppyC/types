declare namespace Swagger {
  type Type =
    | 'object'
    | 'string'
    | 'boolean'
    | 'array'
    | 'number'
    | 'integer'
    | 'file'

  type MIME_Types =
    | 'application/json'
    | 'application/xml'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain; charset=utf-8'
    | 'text/html'
    | 'application/pdf'
    | 'image/png'

  type Protocol =
    | 'http'
    | 'https'
    | 'ws'
    | 'wss'

  type Format =
    | 'int32'
    | 'int64'
    | 'float'
    | 'double'
    | 'byte'
    | 'binary'
    | 'date'
    | 'date-time'
    | 'password'

  /** Compatible with v2 & v3 */
  // export interface Docs {
  //   swagger: string
  //   info: any
  //   basePath: string
  //   tags: Tag[]
  //   definitions: Definitions
  //   paths: Paths
  // }

  // reference: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject
  export interface DocsV2 {
    swagger: '2.0'
    info: any
    host?: string
    basePath?: string
    /** protocol */
    schemes?: Protocol[]
    /** A list of MIME types the APIs can consume */
    consumes?: MIME_Types[]
    /** A list of MIME types the APIs can produce */
    produces?: MIME_Types[]
    /** The available paths and operations for the API. */
    paths: Paths
    /** An object to hold data types produced and consumed by operations. */
    definitions?: Definitions
    tags?: Tag[]
  }

  export interface Schema {
    $ref?: string
    format?: Format
    title?: string
    description?: string
    default?: any

    type?: Type
    items?: Schema
    enum?: (string|number)[]


    // number
    multipleOf?: number
    minimum?: number
    maximum?: number

    // string
    minLength?: number
    maxLength?: number
    pattern?: string
  }

  export interface Properties {
    [name: string]: Schema
  }

  /** 数据结构 */
  export interface Definition {
    title?: string
    type: Type
    required?: string[]
    properties?: Properties
  }

  /** 定义集 */
  export interface Definitions {
    [name: string]: Definition
  }

  /** 参数 */
  export interface Parameter extends Schema {
    name: string
    in: 'header' | 'path' | 'query' | 'body' | 'formData'
    description?: string
    required?: boolean
    /** if `in` is `"body"` will be required */
    schema?: Schema
  }

  export interface Tag {
    name: string
    description?: string
  }

  export interface Paths {
    [pathTemplating: string]: PathItem
  }
  interface PathItem {
    [method: string]: Operation
  }
  export interface Operation {
    /** A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier. */
    tags?: string[]
    /** A short summary of what the operation does. For maximum readability in the swagger-ui, this field SHOULD be less than 120 characters. */
    summary?: string
    /** A verbose explanation of the operation behavior. GFM syntax can be used for rich text representation. */
    description?: string
    /** Unique string used to identify the operation */
    operationId?: string
    parameters?: Parameter[]
    responses: Responses
    schemes?: Protocol[]
    /** Declares this operation to be deprecated. Usage of the declared operation should be refrained. Default value is `false` */
    deprecated?: boolean
    security?: any
  }

  interface Responses {
    [code: string]: Response
  }
  interface Response {
    description: string
    schema?: Schema
    headers?: any
  }
}
