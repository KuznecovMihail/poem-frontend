import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL_AUTHORIZATION } from "./config";
import { Context } from "../context/context";
import jwtDecode from "jwt-decode";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);
  const navigate = useNavigate();

  const { setEmployeeRole, setFlagGuideShown } = useContext(Context);

  const login = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL_AUTHORIZATION}/authorization/login`,
        data
      );

      const token = response.data.accessToken;
      const decodedToken = jwtDecode(token);
      setEmployeeRole(decodedToken.roles);
      setFlagGuideShown(decodedToken.flag_guide_shown);

      if (!decodedToken.flag_guide_shown) {
        navigate("/login/rest");
        localStorage.setItem("accessToken", token);
        setFlagGuideShown(decodedToken.flag_guide_shown);
      } else if (decodedToken.roles.includes("ROLE_ADMIN")) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/admin");
        localStorage.setItem("Auth", true);
      } else {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/");
        localStorage.setItem("Auth", true);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setErrMessage("Неверный логин или пароль");
      } else {
        setErrMessage("Произошел конфуз, попробуйте через минут 10)");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isError, isLoading, errMessage };
};

export const useRestPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);
  const { changeFlag } = useChangeFlag();
  const navigate = useNavigate();

  const rest = async (password, oldPassword) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${BASE_URL_AUTHORIZATION}/authorization/change-password`,
        {
          newPassword: password,
          oldPassword: oldPassword,
          accessToken: localStorage.getItem("accessToken"),
        }
      );
      localStorage.setItem("Auth", true);
      await changeFlag();
      navigate("/");
    } catch (err) {
      if (err.response.status === 400) {
        setErrMessage(err.response.data.message);
      }
      if (err.response.status === 500) {
        setErrMessage(err.response.data.message);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { rest, isError, isLoading, errMessage };
};

export const useLogout = () => {
  const [isError, setIsError] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL_AUTHORIZATION}/authorization/logout`, {
        token: localStorage.getItem("accessToken"),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("Auth");
      navigate("/login");
      setIsLogout(true);
    } catch (err) {
      setIsError(true);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("Auth");
      navigate("/login");
      setIsLogout(true);
    }
  };

  return { logout, isError, isLogout };
};

export const useChangeFlag = () => {
  const [isError, setIsError] = useState(false);
  const { setFlagGuideShown } = useContext(Context);

  const changeFlag = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL_AUTHORIZATION}/authorization/change-flag-guide-shown`,
        {
          token: localStorage.getItem("accessToken"),
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setFlagGuideShown(true);
    } catch (err) {
      setIsError(true);
    }
  };

  return { changeFlag, isError };
};
