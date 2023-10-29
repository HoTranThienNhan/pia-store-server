const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems, shippingPrice, subtotalPrice, totalPrice, paymentMethod, fullname, address, phone) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listOrderItems = '';
    orderItems.forEach((order) => {
        listOrderItems += `
            <div style="border-bottom: 1px solid #bebebe; padding: 8px 0px;">
                <div><b>${order.name}</b></div>
                <div>Số lượng: x${order.amount}</div>
                <div>Đơn giá: ${order.price.toLocaleString()} VNĐ</div>
            </div>
        `
    });


    // // async..await is not allowed in global scope, must use a wrapper
    // async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'thiennhantest1901@gmail.com', // sender address
        to: "thiennhantest1901@gmail.com", // list of receivers
        subject: "ĐƠN HÀNG ĐÃ ĐẶT THÀNH CÔNG", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <div> 
            <div>Xin chào ${fullname},</div> 
            <div>Đơn hàng của bạn đã được đặt thành công tại <b>BRAND NAME</b>.</div> 
            <div style="padding-bottom: 20px; border-bottom: 1px solid #bebebe;">Bạn vui lòng chờ từ 2-3 ngày để đơn hàng được vận chuyển và giao đến tận tay.
                <b>BRAND NAME</b> chân thành cảm ơn bạn đã tin tưởng và ủng hộ.
            </div> 
            <div style="display: flex; justify-content: space-between; padding-top: 10px;">
                <div style="width: 400px;">
                    <div style="margin-top: 15px; font-size: 18px; margin-bottom: 3px; font-weight: 600px;"}>THÔNG TIN ĐƠN HÀNG</div>
                    ${listOrderItems}
                    <div style="margin-top: 15px; width: 250px;">
                        <div style="margin-bottom: 7px;">Tạm tính: ${subtotalPrice.toLocaleString()} VNĐ</div>
                        <div style="padding-bottom: 7px; border-bottom: 1px solid #bebebe;">Phí vận chuyển: ${shippingPrice.toLocaleString()} VNĐ</div>
                        <div style="padding-top: 7px;">Tổng cộng: <span style="font-weight: 700; font-size: 18px;">${totalPrice.toLocaleString()} VNĐ</span></div>
                    </div>
                </div>
                <div style="margin-left: 50px;">
                    <div style="margin-top: 15px; font-size: 18px; margin-bottom: 8px; font-weight: 600px;"}>THÔNG TIN KHÁCH HÀNG</div>
                    <div style="margin-bottom: 7px;">Họ tên: ${fullname}</div>
                    <div style="margin-bottom: 7px;">Số điện thoại: ${phone}</div>
                    <div style="margin-bottom: 7px;">Địa chỉ: ${address}</div>
                    <div style="margin-bottom: 7px;">Phương thức thanh toán: ${paymentMethod}</div>
                </div>
            </div>
        </div>`, // html body
    });
}

module.exports = {
    sendEmailCreateOrder,
}