import { useEffect, useState } from "react"
import Header from "./components/Header"
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch} from "react-redux";
import { getFlights } from "./redux/actions";
import Modal from "./components/Modal";
 

const App = () => {
  const dispatch = useDispatch();
  const [isMapView,setIsMapView] = useState(true);
  const [detailId,setDetailId] = useState(null);

  useEffect(()=>{
    dispatch(getFlights());
  },[])


  return (
    <div>
      <Header/>
      <div className="view-buttons">
        <button className={isMapView ? 'active' : ''} onClick={()=>setIsMapView(true)} >Harita Görünümü</button>
        <button className={isMapView ? '' : 'active'}onClick={()=>setIsMapView(false)} >Liste Görünümü</button>
      </div>
      {isMapView ? <MapView setDetailId={setDetailId}/> : <ListView setDetailId={setDetailId}/>} 
      {detailId && (<Modal detailId={detailId} close={()=>setDetailId(null)}/>)}
    </div>
  )
}

export default App




