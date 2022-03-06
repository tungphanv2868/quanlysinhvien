var mangSinhVien = [];
var kiemTra = new Validation();
//Xây dựng chức năng cho nút xác nhận => Khi bấm xác nhận tạo đối tượng lưu trữ thông tin người dùng nhập vào
document.querySelector("#btnXacNhan").onclick = function () {
  //Lấy thông tin người dùng nhập lưu vào đối tượng sinh viên
  var sv = new SinhVien();
  sv.maSinhVien = document.querySelector("#maSinhVien").value;
  sv.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sv.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  sv.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sv.diemToan = document.querySelector("#diemToan").value;
  sv.diemLy = document.querySelector("#diemLy").value;
  sv.diemHoa = document.querySelector("#diemHoa").value;
  sv.email = document.querySelector("#email").value;
  sv.soDienThoai = document.querySelector("#soDienThoai").value;
  console.log("sv", sv);

  //Kiểm tra dữ liệu người dùng nhập có hợp lệ hay không
  var valid = true;

  //check masv
  valid =
    valid &&
    kiemTra.kiemTraRong(
      sv.maSinhVien,
      "#error_required_maSinhVien",
      "Mã sinh viên không được bỏ trống !"
    ) &&
    kiemTra.kiemTraDoDaiKiTu(
      sv.maSinhVien,
      "#error_required_maSinhVien",
      5,
      15
    ) &&
    kiemTra.kiemTraTrungMaSV(
      sv.maSinhVien,
      "#error_required_maSinhVien",
      mangSinhVien
    );

  //check tensv
  valid &=
    kiemTra.kiemTraRong(
      sv.tenSinhVien,
      "#error_required_tenSinhVien",
      "Ten sinh viên không được bỏ trống !"
    ) &&
    kiemTra.kiemTraDoDaiKiTu(
      sv.tenSinhVien,
      "#error_required_tenSinhVien",
      6,
      16
    ) &&
    kiemTra.kiemTraChuoiKiTu(sv.tenSinhVien, "#error_required_tenSinhVien");

  //check diem ren luyen
  valid &=
    kiemTra.kiemTraRong(
      sv.diemRenLuyen,
      "#error_required_diemRenLuyen",
      "Diem ren luyen không được bỏ trống !"
    ) &&
    kiemTra.kiemTraSo(sv.diemRenLuyen, "#error_required_diemRenLuyen") &&
    kiemTra.kiemTraDiemHopLe(sv.diemRenLuyen, "#error_required_diemRenLuyen");

  //check email
  valid &=
    kiemTra.kiemTraRong(
      sv.email,
      "#error_required_email",
      "Email không được bỏ trống !"
    ) && kiemTra.kiemTraEmail(sv.email, "#error_required_email");

  //SDT
  valid &=
    kiemTra.kiemTraRong(
      sv.soDienThoai,
      "#error_required_sdt",
      "SDT không được bỏ trống !"
    ) && kiemTra.kiemTraSo(sv.soDienThoai, "#error_required_sdt");

  //Toan
  valid &=
    kiemTra.kiemTraRong(
      sv.diemToan,
      "#error_required_diemToan",
      "Diem toan không được bỏ trống !"
    ) && kiemTra.kiemTraSo(sv.diemToan, "#error_required_diemToan");

  //Ly
  valid &=
    kiemTra.kiemTraRong(
      sv.diemLy,
      "#error_required_diemLy",
      "Diem ly không được bỏ trống !"
    ) && kiemTra.kiemTraSo(sv.diemLy, "#error_required_diemLy");

  //Hoa
  valid &=
    kiemTra.kiemTraRong(
      sv.diemHoa,
      "#error_required_diemHoa",
      "Diem hoa không được bỏ trống !"
    ) && kiemTra.kiemTraSo(sv.diemHoa, "#error_required_diemHoa");

  if (!valid) {
    return; //Dừng không chạy tiếp
  }

  //Đưa thông tin sinh viên vào mảng (mangSinhVien)
  mangSinhVien.push(sv);
  //Gọi hàm tạo table sau mỗi lần thêm sinh viên
  console.log("mangSinhVien", mangSinhVien);
  renderTableSinhVien(mangSinhVien);
  //clear form
  resetForm();

  //Lưu localstorage
  luuLocalStorage();
};

