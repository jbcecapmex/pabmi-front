export const menu = [
       {
          "id":2,
          "nombre":"Muebles",
          "ruta":"#",
          "icon":"Chair",
          "submenu":[
            {
               "id":200,
               "nombre":"Almacen",
               "ruta":"#",
               "icon":"Warehouse",
               "submenuTercerNivel":[
                  {
                     "id":201,
                     "nombre":"Altas",
                     "ruta":"Muebles/Almacen/Altas",
                     "icon":"Add"
                  },
                  {
                     "id":202,
                     "nombre":"Adjudicaciones",
                     "ruta":"Muebles/Almacen/Adjudicaciones",
                     "icon":"Desk"
                  },
                  {
                     "id":203,
                     "nombre":"Arrendamientos",
                     "ruta":"Muebles/Almacen/Arrendamientos",
                     "icon":"Assignment"
                  },
                  {
                     "id":204,
                     "nombre":"Bajas",
                     "ruta":"Muebles/Almacen/Bajas",
                     "icon":"Remove"
                  },
                  {
                     "id":205,
                     "nombre":"Comodato",
                     "ruta":"Muebles/Almacen/Comodato",
                     "icon":"DomainAddOutlined"
                  },
                  {
                     "id":206,
                     "nombre":"Donaciones",
                     "ruta":"Muebles/Almacen/Donaciones",
                     "icon":"AddBox"
                  },
                  {
                     "id":207,
                     "nombre":"Inventarios",
                     "ruta":"Muebles/Almacen/Inventarios",
                     "icon":"Inventory"
                  },
                  {
                     "id":208,
                     "nombre":"Resguardos",
                     "ruta":"Muebles/Almacen/Resguardos",
                     "icon":"Feed"
                  },
                  {
                     "id":209,
                     "nombre":"Transferecias",
                     "ruta":"Muebles/Almacen/Transferencias",
                     "icon":"MoveDown"
                  }
               ]
            },
            {
               "id":220,
               "nombre":"Vehiculos",
               "ruta":"#",
               "icon":"AirportShuttle",
               "submenuTercerNivel":[
                  {
                     "id":221,
                     "nombre":"Altas",
                     "ruta":"Muebles/Vehiculos/Altas",
                     "icon":"Add"
                  },
                  {
                     "id":222,
                     "nombre":"Bajas",
                     "ruta":"Muebles/Vehiculos/Bajas",
                     "icon":"Remove"
                  },
                  {
                     "id":223,
                     "nombre":"Ventas",
                     "ruta":"Muebles/Vehiculos/Ventas",
                     "icon":"MonetizationOn"
                  },
                  {
                     "id":224,
                     "nombre":"Comodato",
                     "ruta":"Muebles/Vehiculos/Comodato",
                     "icon":"Garage"
                  },
                  {
                     "id":225,
                     "nombre":"Modificaciones",
                     "ruta":"Muebles/Vehiculos/Modificaciones",
                     "icon":"Update"
                  },
                  {
                     "id":226,
                     "nombre":"Transferencias",
                     "ruta":"Muebles/Vehiculos/Transferencias",
                     "icon":"MoveDown"
                  },
                  {
                     "id":227,
                     "nombre":"Seguros",
                     "ruta":"Muebles/Vehiculos/Seguros",
                     "icon":"CarRepair"
                  }
               ]
            }
          ]
       },
       {
          "id":3,
          "nombre":"Inmuebles",
          "ruta":"#",
          "icon":"Business",
          "submenu":[
            {
               "id":301,
               "nombre":"Altas",
               "ruta":"Inmuebles/Altas",
               "icon":"Add"
            },
            {
               "id":302,
               "nombre":"Bajas",
               "ruta":"Inmuebles/Bajas",
               "icon":"Remove"
            },
            {
               "id":303,
               "nombre":"Permuta",
               "ruta":"Inmuebles/Permutas",
               "icon":"Remove"
            },
            {
               "id":304,
               "nombre":"Modificación",
               "ruta":"Inmuebles/Modificaciones",
               "icon":"Update"
            },
            {
               "id":305,
               "nombre":"Levantamientos Topograficos",
               "ruta":"Inmuebles/LevantamientosTopograficos",
               "icon":"Place"
            },
            {
               "id":306,
               "nombre":"Arrendamiento",
               "ruta":"Inmuebles/Arrendamientos",
               "icon":"Assignment"
            },
            {
               "id":307,
               "nombre":"Comodato",
               "ruta":"Inmuebles/Comodato",
               "icon":"DomainAddOutlined"
            },
            {
               "id":308,
               "nombre":"Generación de Tarjetas",
               "ruta":"Inmuebles/GeneracionTarjetas",
               "icon":"SpeakerNotes"
            },
          ]

       },
       {
          "id":4,
          "nombre":"Tickets",
          "ruta":"#",
          "icon":"ListAlt",
          "submenu":[
            {
               "id":401,
               "nombre":"Alta",
               "ruta":"/Tickets/Altas",
               "icon":"Add"
            },
            {
               "id":402,
               "nombre":"Modificaciones",
               "ruta":"/Tickets/Modificaciones",
               "icon":"Update"
            }
         ]
       },
       {
          "id":5,
          "nombre":"Dashboards y Reportes",
          "ruta":"#",
          "icon":"Dashboard",
          "submenu":
          [
            {
               "id":501,
               "nombre":"Dashboards",
               "ruta":"/DashboardsReportes/Dashboards/Dashboards",
               "icon":"GridView"
            },
            {
               "id":502,
               "nombre":"Reportes",
               "ruta":"DashboardsReportes/Reportes/Reportes",
               "icon":"ViewList"
            }
          ]
       },
       {
          "id":6,
          "nombre":"Administración",
          "ruta":"#",
          "icon":"Apps",
          "submenu":[
            {
               "id":601,
               "nombre":"Valores Globales",
               "ruta":"/Administracion/ValoresGlobales/",
               "icon":"SettingsSuggest"
            },
            {
               "id":602,
               "nombre":"Notificaciones",
               "ruta":"/Administracion/Notificaciones/",
               "icon":"Notifications"
            },
            {
               "id":603,
               "nombre":"Cron Jobs",
               "ruta":"/Administracion/CronJobs/",
               "icon":"Schedule"
            },
            {
               "id":604,
               "nombre":"Semaforización",
               "ruta":"/Administracion/Semaforizacion/",
               "icon":"Traffic"
            },
            {
               "id":605,
               "nombre":"Backups",
               "ruta":"/Administracion/Backups/",
               "icon":"CloudDownload"
            },
            {
               "id":606,
               "nombre":"Valores del sistema",
               "ruta":"/Administracion/ValoresSistema/",
               "icon":"SettingsSystemDaydream"
            },
            {
               "id":607,
               "nombre":"Ayuda",
               "ruta":"/Administracion/Ayuda/",
               "icon":"Help"
            }
          ]
       },
       {
          "id":7,
          "nombre":"Configuración",
          "ruta":"/Hola/Hola",
          "icon":"Settings",
          "submenu":[
            {
               "id":701,
               "nombre":"Catalogos",
               "ruta":"/Configuracion/Catalogos/Catalogos",
               "icon":"Abc"
            },
            {
               "id":702,
               "nombre":"Usuarios",
               "ruta":"/Configuracion/Usuarios/Usuarios",
               "icon":"People"
            }
          ]
       }
    ]


