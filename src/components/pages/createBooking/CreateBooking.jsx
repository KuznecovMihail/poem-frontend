import React, { useState, useContext } from "react";
import style from "./style.module.css";
import {
  useGetCities,
  useGetOffices,
  useGetOfficeLevels,
  useGetOfficeInfo,
  useGetOfficeLevelsWithWorkspaces,
  useGetWorkspacePhotos,
  useGetWorkspaceFreeIntervals,
  usePostBooking,
  useGetWorkspaceImagesUrls
} from "../../../hooks/useBooking";
import {
  Select,
  ConfigProvider,
  DatePicker,
  TimePicker,
  Carousel,
  Form,
  Alert,
} from "antd";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import { Context } from "../../../context/context";
import moment from "moment";
import Spinner from "../../common/spinner/Spinner";
import { DebounceSelect, fetchUserList } from "./helpers";

export default function CreateBooking() {
  const { employeeId } = useContext(Context);
  const [guests, setGuests] = useState([]);
  const [bookingInterval, setBookingInterval] = useState({});
  const [timeConflict, setTimeConflict] = useState(false);
  const [date, setDate] = useState(null);
  const [dateToPicker, setDateToPicker] = useState(null);
  const {
    cities,
    cityId,
    setCityId,
    isLoading: isLoadingGetCities,
  } = useGetCities();
  const {
    offices,
    officeId,
    setOfficeId,
    setOffices,
    isLoading: isLoadingGetOffices,
  } = useGetOffices(cityId);
  const { office } = useGetOfficeInfo(officeId);
  const {
    levels,
    levelId,
    setLevelId,
    setLevels,
    isLoading: isLoadingGetOfficeLevels,
  } = useGetOfficeLevels(officeId);
  const {
    workspaces,
    workspaceId,
    setWorkspaceId,
    setWorkspaces,
    isLoading: isLoadingGetOfficeLevelsWithWorkspaces,
  } = useGetOfficeLevelsWithWorkspaces(levelId);
  const { photos, setPhotos } = useGetWorkspacePhotos(workspaceId);
  const {urls, isLoading: UrlsLoading, isError: UrlsError} = useGetWorkspaceImagesUrls(photos)
  const {
    intervals,
    setIntervals,
    isLoading: isLoadingIntervals,
  } = useGetWorkspaceFreeIntervals(workspaceId, date);
  const {
    isLoading: isCreatingBooking,
    error: ErrorWhileCreatingBooking,
    postBooking,
  } = usePostBooking();

  const onSelectOrClearCity = (value = null) => {
    setOfficeId(null);
    setOffices([]);
    setLevelId(null);
    setLevels([]);
    setWorkspaceId(null);
    setWorkspaces([]);
    setPhotos([]);
    setIntervals(null);
    setCityId(value);
  };

  const onSelectOrClearOffice = (value = null) => {
    setLevelId(null);
    setLevels([]);
    setWorkspaceId(null);
    setWorkspaces([]);
    setPhotos([]);
    setIntervals(null);
    setOfficeId(value);
  };

  const onSelectOrClearLevel = (value = null) => {
    setWorkspaceId(null);
    setWorkspaces([]);
    setPhotos([]);
    setIntervals(null);
    setLevelId(value);
  };

  const onSelectOrClearWorkspace = (value = null) => {
    setPhotos([]);
    setIntervals(null);
    setWorkspaceId(value);
  };

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center" }}>
      <p>Нет данных</p>
    </div>
  );

  const disabledDate = (current) => {
    const today = dayjs();
    const minDate = today.startOf("day");
    const maxDate = today.add(office.maxDuration, "day").endOf("day");
    return current && (current < minDate || current > maxDate);
  };

  const workspaceIntervals = intervals?.map((interval) => {
    const start = new Date(interval.startsAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const end = new Date(interval.endsAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${start} - ${end}`;
  });

  const infoMessage = `Доступные интервалы бронирования: ${workspaceIntervals?.join(
    ", "
  )}`;

  const isIntervalFree = (interval) => {
    return intervals.some((freeInterval) => {
      const startsBeforeEnds = moment(interval.startsAt).isSameOrAfter(
        freeInterval.startsAt
      );
      const endsAfterStarts = moment(interval.endsAt).isSameOrBefore(
        freeInterval.endsAt
      );
      return startsBeforeEnds && endsAfterStarts;
    });
  };

  const onTimeRangeSelect = (timeRange) => {
    if (!date || !timeRange) {
      return;
    }
    const intervalStart = moment(date)
      .startOf("day")
      .add(timeRange[0].hour(), "hours")
      .add(timeRange[0].minute(), "minutes")
      .toISOString();
    const intervalEnd = moment(date)
      .startOf("day")
      .add(timeRange[1].hour(), "hours")
      .add(timeRange[1].minute(), "minutes")
      .toISOString();
    if (isIntervalFree({ startsAt: intervalStart, endsAt: intervalEnd })) {
      setTimeConflict(false);
      setBookingInterval({ startsAt: intervalStart, endsAt: intervalEnd });
    } else {
      setTimeConflict(true);
    }
  };

  const guestsKeys = guests?.map((guest) => guest.key);

  const onSubmit = async () => {
    await postBooking({
      holderId: employeeId,
      workspaceId: workspaceId,
      guests: guestsKeys,
      interval: bookingInterval,
    });
  };

  if (isCreatingBooking) return <Spinner />;
  return (
    <>
      <h1 className={style.header}>Создать бронирование</h1>
      <div className={style.form}>
        <Form onFinish={onSubmit}>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#d9d9d9",
                colorLinkHover: "#ffbb96",
                borderRadius: "10px",
                colorLinkActive: "#fa541c",
                colorFillSecondary: "#ffd8bf",
              },
            }}
            renderEmpty={customizeRenderEmpty}
          >
            <div className={style.booking_form}>
              <label>
                <h4>Город</h4>
              </label>
              <Select
                loading={isLoadingGetCities}
                disabled={isLoadingGetCities}
                className={style.booking_select}
                placeholder="Выберите город"
                allowClear
                onSelect={(value) => onSelectOrClearCity(value)}
                options={cities.map((city) => ({
                  value: city.id,
                  label: city.name,
                }))}
                onClear={() => onSelectOrClearCity()}
              />
            </div>
            <div className={style.booking_form}>
              <label>
                <h4>Офис</h4>
              </label>
              <Select
                className={style.booking_select}
                allowClear
                value={officeId}
                onClear={() => onSelectOrClearOffice()}
                onSelect={(value) => onSelectOrClearOffice(value)}
                disabled={!cityId || isLoadingGetOffices}
                loading={isLoadingGetOffices}
                placeholder="Выберите офис"
                options={offices.map((office) => ({
                  value: office.id,
                  label: office.address,
                }))}
              />
            </div>
            <div className={style.booking_form}>
              <label>
                <h4>Этаж</h4>
              </label>
              <Select
                className={style.booking_select}
                allowClear
                value={levelId}
                onClear={() => onSelectOrClearLevel()}
                onSelect={(value) => onSelectOrClearLevel(value)}
                disabled={!officeId || isLoadingGetOfficeLevels}
                loading={isLoadingGetOfficeLevels}
                placeholder="Выберите этаж"
                options={levels.map((level) => ({
                  value: level.id,
                  label: level.number,
                }))}
              />
            </div>
            <div className={style.booking_form}>
              <label>
                <h4>Рабочее место</h4>
              </label>
              <Form.Item
                name="workspaceId"
                className={style.booking_select}
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, выберите рабочее место",
                  },
                ]}
              >
                <Select
                  allowClear
                  value={workspaceId}
                  onClear={() => {
                    onSelectOrClearWorkspace();
                  }}
                  onSelect={(value) => onSelectOrClearWorkspace(value)}
                  disabled={!levelId || isLoadingGetOfficeLevelsWithWorkspaces}
                  loading={isLoadingGetOfficeLevelsWithWorkspaces}
                  placeholder="Выберите рабочее место"
                  options={workspaces.map((workspace) => ({
                    value: workspace.id,
                    label: workspace.description,
                  }))}
                />
              </Form.Item>
            </div>
            {photos.length > 0 && !UrlsLoading && !UrlsError ? (
              <div className={style.booking_form}>
                <Carousel autoplay dotPosition="top" className={style.gallery}>
                  {urls.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="workspace"
                    />
                  ))}
                </Carousel>
              </div>
            ) : null}
            <div className={style.booking_form}>
              <label>
                <h4>Добавить гостя</h4>
              </label>
              <DebounceSelect
                className={style.booking_select}
                mode="multiple"
                value={guests}
                placeholder="Выберите гостей"
                fetchOptions={fetchUserList}
                onChange={(newValue) => {
                  setGuests(newValue);
                }}
              />
            </div>
            <div className={style.booking_form}>
              <label>
                <h4>Дата бронирования</h4>
              </label>
              <DatePicker
                className={style.booking_date}
                locale={locale}
                format="DD.MM.YYYY"
                placeholder="Выберите дату"
                allowClear
                disabledDate={disabledDate}
                inputReadOnly={true}
                disabled={!office}
                value={dateToPicker || undefined}
                onChange={(val) => {
                  if (val) {
                    setDateToPicker(val);
                    setDate(new Date(val.format("YYYY-MM-DD")).toISOString());
                  } else {
                    setDateToPicker(null);
                    setDate(null);
                    setIntervals(null);
                  }
                }}
              />
            </div>
            {intervals && (
              <div className={style.booking_form}>
                <Alert
                  className={style.booking_select}
                  message={infoMessage}
                  type="info"
                  showIcon
                />
              </div>
            )}
            <div className={style.booking_form}>
              <label>
                <h4>Время бронирования</h4>
              </label>
              <Form.Item
                name="interval"
                className={style.booking_time}
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, выберите время бронирования",
                  },
                ]}
              >
                <TimePicker.RangePicker
                  locale={locale}
                  format="HH:mm"
                  allowClear
                  minuteStep={10}
                  showNow={false}
                  hideDisabledOptions={true}
                  inputReadOnly={true}
                  disabled={!date || !workspaceId || isLoadingIntervals}
                  onChange={onTimeRangeSelect}
                  style={{ width: "30%" }}
                />
              </Form.Item>
            </div>
            {timeConflict && (
              <div className={style.booking_form}>
                <Alert
                  className={style.booking_select}
                  message="На это время нельзя забронировать выбранное место"
                  type="error"
                  showIcon
                />
              </div>
            )}
            {ErrorWhileCreatingBooking && (
              <div className={style.error_block}>
                <Alert
                  className={style.post_error}
                  message="Что-то пошло не так..."
                  type="error"
                  showIcon
                />
              </div>
            )}
          </ConfigProvider>
          <div className={style.booking_form}>
            <button
              type="submit"
              className={`${style.post_button} ${
                timeConflict ? style.disabled : ""
              }`}
            >
              Создать бронирование
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
