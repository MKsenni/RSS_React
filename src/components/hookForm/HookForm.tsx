import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = yup.InferType<typeof schema>;
const schema = yup
  .object({
    name: yup.string().strict().required(),
    age: yup.number().positive().integer().required(),
    email: yup.string().nullable().email(),
    gender: yup
      .mixed()
      .oneOf(['male', 'female'] as const)
      .defined()
      .required(),
  })
  .required();

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = (data: FormData) => console.log(data);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
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
                <p>{errors.name?.message}</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="age">Age</label>
                <input {...register('age')} name="age" />
                <p>{errors.age?.message}</p>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email">E-mail</label>
                <input {...register('email')} name="email" />
                <p>{errors.email?.message}</p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="passwordFirst">Password</label>
                <input type="text" name="passwordFirst" />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="passwordSecond">Password</label>
                <input type="text" name="passwordSecond" />
              </div>

              <div className="sm:col-span-3">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    <p>Gender</p>
                    <div className="flex gap-4">
                      <div>
                        <input
                          id="maleRadio"
                          {...register('gender')}
                          name="female"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="maleRadio">Male</label>
                        <p>{errors.gender?.message}</p>
                      </div>

                      <div>
                        <input
                          id="femaleRadio"
                          type="radio"
                          name="male"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="femaleRadio">Female</label>
                      </div>
                    </div>
                  </legend>
                </fieldset>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country">Country</label>
                <input type="text" name="country" autoComplete="country-name" />
              </div>

              <div className="sm:col-span-5">
                <label htmlFor="accept">
                  Accept T&C
                  <input
                    type="checkbox"
                    name="accept"
                    id="accept"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </label>
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
