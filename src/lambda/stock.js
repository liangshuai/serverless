const axios = require('axios')
const nodemailer = require('nodemailer')

const URL = 'http://hq.sinajs.cn/list=sh601318'
const getCurrentPrice = async function () {
    const res = await axios.get(URL)
    const arr =  res.data.split(',')
    return arr[3]
}

exports.handler = async function (event, context, callback) {
    const price = await getCurrentPrice()
    let transporter = nodemailer.createTransport({
        service: '163',
        secureConnection: true,
        auth: {
            user: 'serverless_demo@163.com',
            pass: 'serverless123'
        }
    })

    transporter.sendMail({
        from: 'serverless_demo@163.com',
        to: 'serverless_demo@163.com',
        subject: 'Price updated',
        html: price
    })
    callback(null, {
        statusCode: 200,
        body: price
    })
}
