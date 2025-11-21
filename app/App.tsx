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
} from "flowbite-react";
import { WorkoutType, WorkoutSchema } from "./api/workouts/db";
import { ModalType } from "./enums";

const initialValue = { name: "", sets: 0, reps: 0, weight: 0 };
const { Add, Update } = ModalType;

export default function App({ workoutList }: { workoutList: WorkoutSchema[] }) {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>();
  const [showModal, setShowModal] = useState<ModalType>();

  function closeUpdateMdoal() {
    setShowModal(undefined);
    setSelectedWorkout(initialValue);
  }

  const workoutEls = workoutList.map(({ name, sets, reps, weight }) => {
    function showUpdateMdoal() {
      setSelectedWorkout({ name, sets, reps, weight });
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
              <div className="w-full">
                <Button disabled={!(name && sets && reps)}>{showModal}</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </main>
    </>
  );
}
