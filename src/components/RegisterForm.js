import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/loginSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormError from './FormError';

function RegisterForm(props) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  useEffect(() => {
    if (login.loginSuccess === true) {
      localStorage.setItem('token', login.token);
      window.location = '/';
      // props.history.replace('/products');
    }
  }, [login, props.history]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required!'),
    lastName: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 4 chars minimum'),
    passwordConfirmation: Yup.string()
      .required('Please confirm your password.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const onSubmit = (values, onSubmitProps) => {
    const registerInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    };
    dispatch(registerUser(registerInfo));
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
              <h2 className="text-center">Register</h2>
              <p className="text-center text-muted">
                Please fill out this form to create an account.
              </p>
              <div className="mb-3">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                />
                <ErrorMessage name="firstName" component={FormError} />
              </div>
              <div className="mb-3">
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control"
                />
                <ErrorMessage name="lastName" component={FormError} />
              </div>
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
              <div className="mb-3">
                <Field
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  className="form-control"
                />
                <ErrorMessage
                  name="passwordConfirmation"
                  component={FormError}
                />
              </div>
              {login.loading ? (
                <div className="d-grid">
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{' '}
                    Registerging...
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
                  {login.registerError ? (
                    <div
                      className="alert alert-danger text-center"
                      role="alert"
                    >
                      <strong>{login.registerError}</strong>
                    </div>
                  ) : null}
                </div>
              )}
              <Link to="/login">
                <p className="text-center">
                  Aldready have an account? Log in here.
                </p>
              </Link>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default RegisterForm;
