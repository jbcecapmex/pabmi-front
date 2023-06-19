import axios from "axios";
import moment from 'moment';
import Swal from "sweetalert2";

// componente de sweetalert2 para el uso de los mensajes de alertas
export const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3600000,
  timerProgressBar: false,
  //background: '#2e7d32',
  //color: '#fff',  
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const catalogoSave = async (Data: any, Url: string) => {
  await axios({
    method  : "post",
    url     : process.env.REACT_APP_APPLICATION_ENDPOINT + Url,
    headers : {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("jwtToken") || "",
    },
    data    : Data,
  })
  .then(function (response) {
    Toast.fire({
      icon  : "success",
      title : "Creado Exitosamente",
    });
    return true
  })
  .catch(function (error) {
    Swal.fire({
      icon  : "error",
      title : "Mensaje",
      text  : "(" + error.response.status + ") " + error.response.data.msg,
    });
    return false
  });
};
export const catalogoUpdate = async (Data: any, Url: string) => {
  await axios({
    method  : "post",
    url     : process.env.REACT_APP_APPLICATION_ENDPOINT + Url,
    headers : {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("jwtToken") || "",
    },
    data    : Data,
  })
  .then(function (response) {
    Toast.fire({
      icon  : "success",
      title : "Actualizado Exitosamente",
    });
    return true
  })
  .catch(function (error) {
    Swal.fire({
      icon  : "error",
      title : "Mensaje",
      text  : "(" + error.response.status + ") " + error.response.data.msg,
    });
    return false
  });
};
export const catalogoDelete = async (Data: any, Url: string, Descripcion: string) => {
  await Swal.fire({
    title               : "Estas Seguro(a)?",
    text                : `Estas a punto de eliminar un registro (${Descripcion})`,
    icon                : "question",
    showCancelButton    : true,
    confirmButtonText   : "Eliminar",
    confirmButtonColor  : "#dc3545",
    cancelButtonColor   : "#0d6efd",
    cancelButtonText    : "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const data = { uuid: Data };
      await axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + Url,
        headers : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
        },
        data    : data,
      })
      .then(function (response) {
        Toast.fire({
          icon  : "success",
          title : "Eliminado Exitosamente",
        });
        return true
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "(" + error.response.status + ") " + error.response.data.msg,
        });
        return false
      });
    }
  });
};




