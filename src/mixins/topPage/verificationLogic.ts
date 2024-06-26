import Vue from 'vue'
import { ExecuteValidator } from '@/type/validator'

interface _this { // '_this' is just same as 'this', but for typescript checking.
    identifyCode: string;
    identifyCodeWords: string;
    vertificationCode: ExecuteValidator;
    vertificationCodeCorrect: boolean;
}

export const verificationLogic = Vue.extend({
    data() {
        const vertificationCodeRule: ExecuteValidator = (rule, value, callback) => {
            value = value.toUpperCase()
            const self = this as Readonly<Record<never, any>> & Vue & _this
            if (value === '') {
                self.vertificationCodeCorrect = false
                callback(new Error('인증번호를 입력해주세요'))
            } else if (value !== self.identifyCode) {
                self.vertificationCodeCorrect = false
                callback(new Error('잘못된 인증 코드!'))
            } else {
                self.vertificationCodeCorrect = true
                callback()
            }
        }

        return {
            identifyCode: '',
            identifyCodeWords: '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ',
            vertificationCode: vertificationCodeRule,
            vertificationCodeCorrect: false
        }
    },

    methods: {
        // 生成随机数
        randomNum(min: number, max: number) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 切换확인 코드
        refreshCode() {
            this.identifyCode = ''
            this.createCode(4)
        },
        // 生成四位随机확인 코드
        createCode(length: number) {
            for (let i = 0; i < length; i++) {
                this.identifyCode += this.identifyCodeWords[this.randomNum(0, this.identifyCodeWords.length)]
            }
        }

    },

    mounted: function () {
        this.$nextTick(function () {
            this.createCode(4)
        })
    }
})