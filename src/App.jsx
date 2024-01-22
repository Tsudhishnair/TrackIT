import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUgEuMFpn0btAzbSJWWuL6Utg0NLMjVCc",
  authDomain: "trackit-01.firebaseapp.com",
  projectId: "trackit-01",
  storageBucket: "trackit-01.appspot.com",
  messagingSenderId: "648180715972",
  appId: "1:648180715972:web:e1b6be483a99f7f01c5491",
  measurementId: "G-3PH4WBLMB8",
};

const InputField = ({ field, ...props }) => {
  return <TextField label={field.name.toUpperCase()} {...field} {...props} />;
};

const ErrorMessageBlock = ({ formik, name }) => {
  return (
    <div className="w-full mb-3">
      {formik.touched?.[name] && formik.errors?.[name] ? (
        <div className="text-red-700">{formik.errors?.[name]}</div>
      ) : null}
    </div>
  );
};

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  return (
    <div className="flex flex-col items-center">
      <div className="mt-32 text-5xl font-semibold">Login Screen</div>
      <div className="my-16 w-2/6">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Enter a valid email.").required(),
            password: Yup.string()
              .min(7, "Min length of the password should be 7")
              .required(),
          })}
          onSubmit={(values) => {
            console.log(values, "Testing");
          }}
        >
          {(formik) => (
            <Form className="flex flex-col">
              <Field
                type="email"
                name="email"
                className="mb-2"
                component={InputField}
              />
              <ErrorMessageBlock formik={formik} name="email" />
              <Field
                type="password"
                name="password"
                className="mb-2"
                component={InputField}
              />
              <ErrorMessageBlock formik={formik} name="password" />
              <Button
                variant="contained"
                size="large"
                disableElevation
                className="bg-blue-800 hover:bg-blue-700 mt-3"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;


