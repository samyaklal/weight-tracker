"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  TextInput,
  Toast,
  ToastToggle,
} from "flowbite-react";
import { Types } from "mongoose";

import { WorkoutSchema, WorkoutType } from "./api/workouts/db";
import { ModalType, ToastType } from "./enums";

const initialValue = { name: "", sets: 0, reps: 0, weight: 0 };
const { Add, Update, Delete } = ModalType;
const { Success, Error } = ToastType;

export default function App({ initialList }: { initialList: WorkoutSchema[] }) {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>();
  const [showModal, setShowModal] = useState<ModalType>();
  const [workoutList, setWorkoutList] = useState(initialList);
  const [workoutId, setWorkoutId] = useState<Types.ObjectId>();

  const [toastProps, setToastProps] = useState<{
    color: ToastType;
    message: string;
  }>();

  function closeUpdateMdoal() {
    setShowModal(undefined);
    setSelectedWorkout(initialValue);
    setWorkoutId(undefined);
  }

  async function handleChange() {
    const response = await fetch(`/api/workouts/${workoutId || ""}`, {
      method: workoutId ? "PATCH" : "POST",
      body: JSON.stringify(selectedWorkout),
    });

    if (response.ok) {
      const { workouts } = await response.json();
      setWorkoutList(workouts);
      setToastProps({ color: Success, message: `${showModal} successful` });
      closeUpdateMdoal();
    } else {
      setToastProps({ color: Error, message: response.statusText });
    }
    setTimeout(() => setToastProps(undefined), 3000);
  }

  async function handleDelete() {
    const response = await fetch(`/api/workouts/${workoutId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const { workouts } = await response.json();
      setWorkoutList(workouts);
      setToastProps({ color: Success, message: "Delete successful" });
      closeUpdateMdoal();
    } else {
      setToastProps({ color: Error, message: response.statusText });
    }
    setTimeout(() => setToastProps(undefined), 3000);
  }

  const workoutEls = workoutList.map(({ name, sets, reps, weight, _id }) => {
    function showUpdateMdoal() {
      setSelectedWorkout({ name, sets, reps, weight });
      setWorkoutId(_id);
      setShowModal(Update);
    }

    return (
      <TableRow
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={name}
        onClick={showUpdateMdoal}
      >
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {name}
        </TableCell>
        <TableCell>{sets}</TableCell>
        <TableCell>{reps}</TableCell>
        <TableCell>{weight}</TableCell>
      </TableRow>
    );
  });

  const { name, sets, reps, weight } = selectedWorkout || {};
  return (
    <>
      <header className="flex p-4">
        <h1 className="text-center font-black text-3xl grow">Workouts</h1>
        <Button onClick={() => setShowModal(Add)}>Add</Button>
      </header>
      <main>
        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>name</TableHeadCell>
                <TableHeadCell>sets</TableHeadCell>
                <TableHeadCell>reps</TableHeadCell>
                <TableHeadCell>weight</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">{workoutEls}</TableBody>
          </Table>
        </div>
        <Modal
          show={Boolean(showModal)}
          size="md"
          onClose={closeUpdateMdoal}
          popup
        >
          <ModalHeader />
          <ModalBody>
            {showModal === Delete ? (
              <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this workout?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="red" onClick={handleDelete}>
                    Yes
                  </Button>
                  <Button
                    color="alternative"
                    onClick={() => setShowModal(Update)}
                  >
                    No
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {showModal} Workout
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <TextInput
                    id="name"
                    placeholder="Enter workout name"
                    value={name}
                    onChange={(event) =>
                      setSelectedWorkout((state) => ({
                        ...(state as WorkoutType),
                        name: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sets">Sets</Label>
                  </div>
                  <TextInput
                    id="sets"
                    type="number"
                    value={sets}
                    onChange={(event) =>
                      setSelectedWorkout((state) => ({
                        ...(state as WorkoutType),
                        sets: Number(event.target.value),
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sets">Reps</Label>
                  </div>
                  <TextInput
                    id="reps"
                    type="number"
                    value={reps}
                    onChange={(event) =>
                      setSelectedWorkout((state) => ({
                        ...(state as WorkoutType),
                        reps: Number(event.target.value),
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sets">Weight</Label>
                  </div>
                  <TextInput
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(event) =>
                      setSelectedWorkout((state) => ({
                        ...(state as WorkoutType),
                        weight: Number(event.target.value),
                      }))
                    }
                    required
                  />
                </div>
                <div className="w-full flex justify-between">
                  <Button
                    disabled={!(name && sets && reps)}
                    onClick={handleChange}
                  >
                    {showModal}
                  </Button>
                  {showModal === Update && (
                    <Button color="red" onClick={() => setShowModal(Delete)}>
                      {Delete}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </ModalBody>
        </Modal>
        {toastProps && (
          <Toast className="fixed z-51 top-3 right-3">
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200${toastProps.color === Error ? " dark:bg-red-500" : ""}`}
            ></div>
            <div className="ml-3 text-sm font-normal">{toastProps.message}</div>
            <ToastToggle />
          </Toast>
        )}
      </main>
    </>
  );
}
