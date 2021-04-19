export interface AbstractModelInterface {
    id?: string
    createdOn?: string
    updatedOn?: string
}

/**
 * Abstract class for POJO Models from backend with default values, each object need to have.
 */
export class AbstractModel implements AbstractModelInterface {
    private _id?: string;
    private _createdOn?: string;
    private _updatedOn?: string;

    /**
     * getter id.
     * @return {string} technical id
     */
    get id(): string | undefined {
        return this._id;
    }

    /**
     * setter update date.
     * @param {string} pId
     */
    set id(pId: string | undefined ) {
        this._id = pId;
    }

    /**
     * getter creation date.
     * @return {string} creation date
     */
    get createdOn() {
        return this._createdOn;
    }

    /**
     * getter update date.
     * @param {string} pData
     */
    set createdOn(pData) {
        this._createdOn = pData;
    }

    /**
     * getter update date.
     * @return {string} update date
     */
    get updatedOn() {
        return this._updatedOn;
    }

    /**
     * setter update date.
     * @param {string} pData
     */
    set updatedOn(pData) {
        this._updatedOn = pData;
    }

    /**
     * toPlainObject.
     *
     * @param {Object} pDeep deep of copy
     * @return {Object}
     **/
    toPlainObject(pDeep: number) {
        const copyObject:any = {};
        const vm:any = this;
        let deep = pDeep || 3;
        deep--;
        if (deep <= 0) {
            return null;
        }
        Object.keys(this).forEach((key: string) => {
            if (key === '_updatedOn' || key === '_createdOn') {
                return;
            }
            const newKeyName = key.substring(0, 1) === '_' ? key.substring(1) : key;
            if (Array.isArray(vm[key])) {
                copyObject[newKeyName] = [];
                vm[key].forEach((item: any) => {
                    if (typeof (item.toPlainObject) === 'function') {
                        copyObject[newKeyName].push(item.toPlainObject(deep));
                    } else {
                        copyObject[newKeyName].push(item);
                    }
                });
            } else if (typeof vm[key] === 'object' && vm[key] !== null) {
                if (vm[key].toPlainObject) {
                    copyObject[newKeyName] = vm[key].toPlainObject(deep);
                } else {
                    copyObject[newKeyName] = vm[key];
                }
            } else {
                copyObject[newKeyName] = vm[key];
            }
        });
        return copyObject;
    }

    /**
     * Transform Object to Json string
     * @return {{}}
     */
    toJsonObject() {
        const copyObject:any = {};
        const vm:any = this;
        Object.keys(this).forEach((key: string) => {
            const newKeyName = key.substring(0, 1) === '_' ? key.substring(1) : key;
            if (Array.isArray(vm[key])) {
                copyObject[newKeyName] = [];
                vm[key].forEach((item: any) => {
                    copyObject[newKeyName].push({id: item.id});
                });
            } else if (typeof vm[key] === 'object' && vm[key] !== null) {
                // Object with overriding json stringify
                if(typeof(vm[key].toJsonObject) === 'function') {
                    copyObject[newKeyName] = vm[key].toJsonObject();
                } else {
                    copyObject[newKeyName] = {id: vm[key].id};
                }
            } else {
                copyObject[newKeyName] = vm[key];
            }
        });
        copyObject.createdOn = null;
        copyObject.updatedOn = null;
        return copyObject;
    }

    /**
     * json parse.
     *
     * @param {Object} pObject
     */
    toObject(pObject: AbstractModelInterface) {
        Object.keys(pObject).forEach((key: string) => {
            if (this.hasOwnProperty('_' + key)) {
                // @ts-ignore
                this[key] = pObject[key];
            }
        });
    }
}