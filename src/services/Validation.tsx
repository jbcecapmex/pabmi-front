import axios from "axios";
import moment from 'moment';

const params = new URLSearchParams(window.location.search);

export const continueSession = () => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN_BACK + "/api/verify",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("sUntil", r.data.expDateTime);
        localStorage.setItem("validation", "true");
        var now = moment();
        var exp = moment(r.data.expDateTime);
        var lac = moment(localStorage.getItem("LastActivity"));
        var dif = moment.duration(exp.diff(now)).minutes()
        var lasRen = moment.duration(now.diff(lac)).minutes()
        localStorage.setItem("MinToClose", dif +" - "+ lasRen);
        if (r.data.data.IdUsuario) {
          localStorage.setItem("IdCentral", r.data.data.IdUsuario);
          if(!localStorage.getItem("NombreUsuario")!){
            getUserDetails(r.data.data.IdUsuario);
          }
        }
        if (dif <= -1) {
          logoutapp();
        }
        if (dif <= 4) {
          if(lasRen <= 8){
            getUserDetails(r.data.data.IdUsuario);
            renewSession();
          }
        }
        return true;
      }
    })
    .catch((error) => {
      if (error.response.status) {
        if (error.response.status === 401) {
          logoutapp();
          return false;
        }
      }
    });
};

export const getUserDetails = (idCentral: string) => {
  return axios
    .post(process.env.REACT_APP_APPLICATION_LOGIN_BACK + "/api/user-detail",
    {
      IdUsuario: idCentral,
    },
    {
      headers: { 
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken") || "" 
      },
    })
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("IdUsuario", r.data.data.Id);
        localStorage.setItem( "NombreUsuario", r.data.data.Nombre.split(" ")[0] + " " + r.data.data.ApellidoPaterno );

        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logoutapp();
      }
    });
};

const renewSession = () => {
  axios.post(process.env.REACT_APP_APPLICATION_LOGIN_BACK + "/api/refresh-token",
    {
      refreshToken: localStorage.getItem("refreshToken"),
    },
    {
      headers: { "Content-Type": "application/json", },
    }).then((r) => {
      if (r.data.token) {
        localStorage.setItem("jwtToken", r.data.token);
      }
    }).catch((err) => {
      logoutapp();
    });
};

export const logoutapp = () => {
  localStorage.clear();
  const timeId = setTimeout(() => {
    window.location.href = process.env.REACT_APP_APPLICATION_LOGIN!;
  }, 987)
  return () => {
    clearTimeout(timeId)
  }
};