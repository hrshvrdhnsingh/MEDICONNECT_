import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import React from 'react'

const eg = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Input type="email" label="Email" />
      <Input type="email" label="Email" placeholder="Enter your email" />
    </div>
  );
}

export default eg