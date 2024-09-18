const url = "https://basalf.fr/api/";

export default class basalf {
    constructor(key, clientKey = false) {
        this.key = key;
        this.clientKey = clientKey;
        this.empty()
    }
    empty() {
        this.table = null;
        this.whereArg = null;
        this.limitArg = null;
        this.content = null;
    }


    async del(){
        if (!this.table) return { error: "Select a table", results: null }
        if (!this.whereArg) return { error: "use .where(...)", results: null }
        let result;
        let request = `${url}row?key=${this.key}&table=${this.table}&where=${this.whereArg}`
        this.empty()
        try {
            return await sendRequest(request, 'DELETE')
        } catch (error) {
            result = { results: null, error: error.message || 'Unknown error' }
            return result
        }
    }
    async update(arg){
        if (!this.table) return { error: "Select a table", results: null }
        if (!this.whereArg) return { error: "use .where(...)", results: null }
        if (!arg) return { error: "Pls enter an argument", results: null }
        arg = JSON.stringify(arg)
        let result;
        let request = `${url}row?key=${this.key}&table=${this.table}&content=${arg}&where=${this.whereArg}`
        this.empty()
        try {
            return await sendRequest(request, 'PATCH')
        } catch (error) {
            result = { results: null, error: error.message || 'Unknown error' }
            return result
        }
    }


    async insert(arg) {
        if (!this.table) return { error: "Select a table", results: null }
        if (!arg) return { error: "Pls enter an argument", results: null }
        arg = JSON.stringify(arg)
        let result;
        let request = `${url}row?key=${this.key}&table=${this.table}&content=${arg}`
        this.empty()
        try {
            return await sendRequest(request, 'POST')
        } catch (error) {
            result = { results: null, error: error.message || 'Unknown error' }
            return result
        }

    }






    from(arg) {
        this.table = arg
        return this
    }
    where(arg) {
        this.whereArg = arg
        return this
    }
    limit(arg) {
        this.limitArg = arg
        return this
    }
    async select(arg = null) {
        if (!this.table) return { error: "Select a table", results: null }
        let result;
        let request = `${url}row?key=${this.key}&table=${this.table}`
        if (this.whereArg) request += `&where=${this.whereArg}`
        if (this.limitArg) request += `&limit=${this.limitArg}`
        if (arg) request += `&select=${arg}`
        this.empty()
        try {
            return await sendRequest(request)
        } catch (error) {
            result = { results: null, error: error.message || 'Unknown error' }
            return result
        }
    }
}

async function sendRequest(req, method = 'GET') {
    const response = await fetch(req, { headers: headers, method: method }).catch(error => { return { results: null, error: error } })
    const json = await response.json()
    return { results: json, error: null }
}

const headers = {
    Connection: "keep-alive"
};