

function displayDamage(value, isCrit, e){
    if(!value) return;
    let damageElement = $(`<div class="${isCrit ? "dmgText-crit" : "dmgText"}">${value}</div>`)
    $(damageElement).css("left", e.pageX)
    $(damageElement).css("top", e.pageY - 15)
    
    $(document.body).append(damageElement)
    $(damageElement).animate({
        top : "-=10px",
        opacity : "-=1"
    }, 1000, () => $(damageElement).remove())
}
class Tooltip {
    static static(target, description){
        target.hover(e => {
            map.ui.tooltip.html(description)
            map.ui.tooltip.show()
        }, () => map.ui.tooltip.hide())
        target.on('mousemove', e => {
            map.ui.tooltip.css("left", e.pageX + 30)
            map.ui.tooltip.css("top", e.pageY >= 695 ? e.pageY - 30 : e.pageY + 30)
        })
    }
    static dynamic(id, description){
        $(`#${id}`).hover(e => {
            map.ui.tooltip.html(description)
            map.ui.tooltip.show()
        }, () => map.ui.tooltip.hide())
        $(`#${id}`).on('mousemove', e => {
            map.ui.tooltip.css("left", e.pageX + 30)
            map.ui.tooltip.css("top", e.pageY >= 695 ? e.pageY - 30 : e.pageY + 30)
        })
    }
}
class Dialog {
    static title(text){
        return `<div class="dialog-title">${text}</div>`
    }
}
function displayDialog(dialog){
    if(dialog.css('display') == 'none'){
        dialog.show().css({
			'left': ($(window).width() - dialog.width()) * 0.5,
			'top': ($(window).height() - dialog.height()) * 0.5
		});
    }
    else {
        dialog.addClass('disappear')
        dialog.on('animationend', () => {
            dialog.hide()
            dialog.removeClass('disappear')
            dialog.css('opacity', 1)
        })
    }
}
function displayToast(type, value){
    let color = TOAST_TYPE[type].color || TOAST_TYPE.info.color
    let _toast = $(`<div class="toast" style="background:${color}"><div class="toastText">${TOAST_TYPE[type] ? TOAST_TYPE[type].icon : ''}${value}</div><div class="toast-closeBtn"><i class="fas fa-times"></i></div></div>`)
    map.ui.toastList.append(_toast)

    setTimeout(() => {
        _toast.attr('class', 'toast-disappear')
        _toast.on('animationend', () => {
            _toast.remove()
        })
    }, TOAST_DISAPPEAR_WAIT)
}
function renderProfile(){
    
}