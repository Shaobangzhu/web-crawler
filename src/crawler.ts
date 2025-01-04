import superagent from 'superagent';

class Crawler {
    private _secret = 'x3b174jsx';
    private _url = `http://www.dell-lee.com/typescript/demo.html?secret=${this._secret}`;
    private _rawHtml = '';

    async getRawHtml() {
        const result = await superagent.get(this._url);
        this._rawHtml = result.text;
    }

    constructor() {
        this.getRawHtml();
    }
}

const crawler = new Crawler();