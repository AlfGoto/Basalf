const url = "https://basalf.fr/api/";

export default class basalf {
    constructor(key, clientKey = false) {
        this.key = key;
        this.clientKey = clientKey;
        this.table = null;
        this.whereArg = null;
        this.limitArg = null;
    }

    from(arg) {
        this.table = arg

        return this
        // return {
        //     select: (arg) => { this.select(arg) },
        //     where: (arg) => { this.where(arg) },
        //     limit: (arg) => { this.limit(arg) }
        // }
    }
    where(arg) {
        this.whereArg = arg

        return this
        // return {
        //     select: (arg) => { this.select(arg) },
        //     limit: (arg) => { this.limit(arg) }
        // }
    }
    limit(arg) {
        this.limitArg = arg

        return this
        // return {
        //     select: (arg) => { this.select(arg) }
        // }
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
    empty() {
        this.table = null;
        this.whereArg = null;
    }
}

async function sendRequest(req) {
    const response = await fetch(req, { headers: headers }).catch(error => { return { results: null, error: error } })
    const json = await response.json()
    return { results: json, error: null }
}

const headers = {
    Connection: "keep-alive"
};
