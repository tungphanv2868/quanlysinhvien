


function getData() {
    //gọi hàm axios truyền vào object
    var promise = axios({
        url: '../data/data.txt', //Đường dẫn đến file hoặc link api backend cung cấp
        method: 'GET',
        responseType: 'text'
    });
    /*
        promise là đối tượng có 2 phương thức cần nhớ:
        + then() : Nhận vào 1 hàm khi request thành công
        + catch() : Nhận vào 1 hàm khi request thất bại
    */
    //Xử lý thành công
    promise.then(function (ketQua) {
        console.log('ketQua', ketQua.data);
        document.querySelector('#content').innerHTML = 'Họ tên: ' + ketQua.data;
    });

    //Xử lý thất bại
    promise.catch(function (error) {
        console.log('error', error)
    })

}

getData();


function getDataXML() {
    var promise = axios({
        url: '../data/data.xml',
        method: 'GET',
        responseType: 'document'
    });
    //Xử lý thành công
    promise.then(function (ketQua) {
        console.log('ketQua', ketQua.data);
        var hoTen = ketQua.data.querySelector('hoten').innerHTML;
        document.querySelector('#content').innerHTML = '<h1>' + hoTen + '</h1>';
    });
    //Xử lý thất bại
    promise.catch(function (error) {
        console.log('ketQua', error);
    })
}
getDataXML();
// console.log(document);

function getDataJson() {

    var promise = axios({
        url: '../data/data.json',
        method: 'GET',
        // responseType: 'json'
    });

    promise.then(function (ketQua) {
        console.log('ketQua', ketQua.data);
        document.querySelector('#content').innerHTML += '<h3>' + ketQua.data.hoTen + '</h3>';
    })

    promise.catch(function (error) {
        console.log('ketQua', error);
    })
}
getDataJson();