const map = {
    entity : {
        player : $(".mob")
    },
    ui : {
        equip : $("#equip"),
        itemBox : $(".itemBox"),
        item : $(".item"),
        tooltip : $(".tooltip"),
        chatInput : $("#chatting"),
        profileName : $("#profile-name"),
        chatList : $("#chat-list"),
        chat : $("#chat"),
        displayAtk : $("#profile-atk"),
        openChat : $("#openChat"),
        toastList : $("#toastlist")
    },
    static : {
        stage : $("#stage"),
    },
    dialog : {
        dialogClose : $(".dialog-closeBtn"),
        toastClose : $(".toast-closeBtn"),
        register : $("#registerDialog"),
        alert : $("#alertDialog"),
        login : $("#loginDialog"),
        loginOK : $("#loginOK"),
        loginID : $("#loginID"),
        loginPW : $("#loginPW"),
        registerStart : $("#register"),
        registerOK : $("#registerOK"),
        registerID : $("#registerID"),
        registerPW : $("#registerPW"),
        ALL : $(".dialog"),
        profileDialog : $("#profileDialog")
    },
    inquiry : {
        default : $("#default")
    }
}
const LANG = {
    'tooltip-cursorAtk' : '적을 공격하면 기본적으로 입히는 피해입니다.',
    'register-finish' : '등록을 완료했습니다. 임시 부여된 이름 : <#1>',
    'login-finish' : '로그인에 성공했습니다.',
    'invalid-value' : '올바르지 않은 값을 전송하였습니다.',
    'auth-failed' : '인증에 실패했습니다. (id 또는 pw가 정확한지 확인해 보세요.)',
    'id-already-exists' : '해당 아이디는 다른 사용자가 사용 중인 아이디입니다.'
}
const INQUIRY_ICON = {
    'default' : '<i class="fas fa-question"></i>',
    'manabreaker' : '<i class="fas fa-tint-slash"></i>',
    'time' : '<i class="fas fa-hourglass-half"></i>',
    'user' : '<i class="fas fa-user"></i>'
}
const TOAST_TYPE = {
    'error' : {color : 'red', icon : '<i class="fas fa-times-circle"></i>'},
    'warn' : {color : 'orange', icon : '<i class="fas fa-exclamation-triangle"></i>'},
    'info' : {color : 'blue', icon : '<i class="fas fa-info-circle"></i>'},
}
const TOAST_DISAPPEAR_WAIT = 4000;
var cursorAtk = 1;
function rand(start, end){
    return Math.floor((Math.random() * (end-start+1)) + start);
}
