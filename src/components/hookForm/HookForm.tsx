import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCountry } from '../../redux/slices/countrySlice';
import StrengthPassword from '../strengthPassword/StrengthPassword';

yup.setLocale({
  string: {
    min: `password must be at least 6 characters`,
  },
});

export type FormData = yup.InferType<typeof schema>;
const schema = yup
  .object({
    name: yup
      .string()
      .required('Required field')
      .matches(/^[A-ZА-Я]/, 'First latter must be uppercase'),
    age: yup
      .number()
      .required('Required field')
      .typeError('Must be number')
      .positive('Must be positive number')
      .integer('Must be integer number'),
    email: yup
      .string()
      .required('Required field')
      .email('e.g. example@ex.ex without leading or trailing whitespace')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'e.g. example@ex.ex without leading or trailing whitespace'
      ),
    password: yup
      .string()
      .required('Required field')
      .matches(/(?=.*\d)/, 'Password must contain 1 number')
      .matches(/(?=.*[A-Z])/, 'Password must contain 1 uppercased letter')
      .matches(/(?=.*[a-z])/, 'Password must contain 1 lowercased letter')
      .matches(/(?=.*\W)/, 'Password must contain 1 special character')
      .min(6, `Password must be at least 6 characters`),
    confirmPassword: yup
      .string()
      .required('Required field')
      .oneOf([yup.ref('password')], 'Passwords must matches'),
    // gender: yup
    //   .mixed()
    //   .required('Required field')
    //   .oneOf(['male', 'female'] as const),
    country: yup.string().required('Required field'),
    accept: yup.boolean().required('Required field'),
  })
  .required('Required field');

const HookForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const password = watch('password');

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
    dispatch(selectCountry(data.country));
    navigate('/');
  };

  const back = () => {
    navigate(-1);
  };

  const countriesList = useAppSelector((state) => state.countries.countries);

  // const inputs = document.querySelectorAll('input');
  // inputs.forEach((input) => {
  //   const name = input.getAttribute('name');
  //   if (name) {
  //     if (Object.keys(errors).includes(name)) {
  //       input.className += 'ring-rose-800 focus:ring-rose-900';
  //     }
  //   }
  // });

  // const hasTrueValue = Object.values(errors).some((value) => value);
  const styleErrorMessage = errors ? 'text-rose-600' : '';

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        HookForm
      </h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name">Name</label>
                <input {...register('name')} name="name" />
                {errors.name && (
                  <p className={styleErrorMessage}>{errors.name?.message}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="age">Age</label>
                <input {...register('age')} name="age" />
                {errors.age && (
                  <p className={styleErrorMessage}>{errors.age?.message}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email">E-mail</label>
                <input {...register('email')} name="email" />
                {errors.email && (
                  <p className={styleErrorMessage}>{errors.email?.message}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="passwordFirst">Password</label>
                <input {...register('password')} name="password" />
                {password && <StrengthPassword password={password} />}
                {errors.password && (
                  <p className={styleErrorMessage}>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="passwordSecond">Password</label>
                <input
                  {...register('confirmPassword')}
                  name="confirmPassword"
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
                          // {...register('gender')}
                          id="maleRadio"
                          type="radio"
                          name="maleRadio"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="maleRadio">Male</label>
                      </div>

                      <div>
                        <input
                          // {...register('gender')}
                          id="femaleRadio"
                          type="radio"
                          name="femaleRadio"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="femaleRadio">Female</label>
                      </div>
                    </div>
                  </legend>
                </fieldset>
                {/* {errors.gender && (
                  <p className={styleErrorMessage}>{errors.gender?.message}</p>
                )} */}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country">Country</label>
                <input
                  list="countries"
                  {...register('country')}
                  autoComplete="country-name"
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
                <label htmlFor="accept">
                  Accept T&C
                  <input
                    {...register('accept')}
                    type="checkbox"
                    name="accept"
                    id="accept"
                    className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`}
                  />
                </label>
                {errors.accept && (
                  <p className={styleErrorMessage}>{errors.accept?.message}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="picture">
                  Image
                  <input type="file" name="picture" />
                </label>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPEG, up to 10MB
                </p>
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default HookForm;
