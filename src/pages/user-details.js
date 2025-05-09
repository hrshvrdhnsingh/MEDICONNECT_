import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Input, Select, SelectItem, CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function UserDetails() {
  const [userType, setUserType] = useState('user');
  const [userForm, setUserForm] = useState({ fullname: '', age: '', weight: '', height: '', diet: 'veg' });
  const [doctorForm, setDoctorForm] = useState({ firstName: '', lastName: '', email: '', specialization: [] });
  const router = useRouter();

  const [isEmailValid, setIsEmailValid] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from cookies
    const tokenFromCookies = Cookies.get('token');
    if (tokenFromCookies) {
      setToken(tokenFromCookies);
    }
  }, []); 

  useEffect(() => {
    const checkEmail = async () => {
      if (!token) return; 

      try {
        const response = await fetch('/api/check-email-exists', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsEmailValid(data.exists);
        } else {
          setIsEmailValid(false);
        }
      } catch (error) {
        console.error("Email check error:", error);
        setIsEmailValid(false);
      }
    };

    checkEmail();
  }, [token]); // Only run when token is available

  // Redirect or show the form
  useEffect(() => {
    if (isEmailValid === true) {
      router.push('/'); 
    }
  }, [isEmailValid]); // Run when isEmailValid is updated

  const handleUserChange = (name, value) => {
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorChange = (name, value) => {
    setDoctorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/saveUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userForm),
    });
    if (res.ok) router.push('/');
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/saveDoctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doctorForm),
    });
    if (res.ok) router.push('/');
  };

  const specializations = [
    'Respiratory', 'Musculoskeletal', 'Neurological', 'Psychological',
    'Dermatological', 'Excretion', 'General'
  ];

  return (
    <div className='w-screen min-h-screen flex justify-center items-center flex-col gap-12'>
      <h1 className='text-4xl text-blue-700 font-semibold'>Allow us to personalize your experience!</h1>

      <div className="flex gap-4 text-lg">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="user"
            checked={userType === 'user'}
            onChange={() => setUserType('user')}
          />
          I'm a User
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="doctor"
            checked={userType === 'doctor'}
            onChange={() => setUserType('doctor')}
          />
          I'm a Doctor
        </label>
      </div>

      <form
        onSubmit={userType === 'user' ? handleUserSubmit : handleDoctorSubmit}
        className='flex justify-center items-center flex-col gap-3 w-6/12 md:w-5/12 lg:w-4/12'
      >
        {userType === 'user' ? (
          <>
            <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                Name:
                <Input
                  type="string"
                  aria-label="Full Name"
                  placeholder="Enter your full name"
                  value={userForm.fullname}
                  onChange={(e) => handleUserChange('fullname', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                Age:
                <Input
                  type="number"
                  aria-label="Age"
                  label="Enter your age"
                  value={userForm.age}
                  onChange={(e) => handleUserChange('age', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                Weight (kg):
                <Input
                  type="number"
                  aria-label="Weight"
                  label="Enter your weight"
                  value={userForm.weight}
                  onChange={(e) => handleUserChange('weight', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                Height (cm):
                <Input
                  type="number"
                  aria-label="Height"
                  label="Enter your height"
                  value={userForm.height}
                  onChange={(e) => handleUserChange('height', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                Diet:
                <Select
                  label="Diet"
                  aria-label="Diet"
                  className="w-full rounded-md bg-richblack-500 text-zinc-200 text-lg"
                  selectedKeys={[userForm.diet]}
                  onSelectionChange={(key) => {
                    const selected = Array.from(key)[0];
                    handleUserChange('diet', selected);
                  }}
                >
                  <SelectItem key="veg">Veg</SelectItem>
                  <SelectItem key="non-veg">Non-Veg</SelectItem>
                </Select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                First Name:
                <Input
                  type="text"
                  aria-label="First Name"
                  placeholder="Enter your first name"
                  value={doctorForm.firstName}
                  onChange={(e) => handleDoctorChange('firstName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                Last Name:
                <Input
                  type="text"
                  aria-label="Last Name"
                  placeholder="Enter your last name"
                  value={doctorForm.lastName}
                  onChange={(e) => handleDoctorChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full justify-center items-center flex flex-col text-blue-300 lg:text-xl text-lg font-medium">
              <div className="w-11/12">
                Specializations:
                <CheckboxGroup
                  value={doctorForm.specialization}
                  onValueChange={(val) => handleDoctorChange('specialization', val)}
                  className="mt-2 gap-2 flex border items-center flex-wrap"
                >
                  {specializations.map((item) => (
                    <Checkbox key={item} value={item} className='text-blue-300'>
                      {item}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className='w-11/12 px-3 py-2 bg-blue-gray-400 rounded-xl mt-4 text-black text-xl font-medium hover:scale-95 transition-all duration-1000'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
