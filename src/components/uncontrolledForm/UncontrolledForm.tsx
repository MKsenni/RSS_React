import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useId, useRef, useState } from 'react';
import { FormData, schema } from '../../yup/yupSchema';
import { selectCountry } from '../../redux/slices/countrySlice';
import { loadData } from '../../redux/slices/dataSlice';
import { Data } from '../../services/types';
import * as yup from 'yup';
import StrengthPassword from '../strengthPassword/StrengthPassword';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [
    nameId,
    ageId,
    emailId,
    passwordId,
    confirmPasswordId,
    maleId,
    femaleId,
    countryId,
    acceptId,
    imageId,
  ] = useId();

  const refFormData = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
    accept: useRef<HTMLInputElement>(null),
    image: useRef<HTMLInputElement>(null),
  };

  const back = () => {
    navigate(-1);
  };

  const [errors, setErrors] = useState<Data>();
  const styleErrorMessage = errors ? 'text-rose-600' : '';

  const countriesList: string[] = useAppSelector(
    (state) => state.countries.countries
  );

  const [password, setPassword] = useState('');
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = event.target.value;
    setPassword(password);
  };

  const [selectedImage, setSelectedImage] = useState<FileList>();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;
      setSelectedImage(files);
    }
  };

  const getErrorYup = (yupError: unknown) => {
    let error: Data = {} as Data;
    if (yupError instanceof yup.ValidationError) {
      yupError.inner.forEach((err) => {
        const path = err.path as keyof FormData;
        error = { ...error, [path]: err.message! };
      });
    }
    return error;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name: refFormData.name.current?.value || '',
      age: Number(refFormData.age.current?.value) || 0,
      email: refFormData.email.current?.value || '',
      password: refFormData.password.current?.value || '',
      confirmPassword: refFormData.confirmPassword.current?.value || '',
      gender: refFormData.gender.current?.value || '',
      country: refFormData.country.current?.value || '',
      accept: refFormData.accept.current?.checked || false,
      image: selectedImage,
    };

    try {
      await schema.validate(data, { abortEarly: false });
      dispatch(selectCountry(data.country));
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const base64 = e.target.result;
          if (typeof base64 === 'string') {
            const newData = { ...data, image: base64 };
            dispatch(loadData(newData));
          }
        }
      };
      if (data.image) reader.readAsDataURL(data.image[0]);
      navigate('/');
    } catch (error) {
      const yupError = getErrorYup(error);
      setErrors(yupError);
    }
  };

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Uncontrolled Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor={nameId}>Name</label>
                <input
                  ref={refFormData.name}
                  type="text"
                  name="name"
                  id={nameId}
                />
                {errors?.name && (
                  <p className={styleErrorMessage}>{errors.name}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={ageId}>Age</label>
                <input
                  ref={refFormData.age}
                  type="text"
                  name="age"
                  id={ageId}
                />
                {errors?.age && (
                  <p className={styleErrorMessage}>{errors.age}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor={emailId}>E-mail</label>
                <input ref={refFormData.email} name="email" id={emailId} />
                {errors?.email && (
                  <p className={styleErrorMessage}>{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={passwordId}>Password</label>
                <input
                  ref={refFormData.password}
                  name="password"
                  id={passwordId}
                  onChange={handleChangePassword}
                  placeholder="password"
                />
                {password && <StrengthPassword password={password} />}
                {errors?.password && (
                  <p className={styleErrorMessage}>{errors.password}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={confirmPasswordId}>Password</label>
                <input
                  ref={refFormData.confirmPassword}
                  name="confirmPassword"
                  id={confirmPasswordId}
                  placeholder="confirm password"
                />
                {errors?.confirmPassword && (
                  <p className={styleErrorMessage}>{errors.confirmPassword}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    <p>Gender</p>
                    <div className="flex gap-4">
                      <div>
                        <input
                          ref={refFormData.gender}
                          value="male"
                          id={maleId}
                          type="radio"
                          name="gender"
                          className="h-4 w-4 text-indigo-600 focus:ring-transparent ring-transparent"
                        />
                        <label htmlFor={maleId}>Male</label>
                      </div>

                      <div>
                        <input
                          ref={refFormData.gender}
                          value="female"
                          id={femaleId}
                          type="radio"
                          name="gender"
                          className="h-4 w-4 text-indigo-600 focus:ring-transparent ring-transparent"
                        />
                        <label htmlFor={femaleId}>Female</label>
                      </div>
                    </div>
                  </legend>
                </fieldset>
                {errors?.gender && (
                  <p className={styleErrorMessage}>{errors.gender}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={countryId}>Country</label>
                <input
                  list="countries"
                  ref={refFormData.country}
                  type="text"
                  autoComplete="country-name"
                  name="country"
                  id={countryId}
                />
                <datalist id="countries">
                  {countriesList.map((country, idx) => (
                    <option key={idx} value={country}>
                      {country}
                    </option>
                  ))}
                </datalist>
                {errors?.country && (
                  <p className={styleErrorMessage}>{errors.country}</p>
                )}
              </div>

              <div className="sm:col-span-5">
                <label htmlFor={acceptId}>
                  Accept T&C
                  <input
                    ref={refFormData.accept}
                    type="checkbox"
                    name="accept"
                    id={acceptId}
                    className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`}
                  />
                </label>
                {errors?.accept && (
                  <p className={styleErrorMessage}>{errors.accept}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor={imageId}>
                  Image
                  <input
                    type="file"
                    name="image"
                    id={imageId}
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageChange}
                  />
                </label>
                {errors?.image && (
                  <p className={styleErrorMessage}>{errors.image}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={back}
          >
            Cancel
          </button>
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:pointer-events-none"
            // disabled={!errors}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default UncontrolledForm;
