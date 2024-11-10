'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Example() {
  const [open, setOpen] = useState(true)

  // State variables for form inputs
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [age, setAge] = useState("")
  const [team, setTeam] = useState("")
  const [status, setStatus] = useState("")
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const item={id:new Date(), name, role, age, team, status, email };

    fetch('http://localhost:4000/users',{
      method:'POST',//sending data to port 4000,
      headers:{
        'Continent-Type':'applictaion/json',
      },
      body: JSON.stringify(item)
    }  );

    setEmail("");
    setRole("");
    setTeam("");
    setAge("");
    setStatus("");

    if(!name|| !role || !team || !age || !age ){ 
      alert("enter your name")}
  }


  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Add Employee</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mt-4">Role</label>
                      <input
                        id="role"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mt-4">Age</label>
                      <input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="team" className="block text-sm font-medium text-gray-700 mt-4">Team</label>
                      <input
                        id="team"
                        type="text"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mt-4">Status</label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      >
                        <option value=""></option>
                        <option value="active">Active</option>
                        <option value="pause">Pause</option>
                      </select>

                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <button
                        type="submit"
                        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                      >
                        Add Employee
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
