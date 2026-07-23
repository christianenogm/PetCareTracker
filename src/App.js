/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Root component - Main application with routing and global pet state management.
 * Routes: Home, Pets List, Add Pet, Pet Details, Tips, Gallery, Help, Privacy Policy
 */

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import Form from './components/Form/Form';
import HomePage from './components/HomePage/HomePage';
import './App.scss';
import './components/Components.scss';
import NotFound from './components/NotFound/NotFound';
import Help from './components/Help/Help';
import { HelpAdd, HelpChange, HelpDetails, HelpOverview, HelpRemove } from './components/Help/HelpTopics';
import PetDetails from './components/PetDetails/PetDetails';
import PetCareTips from './components/PetCareTips/PetCareTips';
import Gallery from './components/Gallery/Gallery';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import SiteFooter from './components/Footer/SiteFooter';
import { db } from './firebaseConfig';

// Reference to the 'pets' collection in Firestore
const petsCollectionRef = collection(db, 'pets');

// Helper function to create a care task object with default values
const createCareTask = (label, done = false, id = crypto.randomUUID(), dueDate = '') => ({
  id,
  label,
  done,
  dueDate,
});

// Normalize care tasks from Firestore data - handles legacy formats and provides defaults
const normalizeCareTasks = (petData) => {
  if (Array.isArray(petData.careTasks) && petData.careTasks.length > 0) {
    return petData.careTasks.map((task, index) => createCareTask(
      task.label || task.description || `Task ${index + 1}`,
      Boolean(task.done),
      task.id || `${petData.id || 'pet'}-${index}`,
      task.dueDate || '',
    ));
  }

  const defaultTasks = [
    createCareTask('Feed'),
    createCareTask('Walk'),
    createCareTask('Vet appointment'),
    createCareTask('Bath'),
  ];

  if (petData.careTask && !defaultTasks.some((task) => task.label === petData.careTask)) {
    return [...defaultTasks, createCareTask(petData.careTask)];
  }

  return defaultTasks;
};

// Root component: stores shared pet state and app routes.
function App() {
  // State for loading indicator and error tracking
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  // Main state: array of all pets from Firestore
  const [ pets, setPets ] = useState([]);

  // Fetch all pets from Firestore on component mount
  useEffect(() => {
    const loadPets = async () => {
      try {
        const snapshot = await getDocs(petsCollectionRef);
        const loadedPets = snapshot.docs.map((petDoc) => ({
          id: petDoc.id,
          ...petDoc.data(),
          careTasks: normalizeCareTasks({ id: petDoc.id, ...petDoc.data() }),
        }));

        setPets(loadedPets);
      } catch (error) {
        setLoadError('load-failed');
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  // Clear all pets at once.
  const handleClearPets = async () => {
    await Promise.all(
      pets.map((pet) => deleteDoc(doc(db, 'pets', pet.id)))
    );
    setPets([]);
  };

  // Remove one pet by id from local state (Firestore deletion handled in PetDetails component)
  const handlePetRemove = (id) => {
    setPets((currentPets) => currentPets.filter(
      (pet) => pet.id !== id
    ));
  };

  // Add new pet to state after form submission
  const handleAddPet = (newPet) => {
    setPets((currentPets) => [
      ...currentPets,
      newPet,
    ]);
  };

  // Update care tasks for a pet - sync changes to Firestore and local state
  const handleCareTasksChange = async (petId, nextCareTasks) => {
    await updateDoc(doc(db, 'pets', petId), {
      careTasks: nextCareTasks,
    });

    setPets((currentPets) => currentPets.map((pet) => (
      pet.id === petId ? { ...pet, careTasks: nextCareTasks } : pet
    )));
  };

  // Toggle completion status of a care task
  const handleCareTaskToggle = async (petId, taskId) => {
    const pet = pets.find((currentPet) => currentPet.id === petId);
    if (!pet) {
      return;
    }

    const nextCareTasks = pet.careTasks.map((task) => (
      task.id === taskId ? { ...task, done: !task.done } : task
    ));

    await handleCareTasksChange(petId, nextCareTasks);
  };

  // Add new care task to a pet's task list
  const handleCareTaskAdd = async (petId, label, dueDate = '') => {
    const pet = pets.find((currentPet) => currentPet.id === petId);
    if (!pet) {
      return;
    }

    const nextCareTasks = [
      ...pet.careTasks,
      createCareTask(label.trim(), false, crypto.randomUUID(), dueDate),
    ];

    await handleCareTasksChange(petId, nextCareTasks);
  };

  // Remove care task from a pet's task list
  const handleCareTaskRemove = async (petId, taskId) => {
    const pet = pets.find((currentPet) => currentPet.id === petId);
    if (!pet) {
      return;
    }

    const nextCareTasks = pet.careTasks.filter((task) => task.id !== taskId);
    await handleCareTasksChange(petId, nextCareTasks);
  };

  // Update pet profile fields (name, type, age, vaccination, owner info, etc.)
  const handlePetUpdate = async (petId, updatedFields) => {
    await updateDoc(doc(db, 'pets', petId), updatedFields);
    setPets((currentPets) => currentPets.map((pet) => (
      pet.id === petId ? { ...pet, ...updatedFields } : pet
    )));
  };

  return (
    <div className='app'>
      <Header />

      <main className='app-content'>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/pets'
            element={
            <Tasks 
                pets={pets} 
                isLoading={loading}
                loadError={loadError}
                onPetRemove={handlePetRemove}
                onClearPets={handleClearPets}
              />
            }
          />
          <Route
            path='/add'
            element={<Form onAddPet={handleAddPet} />}
          />
          <Route
            path='/tips'
            element={<PetCareTips />}
          />
          <Route
            path='/gallery'
            element={<Gallery />}
          />
          <Route
            path='/privacy-policy'
            element={<PrivacyPolicy />}
          />
          <Route
            path='/pets/:petSlug'
            element={
              <PetDetails
                pets={pets}
                isLoading={loading}
                onCareTaskToggle={handleCareTaskToggle}
                onCareTaskAdd={handleCareTaskAdd}
                onCareTaskRemove={handleCareTaskRemove}
                onPetRemove={handlePetRemove}
                onPetUpdate={handlePetUpdate}
              />
            }
          />
          <Route
            path='/help'
            element={<Help />}
          >
            <Route index element={<HelpOverview />} />
            <Route path='add' element={<HelpAdd />} />
            <Route path='details' element={<HelpDetails />} />
            <Route path='remove' element={<HelpRemove />} />
            <Route path='change' element={<HelpChange />} />
          </Route>
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
