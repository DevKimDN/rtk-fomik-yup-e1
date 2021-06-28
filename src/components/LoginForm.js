import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/loginSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormError from './FormError';

function LoginForm(props) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  useEffect(() => {
    if (login.loginSuccess === true) {
      localStorage.setItem('token', login.token);
      window.location = '/';
    }
  }, [login]);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = (values, onSubmitProps) => {
    dispatch(loginUser(values));
    onSubmitProps.setSubmitting(false);
  };

  return (
    <div className="login-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        // To disable submit button until form is valid
        validateOnMount
      >
        {(formik) => {
          return (
            <Form>
              <h2 className="text-center">Login</h2>
              <div className="mb-3">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                />
                <ErrorMessage name="email" component={FormError} />
              </div>
              <div className="mb-3">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
                <ErrorMessage name="password" component={FormError} />
              </div>
              {login.loading ? (
                <div className="d-grid">
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{' '}
                    Login in...
                  </button>
                </div>
              ) : (
                <div className="d-grid">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary btn-block mb-2"
                  >
                    Submit
                  </button>
                  {login.loginError ? (
                    <div
                      className="alert alert-danger text-center"
                      role="alert"
                    >
                      <strong>{login.loginError}</strong>
                    </div>
                  ) : null}
                </div>
              )}

              <Link to="/register">
                <p className="text-center">Click here to register</p>
              </Link>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
