import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Input, Select, SelectItem } from "@nextui-org/react";

export default function UserDetails() {
  const [form, setForm] = useState({ fullname: '', age: '', weight: '', height: '', diet: 'veg' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const token = Cookies.get('token');
    const res = await fetch('/api/saveUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push('/');
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='w-screen min-h-screen flex justify-center items-center flex-col gap-12'>
      <h1 className='text-4xl text-blue-700 font-semibold'>Allow us to personalize your experience!</h1>
      <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-3 w-6/12 md:w-5/12 lg:w-4/12'>
        <div className="w-full justify-center items-center flex flex-wrap md:flex-nowrap gap-4 text-blue-300 lg:text-xl text-lg font-medium">
          <div className="w-11/12">
            Name:
            <Input
              type="string"
              aria-label="Full Name"
              placeholder="Enter your full name"
              value={form.fullname}
              onChange={(e) => handleChange('fullname', e.target.value)}
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
              value={form.age}
              onChange={(e) => handleChange('age', e.target.value)}
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
              value={form.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
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
              value={form.height}
              onChange={(e) => handleChange('height', e.target.value)}
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
              selectedKeys={[form.diet]}
              onSelectionChange={(key) => {
                const selected = Array.from(key)[0]; // key is a Set
                handleChange('diet', selected);
              }}
            >
              <SelectItem key="veg" value="veg">
                Veg
              </SelectItem>
              <SelectItem key="non-veg" value="non-veg">
                Non-Veg
              </SelectItem>
            </Select>
          </div>
        </div>

        <button type="submit" className='w-11/12 px-3 py-2 bg-blue-gray-400 rounded-xl mt-4 text-black text-xl font-medium hover:scale-95 transition-all duration-1000'>
          Submit
        </button>
      </form>
    </div>
  );
}
