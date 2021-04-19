# Codamai Headless CMS Connector

Use this library to connect a frontend to a codamai headless CMS system easily.
With a codamai headless CMS you get default CRUD-L (Create, Read, Update, Delete, List (Query)) Endpoints. This library 
is an easy way to access your data.

## Setup

Access to non-public endpoints in the codamai cms requires a bearer auth token. You can set the token by insert 
current auth token into session storage "authToken".

**Install via npm**

`npm install -s codamai-utils`

**use in your project**

```javascript
import { CodamaiCmsApi } from '@codamic/codamai-utils'

const API = new CodamaiCmsApi('%baseUrl%', '%CmsGroup%', '%CmsModel%', GroupModel.prototype)
```
_Replace %baseUrl%, %CmsGroup% and %CmsModel% with your CMS specified details._

## Response of CMS

The Codamai REST API is a graphql-like query. You use it like this:

```javascript
const response = {
    id: true,
    prename: true,
    address: {  // we get only id and street of address model
        id: true,
        street: true
    },
    animal: {
        '*': true // all string, number, etc information of animal, but no lists or models.
    }
}
```

**Why not graphql?**

We decided to make an easier query api instead of graphql. Remembering graphql is developed by Facebook. They have other 
requirements than an ERP System. So we will add a graphql support if required. Please feed free to add a feature request.

## Examples

### create object
```javascript
const API = new CodamaiCmsApi('https://myapp.com/cms/', 'customer', 'person', CustomerPerson.prototype)
const responsePerson = await API.create({prename: 'Daniel', 'lastname': 'Mertins'}, {'*': true})
console.log(responsePerson.id) // --> results new database id
```

### Read Object by ID
Fetch an object by its id, return all values requested in second param.

```javascript
const API = new CodamaiCmsApi('https://myapp.com/cms/', 'customer', 'person', CustomerPerson.prototype)
const person = await API.read('1111-2222-3333-4444', {id: true, prename: true, lastname: true})
```

You can use wildcards and get all base fields as response.
```javascript
const API = new CodamaiCmsApi('https://myapp.com/cms/', 'customer', 'person', CustomerPerson.prototype)
const person = await API.read('1111-2222-3333-4444', {'*': true})
```

### update (replace) object
Use simple update to overwrite a hole object. CMS could be deleting child models if CMS settings are set. You can fetch 
a response if you need to update your frontend. If not required, just fetch "id" and ignore response.
```javascript
const API = new CodamaiCmsApi('https://myapp.com/cms/', 'customer', 'person', CustomerPerson.prototype)
const responsePerson = await API.update({prename: 'Daniel', 'lastname': 'Mertins'}, {'*': true})
```

### patch update object (recommended)
Same as update, but PATCH Update only check the particular send data. Use this if no other reason is given.
```javascript
const API = new CodamaiCmsApi('https://myapp.com/cms/', 'customer', 'person', CustomerPerson.prototype)
const responsePerson = await API.patch({prename: 'Daniel', 'lastname': 'Mertins'}, {'*': true})
```

### delete an object

Delete an object doesn't have a response. It will work or throw an error.

```javascript
const API = new CodamaiCmsApi('https://myapp.com/cms/', 'customer', 'person', CustomerPerson.prototype)
try {
    await API.delete('1111-2222-3333-4444')
} catch (e) {
    console.log(e) // should give you more informations. 
}
```

### Search and list objects
List and search is more complex of course.

List Customer Persons where field "city" is "Wiesbaden" AND "name" like "Dan" OR lastname like "Dan".

```javascript
const API = new CodamaiCmsApi('https://myapp.com/cms/', 'customer', 'person', CustomerPerson.prototype)
let page = 0 // first page
let perPage = 10 // items per page
let sortBy = 'prename' // field to sort
const queryLogic = Logic.AND(
    Filter.equals("city", "Wiesbaden"),
    Logic.OR(
        Filter.like("name", "Dan%"),
        Filter.like("lastname", "%Dan%")
    )
)
const responsePerson = await API.list(page, perPage, queryLogic, sortBy, 'ASC', {'*': true})
```