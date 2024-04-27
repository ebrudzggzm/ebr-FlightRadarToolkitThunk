import React, { useEffect, useState } from "react";
import formatDate from "../utils/formatDate";
import { optionsD } from "../constants";
import axios from "axios";
import Loader from "./Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useDispatch } from "react-redux";
import { setPath } from "../redux/slices/flightSlice";
import c from "../utils/checkValid";
import noImage from "../constants/noImage.png";

const Modal = ({ detailId, close }) => {
  const [d, setDetail] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setDetail(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        optionsD
      )
      .then((res) => {
        setDetail(res.data);
        dispatch(setPath(res.data.trail));
      })
      .catch((err) => setDetail(err.message));
  }, [detailId]);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <div className="close-wrapper">
          <button onClick={close}>X</button>
        </div>
        {!d ? (
          <Loader />
        ) : (
          <>
            <h3>{c(d.aircraft?.text)}</h3>
            <h3>{c(d.aircraft?.model.code)}</h3>
            <p>
              <span>Kuyruk Kodu </span>
              <span>{c(d.aircraft?.registration)}</span>
            </p>
            {/* <img src={d.aircraft?.images?.large[0].src} alt="image" /> */}
            <Splide
              options={{
                autoplay: true,
                interval: 3000, // 3 saniyede bir geçiş yapacak
              }}
            >
              <SplideSlide>
                <img
                  src={
                    d.aircraft?.images?.large
                      ? d.aircraft?.images?.large[0]?.src
                      : d.aircraft?.images?.thumbnails[0]?.src || noImage
                  }
                  alt="Image 1"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={
                    d.aircraft?.images?.large
                      ? d.aircraft?.images?.large[1]?.src
                      : d.aircraft?.images?.thumbnails[1]?.src || noImage
                  }
                  alt="Image 2"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={
                    d.aircraft?.images?.large
                      ? d.aircraft?.images?.large[2]?.src
                      : d.aircraft?.images?.thumbnails[2]?.src || noImage
                  }
                  alt="image 3"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={
                    d.aircraft?.images?.large
                      ? d.aircraft?.images?.large[3]?.src
                      : d.aircraft?.images?.thumbnails[3]?.src || noImage
                  }
                  alt="Image 4"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={
                    d.aircraft?.images?.large
                      ? d.aircraft?.images?.large[4]?.src
                      : d.aircraft?.images?.thumbnails[4]?.src || noImage
                  }
                  alt="Image 5"
                />
              </SplideSlide>
            </Splide>
            <p>
              <span>Şirket </span>
              <span>{c(d.airline?.short)}</span>
            </p>
            <p>
              <span>Kalkış</span>
              <a target="_blank" href={d.airport?.origin?.website}>
                {c(d.airport?.origin?.name)}
              </a>
            </p>
            <p>
              <span>Varış</span>
              <a target="_blank" href={d.airport?.destination?.website}>
                {c(d.airport?.destination?.name)}
              </a>
            </p>
            <p>
              <span className="depart">Kalkış Zamanı</span>
              <span>
                {d.time?.scheduled.departure > 0
                  ? formatDate(d.time?.scheduled.departure)
                  : "Bilinmiyor"}
              </span>
            </p>
            <p>
              <span>Varış Zamanı</span>
              <span>
                {d.time?.scheduled.arrival > 0
                  ? formatDate(d.time?.scheduled.arrival)
                  : "Bilinmiyor"}
              </span>
            </p>
            <p className={d.status?.icon}>
              <span>{d.status?.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
