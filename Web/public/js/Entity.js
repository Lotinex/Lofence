class Mob {
    constructor(id, option= {}){
        if(id) this.id = id
        this.hp = 100
        this.mobElement = $(`<div ${this.id ? `id="${this.id}"` : ``} class="mob">${this.hp}</div>`)
        if(option.autoSpawn) this.spawn()

        this.mobElement.on('click', e => this.hurt(e))
    }
    hurt(e){
        let crit = rand(1, 10) === 1 ? true : false
        if(this.hp <= 0) return $(this.mobElement).remove()
        this.hp -= crit ? cursorAtk * 10 : cursorAtk
        displayDamage(crit ? cursorAtk * 10 : cursorAtk, crit, e)
        $(this.mobElement).text(this.hp)
    }
    spawn(){
        map.static.stage.append(this.mobElement)
        this.mobElement.css("left", rand(10, 90) + "%")
    }
    move(){
        this.mobElement.css("top", Number(this.mobElement.css("top").replace('px','')) + 0.7 )
    }
}
class Gamerule {
    doMobSpawning(){
        
    }
}