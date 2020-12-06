class L {
    /**
    * 
    * @param {<T extends keyof typeof LANG>} id 텍스트 식별자
    * @param  {Array<string|number>} vals 대체값 배열
    * @returns {string}
    */
    static render(id, ...vals){
        if(!LANG[id]) return '#L.error : render failed (404)'
        let resultMessage = LANG[id]
        vals.forEach((val, n) => {
            let replaceTarget = new RegExp(`<#${n + 1}>`)
            resultMessage = resultMessage.replace(replaceTarget, val)
        })
        resultMessage = resultMessage.replace('\n', '<br>') //개행 문자
        return resultMessage
    }
    static inquiry(id, type, value){
        let displayIcon = INQUIRY_ICON[type] || INQUIRY_ICON.default
        return `<div class="inquiry" ${id ? `id="${id}"` : ''}>${displayIcon}${value}</div>`
    }
}
