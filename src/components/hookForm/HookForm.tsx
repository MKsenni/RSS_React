import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCountry } from '../../redux/slices/countrySlice';
import StrengthPassword from '../strengthPassword/StrengthPassword';
import { useId } from 'react';
import { loadData } from '../../redux/slices/dataSlice';
import { FormData, schema } from '../../yup/yupSchema';

const HookForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const password = watch('password');

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
    reset();
    dispatch(selectCountry(data.country));

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const base64 = e.target.result as string;
        const newData = { ...data, image: base64 };
        dispatch(loadData(newData));
      }
    };
    reader.readAsDataURL(data.image[0]);
    navigate('/');
  };

  const back = () => {
    navigate(-1);
  };

  const countriesList = useAppSelector((state) => state.countries.countries);

  const styleErrorMessage = errors ? 'text-rose-600' : '';

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

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        HookForm
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor={nameId}>Name</label>
                <input {...register('name')} name="name" id={nameId} />
                {errors.name && (
                  <p className={styleErrorMessage}>{errors.name?.message}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={ageId}>Age</label>
                <input {...register('age')} name="age" id={ageId} />
                {errors.age && (
                  <p className={styleErrorMessage}>{errors.age?.message}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor={emailId}>E-mail</label>
                <input {...register('email')} name="email" id={emailId} />
                {errors.email && (
                  <p className={styleErrorMessage}>{errors.email?.message}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={passwordId}>Password</label>
                <input
                  {...register('password')}
                  name="password"
                  id={passwordId}
                />
                {password && <StrengthPassword password={password} />}
                {errors.password && (
                  <p className={styleErrorMessage}>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={confirmPasswordId}>Password</label>
                <input
                  {...register('confirmPassword')}
                  name="confirmPassword"
                  id={confirmPasswordId}
                />
                {errors.confirmPassword && (
                  <p className={styleErrorMessage}>
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    <p>Gender</p>
                    <div className="flex gap-4">
                      <div>
                        <input
                          {...register('gender')}
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
                          {...register('gender')}
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
                {errors.gender && (
                  <p className={styleErrorMessage}>{errors.gender?.message}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor={countryId}>Country</label>
                <input
                  list="countries"
                  {...register('country')}
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
                {errors.country && (
                  <p className={styleErrorMessage}>{errors.country?.message}</p>
                )}
              </div>

              <div className="sm:col-span-5">
                <label htmlFor={acceptId}>
                  Accept T&C
                  <input
                    {...register('accept')}
                    type="checkbox"
                    name="accept"
                    id={acceptId}
                    className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`}
                  />
                </label>
                {errors.accept && (
                  <p className={styleErrorMessage}>{errors.accept?.message}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor={imageId}>
                  Image
                  <input
                    {...register('image')}
                    type="file"
                    name="image"
                    id={imageId}
                    accept=".png, .jpg, .jpeg"
                  />
                </label>
                {errors.image && (
                  <p className={styleErrorMessage}>{errors.image?.message}</p>
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
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => reset()}
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:pointer-events-none"
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default HookForm;
