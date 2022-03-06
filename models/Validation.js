function Validation() {
  this.kiemTraRong = function (value, selectorError, mess) {
    if (value.trim() === "") {
      document.querySelector(selectorError).innerHTML = mess;
      return false;
    }
    document.querySelector(selectorError).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiKiTu = function (value, selectorError, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }

    // document.querySelector(selectorError).innerHTML =
    //   "Vui long nhap ki tu " + min + "- " + max;

    document.querySelector(
      selectorError
    ).innerHTML = `Vui long nhap ki tu ${min} - ${max}`;
    return false;
  };

  this.kiemTraChuoiKiTu = function (value, selectorError) {
    // var letters = /^[A-Za-z]+$/;
    var letters =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letters)) {
      //hop le
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }

    // k hop le
    document.querySelector(selectorError).innerHTML =
      "Vui long nhap vao chuoi ki tu!";
    return false;
  };

  this.kiemTraSo = function (value, selectorError) {
    var numbers = /^[0-9]+$/;
    if (value.match(numbers)) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }

    document.querySelector(selectorError).innerHTML = "Vui long nhap vao so!";
    return false;
  };

  this.kiemTraDiemHopLe = function (value, selectorError) {
    if (value >= 0 && value <= 10) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }

    document.querySelector(selectorError).innerHTML =
      "Vui long nhap diem 0 - 10!";
    return false;
  };

  this.kiemTraEmail = function (value, selectorError) {
    var mailformat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value.match(mailformat)) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }

    document.querySelector(selectorError).innerHTML = "Email k hop le!";
    return false;
  };

  this.kiemTraTrungMaSV = function (value, selectorError, mangSinhVien) {
    /**
     * 0. Tạo biến status
     * 1. Duyet mangSinhVien
     * 2. Nếu value trùng maSV của object SV
     *    => Đúng => value đã tồn tại
     */
    var status = true;

    for (var i = 0; i < mangSinhVien.length; i++) {
      if (value === mangSinhVien[i].maSinhVien) {
        //ma sv da ton tai
        status = false;
        break;
      }
    }

    if (status) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }

    document.querySelector(selectorError).innerHTML = "Ma SV da ton tai!";
    return false;
  };
}
