import * as yup from "yup";
import { Messages } from "./errorMessages";

const LoginSchema = yup.object().shape({
  email: yup.string().email().required(Messages.Email.required),
  password: yup.string().required(Messages.Password.required),
});

const SearchSchema = yup.object().shape({
  level: yup.string(),
  message: yup.string(),
  resourceId: yup.string(),
  fromDate: yup.string(),
  toDate: yup.string(),

  traceId: yup.string(),
  spanId: yup.string(),
  commit: yup.string(),
  parentResourceId: yup.string(),
});


export {
  LoginSchema,
  SearchSchema,
};
