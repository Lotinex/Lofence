const ws = io('http://lofence.kro.kr:7010')
const my = {
    guest : true,
    profile : {
        name : '손님'
    }
}
displayDialog(map.dialog.profileDialog)
displayToast('info', `${L.inquiry('item_manabreaker','manabreaker', '마나 파괴자')} 아이템이 ${L.inquiry(null, 'time', 61)} 초 동안 무력화됩니다! `)
Tooltip.dynamic('item_manabreaker', '개사기템.')
ws.on('displayNewChat', (nick, chat) => {
    map.ui.chatList.append($(`<div class="displayChat">${nick} : ${chat}</div>`))
    map.ui.chatList.scrollTop(map.ui.chatList[0].scrollHeight)
})
let mobs = []
map.ui.displayAtk.html(`커서 공격력 : ${cursorAtk}`)
for(let i=0;i<10;i++){
    mobs.push(new Mob(null, {autoSpawn : true}))
}
let c = 0
setInterval(() => {
    if(c >= mobs.length) c = 0
    mobs[c].move()
    c++
}, 10)

map.ui.item.hover(e => {
    map.ui.tooltip.html(L.render(`tooltip-${$(e.currentTarget).attr('id')}`, cursorAtk * (10 / 100)))
    map.ui.tooltip.show()
}, () => map.ui.tooltip.hide())
map.ui.item.on('mousemove', e => {
    map.ui.tooltip.css("left", e.pageX + 30)
    map.ui.tooltip.css("top", e.pageY >= 695 ? e.pageY - 100 : e.pageY + 30)
})
Tooltip.static(map.ui.displayAtk, L.render('tooltip-cursorAtk'))
map.ui.chatInput.keyup(e => {
    if(e.keyCode === 13){
        ws.emit('chat', my.profile.name, map.ui.chatInput.val())
        map.ui.chatInput.val('')
    } 
})

//map.ui.chat.on('mousedown', e => drag(map.ui.chat, e.pageX, e.pageY)).on('mouseup', e => $(document).off('mousemove'))
$(".dialog-head").on('mousedown', e => drag($(e.currentTarget).parent(), e.pageX, e.pageY)).on('mouseup', e => $(document).off('mousemove'))
function drag(target, sx, sy){
    let pos = target.position()
    $(document).on('mousemove', e => {
        let dx = e.pageX - sx, dy = e.pageY - sy;
        
        target.css('left', pos.left + dx);
        target.css('top', pos.top + dy);
    });
}
map.ui.openChat.on('click', () => {
    displayDialog(map.ui.chat)
})
map.dialog.dialogClose.on('click', e => {
    let parentDialog = $(e.currentTarget).parent().parent()

    parentDialog.addClass('disappear')

    parentDialog.on('animationend', () => {
        parentDialog.hide()
        parentDialog.removeClass('disappear')
        parentDialog.css('opacity', 1)
    })
})
map.ui.toastList.on('click', '.toast-closeBtn', e => {
    let parentToast = $(e.currentTarget).parent()

    parentToast.attr('class', 'toast-disappear')

    parentToast.on('animationend', () => {
        parentToast.remove()
    })
})
map.ui.profileName.on('click', e => {
    if(my.guest) {
        displayDialog(map.dialog.login)
    } else {
        displayDialog(map.dialog.profileDialog)
    }
})
map.dialog.loginOK.on('click', () => { //TODO: Login
    displayDialog(map.dialog.login)
    $.post('/login', {
        id : map.dialog.loginID.val(),
        pw : map.dialog.loginPW.val()
    }, res => {
        if(res.error) return displayToast('error', L.render(res.error))
        displayToast('info', L.render('login-finish'))
        my.guest = false;
        my.profile = res.profile
        map.ui.profileName.text(my.profile.name)
    })
})
map.dialog.registerStart.on('click', () => {
    displayDialog(map.dialog.register)
})
map.dialog.registerOK.on('click', () => {
    displayDialog(map.dialog.register)
    $.post('/register', {
        id : map.dialog.registerID.val(),
        pw : map.dialog.registerPW.val()
    }, res => {
        if(res.error) return displayToast('error', L.render(res.error))
        displayToast('info', L.render('register-finish', res.profile.name))
        my.guest = false;
        my.profile = res.profile
        map.ui.profileName.text(my.profile.name)
    })
})
ws.on('exit', () => {
    ws.close()
    alert('서버 공사 중.')
    location.replace('about:blank')
})