
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { URL_CONSTANTS } from "../../constants/url.constants";
import { history } from "../../helpers/history";
import { register } from "../../stores/authentication/actions";
import createNotification from "../../utils/notification";

const initialValues = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};


export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };
  const [isPassword, setIsPassword] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState("");

  // Hàm xử lý sự kiện cho nút tắt hiển thị mật khẩu
  const handlePasswordChange = (e) => {
    setIsPassword(e.target.value);
  };
  const handlePasswordconfirmChange = (e) => {
    setIsPasswordConfirm(e.target.value);
  };

  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);
  const [inputs, setInputs] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      history.push(URL_CONSTANTS.LOGIN);
    }
  }, [dispatch, accessToken]);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitted(true);
      let data = {
        ...inputs,
        password: isPassword,
        confirm_password: isPasswordConfirm,
      };

      try {
        const response = await dispatch(register(data));
        if (response.status === true) {
          setValidationErrors([]);
          createNotification("success", "topRight", response.message);
          navigate(URL_CONSTANTS.LOGIN);
        } else {
          if (response.response?.status === false) {
            setValidationErrors([]);
            createNotification("error", "topRight", response.response.message);
          }
          setValidationErrors(response.response.errors);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, isPassword, isPasswordConfirm, inputs, navigate]
  );

  return (
    <Layout>
      <div className="w-full  pt-0 pb-0">
        <div className="login-page-wrapper w-full py-10">
          <div className="max-w-6xl mx-auto">
            <div className="lg:flex items-center relative">
              <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                <div className="w-full">
                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                    <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                      Create Account
                    </h1>
                    <div className="shape -mt-6">
                      <svg
                        width={354}
                        height={30}
                        viewBox="0 0 354 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="input-area">
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="fname"
                        >
                          Full Name*
                        </label>
                        <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                          <input
                            placeholder="Nguyen Van A"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type="text"
                            onChange={handleChange}
                            name="fullname"
                          />
                        </div>
                        {submitted &&
                          validationErrors &&
                          validationErrors.fullname && (
                            <p className="mt-1 text-red-500">
                              <li>{validationErrors.fullname.msg}</li>
                            </p>
                          )}
                      </div>
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="lname"
                        >
                          User Name*
                        </label>
                        <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                          <input
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type="text"
                            onChange={handleChange}
                            placeholder="Username"
                            name="username"
                          />
                        </div>
                        {submitted &&
                          validationErrors &&
                          validationErrors.username && (
                            <p className="mt-1 text-red-500">
                              <li>{validationErrors.username.msg}</li>
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="email"
                        >
                          Email Address*
                        </label>
                        <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                          <input
                            onChange={handleChange}
                            placeholder="Email"
                            name="email"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type="email"
                          />
                        </div>
                        {submitted &&
                          validationErrors &&
                          validationErrors.email && (
                            <p className="mt-1 text-red-500">
                              <li>{validationErrors.email.msg}</li>
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="input-item mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="password"
                        >
                          Password*
                        </label>
                        <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                          <input
                            placeholder="● ● ● ● ● ●"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type={passwordVisible ? "text" : "password"}
                            onChange={handlePasswordChange}
                            value={isPassword}
                            name="password"
                          />

                          <div
                            onClick={togglePasswordVisibility}
                            className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                          >
                            {passwordVisible ? (
                              <svg
                                viewBox="0 0 25 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={21}
                              >
                                <path
                                  d="M20.5483 16.3524C20.156 15.9557 19.7696 15.5605 19.3802 15.1683C18.7802 14.5653 18.1787 13.9638 17.5728 13.3667C17.4972 13.2911 17.4871 13.2388 17.5379 13.1415C19.3482 9.66037 17.2125 5.46008 13.3332 4.87747C12.1143 4.69441 10.9534 4.89636 9.85791 5.46299C9.78672 5.49931 9.73587 5.53563 9.65596 5.45572C8.88157 4.67262 8.10136 3.89678 7.32261 3.11803C7.30082 3.09624 7.28338 3.07154 7.24561 3.0265C7.5667 2.90591 7.8689 2.78387 8.17837 2.67926C10.0758 2.03563 12.0242 1.83513 14.0132 2.05161C18.879 2.58337 23.1752 5.85381 24.9768 10.3926C25 10.4522 25.0073 10.5379 24.9826 10.596C24.0484 12.8916 22.5955 14.792 20.6282 16.2986C20.6137 16.3117 20.5963 16.3219 20.5483 16.3524Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M4.44163 4.65918C4.91528 5.13573 5.3773 5.6021 5.84222 6.06703C6.36962 6.59442 6.89703 7.12327 7.42733 7.64776C7.49853 7.7175 7.51015 7.7669 7.4622 7.85989C5.81462 11.0228 7.40118 14.873 10.801 15.9336C12.2829 16.3956 13.7271 16.2576 15.1161 15.5573C15.1626 15.534 15.2076 15.5093 15.2468 15.489C16.0735 16.3186 16.893 17.1424 17.724 17.9778C17.6862 17.9952 17.6383 18.0199 17.5874 18.0403C15.5069 18.8844 13.3493 19.1909 11.1162 18.9657C6.18511 18.4674 1.87 15.2275 0.02773 10.6364C0.000124928 10.5666 -0.0114982 10.4693 0.0146539 10.4039C0.941602 8.12286 2.38433 6.23411 4.33557 4.73328C4.36317 4.71003 4.39514 4.69114 4.44163 4.65918Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M2.04297 1.0577C2.36406 0.732254 2.72292 0.370486 3.09051 0C9.71717 6.64695 16.3482 13.2968 22.9749 19.9438C22.645 20.2721 22.2833 20.631 21.9128 21C15.2905 14.3531 8.66237 7.70174 2.04297 1.0577Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M13.5471 13.7324C12.655 14.071 11.1164 14.0158 10.0093 12.8433C9.16664 11.9512 8.80197 10.3283 9.27125 9.46387C10.698 10.8877 12.116 12.3028 13.5471 13.7324Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M11.519 7.24656C12.3123 6.80779 13.9425 7.17247 14.8389 8.01369C16.0172 9.11933 16.071 10.6638 15.7528 11.4933C14.342 10.0797 12.9269 8.66022 11.519 7.24656Z"
                                  fill="#797979"
                                />
                              </svg>
                            ) : (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        {submitted &&
                          validationErrors &&
                          validationErrors.password && (
                            <p className="mt-1 text-red-500">
                              <li>{validationErrors.password.msg}</li>
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="input-item mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="password"
                        >
                          Confirm Password*
                        </label>
                        <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                          <input
                            placeholder="● ● ● ● ● ●"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type={passwordConfirmVisible ? "text" : "password"}
                            onChange={handlePasswordconfirmChange}
                            value={isPasswordConfirm}
                            name="confirm_password"
                          />

                          <div
                            onClick={togglePasswordConfirmVisibility}
                            className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                          >
                            {passwordConfirmVisible ? (
                              <svg
                                viewBox="0 0 25 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={21}
                              >
                                <path
                                  d="M20.5483 16.3524C20.156 15.9557 19.7696 15.5605 19.3802 15.1683C18.7802 14.5653 18.1787 13.9638 17.5728 13.3667C17.4972 13.2911 17.4871 13.2388 17.5379 13.1415C19.3482 9.66037 17.2125 5.46008 13.3332 4.87747C12.1143 4.69441 10.9534 4.89636 9.85791 5.46299C9.78672 5.49931 9.73587 5.53563 9.65596 5.45572C8.88157 4.67262 8.10136 3.89678 7.32261 3.11803C7.30082 3.09624 7.28338 3.07154 7.24561 3.0265C7.5667 2.90591 7.8689 2.78387 8.17837 2.67926C10.0758 2.03563 12.0242 1.83513 14.0132 2.05161C18.879 2.58337 23.1752 5.85381 24.9768 10.3926C25 10.4522 25.0073 10.5379 24.9826 10.596C24.0484 12.8916 22.5955 14.792 20.6282 16.2986C20.6137 16.3117 20.5963 16.3219 20.5483 16.3524Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M4.44163 4.65918C4.91528 5.13573 5.3773 5.6021 5.84222 6.06703C6.36962 6.59442 6.89703 7.12327 7.42733 7.64776C7.49853 7.7175 7.51015 7.7669 7.4622 7.85989C5.81462 11.0228 7.40118 14.873 10.801 15.9336C12.2829 16.3956 13.7271 16.2576 15.1161 15.5573C15.1626 15.534 15.2076 15.5093 15.2468 15.489C16.0735 16.3186 16.893 17.1424 17.724 17.9778C17.6862 17.9952 17.6383 18.0199 17.5874 18.0403C15.5069 18.8844 13.3493 19.1909 11.1162 18.9657C6.18511 18.4674 1.87 15.2275 0.02773 10.6364C0.000124928 10.5666 -0.0114982 10.4693 0.0146539 10.4039C0.941602 8.12286 2.38433 6.23411 4.33557 4.73328C4.36317 4.71003 4.39514 4.69114 4.44163 4.65918Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M2.04297 1.0577C2.36406 0.732254 2.72292 0.370486 3.09051 0C9.71717 6.64695 16.3482 13.2968 22.9749 19.9438C22.645 20.2721 22.2833 20.631 21.9128 21C15.2905 14.3531 8.66237 7.70174 2.04297 1.0577Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M13.5471 13.7324C12.655 14.071 11.1164 14.0158 10.0093 12.8433C9.16664 11.9512 8.80197 10.3283 9.27125 9.46387C10.698 10.8877 12.116 12.3028 13.5471 13.7324Z"
                                  fill="#797979"
                                />
                                <path
                                  d="M11.519 7.24656C12.3123 6.80779 13.9425 7.17247 14.8389 8.01369C16.0172 9.11933 16.071 10.6638 15.7528 11.4933C14.342 10.0797 12.9269 8.66022 11.519 7.24656Z"
                                  fill="#797979"
                                />
                              </svg>
                            ) : (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        {submitted &&
                          validationErrors &&
                          validationErrors.confirm_password && (
                            <p className="mt-1 text-red-500">
                              <li>{validationErrors.confirm_password.msg}</li>
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="forgot-password-area mb-7">
                      <div className="remember-checkbox flex items-center space-x-2.5">
                        <button
                          type="button"
                          className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                        />
                        <span className="text-base text-black">
                          I agree all
                          <span className="text-black">tarm and condition</span>
                          in BigShop.
                        </span>
                      </div>
                    </div>
                    <div className="signin-area mb-3">
                      <div className="flex justify-center">
                        <button className="bg-black text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center">
                          <span>Create Account</span>
                        </button>
                      </div>
                    </div>
                    <div className="signup-area flex justify-center">
                      <p className="text-base text-gray-500 font-normal">
                        Already have an Account?
                        <Link to={URL_CONSTANTS.LOGIN}>Log In</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
                <div
                  className="absolute xl:-right-20 -right-[138px]"
                  style={{ top: "calc(50% - 258px)" }}
                >
                  <svg
                    width={655}
                    height={518}
                    viewBox="0 0 655 518"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M600.689 465.498C611.058 465.498 619.464 456.92 619.464 446.34C619.464 435.759 611.058 427.182 600.689 427.182C590.32 427.182 581.914 435.759 581.914 446.34C581.914 456.92 590.32 465.498 600.689 465.498Z"
                      fill="#EEF2FF"
                    />
                    <path
                      d="M149.158 284.257C176.617 256.238 176.617 210.809 149.158 182.789C121.699 154.77 77.1785 154.77 49.7193 182.789C22.2601 210.809 22.2601 256.238 49.7193 284.257C77.1785 312.277 121.699 312.277 149.158 284.257Z"
                      fill="#EEF2FF"
                    />
                    <path
                      d="M20.0592 342.178C20.0592 345.882 17.117 348.885 13.4863 348.885C9.8557 348.885 6.90234 345.894 6.90234 342.178C6.90234 338.473 9.8446 335.471 13.4752 335.471C17.1059 335.471 20.0592 338.473 20.0592 342.178Z"
                      fill="#6473F9"
                    />
                    <path
                      d="M357.018 15.5154C361.035 15.5154 364.291 12.193 364.291 8.09462C364.291 3.99623 361.035 0.673828 357.018 0.673828C353.002 0.673828 349.746 3.99623 349.746 8.09462C349.746 12.193 353.002 15.5154 357.018 15.5154Z"
                      fill="#6473F9"
                    />
                    <path
                      d="M203.526 458.955C209.969 452.381 209.969 441.721 203.526 435.146C197.083 428.572 186.637 428.572 180.194 435.146C173.751 441.721 173.751 452.381 180.194 458.955C186.637 465.53 197.083 465.53 203.526 458.955Z"
                      fill="#EEF2FF"
                    />
                    <path
                      d="M111.098 423.75L54.4844 415.162L75.4577 471.707L111.098 423.75Z"
                      fill="#594D7A"
                    />
                    <path
                      d="M523.295 353.407V92.1966C523.295 68.2718 507.329 48.8867 487.644 48.8867H120.084C100.39 48.8867 84.4336 68.2831 84.4336 92.1966V353.407C84.4336 377.332 100.4 396.717 120.084 396.717H487.644C507.329 396.717 523.295 377.332 523.295 353.407Z"
                      fill="#C0E8FF"
                    />
                    <path
                      d="M512.87 365.136V80.4677C512.87 70.6641 506.304 62.7148 498.206 62.7148H112.648C104.55 62.7148 97.9844 70.6641 97.9844 80.4677V365.136C97.9844 374.939 104.55 382.889 112.648 382.889H498.206C506.304 382.889 512.87 374.939 512.87 365.136Z"
                      fill="white"
                    />
                    <path
                      d="M339.943 335.358H144.988C139.658 335.358 135.328 330.951 135.328 325.502V112.712C135.328 107.274 139.647 102.855 144.988 102.855H339.943C345.272 102.855 349.602 107.263 349.602 112.712V325.502C349.602 330.94 345.283 335.358 339.943 335.358Z"
                      stroke="#C0E8FF"
                      strokeWidth="0.9642"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M493.99 236.362H374.084C370.568 236.362 367.711 231.955 367.711 226.505V112.712C367.711 107.274 370.561 102.855 374.084 102.855H493.99C497.507 102.855 500.364 107.263 500.364 112.712V226.516C500.364 231.954 497.514 236.362 493.99 236.362Z"
                      stroke="#C0E8FF"
                      strokeWidth="0.9642"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M492.998 335.143H374.034C370.545 335.143 367.711 330.736 367.711 325.287V264.821C367.711 259.383 370.538 254.965 374.034 254.965H492.998C496.487 254.965 499.321 259.372 499.321 264.821V325.287C499.321 330.725 496.494 335.143 492.998 335.143Z"
                      stroke="#C0E8FF"
                      strokeWidth="0.9642"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M318.043 299.115H166.634C164.424 299.115 162.637 297.291 162.637 295.037V259.598C162.637 257.344 164.424 255.52 166.634 255.52H318.043C320.253 255.52 322.04 257.344 322.04 259.598V295.037C322.029 297.291 320.242 299.115 318.043 299.115Z"
                      fill="#A4DEFE"
                    />
                    <path
                      d="M196.101 281.193C196.778 281.612 197.755 281.963 198.799 281.963C200.331 281.963 201.23 281.136 201.23 279.935C201.23 278.825 200.609 278.19 199.043 277.578C197.144 276.887 195.968 275.89 195.968 274.214C195.968 272.367 197.466 270.996 199.731 270.996C200.919 270.996 201.785 271.279 202.307 271.574L201.896 272.82C201.519 272.605 200.742 272.254 199.687 272.254C198.099 272.254 197.5 273.228 197.5 274.032C197.5 275.143 198.21 275.686 199.809 276.321C201.774 277.091 202.774 278.066 202.774 279.81C202.774 281.646 201.441 283.232 198.699 283.232C197.577 283.232 196.345 282.903 195.734 282.473L196.101 281.193Z"
                      fill="white"
                    />
                    <path
                      d="M204.777 270.555H206.298V275.88H206.332C206.576 275.438 206.954 275.052 207.42 274.792C207.864 274.531 208.408 274.35 208.974 274.35C210.096 274.35 211.894 275.052 211.894 277.998V283.074H210.373V278.179C210.373 276.809 209.874 275.642 208.441 275.642C207.453 275.642 206.676 276.344 206.409 277.194C206.321 277.409 206.31 277.636 206.31 277.93V283.074H204.788V270.555H204.777Z"
                      fill="white"
                    />
                    <path
                      d="M221.914 278.722C221.914 281.872 219.771 283.254 217.75 283.254C215.485 283.254 213.742 281.566 213.742 278.87C213.742 276.015 215.574 274.338 217.884 274.338C220.282 274.338 221.914 276.117 221.914 278.722ZM215.285 278.813C215.285 280.682 216.34 282.087 217.828 282.087C219.283 282.087 220.371 280.694 220.371 278.779C220.371 277.329 219.66 275.505 217.872 275.505C216.085 275.505 215.285 277.193 215.285 278.813Z"
                      fill="white"
                    />
                    <path
                      d="M223.824 277.318C223.824 276.23 223.791 275.346 223.758 274.53H225.123L225.19 275.992H225.223C225.845 274.95 226.833 274.338 228.188 274.338C230.209 274.338 231.73 276.083 231.73 278.666C231.73 281.736 229.898 283.243 227.932 283.243C226.822 283.243 225.856 282.744 225.357 281.906H225.323V286.54H223.824V277.318ZM225.323 279.583C225.323 279.81 225.357 280.025 225.39 280.218C225.667 281.294 226.578 282.031 227.666 282.031C229.276 282.031 230.209 280.694 230.209 278.734C230.209 277.023 229.331 275.561 227.722 275.561C226.689 275.561 225.723 276.321 225.423 277.487C225.368 277.68 225.323 277.907 225.323 278.122V279.583Z"
                      fill="white"
                    />
                    <path
                      d="M237.317 276.843C237.317 275.96 237.294 275.234 237.25 274.532H238.593L238.682 275.937H238.716C239.126 275.121 240.092 274.328 241.48 274.328C242.635 274.328 244.434 275.031 244.434 277.954V283.04H242.912V278.123C242.912 276.753 242.413 275.608 240.981 275.608C239.981 275.608 239.204 276.333 238.949 277.194C238.882 277.387 238.849 277.648 238.849 277.92V283.04H237.328V276.843H237.317Z"
                      fill="white"
                    />
                    <path
                      d="M254.445 278.722C254.445 281.872 252.302 283.254 250.282 283.254C248.017 283.254 246.273 281.566 246.273 278.87C246.273 276.015 248.105 274.338 250.415 274.338C252.824 274.338 254.445 276.117 254.445 278.722ZM247.817 278.813C247.817 280.682 248.871 282.087 250.359 282.087C251.814 282.087 252.902 280.694 252.902 278.779C252.902 277.329 252.191 275.505 250.404 275.505C248.616 275.505 247.817 277.193 247.817 278.813Z"
                      fill="white"
                    />
                    <path
                      d="M256.855 274.531L257.965 278.87C258.21 279.822 258.432 280.706 258.587 281.578H258.643C258.832 280.717 259.109 279.799 259.387 278.882L260.752 274.531H262.029L263.328 278.791C263.639 279.811 263.883 280.706 264.072 281.578H264.128C264.261 280.717 264.494 279.811 264.772 278.814L265.96 274.531H267.458L264.76 283.062H263.384L262.107 278.995C261.818 278.043 261.574 277.194 261.363 276.197H261.33C261.119 277.216 260.863 278.1 260.575 279.018L259.231 283.074H257.821L255.301 274.543H256.855V274.531Z"
                      fill="white"
                    />
                    <path
                      d="M316.818 238.605H167.851C164.964 238.605 162.633 236.226 162.633 233.28V128.71C162.633 125.764 164.964 123.385 167.851 123.385H316.807C319.694 123.385 322.025 125.764 322.025 128.71V233.28C322.025 236.215 319.694 238.605 316.818 238.605Z"
                      fill="#56C37F"
                    />
                    <path
                      d="M265.851 165.713H255.981V158.111C255.981 150.191 250.485 143.099 242.802 141.944C233.209 140.505 224.948 148.084 224.948 157.601V165.713H215.078C214.301 165.713 213.668 166.358 213.668 167.152V201.91C213.668 209.739 219.886 216.083 227.558 216.083H253.372C261.044 216.083 267.261 209.739 267.261 201.91V167.152C267.261 166.358 266.64 165.713 265.851 165.713ZM227.78 157.612C227.78 149.523 235.085 143.144 243.313 144.98C249.175 146.283 253.161 151.891 253.161 158.009V165.713H227.78V157.612ZM264.441 201.91C264.441 208.141 259.478 213.206 253.372 213.206H227.558C221.44 213.206 216.488 208.153 216.488 201.91V168.59H224.948V178.934C222.972 179.648 221.662 181.812 222.284 184.18C222.661 185.607 223.805 186.774 225.215 187.148C228.046 187.907 230.589 185.743 230.589 182.99C230.589 181.121 229.401 179.535 227.769 178.934V168.59H253.15V178.934C251.173 179.648 249.863 181.801 250.485 184.168C250.863 185.596 252.006 186.763 253.405 187.148C256.236 187.918 258.79 185.754 258.79 182.99C258.79 181.121 257.602 179.535 255.97 178.934V168.59H264.43L264.441 201.91Z"
                      fill="white"
                    />
                    <path
                      d="M315.344 144.65C324.481 144.65 331.887 137.093 331.887 127.77C331.887 118.446 324.481 110.889 315.344 110.889C306.207 110.889 298.801 118.446 298.801 127.77C298.801 137.093 306.207 144.65 315.344 144.65Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M308.574 127.928L314.759 132.551L322.131 123"
                      stroke="white"
                      strokeWidth="0.9931"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M167.105 79.6066C167.105 83.0394 164.374 85.8265 161.01 85.8265C157.645 85.8265 154.914 83.0394 154.914 79.6066C154.914 76.1738 157.645 73.3867 161.01 73.3867C164.374 73.398 167.105 76.1738 167.105 79.6066Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M190.777 79.6066C190.777 83.0394 188.046 85.8265 184.681 85.8265C181.317 85.8265 178.586 83.0394 178.586 79.6066C178.586 76.1738 181.317 73.3867 184.681 73.3867C188.046 73.398 190.777 76.1738 190.777 79.6066Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M214.457 79.6066C214.457 83.0394 211.725 85.8265 208.361 85.8265C204.997 85.8265 202.266 83.0394 202.266 79.6066C202.266 76.1738 204.997 73.3867 208.361 73.3867C211.725 73.398 214.457 76.1738 214.457 79.6066Z"
                      fill="#C0E8FF"
                    />
                    <path
                      d="M96.5068 97.9796C118.14 97.9796 135.678 80.0843 135.678 58.0093C135.678 35.9344 118.14 18.0391 96.5068 18.0391C74.8733 18.0391 57.3359 35.9344 57.3359 58.0093C57.3359 80.0843 74.8733 97.9796 96.5068 97.9796Z"
                      fill="#EB5757"
                    />
                    <path
                      d="M109.818 47.7218C106.609 44.5156 101.468 44.5723 98.3262 47.8465L96.2611 49.9991L94.1293 47.8578C90.9317 44.6402 85.7911 44.6856 82.6379 47.9484C79.4958 51.2113 79.5291 56.4568 82.7267 59.6744L90.632 67.6164C90.6431 67.6277 90.6542 67.6503 90.6764 67.673C91.9421 68.9306 93.4965 69.6896 95.1175 69.9389C97.6156 70.3354 100.258 69.531 102.168 67.5484L109.94 59.4478C113.082 56.1736 113.026 50.9281 109.818 47.7218Z"
                      fill="white"
                    />
                    <path
                      d="M284.792 517.671C292.506 517.671 298.759 511.29 298.759 503.418C298.759 495.547 292.506 489.166 284.792 489.166C277.078 489.166 270.824 495.547 270.824 503.418C270.824 511.29 277.078 517.671 284.792 517.671Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M202.338 517.671C210.052 517.671 216.306 511.29 216.306 503.418C216.306 495.547 210.052 489.166 202.338 489.166C194.625 489.166 188.371 495.547 188.371 503.418C188.371 511.29 194.625 517.671 202.338 517.671Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M410.752 272.23L378.787 278.87C372.125 280.104 366.807 285.237 365.23 291.966L336.84 412.988H177.925C168.099 412.988 159.428 406.416 156.596 396.809L140.73 326.125L361.378 308.383"
                      stroke="black"
                      strokeWidth="0.9745"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M150.879 371.294L349.365 359.455L325.505 459.449C321.508 476.862 306.286 489.166 288.765 489.166H172.951"
                      stroke="black"
                      strokeWidth="0.9745"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M313.868 312.201L294.727 412.988"
                      stroke="black"
                      strokeWidth="0.9745"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M188.387 322.295L199.023 412.987"
                      stroke="black"
                      strokeWidth="0.9745"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M250.117 317.332V412.987"
                      stroke="black"
                      strokeWidth="0.9745"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M577.344 399.506L589.257 379.215L634.69 395.495L624.253 413.577L577.344 399.506Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M626.677 404.933L626.566 405.114C625.378 406.95 622.569 408.139 620.615 407.222C619.283 406.598 617.528 406.191 615.33 406.553C613.287 406.893 611.844 408.785 611.999 410.892C612.51 418.064 613.887 435.5 611.122 450.375C610.489 453.797 611.5 457.332 613.909 459.802L615.219 461.15L650.77 399.098L631.263 392.482C629.575 390.986 627.044 391.111 625.5 392.765C624.079 394.295 623.968 396.651 625.234 398.305L626.488 399.88C627.61 401.342 627.688 403.381 626.677 404.933Z"
                      fill="black"
                    />
                    <path
                      d="M650.762 399.087C650.762 399.087 651.706 398.645 652.772 399.416C654.071 400.333 654.36 402.191 653.549 403.585L621.306 460.107C620.03 462.305 617.11 462.804 615.211 461.138L650.762 399.087Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M612.758 420.795C612.758 420.795 613.857 419.095 618.309 419.911"
                      stroke="white"
                      strokeWidth="1.172"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M612.629 425.394C612.629 425.394 613.728 423.695 618.18 424.511"
                      stroke="white"
                      strokeWidth="1.172"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M612.617 430.685C612.617 430.685 613.716 428.986 618.169 429.802"
                      stroke="white"
                      strokeWidth="1.172"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M643.001 395.643C643.001 395.643 628.8 411.866 631.42 432.848L650.762 399.098C650.762 399.087 647.597 396.662 643.001 395.643Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M461.789 297.937L485.183 367.149C487.592 374.275 492.722 380.245 499.55 383.123L499.694 383.18L596.422 415.514L613.898 376.155L522.622 340.196C522.622 340.196 498.961 251.022 490.301 242.219L461.789 297.937Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M450.07 448.256L473.242 448.437L482.557 496.644H461.984L450.07 448.256Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M470.521 494.39L470.31 494.379C468.156 494.265 465.724 492.396 465.514 490.21C465.369 488.725 464.814 486.969 463.393 485.225C462.072 483.593 459.74 483.299 458.041 484.5C452.246 488.589 438.223 498.65 424.255 503.771C421.035 504.949 418.582 507.634 417.705 511.01L417.238 512.846L487.675 512.608L483.356 492.102C483.767 489.858 482.368 487.694 480.191 487.185C478.182 486.709 476.139 487.808 475.384 489.768L474.696 491.66C474.018 493.382 472.342 494.481 470.521 494.39Z"
                      fill="black"
                    />
                    <path
                      d="M487.674 512.596C487.674 512.596 488.518 513.196 488.418 514.533C488.296 516.142 486.874 517.331 485.287 517.331L421.19 517.671C418.681 517.66 416.793 515.349 417.226 512.834L487.674 512.596Z"
                      fill="#40637F"
                    />
                    <path
                      d="M450.078 490.209C450.078 490.209 452.066 490.311 453.642 494.639"
                      stroke="white"
                      strokeWidth="1.172"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M446.121 492.418C446.121 492.418 448.108 492.52 449.685 496.848"
                      stroke="white"
                      strokeWidth="1.172"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M441.637 495.092C441.637 495.092 443.624 495.194 445.201 499.522"
                      stroke="white"
                      strokeWidth="1.172"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M486.65 504.02C486.65 504.02 465.743 499.76 449.355 512.721L487.671 512.596C487.671 512.596 488.116 508.586 486.65 504.02Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M454.207 263.008L423.097 351.514C421.376 356.408 420.865 361.665 421.609 366.809L446.469 474.042L488.337 468.558L468.597 363.512C468.597 363.512 511.376 288.919 509.644 258.93L454.207 263.008Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M427.125 145.285L438.261 168.884L455.26 154.847L438.65 127.951L427.125 145.285Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M417.386 96.5804C417.386 96.5804 406.506 99.2542 406.905 113.427C406.905 113.427 406.961 118.831 407.638 133.605C408.004 141.411 413.456 151.143 423.049 149.863C427.701 149.24 432.497 146.192 436.772 142.306L442.723 135.758C456.391 117.71 440.869 91.5615 418.985 96.2179C418.463 96.3312 417.93 96.4445 417.386 96.5804Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M408.395 124.121L404.42 132.199C403.987 132.89 404.254 133.921 405.198 133.944L410.238 134.408L408.395 124.121Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M438.208 126.24C438.208 126.24 435.022 135.61 446.058 140.357C446.058 140.357 470.628 105.972 434.522 94.3594L432.523 97.8942L438.208 126.24Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M449.108 99.7639C449.053 101.384 447.421 113.676 447.421 113.676L434.053 125.425C434.053 125.425 426.458 114.436 429.223 103.435C429.223 103.435 449.308 93.6686 449.108 99.7639Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M445.173 123.544C445.728 127.226 443.252 130.67 439.644 131.236C436.036 131.803 432.66 129.276 432.105 125.594C431.55 121.912 434.026 118.468 437.634 117.902C441.243 117.335 444.618 119.862 445.173 123.544Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M432.191 89.6696C432.191 89.6696 453.409 88.6386 458.217 99.3222C465.367 115.183 456.118 126.411 446.059 140.357L447.436 113.688L432.191 89.6696Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M431.265 106.719C431.265 106.719 424.593 101.429 417.387 102.89C410.181 104.352 402.131 105.167 401.454 96.5455C400.577 85.5673 434.441 72.4478 456.214 96.3756L438.982 105.62L431.265 106.719Z"
                      fill="#2D4559"
                    />
                    <path
                      d="M328.974 165.574C338.134 170.695 345.806 170.276 349.326 163.093C352.845 155.91 349.992 147.175 342.953 143.584C335.913 139.992 329.874 141.567 325.31 148.116C321.724 153.248 321.169 161.212 328.974 165.574Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M330.371 143.732C330.371 143.732 331.515 138.973 339.62 140.038C347.036 141.013 354.709 149.532 349.313 163.094L330.371 143.732Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M331.417 147.425L317.194 137.648C315.94 136.911 315.473 135.235 316.151 133.954C316.75 132.844 318.027 132.402 319.171 132.901L336.08 140.571L331.417 147.425Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M403.075 176.428L346.495 156.646L339.223 167.058L392.539 199.347C400.177 203.868 408.094 198.362 410.681 189.74C412.69 183.033 409.315 179.362 403.075 176.428Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M451.869 164.442L393.735 177.981C386.162 181.21 381.777 182.094 384.408 190.024C387.173 198.351 396.011 202.826 404.171 200.051L460.64 191.361C468.446 188.699 473.786 183 472.798 174.661C471.421 163.003 462.483 159.922 451.869 164.442Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M419.406 171.999L429.932 204.13L464.728 198.975L462.241 161.35L419.406 171.999Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M437.289 166.594L448.248 279.096C493.903 287.332 513.355 265.772 513.355 265.772C513.355 265.772 500.731 227.332 491.338 200.062C481.467 171.398 466.823 160.805 455.242 154.846L437.289 166.594Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M455.249 154.846C455.249 154.846 446.7 172.973 438.273 176.202L437.207 166.345L448.676 158.086L455.249 154.846Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M468.298 233.666L412.34 255.135L412.273 268.368L477.814 255.894L468.298 233.666Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M391.106 268.084C393.959 259.905 402.886 257.718 402.886 257.718L414.988 254.172L420.484 260.029L416.476 263.927C417.608 269.387 415.987 278.372 409.659 281.952C402.375 286.064 388.252 276.276 391.106 268.084Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M450.727 197.456L463.306 247.884C464.694 253.469 472.244 256.981 477.795 255.894C483.591 254.772 487.388 249.062 486.289 243.148L476.818 192.381L450.727 197.456Z"
                      fill="#E6A57D"
                    />
                    <path
                      d="M460.085 162.29C456.654 161.882 453.312 163.355 450.892 165.87C447.727 169.156 444.041 175.172 445.318 184.734C447.45 200.674 453.357 217.238 453.357 217.238L482.557 212.446C482.557 212.446 479.515 164.624 460.085 162.29Z"
                      fill="#FFBB38"
                    />
                    <path
                      d="M455.691 216.716C455.691 216.716 450.695 198.102 449.562 187.928"
                      stroke="black"
                      strokeWidth="0.4058"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
