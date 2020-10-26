import axios from 'axios'
import qs from "qs"

// 请求头
const formatHeaders = (acHeaders) => {
    let headers = {}
    headers = {
        headers: {
            "Access-Control-Allow-Origin": "*", //解决cors头问题
            "Access-Control-Allow-Credentials": "true", //解决session问题
            // "Content-Type": "application/json;charset=UTF-8" //将表单数据传递转化为form-data类型
            "Content-Type": "application/x-www-form-urlencoded" //将表单数据传递转化为form-data类型
        },
        withCredentials: true
    }
    return headers
}

function getOnload() {
    return new Promise((resolve, reject) => {
        if (sessionStorage.getItem('baseUrl')) {
            resolve(sessionStorage.getItem('baseUrl'));
        } else {
            axios.get('static/interface.json').then(res => {
                if (res.status == 200) {
                    sessionStorage.setItem('baseUrl', res.data.baseUrl);
                    resolve(res.data.baseUrl);
                } else {
                    reject();
                }
            });
        }
    });
}

const formatParams = (acParams = {}) => {
        // let params = new URLSearchParams()
        // acParams.lang = localStorage.getItem('lang') || 'zh'
        // let arr = []
        // for (var key in acParams) { arr.push(key) }
        // arr.sort((pre, next) => { return pre >= next ? 1 : -1 })
        // let str = ''
        // for (var i in arr) {
        //   str += arr[i] + acParams[arr[i]]
        //   params.append(arr[i], acParams[arr[i]])
        // }
        // params.append('sign', md5(str + 'jiaoyisuo@2017'))
        // console.log(1231231, acParams)
        // acParams.uaTime = formatTime(new Date().getTime())
        return acParams
    }
    // const http = 
const http = ({ url, headers, params, method, hostType }) => {
    let prefix = ''
    let paramdata = qs.stringify(formatParams(params))
    if (process.env.NODE_ENV === 'development') { // 开发环境
        prefix = hostType === 'screenservice' ? '/apis' : '/api';
        let api = `${prefix}`
        return new Promise((resolve, reject) => {
            axios({
                url: api, // exchange-web-api线上  vue-api本地
                headers: formatHeaders(headers),
                data: paramdata,
                method: method || 'post'
            }).then((data) => {
                if (data.data.code === '10002') {
                    // bus.$emit('loginOut')
                    // localStorage.removeItem('token')
                    // sessionStorage.removeItem('baseUrl')
                }
                // return data.data;
                resolve(data.data)
            }).catch((err) => {
                // return err;
                reject(err)
                throw new Error(`Error:${err}`)
            })
        })


    } else if (process.env.NODE_ENV === 'production') { // 生产环境
        return getOnload().then((response) => {
            prefix = response;
            return axios({
                url: `${prefix}`, // exchange-web-api线上  vue-api本地
                headers: formatHeaders(headers),
                data: paramdata,
                method: method || 'post'
            }).then((data) => {
                if (data.data.code === '10002') {
                    // bus.$emit('loginOut')
                    // localStorage.removeItem('token')
                    // sessionStorage.removeItem('baseUrl')
                }
                return data.data;
            }).catch((err) => {
                // reject(err);
                throw new Error(`Error:${err}`)
            });
        });
    }
    // console.log(prefix)
    // getOnload().then((response) => {
    //     let prefix = ''
    //     if (process.env.NODE_ENV === 'development') { // 开发环境接口地址
    //         prefix = hostType === 'screenservice' ? '/apis' : '/api';
    //     } else if (process.env.NODE_ENV === 'production') { // 生产环境接口地址
    //         prefix = response;
    //     }

    //     let api = `${prefix}`
    //     let paramdata = qs.stringify(formatParams(params))
    //     axios({
    //         url: api, // exchange-web-api线上  vue-api本地
    //         headers: formatHeaders(headers),
    //         data: paramdata,
    //         method: method || 'post'
    //     }).then((data) => {
    //         if (data.data.code === '10002') {
    //             // bus.$emit('loginOut')
    //             // localStorage.removeItem('token')
    //             // sessionStorage.removeItem('baseUrl')
    //         }
    //         resolve(data.data)
    //     }).catch((err) => {
    //         reject(err)
    //         throw new Error(`Error:${err}`)
    //     })

    // })

}

export default http