//copy hàm render table sinh viên ở file index.js qua
function renderTableSinhVien(arrSV) {
    // input [sv,sv,{maSinhVien:'',tenSinhVien:''},...]
    var stringHTML = "";
    for (var i = 0; i < arrSV.length; i++) {
      //Mỗi lần duyệt lấy ra 1 sinh viên từ trong mangSinhVien
      var sv = arrSV[i];
      //Duyệt qua 1 đối tượng sinh viên thì tạo ra 1 thẻ tr tương ứng + dồn vào stringHTML
      stringHTML += `
              <tr>
                  <td>${sv.maSinhVien}</td>
                  <td>${sv.tenSinhVien}</td>
                  <td>${sv.email}</td>
                  <td>${sv.soDienThoai}</td>
                  <td>${sv.loaiSinhVien}</td>
                  <td>
                      <button class="btn btn-outline-danger" onclick="xoaSV('${sv.maSinhVien}')" >Xoá</button>
                      <button class="btn btn-outline-primary" onclick="chinhSua('${sv.maSinhVien}')" >Chỉnh sửa</button>
                  </td>
              </tr>
          `;
    }
    //Dom đến thẻ tbody viết lại phần innerHTML của thẻ
    document.querySelector("tbody").innerHTML = stringHTML;
  }

function getApiSinhVien() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Đường dẫn api do backend qui định
        method:'GET', //Phương thức do backend qui định
    });

    //Xử lý khi gọi api thành công
    promise.then(function(result) {
        console.log('Kết quả',result.data)
        //Sau khi lấy dữ liệu thành công từ backend về => gọi hàm để từ dữ liệu này tạo ra table sinh viên trên giao diện
        renderTableSinhVien(result.data);
    })

    //Xử lý khi gọi api thất bại
    promise.catch(function (error) {
        console.log(error)
    })
}

getApiSinhVien();


//---------------- POST: Thêm dữ liệu về phía server để server lưu trữ --------------

document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo ra format data như backend yêu cầu để chữa dữ liệu từ người dùng nhập
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    console.log('sv',sv);
    // var sv = {
    //     maSinhVien: document.querySelector('#maSinhVien').value,
    //     tenSinhVien:document.querySelector('#tenSinhVien').value
    // }
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //backend cung cấp
        method:'POST', //backend cung cấp
        data:sv // {maSinhVien:'',tenSinhVien:'',...} format đúng backend yêu cầu
    });

    promise.then(function(result) {
        console.log('result',result.data);
        //Gọi api getSinhVien sau khi thêm thành công
        getApiSinhVien();
    })
    promise.catch(function (error) {
        console.log(error);
    })
}


// ------------- DELETE: Nghiệp vụ xoá api ----------------
function xoaSV(maSV) {

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien='+maSV,
        method: 'DELETE',
    });

    promise.then(function(result) {
        console.log(result.data);
        //Nếu xoá thành công thì gọi lại api lấy dữ liệu sinh viên từ trên server về lại
        getApiSinhVien();
    });

    promise.catch(function(error) {
        console.log(error.data);
    });
}




function chinhSua(maSinhVien) {

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' +maSinhVien,
        method:'GET'
    });

    promise.then(function(result) {
        //Lấy dữ liệu load lên các input
        console.log(result.data);
        var sinhVien = result.data;
        //Đưa dữ liệu lên form
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
        // document.querySelector('#diemHoa').value = sinhVien.diemHoa;
    })
    promise.catch(function (error) {
        console.log(error)
    })
}




document.querySelector('#btnCapNhat').onclick = function () {
    //Lấy thông tin từ người dùng gán vào format data backend qui định
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+sv.maSinhVien, //Tham số trên url
        method:'PUT',
        data:sv// Data đúng format backend yêu cầu
    });

    promise.then(function(result) {
        console.log('result',result.data);
        //Thành công thì sẽ tạo lại table
        getApiSinhVien();
    })

    promise.catch(function(error){
        console.log(error)
    })

}