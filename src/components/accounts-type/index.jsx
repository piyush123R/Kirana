import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import projectLogo from "../../resources/images/kirana logo.PNG";

import "./accountType.css";

const AccountTypeSelection = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailValidity, setEmailValidity] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passResetMsg, setpassResetMsg] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
    if (emailPattern.test(email) !== true) {
      setEmailValidity("Invalid email");
      return;
    }

    const requestData = {
      email,
      password,
      account: accountType,
    };
    axios
      .post("http://localhost:3001/login", requestData)
      .then((res) => {
        if (res.data === "Login Successful") {
          if(accountType==='Personal')
          navigate("/personalPage");
          else
          navigate("/businessPage");
        }
        setMsg(res.data);
      })
      .catch((err) => setMsg("Some error occured"));
  };

  const setPass = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (!password || password.length === 0) {
      setPasswordStrength("");
      return;
    }
    let score = 0;
    const lowerRegex = /[a-z]/;
    const upperRegex = /[A-Z]/;
    const numRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*]/;

    if (lowerRegex.test(password)) score++;
    if (upperRegex.test(password)) score++;
    if (numRegex.test(password)) score++;
    if (specialCharRegex.test(password)) score++;
    if (password.length >= 8) score++;

    if (score === 5) setPasswordStrength("Strong!");
    else if (score === 4) setPasswordStrength("Medium!");
    else setPasswordStrength("Weak!");
  }, [password]);

  useEffect(() => {
    if (!email || email.length === 0) return;
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
    if (!emailPattern.test(email)) {
      setEmailValidity("Invalid email");
    } else {
      setEmailValidity("");
    }
  }, [email]);

  const submitEmail = () => {
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,8}$/;
    if (emailPattern.test(email) !== true) {
      setEmailValidity("Invalid email");
      return;
    }
    setPassword("");
    setConfirmPassword("");
    setStatus(2);
  };

  const forgetPassword = () => {
    setStatus(1);
    setPassword("");
  };

  const resetPassword = () => {
    if (passwordStrength !== "Strong!") return;
    if (confirmPassword === password) {
      setpassResetMsg("Password Reset successful");
      setStatus(0);
    } else {
      setpassResetMsg("Password Mismatch");
    }
  };

  const handleAccountTypeSelection = (userAccountType) => {
    setAccountType(userAccountType);
  };

  return (
    <div>
      {!accountType ? (
        <div>
          <Row className="login">
            <Col md={12} className="ant-col-24 ">
              <img
                src={projectLogo}
                alt="projectLogo"
                width="1000"
                height="400"
              />
            </Col>
            <Col md={12} className="ant-col-24 ">
              <div className="account-type">
                <h1>Account Type</h1>
                <Button
                  onClick={(e) => handleAccountTypeSelection("Business")}
                  className="business-btn"
                >
                  BUSINESS
                </Button>
                <Button
                  onClick={(e) => handleAccountTypeSelection("Personal")}
                  className="personal-btn"
                >
                  PERSONAL
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          <Row className="login">
            <Col md={12} className="ant-col-24">
              <img
                src={projectLogo}
                alt="projectLogo"
                width="1000"
                height="400"
              />
            </Col>
            <Col md={12} className="ant-col-24">
              <div className="details">
                <div className="heading">
                  {status === 0 ? (
                    <p className="heading1">User login</p>
                  ) : status === 1 ? (
                    <p className="heading2">Forgot Password</p>
                  ) : (
                    <p className="heading3">Reset Password</p>
                  )}
                </div>
                <Form
                  name="basic"
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                >
                  <h6>Email</h6>
                  <Form.Item
                    name="username"
                    onChange={handleEmailChange}
                    value={email}
                  >
                    <Input className="inputField" disabled={status > 0} />
                    <h6 className="isValid">{emailValidity}</h6>
                  </Form.Item>
                  {status === 0 || status === 2 ? (
                    <>
                      {status === 0 ? (
                        <h6>Password</h6>
                      ) : (
                        <h6>Enter Password</h6>
                      )}
                      <Form.Item
                        name="password"
                        onChange={setPass}
                        value={password}
                      >
                        <Input.Password
                          className="inputField"
                          style={{ boxShadow: "none" }}
                        />
                        <div className="PasswordStrength">
                          {passwordStrength === "Weak!" ? (
                            <h6 className="Weak">{passwordStrength}</h6>
                          ) : passwordStrength === "Medium!" ? (
                            <h6 className="Medium">{passwordStrength}</h6>
                          ) : (
                            <h6 className="Strong">{passwordStrength}</h6>
                          )}
                        </div>
                      </Form.Item>
                      {status === 2 ? (
                        <>
                          <h6>Confirm Password</h6>
                          <Form.Item
                            name="password"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                            value={password}
                          >
                            <Input.Password
                              className="inputField"
                              style={{ boxShadow: "none" }}
                            />
                          </Form.Item>
                        </>
                      ) : null}
                    </>
                  ) : null}

                  <h6>Account Type</h6>
                  <Form.Item>
                    <Input
                      className="inputField"
                      disabled={true}
                      value={accountType}
                    />
                  </Form.Item>

                  {status === 0 ? (
                    <>
                      <p className="fogetPassword" onClick={forgetPassword}>
                        Forgot password?
                      </p>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="submitBtn"
                        onClick={handleSubmit}
                      >
                        Login
                      </Button>
                      <div className="validateOtp">
                        {msg === "Login Successful" ? (
                          <p className="success">{msg}</p>
                        ) : (
                          <p className="fail">{msg}</p>
                        )}
                      </div>
                    </>
                  ) : status === 1 ? (
                    <>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="forgotBtn"
                        onClick={submitEmail}
                      >
                        Forgot Password
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="forgotBtn"
                        onClick={resetPassword}
                      >
                        Reset Password
                      </Button>
                      <div className="validateOtp">
                        {passResetMsg === "Password Reset successful" ? (
                          <p className="success">{passResetMsg}</p>
                        ) : (
                          <p className="fail">{passResetMsg}</p>
                        )}
                      </div>
                    </>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default AccountTypeSelection;
