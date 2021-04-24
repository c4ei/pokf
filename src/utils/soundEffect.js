import vuex from '../store/index'

export function playSound(data){
    if(!vuex.state.setting.playSound){
        return
    }
    let audio = document.querySelector('#audio')
    let mpeg = document.querySelector('#mpeg')
    let ogg = document.querySelector('#ogg')
    let embed = document.querySelector('#embed')
    mpeg.src = require('@/assets/musics/' + data + '.mp3')
    ogg.src = require('@/assets/musics/' + data + '.ogg')
    embed.src = require('@/assets/musics/' + data + '.mp3')
    audio.load()
    setTimeout(() => {
        audio.play()
    }, 200)
}