function resetForm() {
  // document.querySelector('#maSinhVien').value = '';
  // document.querySelector('#tenSinhVien').value = '';

  var arrInput = document.querySelectorAll("#formSinhVien input");
  console.log("arrInput", arrInput);
  for (var index = 0; index < arrInput.length; index++) {
    //Mỗi lần lấy ra 1 thẻ
    var input = arrInput[index];
    input.value = "";
  }
}

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

//mangSinhVien = [{maSinhVien:1,tenSinhVien:'Nguyen van a'},{maSinhVien:2,tenSinhVien:'Nguyen van b'},{maSinhVien:3,tenSinhVien:'Nguyen van c'} ]
function xoaSV(maSVClick) {
  //2

  //Từ mã sinh viên tìm ra vị trí sinh viên ở trong mảng => Xử lý xoá
  for (var index = mangSinhVien.length - 1; index >= 0; index--) {
    //Mỗi lần duyệt lấy ra 1 object sinh vien
    var sv = mangSinhVien[index];
    if (sv.maSinhVien === maSVClick) {
      //So sánh mã sinh viên trong từng object của mảng có trùng với mã sinh viên click ở giao diện hay k
      mangSinhVien.splice(index, 1);
    }
  }
  //Sau khi xoá xong gọi hàm tạo lại bảng table sinh viên
  renderTableSinhVien(mangSinhVien);

  //Lưu sau khi xoá
  luuLocalStorage();
}
//mangSinhVien = [{maSinhVien:1,tenSinhVien:'Nguyen van a'},{maSinhVien:2,tenSinhVien:'Nguyen van b'},{maSinhVien:3,tenSinhVien:'Nguyen van c'} ]
//mangSinhVien[1]
function chinhSua(maSVClick) {
  console.log("maSVClick", maSVClick);
  //Từ mã sinh viên click tìm ra đối tượng sinh viên trong mảng
  for (var index = 0; index < mangSinhVien.length; index++) {
    var sinhVien = mangSinhVien[index];
    if (sinhVien.maSinhVien === maSVClick) {
      //Nếu bằng mã sinh viên click thì load dữ liệu lên các thẻ input phía trên
      document.querySelector("#maSinhVien").value = sinhVien.maSinhVien;
      document.querySelector("#tenSinhVien").value = sinhVien.tenSinhVien;
      document.querySelector("#loaiSinhVien").value = sinhVien.loaiSinhVien;
      document.querySelector("#diemToan").value = sinhVien.diemToan;
      document.querySelector("#diemLy").value = sinhVien.diemLy;
      document.querySelector("#diemHoa").value = sinhVien.diemHoa;
      document.querySelector("#diemRenLuyen").value = sinhVien.diemRenLuyen;
      document.querySelector("#email").value = sinhVien.email;
      document.querySelector("#soDienThoai").value = sinhVien.soDienThoai;
    }
  }

  document.querySelector("#maSinhVien").disabled = true;
}
//mangSinhVien = [{maSinhVien:1,tenSinhVien:'Nguyen van a'},{maSinhVien:2,tenSinhVien:'Nguyen van b'},{maSinhVien:3,tenSinhVien:'Nguyen van c'} ]
document.querySelector("#btnCapNhat").onclick = function () {
  //Lấy thông tin trên giao diện sau khi người dùng chỉnh sửa
  var sinhVienSua = new SinhVien();
  sinhVienSua.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVienSua.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVienSua.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sinhVienSua.diemToan = document.querySelector("#diemToan").value;
  sinhVienSua.diemLy = document.querySelector("#diemLy").value;
  sinhVienSua.diemHoa = document.querySelector("#diemHoa").value;
  sinhVienSua.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  sinhVienSua.email = document.querySelector("#email").value;
  sinhVienSua.soDienThoai = document.querySelector("#soDienThoai").value;

  console.log("sinhVien", sinhVienSua);

  for (var index = 0; index < mangSinhVien.length; index++) {
    var svTrongMang = mangSinhVien[index];
    if (svTrongMang.maSinhVien === sinhVienSua.maSinhVien) {
      //Tìm sinh viên trong mảng có mã trùng với sinh viên sau khi người dùng cập nhật dữ liệu
      // svTrongMang.maSinhVien =  sinhVienSua.maSinhVien;
      svTrongMang.tenSinhVien = sinhVienSua.tenSinhVien;
      svTrongMang.loaiSinhVien = sinhVienSua.loaiSinhVien;
      svTrongMang.diemHoa = sinhVienSua.diemHoa;
      svTrongMang.diemLy = sinhVienSua.diemLy;
      svTrongMang.diemToan = sinhVienSua.diemToan;
      svTrongMang.diemRenLuyen = sinhVienSua.diemRenLuyen;
      svTrongMang.email = sinhVienSua.email;
      svTrongMang.soDienThoai = sinhVienSua.soDienThoai;
    }
  }
  //Mở khoá mã sinh viên
  document.querySelector("#maSinhVien").disabled = false;
  //Tạo lại table với nội dung mới
  renderTableSinhVien(mangSinhVien);
  //Reset form
  resetForm();
};

