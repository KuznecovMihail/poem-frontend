import React, {useEffect, useMemo} from "react";
import style from "./style.module.css"
import {NavLink, Route, Routes} from "react-router-dom"
import {Button, ConfigProvider} from "antd";
import City from "./city/City";
import {useGetCities, useGetLevels, useGetOffice, useGetOffices, useGetWorkspaces} from "../../../../hooks/useBooking";
import Level from "./level/Level";
import Office from "./office/Office";
import WorkSpace from "./workSpace/WorkSpace";
import {useNavigate} from "react-router";

const paths = {
  city: "city",
  office: "office",
  level: "level",
  workSpace: "workSpace",
}

function Links() {
  const getCities = useGetCities()
  const getOffices = useGetOffices(getCities.cityId)
  const getOffice = useGetOffice(getOffices.offices.find(office => office.id === getOffices.officeId))
  const getLevels = useGetLevels(getOffices.officeId)
  const getWorkspaces = useGetWorkspaces(getLevels.levelId)

  const city = useMemo(() => getCities.cities.find(city => city.id === getCities.cityId), [getCities.cities, getCities.cityId])
  const navigate = useNavigate()
  useEffect(() => {
    if (!city) {
      navigate("/admin/booking/offices/city")
    }
  }, [city, navigate])

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "black",
          }
        }}
      >
        <div className={style.links_content}>
          <NavLink
            className={({isActive}) => [isActive && style.activeLink, style.link].join(" ")}
            to={paths.city}
          >
            <Button className={style.button}>Город</Button>
          </NavLink>
          <NavLink
            className={({isActive}) => [isActive && style.activeLink, style.link].join(" ")}
            to={paths.office}
          >
            <Button disabled={!getCities.cityId} className={style.button}>Офис</Button>
          </NavLink>
          <NavLink
            className={({isActive}) => [isActive && style.activeLink, style.link].join(" ")}
            to={paths.level}
          >
            <Button disabled={!getOffices.officeId} className={style.button}>Этаж</Button>
          </NavLink>
          <NavLink
            className={({isActive}) => [isActive && style.activeLink, style.link].join(" ")}
            to={paths.workSpace}
          >
            <Button disabled={!getLevels.levelId} className={style.button}>Место</Button>
          </NavLink>
        </div>
      </ConfigProvider>
      <div className={style.content}>
        <Routes>
          <Route path={paths.city} element={<City getCities={getCities}/>}/>
          <Route
            path={paths.office}
            element={
              <Office
                getOffices={getOffices}
                getOffice={getOffice}
                city={city}
              />}
          />
          <Route
            path={paths.level}
            element={
              <Level
                city={city}
                getLevels={getLevels}
                officeId={getOffices.officeId}
              />
            }
          />
          <Route
            path={paths.workSpace}
            element={
              <WorkSpace
                levelId={getLevels.levelId}
                getWorkspaces={getWorkspaces}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Links;
