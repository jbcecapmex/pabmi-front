import axios from "axios";

const params = new URLSearchParams(window.location.search);
// const IdApp = params.get("IdApp");

export const sessionValid = () => {
  const jwt = params.get("jwt") || "";
  const rft = params.get("rf") || "";

  return axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/verify",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("sUntil", r.data.expDateTime);
        localStorage.setItem("jwtToken", jwt);
        localStorage.setItem("refreshToken", rft);
        localStorage.setItem("validation", "true");
        localStorage.setItem("IdCentral", r.data.data.IdUsuario);

        return getUserDetails(r.data.data.IdUsuario);
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        return false;
      }
    });
};

export const getUserDetails = (idCentral: string) => {
  return axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuario", {
      params: {
        IdUsuario: idCentral,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("IdUsuario", r.data.data.Id);
        localStorage.setItem(
          "NombreUsuario",
          r.data.data.Nombre.split(" ")[0] + " " + r.data.data.ApellidoPaterno
        );
        localStorage.setItem("FirstSignIn", r.data.data.PrimerInicioDeSesion);

        if (
          localStorage.getItem("IdInstitucion") === null ||
          localStorage.getItem("IdInstitucion") === null
        ) {
          localStorage.setItem("IdInstitucion", r.data.data.IdInstitucion);
        } else {
          localStorage.setItem(
            "IdInstitucion",
            localStorage.getItem("IdInstitucion") as string
          );
        }

        localStorage.setItem("Rol", r.data.data.Rol);

        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
      // getDataSolicitud(idCentral);
    });
};



export const continueSession = () => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/verify",
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
        if (r.data.data.IdUsuario) {
          localStorage.setItem("IdCentral", r.data.data.IdUsuario);
          getUserDetails(r.data.data.IdUsuario);
        } else {
          getUserDetails(localStorage.getItem("IdCentral") as string);
        }
        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // localStorage.clear();
        return false;
      }
    });
};

export const logout = () => {
  // localStorage.clear();
  window.location.assign("http://10.200.4.106/");
};