function luuLocalStorage() {
  //Lưu mảng sinh viên (mangSinhVien)
  var sMangSinhVien = JSON.stringify(mangSinhVien); //Biến đổi mảng object sinh viên thành chuỗi

  //Lưu chuỗi đó vào storage
  localStorage.setItem("mangSinhVien", sMangSinhVien);
}

function layDuLieuStorage() {
  //kiểm tra dữ liệu trong localstorage
  if (localStorage.getItem("mangSinhVien")) {
    var sMangSinhVien = localStorage.getItem("mangSinhVien");
    //Chuyển chuỗi được lưu từ localstorage => mảng
    mangSinhVien = JSON.parse(sMangSinhVien);
    //Gọi hàm tạo bảng
    renderTableSinhVien(mangSinhVien);
  }
}

layDuLieuStorage();

document.querySelector("#btnTimKiem").onclick = function () {
  //Lấy ra từ khoá người dùng nhập
  //.toLowerCase(): Hàm biến đổi tất cả chữ về chữ thường
  //.trim(): Loại bỏ khoảng trống đầu và cuối của chuỗi
  //Input: tuKhoa, mangSinhVien
  var tuKhoa = document.querySelector("#txtTuKhoa").value.toLowerCase().trim();
  //output: mang chua cac sinh vien
  var mangSinhVienTimKiem = [];

  console.log("tuKhoa", tuKhoa);
  //Duyệt qua mảng sinh viên lấy ra tên từng sinh viên kiểm tra với từ khoá xem có chứa từ khoá hay không
  for (var index = 0; index < mangSinhVien.length; index++) {
    //Mỗi lần duyệt lấy ra 1 sinh viên trong mảng
    var sinhVien = mangSinhVien[index];
    if (
      sinhVien.tenSinhVien.toLowerCase().trim().search(tuKhoa) !== -1 ||
      sinhVien.soDienThoai.trim().search(tuKhoa) !== -1
    ) {
      mangSinhVienTimKiem.push(sinhVien);
    }
  }
  //Gọi hàm tạo lại table
  renderTableSinhVien(mangSinhVienTimKiem);
};

// document.getElementById("maSinhVien").addEventListener("keyup", function () {
//   console.log(123);
// });

document.getElementById("txtTuKhoa").addEventListener("keyup", function () {
  //Lấy ra từ khoá người dùng nhập
  //.toLowerCase(): Hàm biến đổi tất cả chữ về chữ thường
  //.trim(): Loại bỏ khoảng trống đầu và cuối của chuỗi
  //Input: tuKhoa, mangSinhVien
  var tuKhoa = document.querySelector("#txtTuKhoa").value.toLowerCase().trim();
  //output: mang chua cac sinh vien
  var mangSinhVienTimKiem = [];

  console.log("tuKhoa", tuKhoa);
  //Duyệt qua mảng sinh viên lấy ra tên từng sinh viên kiểm tra với từ khoá xem có chứa từ khoá hay không
  for (var index = 0; index < mangSinhVien.length; index++) {
    //Mỗi lần duyệt lấy ra 1 sinh viên trong mảng
    var sinhVien = mangSinhVien[index];
    if (
      sinhVien.tenSinhVien.toLowerCase().trim().search(tuKhoa) !== -1 ||
      sinhVien.soDienThoai.trim().search(tuKhoa) !== -1
    ) {
      mangSinhVienTimKiem.push(sinhVien);
    }
  }
  //Gọi hàm tạo lại table
  renderTableSinhVien(mangSinhVienTimKiem);
});
