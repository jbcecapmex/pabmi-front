import * as React from "react";
import {
  AccountBalance,
  Add,
  AirportShuttle,
  Assignment,
  Backup,
  Business,
  Chair,
  Checkroom,
  Code,
  ControlPoint,
  Dashboard,
  Description,
  Desk,
  DomainAddOutlined,
  EnhancedEncryption,
  ExitToApp,
  Help,
  Home,
  ListAlt,
  MonetizationOn,
  Notifications,
  People,
  PersonAdd,
  PostAdd,
  Remove,
  Settings,
  ShowChart,
  SsidChart,
  StarBorderOutlined,
  Search,
  SyncAlt,
  Place,
  Apps,
  SpeakerNotes,
  MoveDown,
  Task,
  CarRepair,
  TextIncrease,
  Traffic,
  Update,
  Warehouse,
  Work,
  Inventory,
  Garage,
  Feed,
  GridView,
  ViewList,
  Person,
  Abc,
  CloudDownload,
  Schedule,
  SettingsSystemDaydream,
  SettingsSuggest,
  AddBox,
  QueryStats,
  Error,
  DoDisturbOn,
  CheckCircle,
  UploadFile,
  AccountCircleOutlined
} from "@mui/icons-material";


export const Icons = (icon: string) => {
  switch(icon){
    case "Home": 
      return <Home />
    case "Warehouse":
      return <Warehouse />
    case "Chair":
      return <Chair />
    case "Add":
      return <Add />
    case "AirportShuttle":
      return <AirportShuttle/>
    case "Checkroom":
      return <Checkroom/>
    case "SyncAlt":
      return <SyncAlt/>
    case "DomainAddOutlined":
      return <DomainAddOutlined/>      
    case "Update":
      return <Update /> 
    case "Desk":
      return <Desk/>
    case "EnhancedEncryption":
      return <EnhancedEncryption/>
    case "Remove":
      return <Remove/>       
    case "TextIncrease":
      return <TextIncrease/>   
    case "Traffic":
      return <Traffic />
    case "Apps":
      return <Apps />
    case "Assignment":
      return <Assignment />
    case "Inventory":
      return <Inventory />
    case "Garage":
      return <Garage />
    case "Feed":
      return <Feed />
    case "GridView":
      return <GridView />
    case "ViewList":
      return <ViewList />
    case "Person":
      return <Person />
    case "AccountCircleOutlined":
      return <AccountCircleOutlined />
    case "People":
      return <People />
    case "Abc":
      return <Abc />
    case "CloudDownload":
      return <CloudDownload />
    case "Schedule":
      return <Schedule />
    case "Notifications":
      return <Notifications />
    case "SettingsSystemDaydream":
      return <SettingsSystemDaydream />
    case "SettingsSuggest":
      return <SettingsSuggest />
    case "MonetizationOn":
      return <MonetizationOn />  
    case "MoveDown":
      return <MoveDown />
    case "CarRepair":
        return <CarRepair />     
    case "SpeakerNotes":
        return <SpeakerNotes />
    case "Business":
      return <Business />
    case "Place":
      return <Place />
    case "AddBox":
      return <AddBox 
      style={{ 
      fontSize:"large",  
      width: '35px', 
      height: '35px' }}/>
    case "Description":
      return <Description />
    case "QueryStats":
      return <QueryStats />
    case "Search":
      return <Search />
    case "UploadFile":
      return <UploadFile />
    case "Error":
      return <Error style={{ color: 'red' }} />
    case "CheckCircle":
      return <CheckCircle style={{ color: 'green' }} />
    case "DoDisturbOn":
      return <DoDisturbOn style={{ color: 'orange' }} />
    case "ListAlt":
      return <ListAlt />
    case "Dashboard":
      return <Dashboard />
    case "Work":
      return <Work />
    case "Settings":
      return <Settings />
    case "Help":
      return <Help />
    case "ExitToApp":
      return <ExitToApp />
    default:
      return <Help />
  }
}



