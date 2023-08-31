const config = {
  debug: false,
};

export const BASE_URL_AUTHORIZATION = config.debug
  ? "http://91.210.170.198:8082/api/authorization-service/v1"
  : "http://demo.atbplugin.tech:8001/api/authorization-service/v1";

export const BASE_URL_APPLICATIONS = config.debug
  ? "http://91.210.170.198:8083/api/application-service/v1"
  : "http://demo.atbplugin.tech:8006/api/application-service/v1";

export const BASE_URL_DICTIONARY = config.debug
  ? "http://91.210.170.198:8086/api/dictionary-service/v1"
  : "http://demo.atbplugin.tech:8004/api/dictionary-service/v1";

export const BASE_URL_IMAGE = config.debug
  ? "http://91.210.170.198:8081/api/images-service/v1"
  : "http://demo.atbplugin.tech:8003/api/images-service/v1";

export const BASE_URL_INTERACTION = config.debug
  ? "http://91.210.170.198:8087/api/interaction-service/v1"
  : "http://demo.atbplugin.tech:8008/api/interaction-service/v1";

export const BASE_URL_NEWS = config.debug
  ? "http://91.210.170.198:8088/api/news-service/v1"
  : "http://demo.atbplugin.tech:8005/api/news-service/v1";

export const BASE_URL_NOTIFICATIONS = config.debug
  ? "http://91.210.170.198:8084/api/notifications-service/v1"
  : "http://demo.atbplugin.tech:8009/api/notifications-service/v1";

export const BASE_URL_PROFILE = config.debug
  ? "http://91.210.170.198:8080/api/profile-service/v1"
  : "http://demo.atbplugin.tech:8002/api/profile-service/v1";

export const BASE_URL_RESERVATIONS = config.debug
  ? "http://91.210.170.198:8085/api"
  : "http://demo.atbplugin.tech:8007/api";
